import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Veil',
  description: 'Open-source, self-hosted, zero-knowledge fingerprint browser.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
