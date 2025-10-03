// import { HeroSection } from '@/components/custom/HeroSection';
// import { InnovationSection } from '@/components/custom/InnovationSection';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '../styles/target-cursor.css';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'VirturaTech - Web & Mobile App Development',
  description:
    'Professional web and mobile app development services. We build custom software solutions for modern businesses.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* <HeroSection />
        <InnovationSection /> */}
        {children}
      </body>
    </html>
  );
}
