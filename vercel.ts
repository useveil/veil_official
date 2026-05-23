import { type Redirect, type VercelConfig, routes } from '@vercel/config/v1';

// Vercel 部署配置：缓存策略 + 旧 URL redirect
export const config: VercelConfig = {
  framework: 'nextjs',
  buildCommand: 'pnpm build',
  installCommand: 'pnpm install --frozen-lockfile',
  redirects: [
    // routes.redirect 运行时返回 Redirect 对象，类型签名为宽联合类型，需断言收窄
    routes.redirect('/index.html', '/', { permanent: true }) as Redirect,
  ],
  headers: [
    // 静态资源：长期缓存（不可变）
    routes.cacheControl('/_next/static/(.*)', {
      public: true,
      maxAge: '1year',
      immutable: true,
    }),
    // 品牌资源：7 天缓存
    routes.cacheControl('/brand/(.*)', {
      public: true,
      maxAge: '7days',
    }),
  ],
};
