import type { MetadataRoute } from 'next';

const PROD_URL = 'https://veil.app';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
    ],
    sitemap: `${PROD_URL}/sitemap.xml`,
  };
}
