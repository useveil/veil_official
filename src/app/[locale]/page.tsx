import { setRequestLocale } from 'next-intl/server';
import { routing, type Locale } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="mx-auto max-w-7xl px-6 py-24">
      <h1 className="text-5xl font-bold tracking-tight">首页占位（locale: {locale}）</h1>
      <p className="mt-4 text-foreground-muted">Phase 3 会构建真正的 Hero。</p>
    </main>
  );
}
