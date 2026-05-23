'use client';

import { Button } from '@/components/ui/button';
import { getPathname, usePathname, useRouter } from '@/i18n/navigation';
import { type Locale, routing } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import { Languages } from 'lucide-react';
import { useLocale } from 'next-intl';
import { useTransition } from 'react';

export function LanguageSwitch({ className }: { className?: string }) {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const next: Locale = locale === 'zh' ? 'en' : 'zh';

  function switchTo(target: Locale) {
    document.cookie = `NEXT_LOCALE=${target};path=/;max-age=31536000;samesite=lax`;
    document.documentElement.lang = target;

    const href = `${pathname}${window.location.search}${window.location.hash}`;
    const targetHref = getPathname({ href, locale: target });
    const currentHref = `${window.location.pathname}${window.location.search}${window.location.hash}`;

    startTransition(() => {
      if (targetHref === currentHref) {
        router.refresh();
      } else {
        router.replace(href, { locale: target, scroll: false });
      }
    });
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={() => switchTo(next)}
      disabled={isPending}
      className={cn('gap-1.5', className)}
      aria-label={`切换语言到 ${next === 'zh' ? '中文' : 'English'}`}
    >
      <Languages className="h-4 w-4" />
      <span className="text-xs font-medium uppercase tracking-wider">{next}</span>
    </Button>
  );
}
