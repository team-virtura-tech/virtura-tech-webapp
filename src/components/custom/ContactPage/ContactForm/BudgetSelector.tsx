import { motion } from 'framer-motion';

export type BudgetSelectorProps = {
  options: string[];
  selected: string;
  onSelect: (budget: string) => void;
  delay?: number;
};

export const BudgetSelector = ({
  options,
  selected,
  onSelect,
  delay = 0,
}: BudgetSelectorProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="space-y-4"
    >
      <span className="block text-base font-light md:text-lg">
        My budget is:
      </span>
      <div className="flex flex-col gap-3 md:flex-row md:gap-4">
        {options.map((budget) => (
          <button
            key={budget}
            type="button"
            onClick={() => onSelect(budget)}
            className={`rounded-none border px-4 py-2.5 text-sm transition-colors md:px-6 md:py-3 md:text-base ${
              selected === budget
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border hover:border-foreground'
            }`}
          >
            {budget}
          </button>
        ))}
      </div>
    </motion.div>
  );
};
