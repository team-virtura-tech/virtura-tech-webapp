'use client';

import { useEffect, useRef, useState } from 'react';

import { SlidingNumber } from '@/components/ui/sliding-number';
import { motion, useInView, useReducedMotion } from 'framer-motion';

export type AnimatedStatProps = {
  number: number;
  suffix: string;
  label: string;
  index: number;
};

export const AnimatedStat = ({
  number,
  suffix,
  label,
  index,
}: AnimatedStatProps) => {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const reduce = useReducedMotion();

  useEffect(() => {
    if (isInView) {
      // Add a delay based on index for staggered animation
      const timer = setTimeout(
        () => {
          setDisplayValue(number);
        },
        500 + index * 200
      ); // 500ms initial delay + 200ms between each
      return () => clearTimeout(timer);
    }
  }, [isInView, number, index]);

  return (
    <motion.div
      ref={ref}
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={reduce ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: reduce ? 0 : index * 0.1,
        ease: 'easeOut',
      }}
      className="space-y-3 lg:space-y-4"
    >
      <div className="stat-number text-gray-900 flex items-baseline">
        <SlidingNumber value={displayValue} />
        <span className="ml-1">{suffix}</span>
      </div>
      <div className="text-base text-gray-600 leading-relaxed md:text-lg">
        {label}
      </div>
    </motion.div>
  );
};
