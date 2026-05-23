'use client';

import { buttonVariants } from '@/components/ui/button';
import { getPathname, usePathname, useRouter } from '@/i18n/navigation';
import { type Locale, routing } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import { Menu } from '@base-ui/react/menu';
import { Check, ChevronDown, Languages } from 'lucide-react';
import { useLocale } from 'next-intl';
import { useTransition } from 'react';

const languageOptions = [
  { locale: 'zh', label: '中文', nativeLabel: '简体中文', short: 'ZH' },
  { locale: 'en', label: 'English', nativeLabel: 'English', short: 'EN' },
  { locale: 'ja', label: '日本語', nativeLabel: '日本語', short: 'JA' },
  { locale: 'ko', label: '한국어', nativeLabel: '한국어', short: 'KO' },
] as const satisfies ReadonlyArray<{
  locale: Locale;
  label: string;
  nativeLabel: string;
  short: string;
}>;

export function LanguageSwitch({ className }: { className?: string }) {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const currentLanguage =
    languageOptions.find((option) => option.locale === locale) ?? languageOptions[0];

  function switchTo(target: Locale) {
    if (target === locale) return;

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
    <Menu.Root modal={false}>
      <Menu.Trigger
        type="button"
        disabled={isPending}
        className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'gap-1.5', className)}
        aria-label={`Select language, current ${currentLanguage.nativeLabel}`}
      >
        <Languages className="h-4 w-4" />
        <span className="text-xs font-medium uppercase tracking-wider">
          {currentLanguage.short}
        </span>
        <ChevronDown className="h-3.5 w-3.5 text-foreground-subtle" />
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner side="bottom" align="end" sideOffset={8} className="z-50">
          <Menu.Popup className="min-w-44 rounded-lg border border-border bg-popover p-1.5 text-popover-foreground shadow-lg outline-none data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0">
            <Menu.RadioGroup
              value={locale}
              onValueChange={(value) => {
                if (routing.locales.includes(value)) switchTo(value);
              }}
            >
              {languageOptions.map((option) => (
                <Menu.RadioItem
                  key={option.locale}
                  value={option.locale}
                  label={option.nativeLabel}
                  closeOnClick
                  className="flex cursor-default select-none items-center gap-3 rounded-md px-2.5 py-2 text-sm outline-none transition-colors data-disabled:opacity-50 data-highlighted:bg-muted"
                >
                  <span className="w-7 font-mono text-xs font-semibold text-foreground-subtle">
                    {option.short}
                  </span>
                  <span className="flex-1 font-medium">{option.label}</span>
                  <Menu.RadioItemIndicator
                    keepMounted
                    className="inline-flex h-4 w-4 items-center justify-center text-teal-600 opacity-0 data-checked:opacity-100 dark:text-teal-300"
                  >
                    <Check className="h-4 w-4" />
                  </Menu.RadioItemIndicator>
                </Menu.RadioItem>
              ))}
            </Menu.RadioGroup>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}
