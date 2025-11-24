'use client';

import { Badge } from '@/components/ui/badge';
import type { ShowcaseItem } from '@/lib/showcase-data';
import { cn } from '@/lib/utils';
import { motion, useReducedMotion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

export type ShowcaseCardProps = {
  item: ShowcaseItem;
  className?: string;
};

export const ShowcaseCard = ({ item, className }: ShowcaseCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const reduceMotion = useReducedMotion();

  const handleClick = () => {
    window.open(item.externalLink, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.article
      data-component="ShowcaseCard"
      className={cn(
        'group relative aspect-[16/10] w-full cursor-pointer overflow-hidden rounded-[10px] border border-border bg-muted',
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      whileHover={reduceMotion ? {} : { scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Image */}
      <div className="relative h-full w-full">
        <Image
          src={item.imagePath}
          alt={item.clientName}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* Badge - Always Visible */}
      <div className="absolute left-4 top-4">
        <Badge variant={item.type === 'client' ? 'default' : 'secondary'}>
          {item.type === 'client' ? 'Client' : 'Template'}
        </Badge>
      </div>

      {/* Hover Overlay with Client Name */}
      <motion.div
        initial={reduceMotion ? {} : { y: '100%' }}
        animate={
          reduceMotion
            ? { opacity: isHovered ? 1 : 0 }
            : { y: isHovered ? '0%' : '100%' }
        }
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        className="absolute inset-x-0 bottom-0 flex h-8 items-center justify-center bg-background px-4"
      >
        <div className="flex w-full items-center justify-between">
          <h3 className="text-sm font-medium text-foreground">
            {item.clientName}
          </h3>
          <ExternalLink
            className="h-4 w-4 text-foreground"
            aria-hidden="true"
          />
        </div>
      </motion.div>

      {/* Accessible Link Label */}
      <span className="sr-only">
        View {item.clientName} project (opens in new tab)
      </span>
    </motion.article>
  );
};
