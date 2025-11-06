'use client';

import { useReducedMotion } from 'framer-motion';
import { useCallback } from 'react';

declare global {
  interface Window {
    lenis?: {
      scrollTo: (
        target: string | number | HTMLElement,
        options?: { offset?: number; duration?: number }
      ) => void;
      stop: () => void;
      start: () => void;
    };
  }
}

export const useLenisScroll = () => {
  const reduceMotion = useReducedMotion();

  const scrollToElement = useCallback(
    (
      elementId: string,
      options: {
        offset?: number;
        duration?: number;
        immediate?: boolean;
      } = {}
    ) => {
      const { offset = 0, duration = 1.2, immediate = false } = options;

      if (reduceMotion || immediate) {
        // Use native scrolling for reduced motion
        const element = document.getElementById(elementId);
        if (element) {
          element.scrollIntoView({ behavior: 'auto', block: 'start' });
        }
        return;
      }

      // Use Lenis for smooth scrolling
      if (window.lenis) {
        window.lenis.scrollTo(`#${elementId}`, {
          offset: -offset,
          duration,
        });
      } else {
        // Fallback to native smooth scrolling
        const element = document.getElementById(elementId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    },
    [reduceMotion]
  );

  const scrollToTop = useCallback(
    (duration: number = 1.2) => {
      if (reduceMotion) {
        window.scrollTo({ top: 0, behavior: 'auto' });
        return;
      }

      if (window.lenis) {
        window.lenis.scrollTo(0, { duration });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    [reduceMotion]
  );

  const scrollToPosition = useCallback(
    (position: number, duration: number = 1.2) => {
      if (reduceMotion) {
        window.scrollTo({ top: position, behavior: 'auto' });
        return;
      }

      if (window.lenis) {
        window.lenis.scrollTo(position, { duration });
      } else {
        window.scrollTo({ top: position, behavior: 'smooth' });
      }
    },
    [reduceMotion]
  );

  const stopScroll = useCallback(() => {
    if (window.lenis) {
      window.lenis.stop();
    }
  }, []);

  const startScroll = useCallback(() => {
    if (window.lenis) {
      window.lenis.start();
    }
  }, []);

  return {
    scrollToElement,
    scrollToTop,
    scrollToPosition,
    stopScroll,
    startScroll,
    reduceMotion,
  };
};
