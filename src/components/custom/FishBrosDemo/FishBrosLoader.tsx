'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

export type FishBrosLoaderProps = {
  onProgressComplete?: () => void;
  duration?: number;
};

export const FishBrosLoader = ({
  duration = 2500,
  onProgressComplete,
}: FishBrosLoaderProps) => {
  const [progress, setProgress] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, duration / 50);

    return () => clearInterval(interval);
  }, [duration]);

  useEffect(() => {
    if (progress === 100) {
      // Trigger fish animation
      if (onProgressComplete) {
        onProgressComplete();
      }
    }
  }, [progress, onProgressComplete]);

  return (
    <AnimatePresence>
      <motion.div
        initial={reduceMotion ? {} : { opacity: 1 }}
        exit={reduceMotion ? {} : { opacity: 0 }}
        transition={{ duration: 0.5 }}
        id="FishBrosLoader"
        data-component="FishBrosLoader"
        className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
      >
        <div className="flex flex-col items-center gap-8 px-4">
          {/* Animated Fish Logo */}
          <motion.div
            initial={reduceMotion ? {} : { scale: 0.8, opacity: 0 }}
            animate={
              reduceMotion
                ? {}
                : {
                    scale: 1,
                    opacity: 1,
                  }
            }
            transition={{
              duration: 0.6,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="relative"
          >
            {/* Fish Icon with Wave Animation */}
            <motion.div
              animate={
                reduceMotion
                  ? {}
                  : {
                      y: [0, -10, 0],
                    }
              }
              transition={
                reduceMotion
                  ? {}
                  : {
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }
              }
              className="relative"
            >
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
                <span className="text-6xl" role="img" aria-label="Fish">
                  🐟
                </span>
              </div>

              {/* Ripple Effect */}
              <motion.div
                initial={{ scale: 1, opacity: 0.5 }}
                animate={{ scale: 1.8, opacity: 0 }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeOut',
                }}
                className="absolute inset-0 rounded-full border-2 border-primary"
              />
              <motion.div
                initial={{ scale: 1, opacity: 0.5 }}
                animate={{ scale: 1.8, opacity: 0 }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeOut',
                  delay: 0.5,
                }}
                className="absolute inset-0 rounded-full border-2 border-primary"
              />
            </motion.div>
          </motion.div>

          {/* Brand Text */}
          <motion.div
            initial={reduceMotion ? {} : { opacity: 0, y: 10 }}
            animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center"
          >
            <h1 className="text-2xl font-bold text-foreground md:text-3xl">
              Fish Bros Shop
            </h1>
            <p className="mt-2 text-sm text-foreground/60 md:text-base">
              Loading your experience...
            </p>
          </motion.div>

          {/* Progress Bar */}
          <motion.div
            initial={reduceMotion ? {} : { opacity: 0, y: 10 }}
            animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-full max-w-xs"
          >
            <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-foreground/10">
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="h-full rounded-full bg-gradient-to-r from-primary to-primary/60"
              />
            </div>

            {/* Percentage */}
            <motion.p
              initial={reduceMotion ? {} : { opacity: 0 }}
              animate={reduceMotion ? {} : { opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="mt-3 text-center text-xs font-medium text-foreground/60"
            >
              {progress}%
            </motion.p>
          </motion.div>

          {/* Loading Dots */}
          <motion.div
            initial={reduceMotion ? {} : { opacity: 0 }}
            animate={reduceMotion ? {} : { opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex gap-2"
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={
                  reduceMotion
                    ? {}
                    : {
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 1, 0.3],
                      }
                }
                transition={
                  reduceMotion
                    ? {}
                    : {
                        duration: 1,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }
                }
                className="h-2 w-2 rounded-full bg-primary"
              />
            ))}
          </motion.div>
        </div>

        {/* Background Gradient */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <motion.div
            animate={
              reduceMotion
                ? {}
                : {
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }
            }
            transition={
              reduceMotion
                ? {}
                : {
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }
            }
            className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]"
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
