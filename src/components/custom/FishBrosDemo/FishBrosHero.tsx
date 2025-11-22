'use client';

import { cn } from '@/lib/utils';

export type FishBrosHeroProps = {
  className?: string;
};

export const FishBrosHero = ({ className }: FishBrosHeroProps) => {
  return (
    <section
      id="FishBrosHero"
      data-component="FishBrosHero"
      className={cn('relative h-screen w-full', className)}
    >
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source
          src="/videos/istockphoto-1311164774-640_adpp_is.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center md:px-6">
        {/* Main Header */}
        <h1 className="max-w-4xl text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
          Explore Our Broad Range of Captivating Tropical Fish Species
        </h1>

        {/* Subheader */}
        <p className="mt-4 max-w-2xl text-lg text-white/90 md:mt-6 md:text-xl lg:text-2xl">
          Your journey to the perfect aquarium begins here
        </p>

        {/* CTAs */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row md:mt-10">
          <button className="rounded-full bg-white px-8 py-4 text-base font-medium text-black transition-all hover:bg-white/90 md:text-lg">
            Tropical Community Fish
          </button>
          <button className="rounded-full border-2 border-white bg-transparent px-8 py-4 text-base font-medium text-white transition-all hover:bg-white/10 md:text-lg">
            Shrimps & Snails
          </button>
        </div>
      </div>
    </section>
  );
};
