import type { Metadata } from 'next';
import { Geist, Geist_Mono, Noto_Sans_SC } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/layout/ThemeProvider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

const notoSansSC = Noto_Sans_SC({
  variable: '--font-noto-sans-sc',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  preload: false,
});

export const metadata: Metadata = {
  title: 'Veil',
  description: 'Open-source, self-hosted, zero-knowledge fingerprint browser.',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // 在 [locale] 路由之外（如 _not-found）无 locale 上下文时降级为默认值
  let locale = 'zh';
  try {
    const { getLocale } = await import('next-intl/server');
    locale = await getLocale();
  } catch {
    // 无 next-intl 上下文时使用默认值
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} ${notoSansSC.variable}`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
