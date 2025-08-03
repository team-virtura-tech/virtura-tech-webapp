import CTASection from '@/components/CTASection';
import PortfolioHero from '@/components/portfolio/PortfolioHero';
import ProjectsGrid from '@/components/portfolio/ProjectsGrid';
import TechnologyStack from '@/components/portfolio/TechnologyStack';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portfolio | VirturaTech',
  description:
    'Explore our successful projects and digital solutions. See how we help businesses transform their ideas into reality.',
};

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800">
      <PortfolioHero />
      <ProjectsGrid />
      <TechnologyStack />
      <CTASection />
    </main>
  );
}
