import { type LocalizedText, getLocalizedText } from '@/content/features';
import type { Locale } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import { Check, X } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { SectionHeading } from './SectionHeading';

type ThreatRow = {
  key: string;
  threat: LocalizedText;
  protected: boolean;
  reasoning: LocalizedText;
};

const threats: ThreatRow[] = [
  {
    key: 'server-breach',
    threat: { zh: '服务端整库泄漏', en: 'Server-side full-database leak' },
    protected: true,
    reasoning: {
      zh: '只能拿到密文。主密钥从未离开用户设备。',
      en: 'Only ciphertext exfiltrated. Master key never leaves the user device.',
    },
  },
  {
    key: 'admin-malicious',
    threat: { zh: '云服务管理员恶意访问', en: 'Cloud admin actively malicious' },
    protected: true,
    reasoning: {
      zh: '同上：没有密钥就读不到明文。',
      en: 'Same as above: no key, no plaintext.',
    },
  },
  {
    key: 'mitm-cdn',
    threat: { zh: 'CDN / TLS 中间人攻击', en: 'CDN / TLS man-in-the-middle' },
    protected: true,
    reasoning: {
      zh: '客户端 → 服务端的全部数据都是预先加密的密文。',
      en: 'All client to server payloads are pre-encrypted ciphertext.',
    },
  },
  {
    key: 'master-pw-leak',
    threat: { zh: '用户主密码泄漏', en: 'User master password leaked' },
    protected: false,
    reasoning: {
      zh: '主密码 = 所有数据的根。请使用密码管理器 + 不在多个服务复用。',
      en: 'Master password = root of all data. Use a password manager and never reuse.',
    },
  },
  {
    key: 'device-malware',
    threat: {
      zh: '本机被植入键盘记录恶意软件',
      en: 'Local device infected with keylogger malware',
    },
    protected: false,
    reasoning: {
      zh: '本地安全是用户自身的责任范围。Veil 不能替代终端 EDR。',
      en: "Local-device security is the user's responsibility. Veil cannot substitute for endpoint EDR.",
    },
  },
  {
    key: 'physical-coercion',
    threat: { zh: '物理胁迫交出主密码', en: 'Physical coercion to reveal master password' },
    protected: false,
    reasoning: {
      zh: '密码学解决不了"扳手攻击"。可使用应急销毁短语在被胁迫时清空本机数据。',
      en: 'Wrench attacks are not solvable by cryptography. Use an emergency-wipe phrase to nuke local data under coercion.',
    },
  },
];

export function SecurityThreatModel() {
  const t = useTranslations('security.threats');
  const locale = useLocale() as Locale;

  return (
    <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">
      <SectionHeading eyebrow={t('eyebrow')} title={t('title')} description={t('description')} />
      <div className="mt-12 overflow-hidden rounded-lg border border-border">
        <table className="w-full">
          <thead className="bg-surface text-xs font-semibold uppercase tracking-wider text-foreground-subtle">
            <tr>
              <th scope="col" className="px-5 py-3 text-left">
                {t('headers.threat')}
              </th>
              <th scope="col" className="px-5 py-3 text-left">
                {t('headers.protected')}
              </th>
              <th scope="col" className="px-5 py-3 text-left">
                {t('headers.reasoning')}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border bg-background text-sm">
            {threats.map((row) => (
              <tr key={row.key}>
                <td className="px-5 py-4 font-medium">{getLocalizedText(row.threat, locale)}</td>
                <td className="px-5 py-4">
                  <span
                    className={cn(
                      'inline-flex h-7 w-7 items-center justify-center rounded-full',
                      row.protected
                        ? 'bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-300'
                        : 'bg-ink-100 text-ink-600 dark:bg-ink-800 dark:text-ink-400',
                    )}
                    aria-label={row.protected ? t('protectedYes') : t('protectedNo')}
                  >
                    {row.protected ? (
                      <Check className="h-3.5 w-3.5" />
                    ) : (
                      <X className="h-3.5 w-3.5" />
                    )}
                  </span>
                </td>
                <td className="px-5 py-4 text-foreground-muted">
                  {getLocalizedText(row.reasoning, locale)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
