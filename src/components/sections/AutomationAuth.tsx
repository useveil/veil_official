import { Reveal } from '@/components/motion/Reveal';
import { Button } from '@/components/ui/button';
import { authFeatures } from '@/content/automation';
import { SITE } from '@/content/constants';
import { getLocalizedText } from '@/content/features';
import type { Locale } from '@/i18n/routing';
import { ArrowUpRight, Lock } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { SectionHeading } from './SectionHeading';

export function AutomationAuth() {
  const t = useTranslations('automation.auth');
  const locale = useLocale() as Locale;

  return (
    <section className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:items-start lg:gap-16">
          {/* Left: callout */}
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400">
              {t('eyebrow')}
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">{t('title')}</h2>
            <p className="mt-4 text-base text-foreground-muted leading-relaxed">{t('body')}</p>

            <div className="mt-8 rounded-lg border border-border bg-background p-4">
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-foreground-subtle">
                <Lock className="h-3.5 w-3.5" />
                {t('shellLabel')}
              </div>
              <pre className="mt-2 overflow-x-auto font-mono text-xs text-foreground">
                <code>{`Authorization: Bearer vk_live_xxxxxxxxxxxxxxxxxxxxxxxx`}</code>
              </pre>
            </div>

            <Button
              render={
                <a
                  href={`${SITE.repoUrl}#%E9%80%9A%E8%BF%87-api-%E8%87%AA%E5%8A%A8%E5%8C%96`}
                  target="_blank"
                  rel="noreferrer"
                />
              }
              variant="outline"
              className="mt-8"
            >
              {t('docsCta')}
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </Reveal>

          {/* Right: feature cards */}
          <Reveal delay={0.1}>
            <ul className="grid gap-3">
              {authFeatures.map((feature) => {
                const Icon = feature.icon;
                return (
                  <li
                    key={feature.key}
                    className="flex items-start gap-4 rounded-lg border border-border bg-background p-5"
                  >
                    <div className="inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md bg-ink-100 text-ink dark:bg-ink-800 dark:text-ink-50">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold tracking-tight">
                        {getLocalizedText(feature.title, locale)}
                      </h3>
                      <p className="mt-1 text-sm text-foreground-muted leading-relaxed">
                        {getLocalizedText(feature.body, locale)}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
