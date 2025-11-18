'use client';

import { cn } from '@/lib/utils';
import { motion, useReducedMotion } from 'framer-motion';

export type ProcessCardProps = {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  isElevated?: boolean;
  initialRotate?: number;
  initialX?: number;
  initialY?: number;
};

export const ProcessCard = ({
  number,
  title,
  subtitle,
  description,
  isElevated = false,
  initialRotate = 0,
  initialX = 0,
  initialY = 0,
}: ProcessCardProps) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.article
      data-component="ProcessCard"
      initial={
        shouldReduceMotion
          ? false
          : {
              opacity: 0,
              rotate: initialRotate,
              x: initialX,
              y: initialY,
            }
      }
      whileInView={
        shouldReduceMotion
          ? {}
          : {
              opacity: 1,
              rotate: 0,
              x: 0,
              y: 0,
            }
      }
      viewport={{ once: true, margin: '-100px' }}
      transition={{
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1], // smooth easeInOut
        delay: 0.3, // delay in seconds before animation starts
      }}
      style={{
        backgroundColor: 'oklch(0.362 0.008 75)',
        borderColor: 'oklch(0.362 0.008 75)',
      }}
      className={cn(
        'relative flex flex-col justify-between rounded-[32px] border-[6px] p-8 shadow-[0_2px_8px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.06)] transition-all hover:shadow-[0_4px_12px_rgba(0,0,0,0.06),0_12px_32px_rgba(0,0,0,0.08)] md:p-10 lg:p-12',
        // Taller aspect ratio to match the reference screenshots
        'min-h-[300px] md:min-h-[400px] lg:min-h-[450px]',
        // Stagger cards 2 & 4 upward
        isElevated && 'lg:-translate-y-16'
      )}
    >
      {/* Big number */}
      <div>
        <span className="text-6xl font-light text-white md:text-7xl lg:text-8xl">
          {number}
        </span>
      </div>

      {/* Content at bottom */}
      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-white md:text-2xl">
          {title}
        </h3>
        <p className="text-sm font-medium text-white/70 md:text-base">
          {subtitle}
        </p>
        <p className="text-sm leading-relaxed text-white/70 md:text-base">
          {description}
        </p>
      </div>
    </motion.article>
  );
};
