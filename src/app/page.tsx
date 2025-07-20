import CTASection from '@/components/CTASection';
import HeroSection from '@/components/HeroSection';
import ServicesPreviewSection from '@/components/ServicesPreviewSection';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800">
      <HeroSection />
      <ServicesPreviewSection />
      <CTASection />
    </main>
  );
}
