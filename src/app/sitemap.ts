import { routing } from '@/i18n/routing';
import { getAllChangelogs } from '@/lib/changelog';
import type { MetadataRoute } from 'next';

const PROD_URL = 'https://veil.app';
const STATIC_PATHS = [
  '/',
  '/security',
  '/use-cases',
  '/compare',
  '/automation',
  '/download',
  '/faq',
  '/changelog',
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  for (const path of STATIC_PATHS) {
    for (const locale of routing.locales) {
      const prefix = locale === routing.defaultLocale ? '' : `/${locale}`;
      const url = `${PROD_URL}${prefix}${path === '/' ? '' : path}`;
      entries.push({
        url: url || `${PROD_URL}/`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: path === '/' ? 1.0 : 0.8,
      });
    }
  }

  const changelogs = await getAllChangelogs();
  for (const log of changelogs) {
    for (const locale of routing.locales) {
      const prefix = locale === routing.defaultLocale ? '' : `/${locale}`;
      entries.push({
        url: `${PROD_URL}${prefix}/changelog/${log.slug}`,
        lastModified: new Date(log.date),
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    }
  }

  return entries;
}
