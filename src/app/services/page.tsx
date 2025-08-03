import CTASection from '@/components/CTASection';
import ProcessSection from '@/components/services/ProcessSection';
import ServicesHero from '@/components/services/ServicesHero';
import ServicesList from '@/components/services/ServicesList';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Services | VirturaTech',
  description:
    'Explore our comprehensive range of software development services including web development, mobile apps, cloud solutions, and digital transformation.',
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800">
      <ServicesHero />
      <ServicesList />
      <ProcessSection />
      <CTASection />
    </main>
  );
}
