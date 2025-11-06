'use client';

import { cn } from '@/lib/utils';
import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

export type NavbarProps = {
  className?: string;
};

type NavItem = {
  label: string;
  href: string;
};

const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Our Clients', href: '/clients' },
  { label: 'Resources', href: '/resources' },
  { label: 'Pricing', href: '/pricing' },
];

export const Navbar = ({ className }: NavbarProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollingDown = currentScrollY > lastScrollY.current;
      const scrollingUp = currentScrollY < lastScrollY.current;

      // Update scroll direction
      if (scrollingDown && currentScrollY > 100) {
        setIsVisible(false);
      } else if (scrollingUp) {
        setIsVisible(true);
      }

      // Clear existing timeout
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }

      // Set timeout to show navbar when scrolling stops
      scrollTimeout.current = setTimeout(() => {
        setIsVisible(true);
      }, 150); // Show navbar 150ms after scroll stops

      lastScrollY.current = currentScrollY;
    };

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, []);

  return (
    <motion.div
      id="Navbar"
      data-component="Navbar"
      initial={reduceMotion ? {} : { y: 0 }}
      animate={
        reduceMotion
          ? {}
          : {
              y: isVisible ? 0 : -100,
            }
      }
      transition={
        reduceMotion
          ? {}
          : {
              duration: 0.3,
              ease: [0.25, 0.1, 0.25, 1],
            }
      }
      className={cn('fixed top-4 left-4 right-4 z-50', className)}
    >
      {/* Transparent navbar container */}
      <nav className="">
        {/* Navigation content */}
        <div className="flex items-center justify-between px-6 py-3">
          {/* Logo/Icon - With background */}
          <Link
            href="/"
            className="flex items-center justify-center w-12 h-12 rounded-full backdrop-blur-sm bg-foreground border-t border-white/10 transition-colors duration-200"
          >
            <div className="w-6 h-6 text-white hover:text-primary">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
          </Link>

          {/* Center Navigation Items - With background */}
          <div className="flex items-center rounded-2xl backdrop-blur-sm bg-foreground border-t border-white/10">
            {navItems.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center px-6 py-3 text-white/90 hover:text-primary text-base font-semibold transition-colors duration-200 whitespace-nowrap',
                  index === 0 && 'rounded-l-2xl',
                  index === navItems.length - 1 && 'rounded-r-2xl'
                )}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Contact Us - With background */}
          <a
            href="/contact-us"
            className="flex items-center justify-center w-12 h-12 rounded-full backdrop-blur-sm bg-foreground border-t border-white/10 transition-colors duration-200"
            aria-label="Contact Us"
          >
            <div className="w-6 h-6 text-white hover:text-primary">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </div>
          </a>
        </div>
      </nav>
    </motion.div>
  );
};
