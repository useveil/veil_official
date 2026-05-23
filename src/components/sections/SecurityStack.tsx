import type { LocalizedText } from '@/content/features';
import type { Locale } from '@/i18n/routing';
import { ArrowDown, Database, FileLock2, KeyRound, Lock } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { SectionHeading } from './SectionHeading';

type StackLayer = {
  key: string;
  icon: typeof Lock;
  label: LocalizedText;
  detail: LocalizedText;
};

const layers: StackLayer[] = [
  {
    key: 'password',
    icon: KeyRound,
    label: { zh: '主密码（用户输入）', en: 'Master password (user input)' },
    detail: { zh: '永远不上传，永远不可重置', en: 'Never uploaded, never resettable' },
  },
  {
    key: 'kdf',
    icon: Lock,
    label: { zh: 'Argon2id 密钥派生', en: 'Argon2id key derivation' },
    detail: {
      zh: 'memory-hard 抗 GPU/ASIC 暴力破解',
      en: 'memory-hard, resistant to GPU/ASIC brute-force',
    },
  },
  {
    key: 'aes',
    icon: FileLock2,
    label: { zh: 'AES-256-GCM 内容加密', en: 'AES-256-GCM content encryption' },
    detail: {
      zh: '每条记录独立 IV，完整性自带验证',
      en: 'Per-record IV with built-in integrity verification',
    },
  },
  {
    key: 'sqlcipher',
    icon: Database,
    label: { zh: 'SQLCipher 整库加密', en: 'SQLCipher full-database encryption' },
    detail: {
      zh: '元数据、索引、临时表一律加密',
      en: 'Metadata, indexes, and temp tables all encrypted',
    },
  },
];

export function SecurityStack() {
  const t = useTranslations('security.stack');
  const locale = useLocale() as Locale;

  return (
    <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">
      <SectionHeading eyebrow={t('eyebrow')} title={t('title')} description={t('description')} />
      <ol className="mt-12 grid gap-3 md:max-w-2xl">
        {layers.map((layer, index) => {
          const Icon = layer.icon;
          return (
            <li key={layer.key}>
              <div className="flex items-center gap-4 rounded-lg border border-border bg-surface-elevated p-5">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-teal-50 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-mono font-semibold tracking-tight">
                    {layer.label[locale]}
                  </h3>
                  <p className="mt-1 text-sm text-foreground-muted">{layer.detail[locale]}</p>
                </div>
              </div>
              {index < layers.length - 1 && (
                <div className="flex justify-center py-1.5" aria-hidden>
                  <ArrowDown className="h-4 w-4 text-foreground-subtle" />
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
