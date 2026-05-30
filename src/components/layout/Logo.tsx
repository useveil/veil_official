import { cn } from '@/lib/utils';
import Link from 'next/link';

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Veil 首页"
      className={cn('inline-flex items-center gap-2.5', className)}
    >
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-teal-50 shadow-sm shadow-teal-500/10 ring-1 ring-teal-100 dark:bg-teal-500/10 dark:ring-teal-400/20">
        <img src="/brand/veil-mark.svg" alt="" className="h-7 w-7" />
      </span>
      <span className="text-xl font-bold">Veil</span>
    </Link>
  );
}
