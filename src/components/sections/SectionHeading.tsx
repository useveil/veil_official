import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Reveal } from '@/components/motion/Reveal';

export type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        'max-w-3xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      {eyebrow && (
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{title}</h2>
      {description && (
        <p className="mt-4 text-base text-foreground-muted leading-relaxed">
          {description}
        </p>
      )}
    </Reveal>
  );
}
