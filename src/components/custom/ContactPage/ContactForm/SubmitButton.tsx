import { motion } from 'framer-motion';
import { UploadIcon } from '../icons';

export type SubmitButtonProps = {
  isSubmitting: boolean;
  isDisabled: boolean;
  onClick: () => void;
  delay?: number;
};

export const SubmitButton = ({
  isSubmitting,
  isDisabled,
  onClick,
  delay = 0,
}: SubmitButtonProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
      className="flex flex-col items-center gap-4 pt-4 md:items-end"
    >
      <button
        type="button"
        className="group flex h-28 w-28 items-center justify-center rounded-full border border-border text-base font-light transition-all hover:bg-primary hover:text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50 md:h-32 md:w-32 md:text-lg"
        disabled={isSubmitting || isDisabled}
        onClick={onClick}
      >
        {isSubmitting ? (
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-muted-foreground border-t-foreground md:h-8 md:w-8" />
        ) : (
          <UploadIcon />
        )}
      </button>
    </motion.div>
  );
};
