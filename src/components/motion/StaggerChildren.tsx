'use client';

import { motion, type HTMLMotionProps } from 'motion/react';
import { cn } from '@/lib/utils';

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.04,
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.48, ease: [0.22, 1, 0.36, 1] },
  },
};

export function StaggerChildren({
  children,
  className,
  ...rest
}: HTMLMotionProps<'div'>) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      className={cn(className)}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className, ...rest }: HTMLMotionProps<'div'>) {
  return (
    <motion.div variants={childVariants} className={cn(className)} {...rest}>
      {children}
    </motion.div>
  );
}
