import { GooeyText } from '@/components/ui/gooey-text-morphing';
import { cn } from '@/lib/utils';

export type HeroSectionProps = {
  className?: string;
};

export const HeroSection = ({ className }: HeroSectionProps) => {
  return (
    <>
      <section
        id="HeroSection"
        data-component="HeroSection"
        className={cn(
          'relative min-h-screen bg-[#383838] text-white',
          className
        )}
      >
        {/* Main content container */}
        <div className="relative w-full h-screen flex">
          {/* Left side - Text content */}
          <div className="flex-1 flex items-center justify-center w-full">
            <div className="w-full">
              <div className="mb-8">
                <GooeyText
                  texts={[
                    'Creative Web Developer',
                    'Innovative Web Design',
                    'Modern Solutions',
                    'Digital Experiences',
                  ]}
                  morphTime={1.5}
                  cooldownTime={2}
                  className="h-32 lg:h-40"
                  textClassName="text-7xl lg:text-8xl font-light leading-[0.9] text-white"
                />
              </div>
              <p className="flex-1 flex items-center justify-center text-gray-300 text-base leading-relaxed">
                Your brand deserves more than a
                <br />
                cookie cutter website. It deserves an
                <br />
                exceptional digital experience.
              </p>
            </div>
          </div>
        </div>

        {/* Scroll indicator - bottom left with arrow */}
        <div className="absolute bottom-20 left-20">
          <div className="flex items-center gap-3 text-sm text-gray-400 uppercase tracking-wider">
            <span>Scroll to explore</span>
            <div className="flex items-center">
              <div className="w-12 h-px bg-gray-400"></div>
              <div className="w-0 h-0 border-l-4 border-l-gray-400 border-t-2 border-t-transparent border-b-2 border-b-transparent ml-1"></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
