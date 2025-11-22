'use client';

import fishAnimation from '@/../../public/icons/fish/doodle-outline-518-fish-hover-pinch.json';
import { motion, useReducedMotion } from 'framer-motion';
import Lottie from 'lottie-react';
import { useEffect, useState } from 'react';

export type FishSwimTransitionProps = {
  onTransitionComplete?: () => void;
  duration?: number;
};

type Fish = {
  id: number;
  delay: number;
  x: number;
  scale: number;
};

export const FishSwimTransition = ({
  onTransitionComplete,
  duration = 1.4,
}: FishSwimTransitionProps) => {
  const [fishGroups, setFishGroups] = useState<Fish[]>([]);
  const reduceMotion = useReducedMotion();

  // Handle reduced motion case
  useEffect(() => {
    if (reduceMotion) {
      const timeout = setTimeout(() => {
        onTransitionComplete?.();
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [reduceMotion, onTransitionComplete]);

  useEffect(() => {
    // Generate 100 fish with varying delays, positions, and sizes
    const totalFish = 100;
    const groups = 10; // Number of groups
    const fishPerGroup = totalFish / groups;

    const generatedFish: Fish[] = [];

    for (let i = 0; i < totalFish; i++) {
      const groupIndex = Math.floor(i / fishPerGroup);
      generatedFish.push({
        id: i,
        // Stagger delays across groups (0 to 0.6s)
        delay: groupIndex * 0.06 + Math.random() * 0.1,
        // Random horizontal position
        x: Math.random() * 100,
        // Varying sizes (50% to 100%)
        scale: 0.5 + Math.random() * 0.5,
      });
    }

    setFishGroups(generatedFish);

    // Complete transition after all fish swim up
    const timeout = setTimeout(
      () => {
        onTransitionComplete?.();
      },
      (duration + 0.6) * 1000
    ); // Max delay + duration

    return () => clearTimeout(timeout);
  }, [duration, onTransitionComplete]);

  if (reduceMotion) {
    return null;
  }

  return (
    <div
      id="FishSwimTransition"
      data-component="FishSwimTransition"
      className="pointer-events-none fixed inset-0 z-[110] overflow-hidden"
    >
      {fishGroups.map((fish) => (
        <motion.div
          key={fish.id}
          initial={{
            y: '100vh',
            x: `${fish.x}vw`,
            opacity: 1,
            scale: fish.scale,
          }}
          animate={{
            y: '-20vh',
            opacity: [1, 1, 0],
          }}
          transition={{
            duration,
            delay: fish.delay,
            ease: 'easeInOut',
            opacity: {
              times: [0, 0.9, 1],
              duration,
            },
          }}
          className="absolute"
          style={{
            width: '80px',
            height: '80px',
          }}
        >
          <Lottie
            animationData={fishAnimation}
            loop={true}
            autoplay={true}
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        </motion.div>
      ))}
    </div>
  );
};
