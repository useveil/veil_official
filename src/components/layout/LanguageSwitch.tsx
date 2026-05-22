'use client';

import { Button } from '@/components/ui/button';
import { routing } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import { Languages } from 'lucide-react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';

export function LanguageSwitch({ className }: { className?: string }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function switchTo(target: string) {
    // 设置 NEXT_LOCALE cookie，让 next-intl middleware 优先使用用户选择
    document.cookie = `NEXT_LOCALE=${target};path=/;max-age=31536000`;
    // 去掉当前 locale 前缀（如有）
    let path = pathname;
    for (const l of routing.locales) {
      if (path.startsWith(`/${l}/`) || path === `/${l}`) {
        path = path.slice(l.length + 1) || '/';
        break;
      }
    }
    const next = target === routing.defaultLocale ? path : `/${target}${path === '/' ? '' : path}`;
    router.push(next);
  }

  const next = locale === 'zh' ? 'en' : 'zh';

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={() => switchTo(next)}
      className={cn('gap-1.5', className)}
      aria-label={`切换语言到 ${next === 'zh' ? '中文' : 'English'}`}
    >
      <Languages className="h-4 w-4" />
      <span className="text-xs font-medium uppercase tracking-wider">{next}</span>
    </Button>
  );
}
