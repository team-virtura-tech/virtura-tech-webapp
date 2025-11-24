import { ContactButton } from '@/components/custom/ContactButton';
import { ShowcaseCard } from '@/components/custom/ShowcaseCard';
import { GooeyText } from '@/components/ui/gooey-text-morphing';
import { showcaseItems } from '@/lib/showcase-data';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Showcase | Virtura Tech',
  description: 'Explore our portfolio of projects and client success stories.',
};

export default function ShowcasePage() {
  return (
    <main
      id="ShowcasePage"
      data-component="ShowcasePage"
      className="min-h-screen bg-background"
    >
      <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32">
        <div className="mb-12 flex min-h-[120px] items-center justify-center md:mb-16 md:min-h-[160px] lg:mb-20 lg:min-h-[200px]">
          <GooeyText
            texts={[
              'Made With Intention',
              'Designed With Heart',
              'Built With Care',
            ]}
            morphTime={1.5}
            cooldownTime={1}
            textClassName="text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight whitespace-nowrap"
          />
        </div>

        {/* Showcase Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {showcaseItems.map((item) => (
            <ShowcaseCard key={item.id} item={item} />
          ))}
        </div>
      </div>
      <ContactButton />
    </main>
  );
}
