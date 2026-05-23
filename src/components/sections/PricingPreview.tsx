import { Reveal } from '@/components/motion/Reveal';
import { Button } from '@/components/ui/button';
import { getLocalizedText } from '@/content/features';
import { pricingTiers } from '@/content/pricing';
import type { Locale } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { SectionHeading } from './SectionHeading';

export function PricingPreview() {
  const t = useTranslations('home.pricingPreview');
  const locale = useLocale() as Locale;

  return (
    <section className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <SectionHeading
          eyebrow={t('eyebrow')}
          title={t('title')}
          description={t('description')}
          align="center"
        />

        <div className="mt-12 grid gap-3 md:grid-cols-3">
          {pricingTiers.map((tier, index) => {
            const isRec = tier.recommended;
            return (
              <Reveal key={tier.key} delay={index * 0.07}>
                <article
                  className={cn(
                    'flex h-full flex-col rounded-lg border bg-background p-6 transition-colors',
                    isRec
                      ? 'border-teal-500 ring-1 ring-teal-500/30'
                      : 'border-border hover:border-border-strong',
                  )}
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="font-mono text-xs font-semibold uppercase tracking-wider text-foreground-subtle">
                      {getLocalizedText(tier.duration, locale)}
                    </span>
                    {tier.highlight && (
                      <span className="rounded bg-teal-50 px-1.5 py-0.5 font-mono text-[10px] text-teal-700 dark:bg-teal-900/30 dark:text-teal-300">
                        −{tier.savePercent}%
                      </span>
                    )}
                  </div>
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className="text-4xl font-bold tracking-tight">${tier.priceUSD}</span>
                  </div>
                  <p className="mt-1 text-xs text-foreground-muted">
                    ≈ ${tier.monthlyEquivUSD.toFixed(2)}/mo
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>

        {/* Shared callout: all tiers identical */}
        <Reveal delay={0.24}>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 rounded-lg border border-border bg-background px-6 py-4 text-sm text-foreground-muted">
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-teal-500" />
              {t('shared.unlimitedProfiles')}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-teal-500" />
              {t('shared.selfHostable')}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-teal-500" />
              {t('shared.noDataRetention')}
            </span>
          </div>
        </Reveal>

        <div className="mt-8 flex justify-center">
          <Button render={<a href="/pricing" />} size="lg">
            {t('cta')}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
