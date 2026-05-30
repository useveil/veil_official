import { getLocalizedText } from '@/content/features';
import { useCases } from '@/content/use-cases';
import type { Locale } from '@/i18n/routing';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { SectionHeading } from './SectionHeading';

export function UseCaseDeep() {
  const t = useTranslations('useCases');
  const locale = useLocale() as Locale;

  return (
    <section id="use-cases" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-24 md:py-32">
      <SectionHeading eyebrow={t('eyebrow')} title={t('title')} description={t('description')} />

      <div className="mt-12 grid gap-5 lg:grid-cols-3">
        {useCases.map((useCase, index) => {
          const Icon = useCase.icon;
          const featured = index === 0 || index === 1;
          return (
            <article
              key={useCase.key}
              id={`use-case-${useCase.key}`}
              className={
                featured
                  ? 'group overflow-hidden rounded-lg border border-border bg-surface-elevated p-6 shadow-md transition-all hover:-translate-y-1 hover:border-teal-300 lg:col-span-1'
                  : 'group overflow-hidden rounded-lg border border-border bg-background p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-teal-300'
              }
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-teal-50 text-teal-700 dark:bg-teal-500/10 dark:text-teal-200">
                  <Icon className="h-6 w-6" />
                </div>
                <ArrowRight className="h-5 w-5 text-foreground-subtle transition-transform group-hover:translate-x-1 group-hover:text-teal-600" />
              </div>

              <h2 className="mt-6 text-2xl font-black">
                {getLocalizedText(useCase.title, locale)}
              </h2>
              <p className="mt-2 text-sm font-bold text-teal-600">
                {getLocalizedText(useCase.tagline, locale)}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-foreground-muted">
                {getLocalizedText(useCase.narrative, locale)}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {useCase.platforms.map((platform) => (
                  <span
                    key={platform}
                    className="rounded-full border border-border bg-surface px-2.5 py-1 text-xs font-bold text-foreground-muted"
                  >
                    {platform}
                  </span>
                ))}
              </div>

              <h3 className="mt-6 text-xs font-black uppercase text-foreground-subtle">
                {t('capabilitiesTitle')}
              </h3>
              <ul className="mt-3 grid gap-2">
                {useCase.capabilities.slice(0, 3).map((cap, i) => (
                  <li
                    key={`${useCase.key}-cap-${i}`}
                    className="flex items-start gap-2.5 text-sm text-foreground-muted"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" />
                    <span>{getLocalizedText(cap, locale)}</span>
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </section>
  );
}
