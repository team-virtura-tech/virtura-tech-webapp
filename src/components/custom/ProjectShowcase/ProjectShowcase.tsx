'use client';

import { cn } from '@/lib/utils';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { useLayoutEffect, useRef } from 'react';
import { Projects } from './Projects';

// Register GSAP plugin once per module
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * ProjectShowcase – Curtain Reveal (Bottom → Top)
 *
 * Requirements implemented:
 * 1) Starts immediately after InnovationSection ends.
 * 2) Curtain is CLOSED initially and OPENS bottom→top (hard edge).
 * 3) Classic pin for exactly 1 viewport height (smooth scrub).
 * 4) Uses GSAP + ScrollTrigger for buttery pinning.
 * 5) Section is empty, full-bleed, bg-[#383838].
 * 7) Reduced-motion: instant reveal (no pin, no animation).
 * 9) Hard edge (no gradients, no blur).
 * 10) Content postponed – just the reveal container.
 */

export type ProjectShowcaseProps = {
  className?: string;
  /**
   * Optional: make the reveal longer/shorter. 1 === classic (100% of viewport).
   * For now we keep classic behavior as requested.
   */
  pinMultiplier?: number; // e.g., 1 = 100% viewport scroll distance
  /**
   * Color of the curtain (what covers the section). Defaults to black.
   */
  curtainColor?: string;
};

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({
  className,
  pinMultiplier = 1,
  curtainColor = '#383838', // Gray curtain to match the revealed background
}) => {
  const containerRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const curtainRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const reduce = prefersReducedMotion();
    const container = containerRef.current;
    const stage = stageRef.current;
    const curtain = curtainRef.current;

    if (!container || !stage || !curtain) return;

    if (reduce) {
      // Instant reveal, no pin or animation
      gsap.set(curtain, { scaleY: 0 });
      return;
    }

    // Reset any inline styles (hot reload safety)
    gsap.set(curtain, { transformOrigin: 'bottom center', scaleY: 1 });

    const st = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: `+=${Math.max(0.5, pinMultiplier) * 100}%`, // classic = 100% of viewport
      scrub: true,
      pin: stage,
      anticipatePin: 1,
    });

    const tl = gsap.timeline({ scrollTrigger: st });

    // Curtain opens bottom→top: scaleY 1 → 0 with origin at bottom
    tl.to(curtain, {
      scaleY: 0,
      ease: 'none', // direct mapping to scroll for a hard, precise reveal
    });

    // Cleanup on unmount
    return () => {
      tl.kill();
      st.kill();
    };
  }, [pinMultiplier]);

  return (
    // Outer wrapper provides the scroll distance. Height is 100vh (classic),
    // because ScrollTrigger pins the stage for the specified distance.
    <section
      ref={containerRef}
      id="ProjectShowcase"
      data-component="ProjectShowcase"
      className={cn('relative w-full bg-[#383838] z-20', className)}
      // No fixed height here; ScrollTrigger controls the scroll distance
    >
      {/* Sticky/pinned stage for the duration of the reveal */}
      <div ref={stageRef} className="relative w-full overflow-hidden">
        {/* Revealed surface */}
        <div className="absolute inset-0 h-full w-full bg-[#383838]" />
        {/* Curtain layer (hard edge). Initially closed (scaleY:1), opens upward. */}
        <div
          ref={curtainRef}
          aria-hidden
          className="absolute inset-0 h-full w-full z-10"
          style={{
            backgroundColor: curtainColor,
            transformOrigin: 'bottom center',
          }}
        />
        <Projects />
        {/* (Optional) Placeholder for future content overlay if needed */}
        {/* <div className="relative z-20 h-full w-full" /> */}
      </div>
    </section>
  );
};

export default ProjectShowcase;
