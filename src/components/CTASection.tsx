import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const CTASection = () => {
  return (
    <section className="py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to start your project?
          </h2>
          <p className="text-muted-foreground mt-6 text-lg leading-8">
            Let&apos;s discuss how we can help transform your ideas into
            powerful digital solutions.
          </p>
          <div className="mt-8">
            <Button asChild size="lg" className="rounded-full">
              <Link href="/contact" className="flex items-center space-x-2">
                <span>Get Started Today</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
