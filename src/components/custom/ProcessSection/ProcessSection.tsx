'use client';

import { cn } from '@/lib/utils';

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

export const ProcessSection = ({ className }: ProcessSectionProps) => {
  return (
    <section
      id="ProcessSection"
      data-component="ProcessSection"
      className={cn(
        'relative bg-[#D9D9D9] z-20 min-h-screen mx-auto w-full px-4 py-16 md:px-6 md:py-24 lg:py-32',
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
            />
          ))}
        </div>
      </div>
    </section>
  );
};

type ProcessCardProps = {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  isElevated?: boolean;
};

const ProcessCard = ({
  number,
  title,
  subtitle,
  description,
  isElevated = false,
}: ProcessCardProps) => {
  return (
    <article
      data-component="ProcessCard"
      className={cn(
        'relative flex flex-col justify-between rounded-[32px] border-[6px] border-[#D5D5D5] bg-[#FFFFFF] p-8 shadow-[0_2px_8px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.06)] transition-all hover:shadow-[0_4px_12px_rgba(0,0,0,0.06),0_12px_32px_rgba(0,0,0,0.08)] md:p-10 lg:p-12',
        // Taller aspect ratio to match the reference screenshots
        'min-h-[300px] md:min-h-[400px] lg:min-h-[450px]',
        // Stagger cards 2 & 4 upward
        isElevated && 'lg:-translate-y-16'
      )}
    >
      {/* Big number */}
      <div>
        <span className="text-6xl font-light text-foreground md:text-7xl lg:text-8xl">
          {number}
        </span>
      </div>

      {/* Content at bottom */}
      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-foreground md:text-2xl">
          {title}
        </h3>
        <p className="text-sm font-medium text-muted-foreground md:text-base">
          {subtitle}
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
          {description}
        </p>
      </div>
    </article>
  );
};
