import { Reveal } from '@/components/motion/Reveal';
import { Button } from '@/components/ui/button';
import { SITE } from '@/content/constants';
import { getLocalizedText } from '@/content/features';
import { heroPoster } from '@/content/posters';
import type { Locale } from '@/i18n/routing';
import { ArrowDownToLine, GitBranch, LockKeyhole, MonitorCheck, Shield } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';

const trustBadges = [
  { icon: Shield, key: 'license' },
  { icon: LockKeyhole, key: 'sqlcipher' },
  { icon: MonitorCheck, key: 'platforms' },
] as const;

export function Hero() {
  const t = useTranslations('home.hero');
  const locale = useLocale() as Locale;

  return (
    <section className="relative overflow-hidden border-b border-border">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(45,212,191,0.10),transparent_70%)]"
      />
      <div className="mx-auto grid max-w-7xl gap-12 px-6 pt-24 pb-32 lg:grid-cols-[1.35fr_1fr] lg:items-center lg:gap-16 lg:pt-32 lg:pb-40">
        {/* Left: text content */}
        <Reveal>
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface-elevated px-3 py-1 text-xs font-medium uppercase tracking-wider text-foreground-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
            {t('eyebrow')}
          </p>
          <h1 className="text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
            {t('title')}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-foreground-muted leading-relaxed">
            {t('subtitle')}
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button
              render={<a href={SITE.releaseUrl} target="_blank" rel="noreferrer" />}
              size="lg"
            >
              <ArrowDownToLine className="h-4 w-4" />
              {t('primaryCta')}
            </Button>
            <Button
              render={<a href={SITE.repoUrl} target="_blank" rel="noreferrer" />}
              size="lg"
              variant="outline"
            >
              <GitBranch className="h-4 w-4" />
              {t('secondaryCta')}
            </Button>
          </div>
          <ul className="mt-10 flex flex-wrap gap-3">
            {trustBadges.map(({ icon: Icon, key }) => (
              <li
                key={key}
                className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-3 py-2 text-xs font-medium text-foreground-muted"
              >
                <Icon className="h-3.5 w-3.5" />
                {t(`badges.${key}` as 'badges.license')}
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Right: hero poster */}
        <Reveal delay={0.12} className="relative">
          <figure className="relative mx-auto w-full max-w-sm overflow-hidden rounded-xl border border-border bg-surface-elevated shadow-md lg:max-w-none">
            <Image
              src={heroPoster.src}
              alt={getLocalizedText(heroPoster.alt, locale)}
              width={heroPoster.width}
              height={heroPoster.height}
              priority
              className="block h-auto w-full"
            />
            <figcaption className="absolute inset-x-0 bottom-0 flex items-baseline justify-between gap-3 bg-gradient-to-t from-ink/85 via-ink/55 to-transparent px-5 py-4 text-ink-50">
              <span className="text-sm font-semibold tracking-tight">
                {getLocalizedText(heroPoster.title, locale)}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-wider text-ink-300">
                {getLocalizedText(heroPoster.caption, locale)}
              </span>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
