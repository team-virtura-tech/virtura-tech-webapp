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
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="w-full pt-4"
    >
      <button
        type="button"
        className="group flex w-full items-center justify-center gap-3 rounded-lg border border-border bg-transparent px-8 py-3 text-base font-medium transition-all hover:bg-primary hover:text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50 md:text-lg"
        disabled={isSubmitting || isDisabled}
        onClick={onClick}
      >
        {isSubmitting ? (
          <>
            <span>Sending</span>
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
          </>
        ) : (
          <>
            <span>Send</span>
            <UploadIcon />
          </>
        )}
      </button>
    </motion.div>
  );
};
