import { setRequestLocale } from 'next-intl/server';
import { Button } from '@/components/ui/button';
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
    <main className="p-8">
      <h1 className="text-4xl font-bold">Veil — locale: {locale}</h1>
      <Button className="mt-4">shadcn 按钮</Button>
    </main>
  );
}
