'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { automationExamples } from '@/content/automation';
import { getLocalizedText } from '@/content/features';
import type { Locale } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import { Check, Copy } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';
import { SectionHeading } from './SectionHeading';

const frameworkMeta: Record<
  (typeof automationExamples)[number]['framework'],
  { label: string; ext: string }
> = {
  playwright: { label: 'Playwright', ext: 'ts' },
  puppeteer: { label: 'Puppeteer', ext: 'js' },
  selenium: { label: 'Selenium', ext: 'py' },
  curl: { label: 'cURL', ext: 'sh' },
};

export function AutomationApi() {
  const t = useTranslations('automation.code');
  const locale = useLocale() as Locale;
  const [active, setActive] = useState(automationExamples[0].key);
  const [copied, setCopied] = useState(false);

  const current = automationExamples.find((e) => e.key === active) ?? automationExamples[0];

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
    <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">
      <SectionHeading eyebrow={t('eyebrow')} title={t('title')} description={t('description')} />

      <Tabs
        value={active}
        onValueChange={(val) => setActive(val as string)}
        className="mt-12 overflow-hidden rounded-xl border border-border bg-ink shadow-md dark:bg-ink-900"
      >
        {/* Tabs header bar */}
        <div className="flex items-center justify-between gap-4 border-b border-white/8 bg-ink-900/60 px-2 py-2 dark:bg-black/30">
          <TabsList className="flex h-auto flex-wrap items-center gap-1 bg-transparent p-0">
            {automationExamples.map((example) => {
              const meta = frameworkMeta[example.framework];
              return (
                <TabsTrigger
                  key={example.key}
                  value={example.key}
                  className={cn(
                    'group inline-flex items-center gap-2 rounded-md px-3 py-1.5 font-mono text-[12.5px] text-ink-300 transition-colors',
                    'hover:text-ink-50',
                    'data-active:bg-white/8 data-active:text-ink-50',
                  )}
                >
                  <span className="font-semibold">{meta.label}</span>
                  <span className="rounded bg-white/8 px-1.5 py-0.5 text-[9px] uppercase tracking-wider text-ink-300 group-data-active:bg-teal-400/20 group-data-active:text-teal-300">
                    .{meta.ext}
                  </span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          <button
            type="button"
            onClick={copy}
            className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-2.5 py-1.5 font-mono text-[11px] text-ink-200 transition-colors hover:bg-white/10"
            aria-label={t('copy')}
          >
            {copied ? (
              <>
                <Check className="h-3 w-3 text-teal-300" />
                <span className="text-teal-300">{t('copied')}</span>
              </>
            ) : (
              <>
                <Copy className="h-3 w-3" />
                <span>{t('copy')}</span>
              </>
            )}
          </button>
        </div>

        {/* Code panes */}
        {automationExamples.map((example) => (
          <TabsContent key={example.key} value={example.key} className="mt-0">
            <div className="border-b border-white/5 bg-black/20 px-5 py-2.5">
              <p className="font-mono text-[11px] uppercase tracking-wider text-ink-400">
                {getLocalizedText(example.title, locale)}
              </p>
            </div>
            <pre className="overflow-x-auto px-6 py-6 text-[13px] leading-relaxed text-ink-100">
              <code className="font-mono">{example.code}</code>
            </pre>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}
