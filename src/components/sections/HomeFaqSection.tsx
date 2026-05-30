import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { faqGroups } from '@/content/faq';
import { type LocalizedText, getLocalizedText } from '@/content/features';
import type { Locale } from '@/i18n/routing';
import { useLocale } from 'next-intl';

const productBasicsGroup = faqGroups.find((group) => group.key === 'product-basics');

const headingCopy: {
  title: LocalizedText;
} = {
  title: { zh: '常见问题解答', en: 'Frequently asked questions' },
};

export function HomeFaqSection() {
  const locale = useLocale() as Locale;

  if (!productBasicsGroup) {
    return null;
  }

  return (
    <section id="faq" className="bg-surface px-6 py-24 md:py-32">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center text-3xl font-black tracking-normal md:text-5xl">
          {getLocalizedText(headingCopy.title, locale)}
        </h2>
        <Accordion className="mt-12 border-border border-b md:mt-14">
          {productBasicsGroup.items.map((item) => (
            <AccordionItem key={item.key} value={item.key} className="border-border">
              <AccordionTrigger>{getLocalizedText(item.question, locale)}</AccordionTrigger>
              <AccordionContent className="max-w-3xl text-foreground-muted leading-relaxed">
                {getLocalizedText(item.answer, locale)}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
