import { motion } from 'framer-motion';
import { useState } from 'react';
import { CopyIcon, CopySuccessIcon } from './icons';

export type ContactInfoProps = {
  id?: string;
  className?: string;
};

export const ContactInfo = ({ id, className }: ContactInfoProps) => {
  const [copiedField, setCopiedField] = useState<'email' | 'phone' | null>(
    null
  );
  const componentName = 'ContactInfo';

  const handleCopy = (text: string, field: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <motion.div
      id={id ?? componentName}
      data-component={componentName}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className={`mx-auto max-w-2xl space-y-6 ${className || ''}`}
    >
      {/* Email Section */}
      <p className="mb-4 text-sm uppercase tracking-wider text-muted-foreground">
        Direct Email
      </p>
      <div
        className="flex cursor-pointer items-center justify-between rounded-lg border border-border bg-card p-6 transition-all hover:border-foreground"
        onClick={() => handleCopy('team.virturatech@gmail.com', 'email')}
      >
        <div>
          <p className="font-mono text-xl md:text-2xl">
            team.virturatech@gmail.com
          </p>
        </div>
        <button
          className="cursor-pointer rounded-md p-3 transition-colors"
          aria-label="Copy email"
        >
          {copiedField === 'email' ? <CopySuccessIcon /> : <CopyIcon />}
        </button>
      </div>

      {/* Phone Section */}
      <p className="mb-4 text-sm uppercase tracking-wider text-muted-foreground">
        Direct Phone
      </p>
      <div
        className="flex cursor-pointer items-center justify-between rounded-lg border border-border bg-card p-6 transition-all hover:border-foreground"
        onClick={() => handleCopy('+15104588787', 'phone')}
      >
        <div>
          <p className="font-mono text-xl md:text-2xl">+1 (510)-458-8787</p>
        </div>
        <button
          className="cursor-pointer rounded-md p-3 transition-colors"
          aria-label="Copy phone number"
        >
          {copiedField === 'phone' ? <CopySuccessIcon /> : <CopyIcon />}
        </button>
      </div>
    </motion.div>
  );
};
