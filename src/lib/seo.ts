import { SITE } from '@/content/constants';
import { type Locale, routing } from '@/i18n/routing';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

const PROD_URL = 'https://veil.app';

export type PageSeoInput = {
  locale: Locale;
  namespace: string;
  path: string;
  titleOverride?: string;
  descriptionOverride?: string;
};

export async function buildPageMetadata({
  locale,
  namespace,
  path,
  titleOverride,
  descriptionOverride,
}: PageSeoInput): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace });

  let title: string;
  let description: string;

  try {
    title = titleOverride ?? t('title');
  } catch {
    title = SITE.name;
  }

  try {
    description = descriptionOverride ?? t('description');
  } catch {
    description = SITE.shortDescription;
  }

  const canonical = path === '/' ? '' : path;
  const url = locale === routing.defaultLocale ? canonical : `/${locale}${canonical}`;
  const fullUrl = `${PROD_URL}${url || '/'}`;

  const alternates: Record<string, string> = {};
  for (const l of routing.locales) {
    const prefix = l === routing.defaultLocale ? '' : `/${l}`;
    alternates[l] = `${PROD_URL}${prefix}${canonical || '/'}`;
  }

  return {
    title: title === SITE.name ? title : `${title} · ${SITE.name}`,
    description,
    openGraph: {
      title,
      description,
      url: fullUrl,
      siteName: SITE.name,
      locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: fullUrl,
      languages: alternates,
    },
  };
}
