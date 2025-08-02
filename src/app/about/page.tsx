import MissionSection from '@/components/about/MissionSection';
import TeamSection from '@/components/about/TeamSection';
import TechStackSection from '@/components/about/TechStackSection';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | VirturaTech',
  description:
    'Learn about VirturaTech - Our mission, values, and expertise in delivering cutting-edge software solutions.',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-6xl">
            Crafting Digital Excellence
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            We are passionate about creating innovative software solutions that
            drive business growth and user satisfaction.
          </p>
        </div>
      </section>

      {/* Main content sections */}
      <MissionSection />
      <TechStackSection />
      <TeamSection />
    </main>
  );
}
