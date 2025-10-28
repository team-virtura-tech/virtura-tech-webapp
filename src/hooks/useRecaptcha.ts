import { useCallback } from 'react';

declare global {
  interface Window {
    grecaptcha: {
      enterprise: {
        ready: (callback: () => void) => void;
        execute: (
          siteKey: string,
          options: { action: string }
        ) => Promise<string>;
      };
    };
  }
}

export const useRecaptcha = () => {
  const executeRecaptcha = useCallback((action: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (!process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY) {
        reject(new Error('reCAPTCHA site key not found'));
        return;
      }

      if (typeof window === 'undefined' || !window.grecaptcha) {
        reject(new Error('reCAPTCHA not loaded'));
        return;
      }

      window.grecaptcha.enterprise.ready(() => {
        window.grecaptcha.enterprise
          .execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!, {
            action,
          })
          .then(resolve)
          .catch(reject);
      });
    });
  }, []);

  return { executeRecaptcha };
};
