'use client';

import { SiGithub } from '@icons-pack/react-simple-icons';
import { Linkedin } from 'lucide-react';
import Link from 'next/link';

export function ContactHero() {
  return (
    <section className="bg-primary/5 py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-foreground text-4xl font-bold tracking-tight sm:text-5xl">
            Get in Touch
          </h1>
          <p className="text-muted-foreground mt-6 text-lg leading-8">
            Ready to start your next project? We&apos;d love to hear from you.
            Our team is here to help bring your vision to life.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="https://github.com/team-virtura-tech"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <SiGithub className="h-6 w-6" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link
              href="https://linkedin.com/company/virtura-tech"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Linkedin className="h-6 w-6" />
              <span className="sr-only">LinkedIn</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
