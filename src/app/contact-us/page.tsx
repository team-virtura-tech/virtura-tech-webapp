'use client';

import { Globe } from '@/components/ui/globe';
import { useToasts } from '@/components/ui/toast';
import { useRecaptcha } from '@/hooks/useRecaptcha';
import { motion } from 'framer-motion';
import { useCallback, useState } from 'react';

// All Icons are from https://app.iconsax.io/

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
  const [copiedField, setCopiedField] = useState<'email' | 'phone' | null>(
    null
  );
  const { executeRecaptcha } = useRecaptcha();
  const toasts = useToasts();

  // Format phone number as (XXX) XXX-XXXX
  const formatPhoneNumber = (value: string) => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, '');

    // Limit to 10 digits
    const limited = digits.slice(0, 10);

    // Format as (XXX) XXX-XXXX
    if (limited.length === 0) return '';
    if (limited.length <= 3) return `(${limited}`;
    if (limited.length <= 6)
      return `(${limited.slice(0, 3)}) ${limited.slice(3)}`;
    return `(${limited.slice(0, 3)}) ${limited.slice(3, 6)}-${limited.slice(6)}`;
  };

  const budgetOptions = ['$1,200-2,500', '$2,500-5,000', '$5,000+'];
  const interestOptions = [
    'Web Development',
    'SEO Optimization',
    'E-commerce',
    'Landing Pages',
    'Full Redesign',
  ];

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePhoneChange = (value: string) => {
    const formatted = formatPhoneNumber(value);
    setFormData((prev) => ({ ...prev, phone: formatted }));
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

  // Validate required fields
  const isFormValid =
    formData.firstName.trim() !== '' &&
    formData.lastName.trim() !== '' &&
    formData.email.trim() !== '' &&
    (formData.phone.trim() !== '' || formData.email.trim() !== '') &&
    formData.goal.trim() !== '';

  // Handle form submission with reCAPTCHA
  const handleFormSubmit = useCallback(async () => {
    // Validate required fields
    if (!formData.firstName.trim()) {
      toasts.error('Please enter your first name.');
      return;
    }
    if (!formData.lastName.trim()) {
      toasts.error('Please enter your last name.');
      return;
    }
    if (!formData.email.trim()) {
      toasts.error('Please enter your email address.');
      return;
    }
    if (!formData.goal.trim()) {
      toasts.error('Please describe your goal.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Execute reCAPTCHA
      const token = await executeRecaptcha('contact_form_submit');

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

      toasts.success('Thank you! Your message has been sent successfully.');

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
      toasts.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, executeRecaptcha, toasts]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission will be handled by the submit button
  };

  const handleCopy = (text: string, field: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <main
      id="ContactUs"
      data-component="ContactUsPage"
      className="relative w-full overflow-hidden bg-background text-foreground"
    >
      {/* Hero Section with Globe */}
      <section className="relative flex min-h-screen w-full items-center py-16 md:py-24">
        {/* Globe Background */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="h-[600px] w-[600px]">
            <Globe className="opacity-40" />
          </div>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-8">
          {/* Let's Talk Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 flex items-center justify-center gap-4 text-sm uppercase tracking-widest text-muted-foreground"
          >
            <div className="h-px w-16 bg-border md:w-32"></div>
            <span>Let&apos;s Talk</span>
            <div className="h-px w-16 bg-border md:w-32"></div>
          </motion.div>

          {/* Contact Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-4 text-center font-serif text-6xl font-light uppercase tracking-tight md:text-7xl lg:text-8xl xl:text-9xl"
          >
            Contact
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-16 text-center text-base text-muted-foreground md:text-lg"
          >
            Join 50+ satisfied clients. Response within 24 hours guaranteed.
          </motion.p>

          {/* Feature Cards - 2x2 mobile/tablet, 1 row desktop */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-16 grid grid-cols-2 gap-6 lg:grid-cols-4"
          >
            {/* Fast Delivery Card */}
            <div className="group rounded-lg border border-border/30 bg-background/10 p-6 backdrop-blur-xs transition-all hover:border-foreground/40 hover:bg-background/20">
              <div className="mb-4 text-3xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <g clipPath="url(#clip0_4418_9835)">
                    <path
                      d="M6.08998 13.2809H9.17998V20.4809C9.17998 22.1609 10.09 22.5009 11.2 21.2409L18.77 12.6409C19.7 11.5909 19.31 10.7209 17.9 10.7209H14.81V3.52087C14.81 1.84087 13.9 1.50087 12.79 2.76087L5.21998 11.3609C4.29998 12.4209 4.68998 13.2809 6.08998 13.2809Z"
                      stroke="#252422"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_4418_9835">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Fast Delivery</h3>
              <p className="text-sm text-muted-foreground">4-6 weeks</p>
            </div>

            {/* 100% Guarantee Card */}
            <div className="group rounded-lg border border-border/30 bg-background/10 p-6 backdrop-blur-xs transition-all hover:border-foreground/40 hover:bg-background/20">
              <div className="mb-4 text-3xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <g clipPath="url(#clip0_4418_9535)">
                    <path
                      d="M10.49 2.23055L5.50003 4.11055C4.35003 4.54055 3.41003 5.90055 3.41003 7.12055V14.5505C3.41003 15.7305 4.19003 17.2805 5.14003 17.9905L9.44003 21.2005C10.85 22.2605 13.17 22.2605 14.58 21.2005L18.88 17.9905C19.83 17.2805 20.61 15.7305 20.61 14.5505V7.12055C20.61 5.89055 19.67 4.53055 18.52 4.10055L13.53 2.23055C12.68 1.92055 11.32 1.92055 10.49 2.23055Z"
                      stroke="#252422"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_4418_9535">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">100% Guarantee</h3>
              <p className="text-sm text-muted-foreground">Money back</p>
            </div>

            {/* SEO Card */}
            <div className="group rounded-lg border border-border/30 bg-background/10 p-6 backdrop-blur-xs transition-all hover:border-foreground/40 hover:bg-background/20">
              <div className="mb-4 text-3xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="text-foreground"
                >
                  <g clipPath="url(#clip0_4418_7633)">
                    <path
                      d="M6.87988 18.9001C6.46988 18.9001 6.12988 18.5601 6.12988 18.1501V16.0801C6.12988 15.6701 6.46988 15.3301 6.87988 15.3301C7.28988 15.3301 7.62988 15.6701 7.62988 16.0801V18.1501C7.62988 18.5701 7.28988 18.9001 6.87988 18.9001Z"
                      fill="currentColor"
                    />
                    <path
                      d="M12 18.9C11.59 18.9 11.25 18.56 11.25 18.15V14C11.25 13.59 11.59 13.25 12 13.25C12.41 13.25 12.75 13.59 12.75 14V18.15C12.75 18.57 12.41 18.9 12 18.9Z"
                      fill="currentColor"
                    />
                    <path
                      d="M17.1201 18.8997C16.7101 18.8997 16.3701 18.5597 16.3701 18.1497V11.9297C16.3701 11.5197 16.7101 11.1797 17.1201 11.1797C17.5301 11.1797 17.8701 11.5197 17.8701 11.9297V18.1497C17.8701 18.5697 17.5401 18.8997 17.1201 18.8997Z"
                      fill="currentColor"
                    />
                    <path
                      d="M6.88007 13.1794C6.54007 13.1794 6.24007 12.9494 6.15007 12.6094C6.05007 12.2094 6.29007 11.7994 6.70007 11.6994C10.3801 10.7794 13.6201 8.76943 16.0901 5.89943L16.5501 5.35943C16.8201 5.04943 17.2901 5.00943 17.6101 5.27943C17.9201 5.54943 17.9601 6.01943 17.6901 6.33943L17.2301 6.87943C14.5601 9.99943 11.0401 12.1694 7.06007 13.1594C7.00007 13.1794 6.94007 13.1794 6.88007 13.1794Z"
                      fill="currentColor"
                    />
                    <path
                      d="M17.1199 9.51961C16.7099 9.51961 16.3699 9.17961 16.3699 8.76961V6.59961H14.1899C13.7799 6.59961 13.4399 6.25961 13.4399 5.84961C13.4399 5.43961 13.7799 5.09961 14.1899 5.09961H17.1199C17.5299 5.09961 17.8699 5.43961 17.8699 5.84961V8.77961C17.8699 9.18961 17.5399 9.51961 17.1199 9.51961Z"
                      fill="currentColor"
                    />
                    <path
                      d="M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H15C20.43 1.25 22.75 3.57 22.75 9V15C22.75 20.43 20.43 22.75 15 22.75ZM9 2.75C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V9C21.25 4.39 19.61 2.75 15 2.75H9Z"
                      fill="currentColor"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_4418_7633">
                      <rect width="24" height="24" fill="currentColor" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">SEO</h3>
              <p className="text-sm text-muted-foreground">Rank higher</p>
            </div>

            {/* Performance Card */}
            <div className="group rounded-lg border border-border/30 bg-background/10 p-6 backdrop-blur-xs transition-all hover:border-foreground/40 hover:bg-background/20">
              <div className="mb-4 text-3xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="text-foreground"
                >
                  <g clipPath="url(#clip0_4418_8842)">
                    <path
                      d="M22 22.75H5C2.93 22.75 1.25 21.07 1.25 19V2C1.25 1.59 1.59 1.25 2 1.25C2.41 1.25 2.75 1.59 2.75 2V19C2.75 20.24 3.76 21.25 5 21.25H22C22.41 21.25 22.75 21.59 22.75 22C22.75 22.41 22.41 22.75 22 22.75Z"
                      fill="currentColor"
                    />
                    <path
                      d="M5.00007 17.7498C4.83007 17.7498 4.65007 17.6898 4.51007 17.5698C4.20007 17.2998 4.16007 16.8298 4.43007 16.5098L9.02007 11.1498C9.52007 10.5698 10.2401 10.2198 11.0001 10.1898C11.7601 10.1698 12.5101 10.4498 13.0501 10.9898L14.0001 11.9398C14.2501 12.1898 14.5701 12.3098 14.9301 12.3098C15.2801 12.2998 15.6001 12.1398 15.8301 11.8698L20.4201 6.50982C20.6901 6.19982 21.1601 6.15982 21.4801 6.42982C21.7901 6.69982 21.8301 7.16982 21.5601 7.48982L16.9701 12.8498C16.4701 13.4298 15.7501 13.7798 14.9901 13.8098C14.2201 13.8298 13.4801 13.5498 12.9401 13.0098L12.0001 12.0598C11.7501 11.8098 11.4201 11.6798 11.0701 11.6898C10.7201 11.6998 10.4001 11.8598 10.1701 12.1298L5.58007 17.4898C5.42007 17.6598 5.21007 17.7498 5.00007 17.7498Z"
                      fill="currentColor"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_4418_8842">
                      <rect width="24" height="24" fill="currentColor" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Performance</h3>
              <p className="text-sm text-muted-foreground">Optimized</p>
            </div>
          </motion.div>

          {/* Divider Line */}
          <div className="mb-12 h-px w-full bg-border"></div>

          {/* Direct Email Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mx-auto max-w-2xl space-y-6"
          >
            <p className="mb-4 text-sm uppercase tracking-wider text-muted-foreground">
              Direct Email
            </p>
            <div
              className="flex cursor-pointer items-center justify-between rounded-lg border border-border bg-card p-6 transition-all hover:border-foreground"
              onClick={() => handleCopy('team.virturatech@gmail.com', 'email')}
            >
              <div>
                <p className="text-xl font-mono md:text-2xl">
                  team.virturatech@gmail.com
                </p>
              </div>
              <button
                className="rounded-md p-3 transition-colors cursor-pointer"
                aria-label="Copy email"
              >
                {copiedField === 'email' ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="text-green-500"
                  >
                    <g clipPath="url(#clip0_4418_8372)">
                      <path
                        d="M17.1 2H12.9C9.81693 2 8.37099 3.09409 8.06975 5.73901C8.00673 6.29235 8.465 6.75 9.02191 6.75H11.1C15.3 6.75 17.25 8.7 17.25 12.9V14.9781C17.25 15.535 17.7077 15.9933 18.261 15.9303C20.9059 15.629 22 14.1831 22 11.1V6.9C22 3.4 20.6 2 17.1 2Z"
                        fill="currentColor"
                      />
                      <path
                        d="M11.1 8H6.9C3.4 8 2 9.4 2 12.9V17.1C2 20.6 3.4 22 6.9 22H11.1C14.6 22 16 20.6 16 17.1V12.9C16 9.4 14.6 8 11.1 8ZM12.29 13.65L8.58 17.36C8.44 17.5 8.26 17.57 8.07 17.57C7.88 17.57 7.7 17.5 7.56 17.36L5.7 15.5C5.42 15.22 5.42 14.77 5.7 14.49C5.98 14.21 6.43 14.21 6.71 14.49L8.06 15.84L11.27 12.63C11.55 12.35 12 12.35 12.28 12.63C12.56 12.91 12.57 13.37 12.29 13.65Z"
                        fill="currentColor"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_4418_8372">
                        <rect width="24" height="24" fill="currentColor" />
                      </clipPath>
                    </defs>
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="text-foreground"
                  >
                    <g clipPath="url(#clip0_4418_9596)">
                      <path
                        d="M16 12.9V17.1C16 20.6 14.6 22 11.1 22H6.9C3.4 22 2 20.6 2 17.1V12.9C2 9.4 3.4 8 6.9 8H11.1C14.6 8 16 9.4 16 12.9Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M22 6.9V11.1C22 14.6 20.6 16 17.1 16H16V12.9C16 9.4 14.6 8 11.1 8H8V6.9C8 3.4 9.4 2 12.9 2H17.1C20.6 2 22 3.4 22 6.9Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_4418_9596">
                        <rect width="24" height="24" fill="currentColor" />
                      </clipPath>
                    </defs>
                  </svg>
                )}
              </button>
            </div>

            {/* Phone Number Section */}
            <p className="mb-4 text-sm uppercase tracking-wider text-muted-foreground">
              Direct Phone
            </p>
            <div
              className="flex cursor-pointer items-center justify-between rounded-lg border border-border bg-card p-6 transition-all hover:border-foreground"
              onClick={() => handleCopy('+15104588787', 'phone')}
            >
              <div>
                <p className="text-xl font-mono md:text-2xl">
                  +1 (510)-458-8787
                </p>
              </div>
              <button
                className="rounded-md p-3 transition-colors cursor-pointer"
                aria-label="Copy phone number"
              >
                {copiedField === 'phone' ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="text-green-500"
                  >
                    <g clipPath="url(#clip0_4418_8372_phone)">
                      <path
                        d="M17.1 2H12.9C9.81693 2 8.37099 3.09409 8.06975 5.73901C8.00673 6.29235 8.465 6.75 9.02191 6.75H11.1C15.3 6.75 17.25 8.7 17.25 12.9V14.9781C17.25 15.535 17.7077 15.9933 18.261 15.9303C20.9059 15.629 22 14.1831 22 11.1V6.9C22 3.4 20.6 2 17.1 2Z"
                        fill="currentColor"
                      />
                      <path
                        d="M11.1 8H6.9C3.4 8 2 9.4 2 12.9V17.1C2 20.6 3.4 22 6.9 22H11.1C14.6 22 16 20.6 16 17.1V12.9C16 9.4 14.6 8 11.1 8ZM12.29 13.65L8.58 17.36C8.44 17.5 8.26 17.57 8.07 17.57C7.88 17.57 7.7 17.5 7.56 17.36L5.7 15.5C5.42 15.22 5.42 14.77 5.7 14.49C5.98 14.21 6.43 14.21 6.71 14.49L8.06 15.84L11.27 12.63C11.55 12.35 12 12.35 12.28 12.63C12.56 12.91 12.57 13.37 12.29 13.65Z"
                        fill="currentColor"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_4418_8372_phone">
                        <rect width="24" height="24" fill="currentColor" />
                      </clipPath>
                    </defs>
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="text-foreground"
                  >
                    <g clipPath="url(#clip0_4418_9596_phone)">
                      <path
                        d="M16 12.9V17.1C16 20.6 14.6 22 11.1 22H6.9C3.4 22 2 20.6 2 17.1V12.9C2 9.4 3.4 8 6.9 8H11.1C14.6 8 16 9.4 16 12.9Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M22 6.9V11.1C22 14.6 20.6 16 17.1 16H16V12.9C16 9.4 14.6 8 11.1 8H8V6.9C8 3.4 9.4 2 12.9 2H17.1C20.6 2 22 3.4 22 6.9Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_4418_9596_phone">
                        <rect width="24" height="24" fill="currentColor" />
                      </clipPath>
                    </defs>
                  </svg>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Form Section - 2 Column Layout */}
      <section className="relative min-h-screen w-full py-16 md:py-24">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 px-6 md:px-8 lg:grid-cols-2 lg:gap-16">
          {/* Left Column - Tagline */}
          <div className="flex items-start justify-center lg:justify-start">
            <div className="max-w-md">
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-3xl font-light leading-tight md:text-4xl lg:text-5xl"
              >
                LET&apos;S TALK ABOUT YOUR FUTURE
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="mt-8 space-y-4 text-gray-400"
              >
                <p className="text-lg">CONTACT US</p>
              </motion.div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-12">
              {/* Name Fields */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="space-y-3"
              >
                <span className="block text-base font-light md:text-lg">
                  My name is <span className="text-red-500">*</span>
                </span>
                <div className="flex flex-col gap-4 md:flex-row md:gap-6">
                  <input
                    type="text"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={(e) =>
                      handleInputChange('firstName', e.target.value)
                    }
                    className="w-full border-b border-gray-600 bg-transparent pb-2 text-base placeholder-gray-500 focus:border-white focus:outline-none md:text-lg"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={(e) =>
                      handleInputChange('lastName', e.target.value)
                    }
                    className="w-full border-b border-gray-600 bg-transparent pb-2 text-base placeholder-gray-500 focus:border-white focus:outline-none md:text-lg"
                  />
                </div>
              </motion.div>

              {/* Company Field */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-3"
              >
                <span className="block text-base font-light md:text-lg">
                  I represent
                </span>
                <input
                  type="text"
                  placeholder="Company name"
                  value={formData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  className="w-full border-b border-gray-600 bg-transparent pb-2 text-base placeholder-gray-500 focus:border-white focus:outline-none md:text-lg"
                />
              </motion.div>

              {/* Contact Fields */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-3"
              >
                <span className="block text-base font-light md:text-lg">
                  You can reach me at <span className="text-red-500">*</span>
                </span>
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-4">
                  <input
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="flex-1 border-b border-gray-600 bg-transparent pb-2 text-base placeholder-gray-500 focus:border-white focus:outline-none md:text-lg"
                  />
                  <span className="text-sm text-gray-400 md:text-base">or</span>
                  <input
                    type="tel"
                    placeholder="(555) 123-4567"
                    value={formData.phone}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    className="flex-1 border-b border-gray-600 bg-transparent pb-2 text-base placeholder-gray-500 focus:border-white focus:outline-none md:text-lg"
                  />
                </div>
              </motion.div>

              {/* Budget Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-4"
              >
                <span className="block text-base font-light md:text-lg">
                  My budget is:
                </span>
                <div className="flex flex-col gap-3 md:flex-row md:gap-4">
                  {budgetOptions.map((budget) => (
                    <button
                      key={budget}
                      type="button"
                      onClick={() => handleBudgetSelect(budget)}
                      className={`rounded-none border px-4 py-2.5 text-sm transition-colors md:px-6 md:py-3 md:text-base ${
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
                className="space-y-4"
              >
                <span className="block text-base font-light md:text-lg">
                  I am primarily interested in
                </span>
                <div className="flex flex-wrap gap-3 md:gap-4">
                  {interestOptions.map((interest) => (
                    <button
                      key={interest}
                      type="button"
                      onClick={() => handleInterestToggle(interest)}
                      className={`rounded-none border px-4 py-2.5 text-sm transition-colors md:px-6 md:py-3 md:text-base ${
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
                className="space-y-3"
              >
                <span className="block text-base font-light md:text-lg">
                  My goal is to <span className="text-red-500">*</span>
                </span>
                <textarea
                  placeholder="Please tell me more about your project"
                  value={formData.goal}
                  onChange={(e) => handleInputChange('goal', e.target.value)}
                  rows={4}
                  className="w-full border-b border-gray-600 bg-transparent pb-2 text-base placeholder-gray-500 focus:border-white focus:outline-none md:text-lg"
                />
              </motion.div>

              {/* Submit Button */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 }}
                className="flex flex-col items-center gap-4 pt-4 md:items-end"
              >
                <button
                  type="button"
                  className="group flex h-28 w-28 items-center justify-center rounded-full border border-gray-600 text-base font-light transition-all hover:bg-primary hover:text-black disabled:cursor-not-allowed disabled:opacity-50 md:h-32 md:w-32 md:text-lg"
                  disabled={isSubmitting || !isFormValid}
                  onClick={handleFormSubmit}
                >
                  {isSubmitting ? (
                    <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-400 border-t-white md:h-8 md:w-8" />
                  ) : (
                    <>
                      {/* <span className="mr-2">send</span> */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <g clipPath="url(#clip0_4418_9420)">
                          <path
                            d="M12 8V2L10 4"
                            stroke="#252422"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M12 2L14 4"
                            stroke="#252422"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M7 12C3 12 3 13.79 3 16V17C3 19.76 3 22 8 22H16C20 22 21 19.76 21 17V16C21 13.79 21 12 17 12C16 12 15.72 12.21 15.2 12.6L14.18 13.68C13 14.94 11 14.94 9.81 13.68L8.8 12.6C8.28 12.21 8 12 7 12Z"
                            stroke="#252422"
                            strokeWidth="1.5"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M5 11.9991V9.99906C5 7.98906 5 6.32906 8 6.03906"
                            stroke="#252422"
                            strokeWidth="1.5"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M19 11.9991V9.99906C19 7.98906 19 6.32906 16 6.03906"
                            stroke="#252422"
                            strokeWidth="1.5"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_4418_9420">
                            <rect width="24" height="24" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </>
                  )}
                </button>
              </motion.div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
