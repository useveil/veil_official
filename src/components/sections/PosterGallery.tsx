import { Reveal } from '@/components/motion/Reveal';
import { getLocalizedText } from '@/content/features';
import { galleryPosters } from '@/content/posters';
import type { Locale } from '@/i18n/routing';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { SectionHeading } from './SectionHeading';

export function PosterGallery() {
  const t = useTranslations('home.gallery');
  const locale = useLocale() as Locale;

  return (
    <section className="bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <SectionHeading eyebrow={t('eyebrow')} title={t('title')} description={t('description')} />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {galleryPosters.map((poster, index) => (
            <li key={poster.key}>
              <Reveal delay={index * 0.08}>
                <figure className="group h-full overflow-hidden rounded-lg border border-border bg-background">
                  <div className="overflow-hidden">
                    <Image
                      src={poster.src}
                      alt={getLocalizedText(poster.alt, locale)}
                      width={poster.width}
                      height={poster.height}
                      className="block h-auto w-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02]"
                    />
                  </div>
                  <figcaption className="border-t border-border px-5 py-4">
                    <h3 className="text-base font-semibold tracking-tight">
                      {getLocalizedText(poster.title, locale)}
                    </h3>
                    <p className="mt-1 text-xs text-foreground-muted">
                      {getLocalizedText(poster.caption, locale)}
                    </p>
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
