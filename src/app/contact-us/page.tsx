'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

declare global {
  interface Window {
    onSubmit?: (token: string) => void;
    grecaptcha?: {
      enterprise: {
        execute: (
          siteKey: string,
          options: { action: string }
        ) => Promise<string>;
        ready: (callback: () => void) => void;
      };
      getPageId: () => string;
    };
  }
}

type FormData = {
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  phone: string;
  budget: string;
  interests: string[];
  goal: string;
};

export default function ContactUsPage() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    company: '',
    email: '',
    phone: '',
    budget: '',
    interests: [],
    goal: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [siteKey, setSiteKey] = useState<string>('');

  const budgetOptions = ['$1,200-2,500', '$2,500-5,000', '$5,000+'];
  const interestOptions = [
    'Beauty',
    'Cosmetics',
    'Ecommerce',
    'Food & Beverage',
    'Product',
  ];

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleBudgetSelect = (budget: string) => {
    setFormData((prev) => ({ ...prev, budget }));
  };

  const handleInterestToggle = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  // Add callback function to handle reCAPTCHA response (following HTML button pattern)
  const handleRecaptchaSubmit = useCallback(
    async (token: string) => {
      setIsSubmitting(true);
      setSubmitMessage('');

      try {
        // Prepare form data with reCAPTCHA token
        const submissionData = {
          ...formData,
          recaptchaToken: token,
        };

        // Submit to API endpoint
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(submissionData),
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || 'Failed to submit form');
        }

        setSubmitMessage('Thank you! Your message has been sent successfully.');

        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          company: '',
          email: '',
          phone: '',
          budget: '',
          interests: [],
          goal: '',
        });
      } catch {
        setSubmitMessage('Something went wrong. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData]
  );

  // Set site key on client side to avoid hydration mismatch
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '';
    setSiteKey(key);
  }, []);

  // Make the callback function available globally for reCAPTCHA
  useEffect(() => {
    // Add global callback function for reCAPTCHA
    window.onSubmit = handleRecaptchaSubmit;

    return () => {
      delete window.onSubmit;
    };
  }, [handleRecaptchaSubmit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission will be handled by reCAPTCHA button callback
  };

  return (
    <main
      id="ContactUs"
      data-component="ContactUsPage"
      className="min-h-screen w-full bg-black text-white"
    >
      <div className="mx-auto w-full max-w-4xl px-6 py-16 md:px-8 md:py-24">
        {/* Header */}
        <div className="mb-16 flex items-start justify-between">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-light leading-tight md:text-5xl lg:text-6xl"
          >
            Let&apos;s start a conversation
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="hidden text-sm text-gray-400 md:block"
          >
            - contact me
          </motion.div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-12">
          {/* Name Fields */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col gap-4 md:flex-row md:items-center md:gap-8"
          >
            <span className="text-lg font-light md:text-xl">My name is</span>
            <div className="flex flex-col gap-4 md:flex-row md:gap-6">
              <input
                type="text"
                placeholder="First Name"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                className="border-b border-gray-600 bg-transparent pb-2 text-lg placeholder-gray-500 focus:border-white focus:outline-none md:text-xl"
              />
              <input
                type="text"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                className="border-b border-gray-600 bg-transparent pb-2 text-lg placeholder-gray-500 focus:border-white focus:outline-none md:text-xl"
              />
            </div>
          </motion.div>

          {/* Company Field */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col gap-4 md:flex-row md:items-center md:gap-8"
          >
            <span className="text-lg font-light md:text-xl">
              The brand I am looking to photograph is
            </span>
            <input
              type="text"
              placeholder="Company name"
              value={formData.company}
              onChange={(e) => handleInputChange('company', e.target.value)}
              className="border-b border-gray-600 bg-transparent pb-2 text-lg placeholder-gray-500 focus:border-white focus:outline-none md:text-xl"
            />
          </motion.div>

          {/* Contact Fields */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col gap-4 md:flex-row md:items-center md:gap-8"
          >
            <span className="text-lg font-light md:text-xl">
              You can reach me at
            </span>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
              <input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="border-b border-gray-600 bg-transparent pb-2 text-lg placeholder-gray-500 focus:border-white focus:outline-none md:text-xl"
              />
              <span className="text-gray-400">or</span>
              <input
                type="tel"
                placeholder="Your phone"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="border-b border-gray-600 bg-transparent pb-2 text-lg placeholder-gray-500 focus:border-white focus:outline-none md:text-xl"
              />
            </div>
          </motion.div>

          {/* Budget Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            <span className="block text-lg font-light md:text-xl">
              My budget is:
            </span>
            <div className="flex flex-col gap-4 md:flex-row md:gap-6">
              {budgetOptions.map((budget) => (
                <button
                  key={budget}
                  type="button"
                  onClick={() => handleBudgetSelect(budget)}
                  className={`rounded-none border px-6 py-3 text-lg transition-colors md:px-8 md:py-4 md:text-xl ${
                    formData.budget === budget
                      ? 'border-white bg-white text-black'
                      : 'border-gray-600 hover:border-white'
                  }`}
                >
                  {budget}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Interests Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-6"
          >
            <span className="block text-lg font-light md:text-xl">
              I am primarily interested in
            </span>
            <div className="flex flex-wrap gap-4 md:gap-6">
              {interestOptions.map((interest) => (
                <button
                  key={interest}
                  type="button"
                  onClick={() => handleInterestToggle(interest)}
                  className={`rounded-none border px-6 py-3 text-lg transition-colors md:px-8 md:py-4 md:text-xl ${
                    formData.interests.includes(interest)
                      ? 'border-white bg-white text-black'
                      : 'border-gray-600 hover:border-white'
                  }`}
                >
                  {interest}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Goal Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col gap-4 md:flex-row md:items-start md:gap-8"
          >
            <span className="text-lg font-light md:text-xl">My goal is to</span>
            <textarea
              placeholder="Please tell me more about your project"
              value={formData.goal}
              onChange={(e) => handleInputChange('goal', e.target.value)}
              rows={4}
              className="flex-1 border-b border-gray-600 bg-transparent pb-2 text-lg placeholder-gray-500 focus:border-white focus:outline-none md:text-xl"
            />
          </motion.div>

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col items-center gap-4 pt-8 md:items-end"
          >
            {siteKey ? (
              <button
                className="g-recaptcha group flex h-32 w-32 items-center justify-center rounded-full border border-gray-600 text-lg font-light transition-all hover:border-white hover:bg-white hover:text-black disabled:opacity-50 disabled:cursor-not-allowed md:h-40 md:w-40 md:text-xl"
                data-sitekey={siteKey}
                data-callback="onSubmit"
                data-action="contact_form_submit"
                disabled={isSubmitting}
                onClick={async () => {
                  try {
                    if (window.grecaptcha && window.grecaptcha.enterprise) {
                      const token = await window.grecaptcha.enterprise.execute(
                        siteKey,
                        {
                          action: 'contact_form_submit',
                        }
                      );
                      if (window.onSubmit) {
                        window.onSubmit(token);
                      }
                    }
                  } catch {
                    // Silent fail - reCAPTCHA issues will be handled by the API
                  }
                }} // Manual execution
              >
                {isSubmitting ? (
                  <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-400 border-t-white md:h-8 md:w-8" />
                ) : (
                  <>
                    <span className="mr-2">send</span>
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1 md:h-6 md:w-6" />
                  </>
                )}
              </button>
            ) : (
              <button
                type="submit"
                className="group flex h-32 w-32 items-center justify-center rounded-full border border-gray-600 text-lg font-light transition-all hover:border-white hover:bg-white hover:text-black disabled:opacity-50 disabled:cursor-not-allowed md:h-40 md:w-40 md:text-xl"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-400 border-t-white md:h-8 md:w-8" />
                ) : (
                  <>
                    <span className="mr-2">send</span>
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1 md:h-6 md:w-6" />
                  </>
                )}
              </button>
            )}

            {/* Success/Error Message */}
            {submitMessage && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`text-center text-sm md:text-base ${
                  submitMessage.includes('success')
                    ? 'text-green-400'
                    : 'text-red-400'
                }`}
              >
                {submitMessage}
              </motion.div>
            )}
          </motion.div>
        </form>
      </div>
    </main>
  );
}
