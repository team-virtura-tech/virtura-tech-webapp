'use client';

import Link from 'next/link';
import { useState } from 'react';
import { DottedBackground } from './DottedBackground';

const footerLinks = {
  navigate: [
    { label: 'Home', href: '/' },
    { label: 'Showcase', href: '/showcase' },
  ],
  services: [{ label: 'Contact', href: '/contact-us' }],
};

const CopyIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
  </svg>
);

const CopySuccessIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export function Footer() {
  const [copiedField, setCopiedField] = useState<'email' | 'phone' | null>(
    null
  );

  const handleCopy = (text: string, field: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

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

          {/* Contact Info Section */}
          <div className="mb-16 md:mb-20">
            <h3 className="mb-8 text-xs font-bold uppercase tracking-[0.2em] text-white/40">
              Get in Touch
            </h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Email */}
              <div
                className="group cursor-pointer rounded-lg border border-white/10 bg-white/5 p-6 transition-all hover:border-white/30 hover:bg-white/10"
                onClick={() =>
                  handleCopy('team.virturatech@gmail.com', 'email')
                }
              >
                <p className="mb-3 text-xs uppercase tracking-wider text-white/40">
                  Direct Email
                </p>
                <div className="flex items-center justify-between">
                  <p className="font-mono text-base text-white/90 md:text-lg lg:text-xl">
                    team.virturatech@gmail.com
                  </p>
                  <button
                    className="ml-4 rounded-md p-2 text-white/60 transition-colors group-hover:text-white"
                    aria-label="Copy email"
                  >
                    {copiedField === 'email' ? (
                      <CopySuccessIcon />
                    ) : (
                      <CopyIcon />
                    )}
                  </button>
                </div>
              </div>

              {/* Phone */}
              <div
                className="group cursor-pointer rounded-lg border border-white/10 bg-white/5 p-6 transition-all hover:border-white/30 hover:bg-white/10"
                onClick={() => handleCopy('+15104588787', 'phone')}
              >
                <p className="mb-3 text-xs uppercase tracking-wider text-white/40">
                  Direct Phone
                </p>
                <div className="flex items-center justify-between">
                  <p className="font-mono text-base text-white/90 md:text-lg lg:text-xl">
                    +1 (510)-458-8787
                  </p>
                  <button
                    className="ml-4 rounded-md p-2 text-white/60 transition-colors group-hover:text-white"
                    aria-label="Copy phone number"
                  >
                    {copiedField === 'phone' ? (
                      <CopySuccessIcon />
                    ) : (
                      <CopyIcon />
                    )}
                  </button>
                </div>
              </div>
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
