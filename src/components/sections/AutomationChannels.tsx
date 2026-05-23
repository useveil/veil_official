import { Reveal } from '@/components/motion/Reveal';
import { channels } from '@/content/automation';
import { getLocalizedText } from '@/content/features';
import type { Locale } from '@/i18n/routing';
import { CheckCircle2 } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { SectionHeading } from './SectionHeading';

export function AutomationChannels() {
  const t = useTranslations('automation.channels');
  const locale = useLocale() as Locale;

  return (
    <section className="mx-auto max-w-7xl px-6 pt-24 md:pt-32">
      <SectionHeading eyebrow={t('eyebrow')} title={t('title')} description={t('description')} />

      <div className="mt-12 grid gap-4 md:grid-cols-2">
        {channels.map((channel, index) => {
          const Icon = channel.icon;
          return (
            <Reveal key={channel.key} delay={index * 0.08}>
              <article className="flex h-full flex-col rounded-xl border border-border bg-surface-elevated p-7">
                {/* Header */}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-teal-50 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold tracking-tight">{channel.label}</h3>
                      <p className="text-xs font-mono text-foreground-subtle">
                        {getLocalizedText(channel.purpose, locale)}
                      </p>
                    </div>
                  </div>
                  <span className="rounded-full border border-border bg-background px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-foreground-muted">
                    {getLocalizedText(channel.authMode, locale)}
                  </span>
                </div>

                {/* Endpoint */}
                <div className="mt-5 overflow-hidden rounded-md border border-border bg-background">
                  <div className="border-b border-border/60 bg-surface px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-foreground-subtle">
                    endpoint
                  </div>
                  <code className="block overflow-x-auto px-3 py-2.5 font-mono text-xs text-foreground">
                    {channel.endpoint}
                  </code>
                </div>

                {/* Description */}
                <p className="mt-5 text-sm leading-relaxed text-foreground-muted">
                  {getLocalizedText(channel.description, locale)}
                </p>

                {/* Highlights */}
                <ul className="mt-5 grid gap-2 border-t border-border pt-5">
                  {channel.highlights.map((item, i) => (
                    <li
                      key={`${channel.key}-h-${i}`}
                      className="flex items-start gap-2 text-sm text-foreground-muted"
                    >
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-teal-500 dark:text-teal-400" />
                      <span>{getLocalizedText(item, locale)}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
