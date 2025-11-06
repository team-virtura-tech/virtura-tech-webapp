'use client';

import { FlexiCarousel } from '@/components/custom/FlexiCarousel';
import { cn } from '@/lib/utils';
import { FaNodeJs, FaReact } from 'react-icons/fa';
import { SiNextdotjs, SiTailwindcss, SiTypescript } from 'react-icons/si';

export type HeroSectionProps = {
  className?: string;
};

export const HeroSection = ({ className }: HeroSectionProps) => {
  return (
    <>
      <section
        id="HeroSection"
        data-component="HeroSection"
        className={cn('relative min-h-screen bg-primary text-white', className)}
      >
        {/* Main content container */}
        <div className="relative w-full h-screen flex flex-col items-center justify-center">
          {/* Available to work pill */}
          <div className="mb-8 md:mb-12 px-4 md:px-6 py-2 md:py-3 bg-white rounded-full shadow-sm">
            <div className="flex items-center gap-2 text-xs md:text-sm text-foreground font-medium">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Available to work
            </div>
          </div>

          {/* Main Typography Layout */}
          <div className="text-center max-w-6xl mx-auto px-4 md:px-8">
            {/* First Line: Brands + Rectangle + Grow */}
            <div className="flex items-center justify-center gap-3 md:gap-8 mb-2 md:mb-6">
              <h1
                className="text-4xl md:text-8xl lg:text-9xl font-bold"
                style={{ color: 'var(--background)' }}
              >
                Brands
              </h1>
              <div
                className="hero-square bg-white rounded-xl md:rounded-2xl shadow-lg flex items-center justify-center"
                style={{ transform: 'rotate(-2deg)' }}
              >
                <div className="w-10 h-6 md:w-16 md:h-10 bg-gray-100 rounded border-2 border-gray-200"></div>
              </div>
              <h1 className="text-4xl md:text-8xl lg:text-9xl font-bold text-muted-foreground">
                Grow
              </h1>
            </div>

            {/* Second Line: Fast + Rectangle + With us */}
            <div className="flex items-center justify-center gap-3 md:gap-8 mb-8 md:mb-16">
              <h1 className="text-4xl md:text-8xl lg:text-9xl font-bold text-muted-foreground">
                Fast
              </h1>
              <div
                className="hero-square bg-foreground rounded-xl md:rounded-2xl shadow-lg flex items-center justify-center"
                style={{ transform: 'rotate(2deg)' }}
              >
                <FlexiCarousel
                  items={[
                    { logo: FaReact, text: 'React' },
                    { logo: SiNextdotjs, text: 'Next.js' },
                    { logo: SiTypescript, text: 'TypeScript' },
                    { logo: SiTailwindcss, text: 'Tailwind' },
                    { logo: FaNodeJs, text: 'Node.js' },
                  ]}
                  className="text-background"
                />
              </div>
              <h1
                className="text-4xl md:text-8xl lg:text-9xl font-bold"
                style={{ color: 'var(--background)' }}
              >
                With us
              </h1>
            </div>

            {/* Subtitle */}
            <p className="text-sm md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 md:mb-12 leading-relaxed">
              We don&apos;t just make brands pretty — we craft
              <br />
              smart design that fuels real business growth.
            </p>

            {/* CTA Button */}
            <button className="px-6 md:px-8 py-3 md:py-4 bg-foreground text-background font-semibold rounded-full hover:bg-foreground/90 transition-colors duration-200 flex items-center gap-2 md:gap-3 mx-auto text-sm md:text-base">
              <div className="w-5 h-5 md:w-6 md:h-6 bg-white rounded-full flex items-center justify-center">
                <svg
                  className="w-2.5 h-2.5 md:w-3 md:h-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              Book a Meeting
              <svg
                className="w-3.5 h-3.5 md:w-4 md:h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Scroll indicator - bottom left with arrow */}
        <div className="absolute bottom-20 left-20">
          <div className="flex items-center gap-3 text-sm uppercase tracking-wider">
            <span>Scroll to explore</span>
            <div className="flex items-center">
              <div className="w-12 h-px bg-background"></div>
              <div className="w-0 h-0 border-l-4 border-l-background border-t-2 border-t-transparent border-b-2 border-b-transparent ml-1"></div>
            </div>
          </div>
        </div>
        {/*  */}
      </section>
    </>
  );
};
