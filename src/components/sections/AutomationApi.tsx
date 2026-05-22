'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { automationExamples } from '@/content/automation';
import type { Locale } from '@/i18n/routing';
import { CodeSnippet } from './CodeSnippet';
import { SectionHeading } from './SectionHeading';

export function AutomationApi() {
  const t = useTranslations('automation');
  const locale = useLocale() as Locale;
  const [active, setActive] = useState(automationExamples[0].key);

  return (
    <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">
      <SectionHeading
        eyebrow={t('eyebrow')}
        title={t('title')}
        description={t('description')}
      />
      <Tabs
        value={active}
        onValueChange={(val) => setActive(val as string)}
        className="mt-12"
      >
        <TabsList className="mb-6 flex h-auto flex-wrap justify-start gap-2 bg-transparent p-0">
          {automationExamples.map((example) => (
            <TabsTrigger
              key={example.key}
              value={example.key}
              className="rounded-md border border-border bg-surface-elevated px-4 py-2 text-sm font-medium data-active:border-teal-500 data-active:bg-teal-50 data-active:text-teal-700 dark:data-active:bg-teal-900/40 dark:data-active:text-teal-300"
            >
              {example.framework}
            </TabsTrigger>
          ))}
        </TabsList>
        {automationExamples.map((example) => (
          <TabsContent key={example.key} value={example.key} className="mt-0">
            <h3 className="mb-4 text-sm font-medium text-foreground-muted">
              {example.title[locale]}
            </h3>
            <CodeSnippet
              code={example.code}
              language={example.language}
              filename={`${example.framework}.${
                example.language === 'typescript'
                  ? 'ts'
                  : example.language === 'javascript'
                    ? 'js'
                    : example.language === 'python'
                      ? 'py'
                      : 'sh'
              }`}
            />
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}
