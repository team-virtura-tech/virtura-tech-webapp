'use client';

import { cn } from '@/lib/utils';
import { ProcessCard } from './ProcessCard';

const PROCESS_STEPS = [
  {
    number: '1',
    title: 'Plan',
    subtitle: 'Discovery & Strategy',
    description:
      'Define goals, audience, and scope. Map features and success metrics to finalize timeline and pricing.',
  },
  {
    number: '2',
    title: 'Design',
    subtitle: 'UX & UI',
    description:
      'Build sitemap, wireframes, and visual design. Create interactive mockups with colors, typography, and components.',
  },
  {
    number: '3',
    title: 'Build',
    subtitle: 'Development',
    description:
      'Set up components, CMS, and data sources. Implement responsive layouts, animations, and integrate APIs.',
  },
  {
    number: '4',
    title: 'Launch',
    subtitle: 'Testing & Deployment',
    description:
      'Test performance, SEO, and mobile responsiveness. Connect domain, SSL, and analytics for production launch.',
  },
];

export type ProcessSectionProps = {
  className?: string;
};
// bg-[#D9D9D9]
export const ProcessSection = ({ className }: ProcessSectionProps) => {
  return (
    <section
      id="ProcessSection"
      data-component="ProcessSection"
      className={cn(
        'relative  bg-muted-foreground z-20 min-h-screen mx-auto w-full px-4 py-16 md:px-6 md:py-24 lg:py-32',
        className
      )}
    >
      {/* Decorative header */}
      <div className="mb-16 md:mb-20 lg:mb-40">
        <div className="relative mx-auto flex max-w-5xl items-center justify-center">
          <div
            className="absolute inset-0 flex items-center"
            aria-hidden="true"
          >
            <div className="w-full border-t border-muted-foreground"></div>
          </div>
          <p className="relative bg-[#D9D9D9] px-4 font-serif text-sm italic text-muted-foreground md:text-base">
            Our Process, Explained
          </p>
        </div>
        <h2 className="mt-6 text-center text-3xl font-medium text-foreground md:text-4xl lg:text-5xl">
          Here&apos;s how it works
        </h2>
      </div>

      {/* Process cards grid */}
      <div className="mx-auto max-w-[100rem]">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-3 lg:grid-cols-4 lg:gap-4">
          {PROCESS_STEPS.map((step, index) => (
            <ProcessCard
              key={step.number}
              {...step}
              isElevated={index === 1 || index === 3}
              animationDelay={index * 150}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
