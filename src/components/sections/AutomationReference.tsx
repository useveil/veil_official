import { apiEndpoints } from '@/content/automation';
import { getLocalizedText } from '@/content/features';
import type { Locale } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import { useLocale, useTranslations } from 'next-intl';
import { SectionHeading } from './SectionHeading';

const methodClasses: Record<(typeof apiEndpoints)[number]['method'], string> = {
  GET: 'bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-200',
  POST: 'bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-200',
  DELETE: 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-200',
  PATCH: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200',
};

export function AutomationReference() {
  const t = useTranslations('automation.reference');
  const locale = useLocale() as Locale;

  return (
    <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">
      <SectionHeading eyebrow={t('eyebrow')} title={t('title')} description={t('description')} />

      <div className="mt-12 overflow-x-auto rounded-xl border border-border">
        <table className="w-full min-w-[720px]">
          <thead className="bg-surface text-xs font-semibold uppercase tracking-wider text-foreground-subtle">
            <tr>
              <th scope="col" className="px-5 py-3 text-left font-mono">
                {t('columns.method')}
              </th>
              <th scope="col" className="px-5 py-3 text-left font-mono">
                {t('columns.path')}
              </th>
              <th scope="col" className="px-5 py-3 text-left">
                {t('columns.description')}
              </th>
              <th scope="col" className="px-5 py-3 text-left font-mono">
                {t('columns.auth')}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border bg-background text-sm">
            {apiEndpoints.map((row) => (
              <tr key={`${row.method}-${row.path}`} className="transition-colors hover:bg-surface/60">
                <td className="px-5 py-3.5">
                  <span
                    className={cn(
                      'inline-flex min-w-[62px] justify-center rounded px-2 py-1 font-mono text-[11px] font-bold tracking-wider',
                      methodClasses[row.method],
                    )}
                  >
                    {row.method}
                  </span>
                </td>
                <td className="px-5 py-3.5 font-mono text-sm text-foreground">{row.path}</td>
                <td className="px-5 py-3.5 text-foreground-muted">
                  {getLocalizedText(row.description, locale)}
                </td>
                <td className="px-5 py-3.5 font-mono text-xs text-foreground-subtle">
                  {row.auth === 'bearer' ? 'Bearer' : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 font-mono text-xs text-foreground-subtle">
        {t('footnote')}
      </p>
    </section>
  );
}
