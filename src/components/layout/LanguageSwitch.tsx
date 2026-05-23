'use client';

import { Button } from '@/components/ui/button';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing, type Locale } from '@/i18n/routing';
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
    // 同步设置 NEXT_LOCALE cookie，让 middleware 在下一次刷新 / 直接访问时也优先用户选择
    document.cookie = `NEXT_LOCALE=${target};path=/;max-age=31536000;samesite=lax`;
    // next-intl 的 router 知道如何处理 locale 切换：保持当前 pathname，更换前缀
    startTransition(() => {
      router.replace(pathname, { locale: target });
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
