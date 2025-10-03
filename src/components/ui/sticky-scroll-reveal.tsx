'use client';
import { cn } from '@/lib/utils';
import { motion, useMotionValueEvent, useScroll } from 'motion/react';
import React, { useEffect, useMemo, useRef, useState } from 'react';

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: {
    title: string;
    description: string;
    content?: React.ReactNode;
  }[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    // uncomment line 22 and comment line 23 if you DONT want the overflow container and want to have it change on the entire page scroll
    // target: ref
    container: ref,
    offset: ['start start', 'end start'],
  });
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0
    );
    setActiveCard(closestBreakpointIndex);
  });

  const backgroundColors = useMemo(
    () => [
      '#0f172a', // slate-900
      '#000000', // black
      '#171717', // neutral-900
    ],
    []
  );

  const linearGradients = useMemo(
    () => [
      'linear-gradient(to bottom right, #06b6d4, #10b981)', // cyan-500 to emerald-500
      'linear-gradient(to bottom right, #ec4899, #6366f1)', // pink-500 to indigo-500
      'linear-gradient(to bottom right, #f97316, #eab308)', // orange-500 to yellow-500
    ],
    []
  );

  const [backgroundGradient, setBackgroundGradient] = useState(
    linearGradients[0]
  );

  useEffect(() => {
    setBackgroundGradient(linearGradients[activeCard % linearGradients.length]);
  }, [activeCard, linearGradients]);

  return (
    <motion.div
      animate={{
        backgroundColor: backgroundColors[activeCard % backgroundColors.length],
      }}
      className="relative flex h-screen justify-center space-x-12 overflow-y-auto p-10 md:space-x-16 lg:space-x-20"
      ref={ref}
    >
      <div className="relative flex items-start px-4 md:px-6">
        <div className="max-w-3xl">
          {content.map((item, index) => (
            <div key={item.title + index} className="my-32 md:my-40 lg:my-48">
              <motion.h2
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                className="text-3xl font-bold text-slate-100 md:text-4xl lg:text-5xl"
              >
                {item.title}
              </motion.h2>
              <motion.p
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300 md:mt-8 md:text-xl lg:text-2xl lg:leading-relaxed"
              >
                {item.description}
              </motion.p>
            </div>
          ))}
          <div className="h-96" />
        </div>
      </div>
      <div
        style={{ background: backgroundGradient }}
        className={cn(
          'sticky top-10 hidden h-80 w-96 overflow-hidden rounded-xl bg-white shadow-2xl md:h-96 md:w-[28rem] lg:block lg:h-[32rem] lg:w-[36rem]',
          contentClassName
        )}
      >
        {content[activeCard].content ?? null}
      </div>
    </motion.div>
  );
};
