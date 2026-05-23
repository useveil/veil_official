import { Reveal } from '@/components/motion/Reveal';
import { quickStartSteps } from '@/content/automation';
import { getLocalizedText } from '@/content/features';
import type { Locale } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import { useLocale, useTranslations } from 'next-intl';
import { SectionHeading } from './SectionHeading';

const languageBadge: Record<string, string> = {
  shell: 'bash',
  json: 'json',
  typescript: 'ts',
};

export function AutomationQuickStart() {
  const t = useTranslations('automation.quickStart');
  const locale = useLocale() as Locale;

  return (
    <section className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <SectionHeading eyebrow={t('eyebrow')} title={t('title')} description={t('description')} />

        <ol className="mt-12 grid gap-6 lg:grid-cols-3">
          {quickStartSteps.map((step, index) => (
            <Reveal key={step.key} delay={index * 0.08}>
              <li
                className={cn(
                  'group relative flex h-full flex-col rounded-xl border border-border bg-background p-6',
                  'transition-colors hover:border-border-strong',
                )}
              >
                <div className="flex items-baseline gap-3">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-ink text-xs font-mono font-semibold text-ink-50 dark:bg-ink-200 dark:text-ink">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-base font-semibold tracking-tight">
                    {getLocalizedText(step.label, locale)}
                  </h3>
                </div>

                <p className="mt-3 text-sm text-foreground-muted leading-relaxed">
                  {getLocalizedText(step.description, locale)}
                </p>

                <div className="mt-5 flex-1 overflow-hidden rounded-md border border-border/80 bg-ink dark:bg-ink-900">
                  <div className="flex items-center justify-between border-b border-white/5 px-3 py-1.5">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-ink-300">
                      {languageBadge[step.language] ?? step.language}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-teal-300">
                      step {index + 1}
                    </span>
                  </div>
                  <pre className="overflow-x-auto px-4 py-3 text-[12.5px] leading-relaxed text-ink-100">
                    <code className="font-mono">{step.code}</code>
                  </pre>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
