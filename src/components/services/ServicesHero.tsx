import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function ServicesHero() {
  return (
    <section className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-6xl">
          Transform Your Business
          <span className="text-primary block">With Our Services</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-300">
          We deliver cutting-edge software solutions tailored to your needs.
          From web applications to mobile development, we bring your vision to
          life.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link href="#services">
            <Button className="gap-2">
              Explore Our Services
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="outline">Contact Us</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
