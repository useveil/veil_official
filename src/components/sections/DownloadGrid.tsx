import { Button } from '@/components/ui/button';
import { type Platform, platforms } from '@/content/download';
import type { Locale } from '@/i18n/routing';
import { ArrowDownToLine, Copy, ShieldCheck } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { SectionHeading } from './SectionHeading';

export function DownloadGrid() {
  const t = useTranslations('download');
  const locale = useLocale() as Locale;

  return (
    <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">
      <SectionHeading
        eyebrow={t('eyebrow')}
        title={t('title')}
        description={t('description')}
        align="center"
      />
      <ul className="mt-12 grid gap-4 md:grid-cols-3">
        {platforms.map((platform) => (
          <li key={platform.key}>
            <PlatformCard platform={platform} locale={locale} />
          </li>
        ))}
      </ul>
      <div className="mt-12 rounded-lg border border-border bg-surface p-6 md:p-8">
        <div className="flex items-start gap-4">
          <ShieldCheck className="mt-1 h-5 w-5 flex-shrink-0 text-teal-600 dark:text-teal-400" />
          <div>
            <h3 className="text-base font-semibold tracking-tight">{t('verification.title')}</h3>
            <p className="mt-2 text-sm text-foreground-muted leading-relaxed">
              {t('verification.body')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function PlatformCard({
  platform,
  locale,
}: {
  platform: Platform;
  locale: Locale;
}) {
  const t = useTranslations('download');

  return (
    <div className="flex h-full flex-col rounded-lg border border-border bg-surface-elevated p-7">
      <div className="text-3xl font-mono font-bold tracking-tight">{platform.label}</div>
      <p className="mt-2 text-xs text-foreground-subtle">{platform.archs.join(' · ')}</p>
      <p className="mt-6 font-mono text-sm text-foreground">{platform.filename[locale]}</p>
      <div className="mt-2 flex items-center gap-1.5 text-xs text-foreground-subtle">
        <code className="truncate font-mono">SHA-256: {platform.sha256.slice(0, 12)}…</code>
        <Button variant="ghost" size="icon" className="h-5 w-5" aria-label={t('copyHash')}>
          <Copy className="h-3 w-3" />
        </Button>
      </div>
      <Button
        render={<a href={platform.url} target="_blank" rel="noreferrer" />}
        className="mt-auto w-full pt-6"
        size="lg"
      >
        <ArrowDownToLine className="h-4 w-4" />
        {t('downloadFor', { platform: platform.label })}
      </Button>
    </div>
  );
}
