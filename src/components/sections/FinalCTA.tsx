import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function FinalCTA() {
  const t = useTranslations('home.finalCta');

  return (
    <section className="px-6 py-10">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-lg border border-border bg-[linear-gradient(135deg,#2f64ff,#7c5cff)] px-6 py-14 text-center text-white shadow-lg md:px-12">
        <Sparkles className="mx-auto h-8 w-8 text-white" />
        <h2 className="mt-6 text-3xl font-black md:text-5xl">{t('title')}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/82">
          {t('body')}
        </p>
        <Button
          render={<a href="/pricing" />}
          size="lg"
          className="mt-10 bg-white text-teal-700 hover:bg-white/90"
        >
          {t('cta')}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </section>
  );
}
