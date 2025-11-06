'use client';

import { useReducedMotion } from 'framer-motion';
import Lenis from 'lenis';
import { useEffect, useRef } from 'react';

type LenisSmoothScrollProps = {
  children: React.ReactNode;
};

export const LenisSmoothScroll = ({ children }: LenisSmoothScrollProps) => {
  const lenisRef = useRef<Lenis | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    // Don't initialize Lenis if user prefers reduced motion
    if (reduceMotion) return;

    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Expose Lenis to global window for hook usage
    window.lenis = lenis;

    // RAF loop for Lenis
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Cleanup
    return () => {
      lenis.destroy();
      lenisRef.current = null;
      delete window.lenis;
    };
  }, [reduceMotion]);

  return <>{children}</>;
};
