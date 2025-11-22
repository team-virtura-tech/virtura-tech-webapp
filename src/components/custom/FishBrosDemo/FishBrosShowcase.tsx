'use client';

import { cn } from '@/lib/utils';
import { motion, useReducedMotion } from 'framer-motion';

export type FishBrosShowcaseProps = {
  className?: string;
};

export const FishBrosShowcase = ({ className }: FishBrosShowcaseProps) => {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="FishBrosShowcase"
      data-component="FishBrosShowcase"
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
            Visual Showcase
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-foreground/60 md:text-lg">
            A glimpse into the beautiful interface and user experience we
            crafted for Fish Bros Shop.
          </p>
        </motion.div>

        {/* Tech Stack */}
        <motion.div
          initial={reduceMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16 rounded-2xl border border-foreground/10 bg-foreground/5 p-8 backdrop-blur-sm md:p-12"
        >
          <h3 className="mb-6 text-center text-xl font-semibold text-foreground md:text-2xl">
            Technology Stack
          </h3>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-6">
            <div className="flex flex-col items-center rounded-xl bg-background p-4 text-center">
              <div className="mb-2 text-3xl font-bold text-primary">⚛️</div>
              <p className="text-sm font-medium text-foreground md:text-base">
                Next.js 14
              </p>
              <p className="mt-1 text-xs text-foreground/60">Framework</p>
            </div>
            <div className="flex flex-col items-center rounded-xl bg-background p-4 text-center">
              <div className="mb-2 text-3xl font-bold text-primary">🎨</div>
              <p className="text-sm font-medium text-foreground md:text-base">
                Tailwind CSS
              </p>
              <p className="mt-1 text-xs text-foreground/60">Styling</p>
            </div>
            <div className="flex flex-col items-center rounded-xl bg-background p-4 text-center">
              <div className="mb-2 text-3xl font-bold text-primary">📦</div>
              <p className="text-sm font-medium text-foreground md:text-base">
                Stripe
              </p>
              <p className="mt-1 text-xs text-foreground/60">Payments</p>
            </div>
            <div className="flex flex-col items-center rounded-xl bg-background p-4 text-center">
              <div className="mb-2 text-3xl font-bold text-primary">🚀</div>
              <p className="text-sm font-medium text-foreground md:text-base">
                Vercel
              </p>
              <p className="mt-1 text-xs text-foreground/60">Deployment</p>
            </div>
          </div>
        </motion.div>

        {/* Placeholder for Images */}
        <motion.div
          initial={reduceMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="space-y-6 md:space-y-8"
        >
          {/* Main Showcase */}
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/5">
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <div className="mb-4 text-5xl">🐟</div>
                <p className="text-lg font-medium text-foreground">
                  Hero Image Placeholder
                </p>
                <p className="mt-2 text-sm text-foreground/60">
                  Add your Fish Bros Shop screenshots here
                </p>
              </div>
            </div>
          </div>

          {/* Secondary Images Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            <div className="relative aspect-video overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/5">
              <div className="flex h-full items-center justify-center">
                <div className="text-center">
                  <div className="mb-2 text-3xl">🛒</div>
                  <p className="text-sm font-medium text-foreground">
                    Product Page
                  </p>
                </div>
              </div>
            </div>
            <div className="relative aspect-video overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/5">
              <div className="flex h-full items-center justify-center">
                <div className="text-center">
                  <div className="mb-2 text-3xl">💳</div>
                  <p className="text-sm font-medium text-foreground">
                    Checkout Flow
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Results */}
        <motion.div
          initial={reduceMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 rounded-2xl border border-foreground/10 bg-primary/5 p-8 text-center md:p-12"
        >
          <h3 className="mb-4 text-2xl font-bold text-foreground md:text-3xl">
            Results That Matter
          </h3>
          <p className="mx-auto mb-8 max-w-2xl text-base text-foreground/60 md:text-lg">
            Within 3 months of launch, Fish Bros Shop saw significant
            improvements across all key metrics.
          </p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
            <div className="flex flex-col items-center">
              <p className="text-4xl font-bold text-primary md:text-5xl">
                150%
              </p>
              <p className="mt-2 text-sm text-foreground/60 md:text-base">
                Increase in Online Sales
              </p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-4xl font-bold text-primary md:text-5xl">
                2.5x
              </p>
              <p className="mt-2 text-sm text-foreground/60 md:text-base">
                Higher Conversion Rate
              </p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-4xl font-bold text-primary md:text-5xl">40%</p>
              <p className="mt-2 text-sm text-foreground/60 md:text-base">
                Faster Page Load Time
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
