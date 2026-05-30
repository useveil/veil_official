import { Badge } from '@/components/ui/badge';
import { getLocalizedText } from '@/content/features';
import { type Locale, routing } from '@/i18n/routing';
import { getAllChangelogs, getChangelogBySlug } from '@/lib/changelog';
import { cn } from '@/lib/utils';
import { ArrowLeft } from 'lucide-react';
import { setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const channelClasses = {
  stable: 'bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-200',
  rc: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200',
  beta: 'bg-ink-100 text-ink-700 dark:bg-ink-800 dark:text-ink-200',
};

export async function generateStaticParams() {
  const entries = await getAllChangelogs();
  const params: { locale: Locale; slug: string }[] = [];
  for (const locale of routing.locales) {
    for (const e of entries) params.push({ locale, slug: e.slug });
  }
  return params;
}

export default async function ChangelogDetailPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const entry = await getChangelogBySlug(slug);
  if (!entry) notFound();

  const { default: Body } = await import(`@/content/changelog/${slug}.mdx`);

  return (
    <article className="mx-auto max-w-3xl px-6 py-24 md:py-32">
      <Link
        href="/changelog"
        className="inline-flex items-center gap-1.5 text-sm text-foreground-muted hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Changelog
      </Link>
      <header className="mt-8 border-b border-border pb-8">
        <div className="flex items-baseline gap-3">
          <h1 className="text-3xl font-bold md:text-4xl">v{entry.version}</h1>
          <Badge className={cn(channelClasses[entry.channel])}>{entry.channel.toUpperCase()}</Badge>
          <time className="font-mono text-xs text-foreground-subtle">{entry.date}</time>
        </div>
        <p className="mt-3 text-xl font-medium">{getLocalizedText(entry.title, locale)}</p>
        <p className="mt-3 text-base text-foreground-muted leading-relaxed">
          {getLocalizedText(entry.summary, locale)}
        </p>
      </header>
      <div className="mt-10">
        <Body />
      </div>
    </article>
  );
}
