import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { type Locale, routing } from '@/i18n/routing';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale)) notFound();

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <div className="flex min-h-dvh flex-col">
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
      </div>
    </NextIntlClientProvider>
  );
}
