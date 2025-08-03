import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function PortfolioHero() {
  return (
    <section className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-6xl">
          Our Work Speaks
          <span className="text-primary block">For Itself</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-300">
          Discover our portfolio of successful projects where we&apos;ve helped
          businesses transform their digital presence and achieve their goals.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link href="#projects">
            <Button className="gap-2">
              View Projects
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="outline">Start Your Project</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
