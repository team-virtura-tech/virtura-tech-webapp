import { ContactForm } from '@/components/contact/ContactForm';
import { ContactHero } from '@/components/contact/ContactHero';
import { ContactInfo } from '@/components/contact/ContactInfo';
import { Separator } from '@/components/ui/separator';

export const metadata = {
  title: 'Contact Us | VirturaTech',
  description:
    "Get in touch with VirturaTech for your next software development project. We're here to help bring your ideas to life.",
};

export default function ContactPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <ContactHero />
      <Separator className="my-8" />
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <ContactInfo />
          <ContactForm />
        </div>
      </div>
    </main>
  );
}
