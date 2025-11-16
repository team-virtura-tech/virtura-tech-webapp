import { motion } from 'framer-motion';

export type InterestSelectorProps = {
  options: string[];
  selected: string[];
  onToggle: (interest: string) => void;
  delay?: number;
};

export const InterestSelector = ({
  options,
  selected,
  onToggle,
  delay = 0,
}: InterestSelectorProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="space-y-4"
    >
      <span className="block text-base font-light md:text-lg">
        I am primarily interested in
      </span>
      <div className="flex flex-wrap gap-3 md:gap-4">
        {options.map((interest) => (
          <button
            key={interest}
            type="button"
            onClick={() => onToggle(interest)}
            className={`rounded-none border px-4 py-2.5 text-sm transition-colors md:px-6 md:py-3 md:text-base ${
              selected.includes(interest)
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border hover:border-foreground'
            }`}
          >
            {interest}
          </button>
        ))}
      </div>
    </motion.div>
  );
};
