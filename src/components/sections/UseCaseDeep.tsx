import { getLocalizedText } from '@/content/features';
import { useCases } from '@/content/use-cases';
import type { Locale } from '@/i18n/routing';
import { CheckCircle2 } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { SectionHeading } from './SectionHeading';

export function UseCaseDeep() {
  const t = useTranslations('useCases');
  const locale = useLocale() as Locale;

  return (
    <>
      <section id="use-cases" className="mx-auto max-w-7xl scroll-mt-24 px-6">
        <SectionHeading eyebrow={t('eyebrow')} title={t('title')} description={t('description')} />
      </section>
      <div className="mx-auto mt-16 max-w-7xl px-6 pb-24 md:pb-32">
        <div className="divide-y divide-border border-y border-border">
          {useCases.map((useCase) => {
            const Icon = useCase.icon;
            return (
              <article
                key={useCase.key}
                id={`use-case-${useCase.key}`}
                className="grid scroll-mt-24 gap-10 py-16 md:grid-cols-[280px_1fr] md:py-20"
              >
                <header>
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-md bg-ink-100 text-ink dark:bg-ink-800 dark:text-ink-50">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h2 className="mt-5 text-2xl font-bold tracking-tight">
                    {getLocalizedText(useCase.title, locale)}
                  </h2>
                  <p className="mt-2 text-sm font-medium text-foreground-muted">
                    {getLocalizedText(useCase.tagline, locale)}
                  </p>
                </header>
                <div>
                  <p className="text-base leading-relaxed text-foreground">
                    {getLocalizedText(useCase.narrative, locale)}
                  </p>
                  <h3 className="mt-8 text-xs font-semibold uppercase tracking-wider text-foreground-subtle">
                    {t('capabilitiesTitle')}
                  </h3>
                  <ul className="mt-3 grid gap-2">
                    {useCase.capabilities.map((cap, i) => (
                      <li
                        key={`${useCase.key}-cap-${i}`}
                        className="flex items-start gap-3 text-sm text-foreground-muted"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-teal-500 dark:text-teal-400" />
                        <span>{getLocalizedText(cap, locale)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </>
  );
}
