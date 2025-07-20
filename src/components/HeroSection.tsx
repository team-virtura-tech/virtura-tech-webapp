import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden pt-20 pb-24 sm:pt-32 sm:pb-32">
      {/* Background decorative elements */}
      <div className="bg-muted/20 absolute inset-0" />
      <div
        className="absolute top-0 left-1/2 -z-10 -translate-x-1/2 blur-3xl xl:-top-6"
        aria-hidden="true"
      >
        <div
          className="bg-primary/20 aspect-[1155/678] w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="bg-secondary text-secondary-foreground ring-border mb-8 inline-flex items-center rounded-full px-6 py-2 text-sm font-medium ring-1">
            <span className="bg-primary mr-2 h-2 w-2 rounded-full" />
            Software Development
          </div>

          {/* Main heading */}
          <h1 className="text-foreground mb-6 text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            Build Your Digital Future
            <br />
            <span className="text-primary">with Modern Technology</span>
          </h1>

          {/* Description */}
          <p className="text-muted-foreground mx-auto mb-10 max-w-2xl text-lg leading-8 sm:text-xl">
            We create stunning web applications, mobile apps, and custom
            software solutions
            <br />
            that drive your business forward.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="rounded-full">
              <Link href="/contact" className="flex items-center space-x-2">
                <span>Start Your Project</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full"
            >
              <Link href="/portfolio" className="flex items-center space-x-2">
                <span>View Our Work</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 opacity-30">
        <div className="bg-primary/20 h-72 w-72 rounded-full blur-3xl" />
      </div>
      <div className="absolute top-1/4 right-0 opacity-20">
        <div className="bg-primary/10 h-96 w-96 rounded-full blur-3xl" />
      </div>
    </section>
  );
};

export default HeroSection;
