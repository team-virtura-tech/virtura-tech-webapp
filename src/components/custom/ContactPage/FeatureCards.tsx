import { motion } from 'framer-motion';
import { FlashIcon, PerformanceIcon, SEOIcon, ShieldIcon } from './icons';

export type FeatureCardsProps = {
  id?: string;
  className?: string;
};

const features = [
  {
    icon: FlashIcon,
    title: 'Fast Delivery',
    description: '4-6 weeks',
  },
  {
    icon: ShieldIcon,
    title: '100% Guarantee',
    description: 'Money back',
  },
  {
    icon: SEOIcon,
    title: 'SEO',
    description: 'Rank higher',
  },
  {
    icon: PerformanceIcon,
    title: 'Performance',
    description: 'Optimized',
  },
];

export const FeatureCards = ({ id, className }: FeatureCardsProps) => {
  const componentName = 'FeatureCards';

  return (
    <motion.div
      id={id ?? componentName}
      data-component={componentName}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className={`mb-16 grid grid-cols-2 gap-6 lg:grid-cols-4 ${className || ''}`}
    >
      {features.map((feature) => {
        const Icon = feature.icon;
        return (
          <div
            key={feature.title}
            className="group rounded-lg border border-border/30 bg-background/10 p-6 backdrop-blur-xs transition-all hover:border-foreground/40 hover:bg-background/20"
          >
            <div className="mb-4 text-3xl">
              <Icon />
            </div>
            <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
            <p className="text-sm text-muted-foreground">
              {feature.description}
            </p>
          </div>
        );
      })}
    </motion.div>
  );
};
