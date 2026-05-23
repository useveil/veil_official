import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { faqGroups } from '@/content/faq';
import type { Locale } from '@/i18n/routing';
import { useLocale, useTranslations } from 'next-intl';
import { SectionHeading } from './SectionHeading';

export function FaqAccordion() {
  const t = useTranslations('faq');
  const locale = useLocale() as Locale;

  return (
    <section className="mx-auto max-w-4xl px-6 py-24 md:py-32">
      <SectionHeading
        eyebrow={t('eyebrow')}
        title={t('title')}
        description={t('description')}
        align="center"
      />
      <div className="mt-12 space-y-10">
        {faqGroups.map((group) => (
          <div key={group.key}>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-foreground-subtle">
              {group.title[locale]}
            </h3>
            {/* @base-ui/react Accordion 使用 multiple 属性控制多项展开，不使用 type/collapsible */}
            <Accordion className="w-full">
              {group.items.map((item) => (
                <AccordionItem key={item.key} value={item.key}>
                  <AccordionTrigger className="text-left text-base font-medium">
                    {item.question[locale]}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-foreground-muted leading-relaxed">
                    {item.answer[locale]}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ))}
      </div>
    </section>
  );
}
