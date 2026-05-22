import { useCases } from '@/content/use-cases';
import type { Locale } from '@/i18n/routing';
import { ArrowUpRight } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { SectionHeading } from './SectionHeading';

export function UseCaseGrid() {
  const t = useTranslations('home.useCases');
  const locale = useLocale() as Locale;

  return (
    <section className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <SectionHeading eyebrow={t('eyebrow')} title={t('title')} description={t('description')} />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2">
          {useCases.map((useCase) => {
            const Icon = useCase.icon;
            return (
              <li key={useCase.key}>
                <Link
                  href={`/use-cases#${useCase.key}`}
                  className="group block h-full rounded-lg border border-border bg-background p-7 transition-all hover:border-border-strong hover:shadow-md"
                >
                  <div className="flex items-start justify-between">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-ink-100 text-ink dark:bg-ink-800 dark:text-ink-50">
                      <Icon className="h-5 w-5" />
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-foreground-subtle transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold tracking-tight">
                    {useCase.title[locale]}
                  </h3>
                  <p className="mt-2 text-sm font-medium text-foreground-muted">
                    {useCase.tagline[locale]}
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
