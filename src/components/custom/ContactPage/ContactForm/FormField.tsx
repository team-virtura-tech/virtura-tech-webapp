import { motion } from 'framer-motion';

export type FormFieldProps = {
  label: string;
  required?: boolean;
  delay?: number;
  children: React.ReactNode;
};

export const FormField = ({
  label,
  required = false,
  delay = 0,
  children,
}: FormFieldProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="space-y-3"
    >
      <span className="block text-base font-light md:text-lg">
        {label} {required && <span className="text-destructive">*</span>}
      </span>
      {children}
    </motion.div>
  );
};
