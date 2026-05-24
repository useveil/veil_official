import { Reveal } from '@/components/motion/Reveal';
import { Button } from '@/components/ui/button';
import { getLocalizedText } from '@/content/features';
import { pricingShared, pricingTiers } from '@/content/pricing';
import type { Locale } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { SectionHeading } from './SectionHeading';

export function PricingTiers() {
  const t = useTranslations('pricing.tiers');
  const locale = useLocale() as Locale;

  return (
    <section className="mx-auto max-w-7xl px-6 pt-24 md:pt-32">
      <SectionHeading
        eyebrow={t('eyebrow')}
        title={t('title')}
        description={t('description')}
        align="center"
      />

      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {pricingTiers.map((tier, index) => {
          const isRec = tier.recommended;
          return (
            <Reveal key={tier.key} delay={index * 0.08} className="h-full">
              <article
                className={cn(
                  'relative flex h-full flex-col rounded-xl border p-7 transition-all',
                  isRec
                    ? 'border-teal-500 bg-surface-elevated shadow-lg ring-2 ring-teal-500/20'
                    : 'border-border bg-surface-elevated hover:border-border-strong',
                )}
              >
                {isRec && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-teal-500 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-white">
                    {t('mostPopular')}
                  </span>
                )}

                {/* Duration label */}
                <p className="font-mono text-xs font-semibold uppercase tracking-wider text-foreground-subtle">
                  {getLocalizedText(tier.duration, locale)}
                </p>

                {/* Price */}
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-5xl font-bold tracking-tight md:text-6xl">
                    ${tier.priceUSD}
                  </span>
                </div>
                <p className="mt-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-teal-700 dark:text-teal-300">
                  {t('earlyBird')}
                </p>
                <p className="mt-1.5 text-sm text-foreground-muted">
                  {t('monthlyEquivalent', { value: tier.monthlyEquivUSD.toFixed(2) })}
                </p>

                {/* Savings note */}
                {tier.highlight && (
                  <p className="mt-3 inline-flex w-fit items-center rounded-md bg-teal-50 px-2 py-1 font-mono text-[11px] font-semibold text-teal-700 dark:bg-teal-900/30 dark:text-teal-300">
                    {getLocalizedText(tier.highlight, locale)}
                  </p>
                )}
                {!tier.highlight && tier.badge && (
                  <p className="mt-3 font-mono text-[11px] uppercase tracking-wider text-foreground-subtle">
                    {getLocalizedText(tier.badge, locale)}
                  </p>
                )}

                {/* Divider */}
                <hr className="my-6 border-border" />

                {/* Features */}
                <ul className="flex-1 space-y-3">
                  {pricingShared.map((feature) => (
                    <li
                      key={feature.key}
                      className="flex items-start gap-2.5 text-sm text-foreground-muted leading-relaxed"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-teal-500 dark:text-teal-400" />
                      <span>{getLocalizedText(feature.label, locale)}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button
                  render={<a href={tier.buyUrl} />}
                  variant={isRec ? 'default' : 'outline'}
                  className="mt-8 w-full"
                  size="lg"
                >
                  {t('cta', { duration: getLocalizedText(tier.duration, locale) })}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </article>
            </Reveal>
          );
        })}
      </div>

      <p className="mt-8 text-center text-xs text-foreground-subtle font-mono">{t('footnote')}</p>
    </section>
  );
}
