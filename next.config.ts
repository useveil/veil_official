import createMDX from '@next/mdx';
import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');
const withMDX = createMDX();

const nextConfig: NextConfig = {
  pageExtensions: ['ts', 'tsx', 'mdx'],
  transpilePackages: ['@veil/auth-pages'],
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  typedRoutes: true,
  // Next.js 16 将 Turbopack 配置从 experimental.turbo 移到顶层 turbopack，
  // 而 next-intl 3.x 插件仍写入 experimental.turbo，导致别名注入失败。
  // 此处手动补充顶层 turbopack.resolveAlias，确保 next-intl/config 指向正确文件。
  turbopack: {
    resolveAlias: {
      'next-intl/config': './src/i18n/request.ts',
    },
  },
  experimental: {
    viewTransition: true,
  },
};

export default withNextIntl(withMDX(nextConfig));
