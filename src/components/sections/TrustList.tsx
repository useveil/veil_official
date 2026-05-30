import { getLocalizedText } from '@/content/features';
import { securityProofs } from '@/content/homepage';
import type { Locale } from '@/i18n/routing';
import { useLocale, useTranslations } from 'next-intl';
import { SectionHeading } from './SectionHeading';

export function TrustList() {
  const t = useTranslations('security.trust');
  const locale = useLocale() as Locale;

  return (
    <section className="bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <SectionHeading eyebrow={t('eyebrow')} title={t('title')} />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {securityProofs.map((item) => {
            const Icon = item.icon;
            return (
              <li
                key={item.key}
                className="rounded-lg border border-border bg-background p-6 shadow-sm"
              >
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-md bg-ink-100 text-ink dark:bg-ink-800 dark:text-ink-50">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-black">{getLocalizedText(item.title, locale)}</h3>
                <p className="mt-2 text-sm text-foreground-muted leading-relaxed">
                  {getLocalizedText(item.body, locale)}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
