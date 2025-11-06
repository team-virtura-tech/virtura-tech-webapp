'use client';

import { cn } from '@/lib/utils';
import { Mail } from 'lucide-react';
import Link from 'next/link';

export type ContactButtonProps = {
  className?: string;
};

export const ContactButton = ({ className }: ContactButtonProps) => {
  return (
    <div
      id="ContactButton"
      data-component="ContactButton"
      className={cn('fixed right-0 top-1/4 -translate-y-1/2 z-50', className)}
    >
      <Link
        href="/contact-us"
        className="group relative flex flex-col items-center py-4 md:py-6 px-3 md:px-4 rounded-l-xl md:rounded-l-2xl shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:scale-105"
        style={{ backgroundColor: 'var(--background)' }}
      >
        {/* Email Icon */}
        <div className="mb-4 md:mb-6">
          <Mail className="w-5 h-5 md:w-6 md:h-6 text-foreground" />
        </div>

        {/* Contact Us Text - Vertical */}
        <div className="flex flex-col items-center">
          <div className="writing-mode-vertical text-xs font-medium text-foreground/70 tracking-[0.2em] md:tracking-[0.3em] uppercase transform rotate-180">
            CONTACT US
          </div>
        </div>
      </Link>
    </div>
  );
};
