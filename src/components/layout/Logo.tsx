import { cn } from '@/lib/utils';
import Link from 'next/link';

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Veil 首页"
      className={cn('inline-flex items-center gap-2', className)}
    >
      <img src="/brand/veil-mark.svg" alt="" className="h-7 w-7" />
      <span className="text-lg font-semibold tracking-tight">Veil</span>
    </Link>
  );
}
