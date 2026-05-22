import { ArrowDownToLine, Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { SITE } from '@/content/constants';

export function FinalCTA() {
  const t = useTranslations('home.finalCta');

  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-3xl px-6 py-24 md:py-32 text-center">
        <Sparkles className="mx-auto h-8 w-8 text-teal-500 dark:text-teal-400" />
        <h2 className="mt-6 text-3xl font-bold tracking-tight md:text-4xl">{t('title')}</h2>
        <p className="mt-4 text-base text-foreground-muted leading-relaxed">{t('body')}</p>
        <Button render={<a href={SITE.releaseUrl} target="_blank" rel="noreferrer" />} size="lg" className="mt-10">
          <ArrowDownToLine className="h-4 w-4" />
          {t('cta')}
        </Button>
      </div>
    </section>
  );
}
