'use client';

import Link from 'next/link';
import { DottedBackground } from './DottedBackground';

const footerLinks = {
  navigate: [
    { label: 'Home', href: '/' },
    { label: 'Process', href: '/process' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'About', href: '/about' },
  ],
  services: [
    { label: 'Price', href: '/price' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Contact', href: '/contact-us' },
  ],
};

export function Footer() {
  return (
    <footer
      id="Footer"
      data-component="Footer"
      className="relative w-full overflow-hidden bg-foreground text-white"
    >
      {/* Background animation */}
      <DottedBackground className="pointer-events-none absolute inset-0 h-full w-full" />

      {/* Footer content */}
      <div className="relative z-10 px-4 py-16 md:px-6 md:py-24 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-screen-xl">
          {/* Top section */}
          <div className="mb-16 md:mb-24">
            <h2 className="mb-6 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl xl:text-7xl">
              Made by Marketers,
              <br />
              Engineers and Creatives
            </h2>
            <div className="flex flex-col gap-2 text-lg text-white/60 md:text-xl lg:text-2xl">
              <p>Based in the Bay Area, serving clients worldwide</p>
              <p className="font-medium text-white/80">
                Available for freelance projects
              </p>
            </div>
          </div>

          {/* Links grid */}
          <div className="mb-16 grid grid-cols-1 gap-12 md:mb-20 md:grid-cols-2 md:gap-16 lg:gap-24">
            {/* Navigate */}
            <div>
              <h3 className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-white/40">
                Navigate
              </h3>
              <ul className="space-y-4">
                {footerLinks.navigate.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center text-2xl font-light text-white/90 transition-colors hover:text-white md:text-3xl"
                    >
                      <span className="relative">
                        {link.label}
                        <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-white transition-all duration-300 group-hover:w-full" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-white/40">
                Services
              </h3>
              <ul className="space-y-4">
                {footerLinks.services.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center text-2xl font-light text-white/90 transition-colors hover:text-white md:text-3xl"
                    >
                      <span className="relative">
                        {link.label}
                        <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-white transition-all duration-300 group-hover:w-full" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom section */}
          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
              <p className="text-sm text-white/50">
                © {new Date().getFullYear()} Virtura Tech. All rights reserved
              </p>
              <p className="text-sm font-medium text-white/50">
                Bay Area, CA • Serving Internationally
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
