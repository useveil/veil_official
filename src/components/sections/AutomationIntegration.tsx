'use client';

import { Reveal } from '@/components/motion/Reveal';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { automationExamples, channels, quickStartSteps } from '@/content/automation';
import { getLocalizedText } from '@/content/features';
import type { Locale } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import { Check, CheckCircle2, Copy } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';
import { SectionHeading } from './SectionHeading';

const languageBadge: Record<string, string> = {
  shell: 'bash',
  json: 'json',
  typescript: 'ts',
};

const frameworkMeta: Record<
  (typeof automationExamples)[number]['framework'],
  { label: string; ext: string; filename: string }
> = {
  playwright: { label: 'Playwright', ext: 'ts', filename: 'connect.ts' },
  puppeteer: { label: 'Puppeteer', ext: 'js', filename: 'connect.js' },
  selenium: { label: 'Selenium', ext: 'py', filename: 'connect.py' },
  curl: { label: 'cURL', ext: 'sh', filename: 'profiles.sh' },
};

export function AutomationIntegration() {
  const channelT = useTranslations('automation.channels');
  const quickStartT = useTranslations('automation.quickStart');
  const codeT = useTranslations('automation.code');
  const locale = useLocale() as Locale;
  const [active, setActive] = useState(automationExamples[0].key);
  const [copied, setCopied] = useState(false);

  const current =
    automationExamples.find((example) => example.key === active) ?? automationExamples[0];
  const currentMeta = frameworkMeta[current.framework];

  async function copy() {
    try {
      await navigator.clipboard.writeText(current.code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      // 忽略：浏览器拒绝剪贴板访问
    }
  }

  return (
    <section id="automation" className="mx-auto max-w-7xl scroll-mt-24 px-6 pb-24 md:pb-32">
      <SectionHeading
        eyebrow={channelT('eyebrow')}
        title={channelT('title')}
        description={channelT('description')}
      />

      <div className="mt-12 grid gap-4 md:grid-cols-2">
        {channels.map((channel, index) => {
          const Icon = channel.icon;
          return (
            <Reveal key={channel.key} delay={index * 0.08} className="min-w-0">
              <article className="flex h-full min-w-0 flex-col rounded-lg border border-border bg-surface-elevated p-6 shadow-sm">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-teal-50 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="truncate text-lg font-semibold">{channel.label}</h3>
                      <p className="font-mono text-xs text-foreground-subtle">
                        {getLocalizedText(channel.purpose, locale)}
                      </p>
                    </div>
                  </div>
                  <span className="shrink-0 rounded-full border border-border bg-background px-2.5 py-1 font-mono text-[10px] uppercase text-foreground-muted">
                    {getLocalizedText(channel.authMode, locale)}
                  </span>
                </div>

                <div className="mt-5 min-w-0 overflow-hidden rounded-md border border-border bg-background">
                  <div className="border-border/60 border-b bg-surface px-3 py-1.5 font-mono text-[10px] uppercase text-foreground-subtle">
                    endpoint
                  </div>
                  <code className="block overflow-x-auto px-3 py-2.5 font-mono text-xs text-foreground">
                    {channel.endpoint}
                  </code>
                </div>

                <p className="mt-5 text-sm leading-relaxed text-foreground-muted">
                  {getLocalizedText(channel.description, locale)}
                </p>

                <ul className="mt-5 grid gap-2 border-border border-t pt-5">
                  {channel.highlights.map((item, itemIndex) => (
                    <li
                      key={`${channel.key}-highlight-${itemIndex}`}
                      className="flex items-start gap-2 text-sm text-foreground-muted"
                    >
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-teal-500 dark:text-teal-400" />
                      <span>{getLocalizedText(item, locale)}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          );
        })}
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[360px_1fr] lg:items-start">
        <Reveal className="min-w-0">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase text-teal-600 dark:text-teal-400">
              {quickStartT('eyebrow')}
            </p>
            <h3 className="mt-2 text-xl font-bold">{quickStartT('title')}</h3>
            <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
              {quickStartT('description')}
            </p>

            <ol className="mt-6 grid gap-4">
              {quickStartSteps.map((step, index) => (
                <li
                  key={step.key}
                  className="min-w-0 rounded-lg border border-border bg-background p-4"
                >
                  <div className="flex items-start gap-3">
                    <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-ink font-mono text-xs font-semibold text-ink-50 dark:bg-ink-200 dark:text-ink">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="min-w-0">
                      <h4 className="text-sm font-semibold">
                        {getLocalizedText(step.label, locale)}
                      </h4>
                      <p className="mt-1 text-sm leading-relaxed text-foreground-muted">
                        {getLocalizedText(step.description, locale)}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 min-w-0 overflow-hidden rounded-md border border-border/80 bg-ink dark:bg-ink-900">
                    <div className="flex items-center justify-between border-white/5 border-b px-3 py-1.5">
                      <span className="font-mono text-[10px] uppercase text-ink-300">
                        {languageBadge[step.language] ?? step.language}
                      </span>
                      <span className="font-mono text-[10px] uppercase text-teal-300">
                        step {index + 1}
                      </span>
                    </div>
                    <pre className="min-w-0 overflow-x-auto px-4 py-3 text-[12px] leading-relaxed text-ink-100">
                      <code className="whitespace-pre-wrap break-words font-mono sm:whitespace-pre">
                        {step.code}
                      </code>
                    </pre>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="min-w-0">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase text-teal-600 dark:text-teal-400">
              {codeT('eyebrow')}
            </p>
            <h3 className="mt-2 text-xl font-bold">{codeT('title')}</h3>
            <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
              {codeT('description')}
            </p>

            <Tabs value={active} onValueChange={(val) => setActive(val as string)} className="mt-6">
              <div className="grid w-full overflow-hidden rounded-lg border border-border bg-surface-elevated shadow-sm lg:grid-cols-[240px_1fr]">
                <div className="border-border border-b bg-surface p-3 lg:border-r lg:border-b-0">
                  <TabsList className="grid h-auto w-full grid-cols-1 gap-2 bg-transparent p-0 sm:grid-cols-2 lg:grid-cols-1">
                    {automationExamples.map((example) => {
                      const meta = frameworkMeta[example.framework];
                      return (
                        <TabsTrigger
                          key={example.key}
                          value={example.key}
                          className={cn(
                            'group h-auto min-w-0 justify-start whitespace-normal rounded-lg border border-border bg-background px-3 py-3 text-left transition-colors',
                            'hover:border-border-strong hover:bg-surface-elevated',
                            'data-active:border-teal-500/50 data-active:bg-teal-50 data-active:text-foreground',
                            'dark:data-active:border-teal-400/40 dark:data-active:bg-teal-950/30',
                          )}
                        >
                          <span className="flex min-w-0 flex-col items-start overflow-hidden">
                            <span className="truncate text-sm font-semibold">{meta.label}</span>
                            <span className="mt-1 font-mono text-[11px] text-foreground-subtle">
                              {meta.filename}
                            </span>
                          </span>
                          <span className="ml-auto shrink-0 rounded-md border border-border bg-surface px-1.5 py-0.5 font-mono text-[10px] uppercase text-foreground-subtle group-data-active:border-teal-500/30 group-data-active:text-teal-700 dark:group-data-active:text-teal-300">
                            .{meta.ext}
                          </span>
                        </TabsTrigger>
                      );
                    })}
                  </TabsList>
                </div>

                <div className="min-w-0 overflow-hidden bg-ink text-ink-100 dark:bg-ink-900">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-white/10 border-b bg-ink-900/70 px-4 py-3 dark:bg-black/30">
                    <div>
                      <p className="font-mono text-[11px] text-ink-400">{currentMeta.filename}</p>
                      <p className="mt-1 text-sm font-medium text-ink-50">
                        {getLocalizedText(current.title, locale)}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={copy}
                      className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-2.5 py-1.5 font-mono text-[11px] text-ink-200 transition-colors hover:bg-white/10"
                      aria-label={codeT('copy')}
                    >
                      {copied ? (
                        <>
                          <Check className="h-3 w-3 text-teal-300" />
                          <span className="text-teal-300">{codeT('copied')}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" />
                          <span>{codeT('copy')}</span>
                        </>
                      )}
                    </button>
                  </div>

                  {automationExamples.map((example) => {
                    const codeLines = example.code.trimEnd().split('\n');
                    return (
                      <TabsContent key={example.key} value={example.key} className="mt-0 min-w-0">
                        <pre className="max-h-[520px] overflow-auto px-0 py-4 text-[13px] leading-6 text-ink-100">
                          <code className="grid min-w-full font-mono sm:min-w-max">
                            {codeLines.map((line, index) => (
                              <span
                                key={`${example.key}-${index}-${line}`}
                                className="grid min-w-full grid-cols-[2.5rem_minmax(0,1fr)] px-3 sm:grid-cols-[3.25rem_1fr] sm:px-4"
                              >
                                <span className="select-none pr-4 text-right text-ink-500">
                                  {index + 1}
                                </span>
                                <span className="break-words pr-3 whitespace-pre-wrap sm:pr-6 sm:whitespace-pre">
                                  {line || ' '}
                                </span>
                              </span>
                            ))}
                          </code>
                        </pre>
                      </TabsContent>
                    );
                  })}
                </div>
              </div>
            </Tabs>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
