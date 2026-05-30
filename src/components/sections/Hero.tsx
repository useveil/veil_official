import { Button } from '@/components/ui/button';
import { getLocalizedText } from '@/content/features';
import { heroProofs } from '@/content/homepage';
import type { Locale } from '@/i18n/routing';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';

export function Hero() {
  const t = useTranslations('home.hero');
  const locale = useLocale() as Locale;

  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_76%_18%,rgba(47,100,255,0.14),transparent_30rem),linear-gradient(180deg,rgba(246,248,255,0.88),rgba(255,255,255,0.92)_68%,rgba(255,255,255,0))]"
      />
      <div className="mx-auto grid min-h-[560px] max-w-7xl items-center gap-10 px-5 py-12 sm:px-6 lg:grid-cols-[0.86fr_1.14fr] lg:gap-12 lg:py-14">
        <div className="max-w-xl text-left">
          <h1 className="text-5xl font-black leading-[0.98] tracking-normal md:text-6xl lg:text-[64px]">
            <span className="block">{t('titleLine1')}</span>
            <span className="mt-2 block whitespace-nowrap bg-[linear-gradient(90deg,#1f48ff,#e218ff)] bg-clip-text text-transparent">
              {t('titleLine2')}
            </span>
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-foreground-muted">
            {t('subtitle')}
          </p>
          <div className="mt-7">
            <Button
              render={<a href="/download" />}
              size="lg"
              className="min-w-44 rounded-full bg-[linear-gradient(90deg,#2458ff,#e219df)] px-8 shadow-lg shadow-teal-500/20 hover:opacity-95"
            >
              {t('primaryCta')}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          <ul className="mt-7 grid gap-2.5">
            {heroProofs.map((proof) => (
              <li
                key={proof.en}
                className="flex items-start gap-3 text-[15px] font-semibold text-foreground"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-foreground" />
                {getLocalizedText(proof, locale)}
              </li>
            ))}
          </ul>
        </div>
        <HeroVisual />
      </div>
    </section>
  );
}

function HeroVisual() {
  return (
    <div className="relative pb-14 sm:pb-16 lg:-mr-4 lg:pb-10 lg:pl-2">
      <figure className="overflow-hidden rounded-[22px] border border-white/70 bg-white p-2">
        <Image
          src="/images/veil-desktop-profile-list.png"
          alt="Veil desktop profile management screenshot"
          width={1280}
          height={800}
          priority
          sizes="(min-width: 1024px) 58vw, 100vw"
          className="block h-auto w-full rounded-2xl border border-border/70"
        />
      </figure>
      <figure className="pointer-events-none absolute bottom-0 left-3 w-[51.7%] overflow-hidden rounded-sm border border-white/80 bg-white sm:left-6 sm:w-[47.9%] lg:-left-2 lg:w-[45.4%]">
        <Image
          src="/images/veil-browser-profile-open-tall.png"
          alt="Veil opened browser profile screenshot"
          width={1600}
          height={1003}
          priority
          sizes="(min-width: 1024px) 42vw, 82vw"
          className="block h-auto w-full rounded-sm border border-border/60"
        />
      </figure>
    </div>
  );
}
