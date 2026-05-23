import { describe, expect, it, vi } from 'vitest';

// Mock next-intl/server's getTranslations
vi.mock('next-intl/server', () => ({
  getTranslations: vi.fn(async () => {
    const fn = (key: string) => `__${key}__`;
    return fn;
  }),
}));

import { buildPageMetadata } from '@/lib/seo';

describe('buildPageMetadata', () => {
  it('首页中文：无 locale 前缀', async () => {
    const meta = await buildPageMetadata({
      locale: 'zh',
      namespace: 'home.hero',
      path: '/',
    });
    expect(meta.alternates?.canonical).toBe('https://veil.app/');
    expect(meta.alternates?.languages?.zh).toBe('https://veil.app/');
    expect(meta.alternates?.languages?.en).toBe('https://veil.app/en/');
  });

  it('内页中文：path 无前缀', async () => {
    const meta = await buildPageMetadata({
      locale: 'zh',
      namespace: 'security.stack',
      path: '/security',
    });
    expect(meta.alternates?.canonical).toBe('https://veil.app/security');
  });

  it('内页英文：path 有 /en 前缀', async () => {
    const meta = await buildPageMetadata({
      locale: 'en',
      namespace: 'security.stack',
      path: '/security',
    });
    expect(meta.alternates?.canonical).toBe('https://veil.app/en/security');
  });

  it('title 拼接 SITE name', async () => {
    const meta = await buildPageMetadata({
      locale: 'zh',
      namespace: 'home.hero',
      path: '/',
    });
    expect(meta.title).toMatch(/Veil/);
  });
});
