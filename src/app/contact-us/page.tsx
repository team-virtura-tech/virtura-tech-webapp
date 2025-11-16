'use client';

import { ContactForm } from '@/components/custom/ContactPage/ContactForm/ContactForm';
import { ContactHero } from '@/components/custom/ContactPage/ContactHero';

export default function ContactUsPage() {
  return (
    <main
      id="ContactUs"
      data-component="ContactUsPage"
      className="relative w-full overflow-hidden bg-background text-foreground"
    >
      <ContactHero />
      <ContactForm />
    </main>
  );
}
