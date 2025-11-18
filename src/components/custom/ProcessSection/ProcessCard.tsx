'use client';

import { useEffect, useRef } from 'react';

import ScrambleIn, {
  ScrambleInHandle,
} from '@/components/fancy/text/scramble-in';
import { cn } from '@/lib/utils';

export type ProcessCardProps = {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  isElevated?: boolean;
  animationDelay?: number;
};

export const ProcessCard = ({
  number,
  title,
  subtitle,
  description,
  isElevated = false,
  animationDelay = 0,
}: ProcessCardProps) => {
  const scrambleRef = useRef<ScrambleInHandle | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      scrambleRef.current?.start();
    }, animationDelay);

    return () => clearTimeout(timer);
  }, [animationDelay]);

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
          <ScrambleIn
            ref={scrambleRef}
            text={description}
            scrambleSpeed={50}
            scrambledLetterCount={5}
            autoStart={false}
            className="text-muted-foreground"
            scrambledClassName="text-muted-foreground/50"
          />
        </p>
      </div>
    </article>
  );
};
