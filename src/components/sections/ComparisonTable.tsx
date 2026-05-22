import {
  type ComparisonCell,
  comparisonColumns,
  comparisonLabels,
  comparisonRows,
} from '@/content/comparison';
import type { Locale } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import { Check, Minus, X } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { SectionHeading } from './SectionHeading';

function renderCell(cell: ComparisonCell, locale: Locale, isVeil: boolean) {
  if ('value' in cell) {
    const config = {
      yes: { Icon: Check, className: isVeil ? 'text-teal-500' : 'text-foreground-muted' },
      no: { Icon: X, className: 'text-ink-400 dark:text-ink-500' },
      partial: { Icon: Minus, className: 'text-amber-500' },
    } as const;
    const { Icon, className } = config[cell.value];
    return <Icon className={cn('h-4 w-4', className)} />;
  }
  return <span className={cn('text-sm', isVeil && 'font-semibold')}>{cell[locale]}</span>;
}

export function ComparisonTable() {
  const t = useTranslations('compare');
  const locale = useLocale() as Locale;

  return (
    <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">
      <SectionHeading eyebrow={t('eyebrow')} title={t('title')} description={t('description')} />
      <div className="mt-12 overflow-x-auto rounded-lg border border-border">
        <table className="w-full min-w-[720px]">
          <thead className="bg-surface text-xs font-semibold uppercase tracking-wider text-foreground-subtle">
            <tr>
              <th scope="col" className="px-5 py-3 text-left">
                {t('featureColumn')}
              </th>
              {comparisonColumns.map((col) => (
                <th
                  key={col}
                  scope="col"
                  className={cn(
                    'px-5 py-3 text-left',
                    col === 'veil' && 'text-teal-700 dark:text-teal-300',
                  )}
                >
                  {comparisonLabels[col]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border bg-background text-sm">
            {comparisonRows.map((row) => (
              <tr key={row.key}>
                <td className="px-5 py-4 font-medium">{row.feature[locale]}</td>
                {comparisonColumns.map((col) => (
                  <td
                    key={col}
                    className={cn(
                      'px-5 py-4',
                      col === 'veil' && 'bg-teal-50/40 dark:bg-teal-900/10',
                    )}
                  >
                    {renderCell(row[col], locale, col === 'veil')}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-xs text-foreground-subtle">{t('footnote')}</p>
    </section>
  );
}
