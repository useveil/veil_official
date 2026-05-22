import { ImageResponse } from 'next/og';
import { getTranslations } from 'next-intl/server';
import { type Locale } from '@/i18n/routing';

export const alt = 'Veil — Open-source, self-hosted, zero-knowledge fingerprint browser';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OgImage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home.hero' });

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px',
          background:
            'radial-gradient(80% 60% at 70% 20%, rgba(94,234,212,0.18), transparent 70%), #07111f',
          color: '#e6edf5',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 28, fontWeight: 700 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              background: '#5eead4',
            }}
          />
          Veil
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div
            style={{
              fontFamily: 'monospace',
              fontSize: 18,
              color: '#5eead4',
              textTransform: 'uppercase',
              letterSpacing: 4,
            }}
          >
            {t('eyebrow')}
          </div>
          <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.05, maxWidth: 900 }}>
            {t('title')}
          </div>
          <div style={{ fontSize: 22, color: '#97a3b3', maxWidth: 900, lineHeight: 1.5 }}>
            {t('subtitle')}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
