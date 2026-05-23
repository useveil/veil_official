'use client';

import { cn } from '@/lib/utils';
import { type HTMLMotionProps, motion } from 'motion/react';

export type RevealProps = HTMLMotionProps<'div'> & {
  delay?: number;
  once?: boolean;
};

export function Reveal({ children, delay = 0, once = true, className, ...rest }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-80px' }}
      transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1], delay }}
      className={cn(className)}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
