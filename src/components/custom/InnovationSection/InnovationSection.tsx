'use client';

import { cn } from '@/lib/utils';
import { motion, useReducedMotion } from 'framer-motion';

import { TargetCursor } from '../TargetCursor';
import { AnimatedStat } from './AnimatedStat';

export type InnovationSectionProps = {
  className?: string;
  videoSrc?: string;
};

export const InnovationSection = ({
  className,
  videoSrc = '/placeholder-video.mp4',
}: InnovationSectionProps) => {
  const reduce = useReducedMotion();

  const industryTags = [
    'Gaming',
    'E-Learning',
    'Social Platforms',
    'Fintech',
    'Healthcare',
    'Web3',
    'Real Estate',
    'SaaS',
    'E-Commerce',
  ];

  const stats = [
    { number: 150, suffix: '+', label: 'team members' },
    { number: 500, suffix: '+', label: 'completed projects' },
    { number: 19, suffix: ' Years', label: 'in the business' },
  ];

  return (
    <section
      id="InnovationSection"
      data-component="InnovationSection"
      className={cn(
        'relative bg-white text-gray-900 py-16 md:py-24 lg:py-32 min-h-screen',
        className
      )}
    >
      <div className="mx-auto w-full max-w-screen-2xl px-4 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-5 lg:gap-20 xl:gap-24 items-center">
          {/* Left side - Content */}
          <motion.div
            initial={reduce ? false : { opacity: 0, x: -20 }}
            whileInView={reduce ? {} : { opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="space-y-16 lg:space-y-20 lg:col-span-3"
          >
            {/* Main heading */}
            <h2 className="text-4xl font-light leading-tight md:text-5xl lg:text-5xl xl:text-5xl">
              We are committed to finding{' '}
              <span className="font-normal">innovative and unconventional</span>{' '}
              solutions. Pushing boundaries to{' '}
              <span className="font-normal">exceed client goals.</span>
            </h2>

            {/* Industry tags */}
            <div className="flex flex-wrap gap-4 lg:gap-6">
              {industryTags.map((tag, index) => (
                <motion.span
                  key={tag}
                  initial={reduce ? false : { opacity: 0, y: 10 }}
                  whileInView={reduce ? {} : { opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: reduce ? 0 : index * 0.05,
                    ease: 'easeOut',
                  }}
                  className="cursor-target rounded-full border border-gray-300 px-6 py-3 text-sm text-gray-600 transition-colors hover:border-gray-900 hover:text-gray-900 lg:px-8 lg:py-4 lg:text-base"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
            <TargetCursor targetSelector="#InnovationSection .cursor-target" />

            {/* Statistics */}
            <div className="grid grid-cols-3 gap-8 lg:gap-12">
              {stats.map((stat, index) => (
                <AnimatedStat
                  key={stat.label}
                  number={stat.number}
                  suffix={stat.suffix}
                  label={stat.label}
                  index={index}
                />
              ))}
            </div>
          </motion.div>

          {/* Right side - Video */}
          <motion.div
            initial={reduce ? false : { opacity: 0, x: 20 }}
            whileInView={reduce ? {} : { opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
            className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-gray-100 lg:col-span-2"
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full object-cover"
            >
              <source src={videoSrc} type="video/mp4" />
              {/* Fallback content */}
              <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                <div className="text-center space-y-4">
                  <div className="text-4xl">🎬</div>
                  <p className="text-gray-600">Video not available</p>
                </div>
              </div>
            </video>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
