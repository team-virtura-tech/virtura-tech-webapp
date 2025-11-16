import { Globe } from '@/components/ui/globe';
import { motion } from 'framer-motion';
import { ContactInfo } from './ContactInfo';
import { FeatureCards } from './FeatureCards';

export type ContactHeroProps = {
  id?: string;
  className?: string;
};

export const ContactHero = ({ id, className }: ContactHeroProps) => {
  const componentName = 'ContactHero';

  return (
    <section
      id={id ?? componentName}
      data-component={componentName}
      className={`relative flex min-h-screen w-full items-center py-16 md:py-24 ${className || ''}`}
    >
      {/* Globe Background */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="h-[600px] w-[600px]">
          <Globe className="opacity-40" />
        </div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-8">
        {/* Let's Talk Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 flex items-center justify-center gap-4 text-sm uppercase tracking-widest text-muted-foreground"
        >
          <div className="h-px w-16 bg-border md:w-32"></div>
          <span>Let&apos;s Talk</span>
          <div className="h-px w-16 bg-border md:w-32"></div>
        </motion.div>

        {/* Contact Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-4 text-center text-6xl font-light uppercase tracking-tight md:text-7xl lg:text-8xl xl:text-9xl"
        >
          Contact
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16 text-center text-base text-muted-foreground md:text-lg"
        >
          Join 50+ satisfied clients. Response within 24 hours guaranteed.
        </motion.p>

        {/* Feature Cards */}
        <FeatureCards />

        {/* Divider Line */}
        <div className="mb-12 h-px w-full bg-border"></div>

        {/* Contact Info */}
        <ContactInfo />
      </div>
    </section>
  );
};
