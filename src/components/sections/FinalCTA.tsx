import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function FinalCTA() {
  const t = useTranslations('home.finalCta');

  return (
    <section>
      <div className="mx-auto max-w-3xl px-6 text-center">
        <Sparkles className="mx-auto h-8 w-8 text-teal-500 dark:text-teal-400" />
        <h2 className="mt-6 text-3xl font-bold tracking-tight md:text-4xl">{t('title')}</h2>
        <p className="mt-4 text-base text-foreground-muted leading-relaxed">{t('body')}</p>
        <Button render={<a href="/pricing" />} size="lg" className="mt-10">
          {t('cta')}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </section>
  );
}
