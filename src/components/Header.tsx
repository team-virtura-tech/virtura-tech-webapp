'use client';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { Code2, Menu } from 'lucide-react';
import Link from 'next/link';
import { FC, useState } from 'react';
import { ThemeToggle } from './ThemeToggle';

const navItems = [
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Contact', href: '/contact' },
];

const Header: FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-background/80 sticky top-0 z-50 w-full border-b backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-foreground hover:text-primary flex items-center space-x-2 text-xl font-bold transition-colors"
          >
            <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-lg">
              <Code2 className="text-primary-foreground h-5 w-5" />
            </div>
            <span>VirturaTech</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center space-x-1 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Theme Toggle */}
          <div className="hidden items-center md:flex">
            <ThemeToggle />
          </div>

          {/* Mobile Menu */}
          <div className="flex items-center space-x-3 md:hidden">
            <ThemeToggle />
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <SheetHeader>
                  <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                </SheetHeader>
                <div className="mt-6 flex flex-col space-y-6">
                  {/* Mobile Navigation Links */}
                  <nav className="flex flex-col space-y-4">
                    {navItems.map((item, index) => (
                      <div key={item.href}>
                        <Link
                          href={item.href}
                          className={cn(
                            'block rounded-md px-3 py-2 text-base font-medium transition-colors',
                            'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                          )}
                          onClick={() => setOpen(false)}
                        >
                          {item.label}
                        </Link>
                        {index < navItems.length - 1 && (
                          <Separator className="mt-4" />
                        )}
                      </div>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
