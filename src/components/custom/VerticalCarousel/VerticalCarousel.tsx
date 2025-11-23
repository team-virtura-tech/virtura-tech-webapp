'use client';

import { cn } from '@/lib/utils';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export type VerticalCarouselItem = {
  src: string;
  alt: string;
};

export type VerticalCarouselProps = {
  items: VerticalCarouselItem[];
  className?: string;
  id?: string;
};

export const VerticalCarousel = ({
  items,
  className,
  id,
}: VerticalCarouselProps) => {
  const reduceMotion = useReducedMotion();
  const componentName = 'VerticalCarousel';
  const rootId = id ?? componentName;
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 2500); // Change image every 2 seconds

    return () => clearInterval(interval);
  }, [items.length, reduceMotion]);

  if (!items || items.length === 0) {
    return null;
  }

  // If reduced motion, show static first item
  if (reduceMotion) {
    const item = items[0];
    return (
      <div
        id={rootId}
        data-component={componentName}
        className={cn(
          'flex items-center justify-center h-full w-full',
          className
        )}
      >
        <div className="relative w-12 h-8 md:w-16 md:h-12">
          <Image
            src={item.src}
            alt={item.alt}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 48px, 64px"
          />
        </div>
      </div>
    );
  }

  const currentItem = items[currentIndex];

  return (
    <div
      id={rootId}
      data-component={componentName}
      className={cn(
        'relative h-full w-full overflow-hidden flex items-center justify-center',
        className
      )}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ y: '100%' }}
          animate={{ y: '0%' }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="w-[67px] h-[50.25px] md:w-[144px] md:h-[108px] relative">
            <Image
              src={currentItem.src}
              alt={currentItem.alt}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 67px, 144px"
            />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
