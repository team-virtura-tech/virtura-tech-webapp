import { useToasts } from '@/components/ui/toast';
import { useRecaptcha } from '@/hooks/useRecaptcha';
import { motion } from 'framer-motion';
import { useCallback, useState } from 'react';

import { BudgetSelector } from './BudgetSelector';
import { FormField } from './FormField';
import { InterestSelector } from './InterestSelector';
import { SubmitButton } from './SubmitButton';

export type FormData = {
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  phone: string;
  budget: string;
  interests: string[];
  goal: string;
};

export type ContactFormProps = {
  id?: string;
  className?: string;
};

const budgetOptions = ['$1,200-2,500', '$2,500-5,000', '$5,000+'];
const interestOptions = [
  'Web Development',
  'SEO Optimization',
  'E-commerce',
  'Landing Pages',
  'Full Redesign',
];

// Format phone number as (XXX) XXX-XXXX
const formatPhoneNumber = (value: string) => {
  const digits = value.replace(/\D/g, '');
  const limited = digits.slice(0, 10);

  if (limited.length === 0) return '';
  if (limited.length <= 3) return `(${limited}`;
  if (limited.length <= 6)
    return `(${limited.slice(0, 3)}) ${limited.slice(3)}`;
  return `(${limited.slice(0, 3)}) ${limited.slice(3, 6)}-${limited.slice(6)}`;
};

export const ContactForm = ({ id, className }: ContactFormProps) => {
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
  const { executeRecaptcha } = useRecaptcha();
  const toasts = useToasts();
  const componentName = 'ContactForm';

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

  const isFormValid =
    formData.firstName.trim() !== '' &&
    formData.lastName.trim() !== '' &&
    formData.email.trim() !== '' &&
    formData.goal.trim() !== '';

  const handleFormSubmit = useCallback(async () => {
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
      const token = await executeRecaptcha('contact_form_submit');

      const submissionData = {
        ...formData,
        recaptchaToken: token,
      };

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
  };

  return (
    <section
      id={id ?? componentName}
      data-component={componentName}
      className={`relative min-h-screen w-full py-16 md:py-24 ${className || ''}`}
    >
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
              className="mt-8 space-y-4 text-muted-foreground"
            >
              <p className="text-lg">CONTACT US</p>
            </motion.div>
          </div>
        </div>

        {/* Right Column - Form */}
        <div>
          <form onSubmit={handleSubmit} className="space-y-12">
            {/* Name Fields */}
            <FormField label="My name is" required delay={0.1}>
              <div className="flex flex-col gap-4 md:flex-row md:gap-6">
                <input
                  type="text"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={(e) =>
                    handleInputChange('firstName', e.target.value)
                  }
                  className="w-full border-b border-border bg-transparent pb-2 text-base placeholder-muted-foreground focus:border-foreground focus:outline-none md:text-lg"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={(e) =>
                    handleInputChange('lastName', e.target.value)
                  }
                  className="w-full border-b border-border bg-transparent pb-2 text-base placeholder-muted-foreground focus:border-foreground focus:outline-none md:text-lg"
                />
              </div>
            </FormField>

            {/* Company Field */}
            <FormField label="I represent" delay={0.2}>
              <input
                type="text"
                placeholder="Company name"
                value={formData.company}
                onChange={(e) => handleInputChange('company', e.target.value)}
                className="w-full border-b border-border bg-transparent pb-2 text-base placeholder-muted-foreground focus:border-foreground focus:outline-none md:text-lg"
              />
            </FormField>

            {/* Contact Fields */}
            <FormField label="You can reach me at" required delay={0.3}>
              <input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
                className="w-full border-b border-border bg-transparent pb-2 text-base placeholder-muted-foreground focus:border-foreground focus:outline-none md:text-lg"
              />
            </FormField>

            {/* Phone Field (Optional) */}
            <FormField label="Phone" delay={0.35}>
              <input
                type="tel"
                placeholder="(555) 123-4567"
                value={formData.phone}
                onChange={(e) => handlePhoneChange(e.target.value)}
                className="w-full border-b border-border bg-transparent pb-2 text-base placeholder-muted-foreground focus:border-foreground focus:outline-none md:text-lg"
              />
            </FormField>

            {/* Budget Section */}
            <BudgetSelector
              options={budgetOptions}
              selected={formData.budget}
              onSelect={handleBudgetSelect}
              delay={0.4}
            />

            {/* Interests Section */}
            <InterestSelector
              options={interestOptions}
              selected={formData.interests}
              onToggle={handleInterestToggle}
              delay={0.5}
            />

            {/* Goal Section */}
            <FormField label="My goal is to" required delay={0.6}>
              <textarea
                placeholder="Please tell me more about your project"
                value={formData.goal}
                onChange={(e) => handleInputChange('goal', e.target.value)}
                rows={4}
                className="w-full border-b border-border bg-transparent pb-2 text-base placeholder-muted-foreground focus:border-foreground focus:outline-none md:text-lg"
              />
            </FormField>

            {/* Submit Button */}
            <SubmitButton
              isSubmitting={isSubmitting}
              isDisabled={!isFormValid}
              onClick={handleFormSubmit}
              delay={0.7}
            />
          </form>
        </div>
      </div>
    </section>
  );
};
