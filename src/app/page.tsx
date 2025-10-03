import { HeroSection } from '@/components/custom/HeroSection';
import { InnovationSection } from '@/components/custom/InnovationSection';
// import { ProjectShowcase } from '@/components/custom/ProjectShowcase';
import { Projects } from '@/components/custom/ProjectShowcase/Projects';

export default function Home() {
  return (
    <div className="font-sans">
      <main className="relative">
        <HeroSection />
        <InnovationSection />
        <Projects />
        {/* <ProjectShowcase /> */}
      </main>
    </div>
  );
}
