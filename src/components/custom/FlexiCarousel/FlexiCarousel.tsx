'use client';

import { cn } from '@/lib/utils';
import { motion, useReducedMotion } from 'framer-motion';
import { IconType } from 'react-icons';

export type CarouselItem = {
  logo: IconType;
  text: string;
};

export type FlexiCarouselProps = {
  items: CarouselItem[];
  className?: string;
  id?: string;
  speed?: number; // Duration for one complete scroll cycle in seconds
};

export const FlexiCarousel = ({
  items,
  className,
  id,
  speed = 9,
}: FlexiCarouselProps) => {
  const reduceMotion = useReducedMotion();
  const componentName = 'FlexiCarousel';
  const rootId = id ?? componentName;

  // Don't render if no items
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
        <div className="flex items-center gap-2">
          <item.logo className="text-lg" />
          <span className="text-lg font-medium whitespace-nowrap">
            {item.text}
          </span>
        </div>
      </div>
    );
  }

  // Create duplicated items for seamless loop
  const duplicatedItems = [...items, ...items];

  return (
    <div
      id={rootId}
      data-component={componentName}
      className={cn(
        'relative h-full w-full overflow-hidden flex items-center',
        className
      )}
    >
      <motion.div
        className="flex items-center gap-4 whitespace-nowrap"
        initial={{ x: '0%' }}
        animate={{ x: '-50%' }}
        transition={{
          duration: speed,
          ease: 'linear',
          repeat: Infinity,
        }}
      >
        {duplicatedItems.map((item, index) => (
          <div key={index} className="flex items-center gap-2 flex-shrink-0">
            <item.logo className="text-lg" />
            <span className="text-lg font-medium">{item.text}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};
