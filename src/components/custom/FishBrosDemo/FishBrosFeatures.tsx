'use client';

import { cn } from '@/lib/utils';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Palette,
  Shield,
  ShoppingCart,
  Smartphone,
  TrendingUp,
  Zap,
} from 'lucide-react';

export type FishBrosFeaturesProps = {
  className?: string;
};

type Feature = {
  icon: React.ElementType;
  title: string;
  description: string;
};

const features: Feature[] = [
  {
    icon: ShoppingCart,
    title: 'Seamless Shopping',
    description:
      'Intuitive cart system with real-time inventory updates and smooth checkout flow.',
  },
  {
    icon: Smartphone,
    title: 'Mobile-First Design',
    description:
      'Optimized for all devices with responsive layouts that adapt perfectly to any screen size.',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description:
      'Built with Next.js for optimal performance, delivering sub-second page loads.',
  },
  {
    icon: Shield,
    title: 'Secure Payments',
    description:
      'Integrated payment gateway with PCI compliance and fraud protection.',
  },
  {
    icon: TrendingUp,
    title: 'Analytics Ready',
    description:
      'Built-in tracking and analytics to monitor user behavior and drive data-driven decisions.',
  },
  {
    icon: Palette,
    title: 'Custom Branding',
    description:
      'Fully branded experience with custom design system and cohesive visual identity.',
  },
];

export const FishBrosFeatures = ({ className }: FishBrosFeaturesProps) => {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="FishBrosFeatures"
      data-component="FishBrosFeatures"
      className={cn('relative px-4 py-20 md:px-6 md:py-32 lg:px-8', className)}
    >
      <div className="mx-auto w-full max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={reduceMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            Key Features
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-foreground/60 md:text-lg">
            Everything you need to run a successful online fish shop, built with
            modern web technologies.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={reduceMotion ? {} : { opacity: 0, y: 20 }}
                whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  duration: 0.5,
                  delay: reduceMotion ? 0 : index * 0.1,
                }}
                className="group relative rounded-2xl border border-foreground/10 bg-background p-6 transition-all hover:border-foreground/20 hover:shadow-lg md:p-8"
              >
                {/* Icon */}
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-110">
                  <Icon className="h-6 w-6" />
                </div>

                {/* Content */}
                <h3 className="mb-2 text-lg font-semibold text-foreground md:text-xl">
                  {feature.title}
                </h3>
                <p className="text-sm text-foreground/60 md:text-base">
                  {feature.description}
                </p>

                {/* Hover Effect */}
                <div className="pointer-events-none absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
