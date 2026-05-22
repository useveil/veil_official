import { setRequestLocale } from 'next-intl/server';
import { Logo } from '@/components/layout/Logo';
import { ThemeToggle } from '@/components/layout/ThemeToggle';
import { LanguageSwitch } from '@/components/layout/LanguageSwitch';
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
    <main className="p-8 flex items-center gap-4">
      <Logo />
      <ThemeToggle />
      <LanguageSwitch />
      <span className="text-sm text-ink-500">locale: {locale}</span>
    </main>
  );
}
