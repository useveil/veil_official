import { getLocalizedText } from '@/content/features';
import { type IndustryPartner, industryPartnerHeading, industryPartners } from '@/content/homepage';
import type { Locale } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import { useLocale } from 'next-intl';
import Link from 'next/link';

const chipStyles = [
  'bg-blue-50 text-blue-700 ring-blue-200 dark:bg-blue-500/10 dark:text-blue-200 dark:ring-blue-400/20',
  'bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-200 dark:ring-emerald-400/20',
  'bg-rose-50 text-rose-700 ring-rose-200 dark:bg-rose-500/10 dark:text-rose-200 dark:ring-rose-400/20',
  'bg-orange-50 text-orange-700 ring-orange-200 dark:bg-orange-500/10 dark:text-orange-200 dark:ring-orange-400/20',
];

function IndustryCard({ item, index }: { item: IndustryPartner; index: number }) {
  const locale = useLocale() as Locale;
  const Icon = item.icon;

  return (
    <article
      className={cn(
        'group flex min-h-[260px] flex-col rounded-lg border border-border bg-background p-7 shadow-sm transition-all hover:-translate-y-1 hover:border-teal-300 hover:shadow-md md:p-8',
        item.wide ? 'lg:col-span-3' : 'lg:col-span-2',
      )}
    >
      <h3 className="text-xl font-black md:text-2xl">{getLocalizedText(item.title, locale)}</h3>
      <p className="mt-4 max-w-2xl text-base text-foreground-muted leading-relaxed">
        {getLocalizedText(item.body, locale)}
      </p>

      <div className="flex flex-wrap gap-3 pt-8">
        <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-700 ring-1 ring-teal-100 dark:bg-teal-500/10 dark:text-teal-200 dark:ring-teal-400/20">
          <Icon className="h-5 w-5" />
        </span>
        {item.chips.map((chip, chipIndex) => (
          <span
            key={`${item.key}-${chip}`}
            className={cn(
              'inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full px-1 text-center text-[10px] font-black leading-none ring-1',
              chipStyles[(index + chipIndex) % chipStyles.length],
            )}
          >
            {chip}
          </span>
        ))}
      </div>
      <Link
        href={item.href}
        aria-label={getLocalizedText(item.title, locale)}
        className="mt-auto inline-flex items-center gap-1 self-end pt-8 text-sm font-semibold text-teal-600 transition-colors hover:text-teal-700"
      >
        {locale === 'zh' ? '查看更多' : 'Learn more'}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Link>
    </article>
  );
}

export function IndustryTrustSection() {
  const locale = useLocale() as Locale;

  return (
    <section
      id="use-cases"
      className="scroll-mt-24 bg-[radial-gradient(circle_at_0%_0%,rgba(236,72,153,0.12),transparent_26rem),linear-gradient(180deg,#ffffff_0%,#f8faff_100%)] px-6 py-24 dark:bg-[radial-gradient(circle_at_0%_0%,rgba(96,165,250,0.12),transparent_26rem),linear-gradient(180deg,#080d1d_0%,#0d1427_100%)] md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <h2 className="mx-auto max-w-4xl text-center text-3xl font-black tracking-normal md:text-5xl">
          {getLocalizedText(industryPartnerHeading, locale)}
        </h2>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-6">
          {industryPartners.map((item, index) => (
            <IndustryCard key={item.key} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
