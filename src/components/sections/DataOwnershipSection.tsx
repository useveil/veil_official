import { type LocalizedText, getLocalizedText } from '@/content/features';
import type { Locale } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import {
  ArrowRight,
  CheckCircle2,
  CloudOff,
  Database,
  HardDrive,
  KeyRound,
  LockKeyhole,
  ServerCog,
  ShieldCheck,
  X,
} from 'lucide-react';
import { useLocale } from 'next-intl';

type DataOwnershipPoint = {
  key: string;
  icon: typeof Database;
  title: LocalizedText;
  body: LocalizedText;
  tags: string[];
};

const points: DataOwnershipPoint[] = [
  {
    key: 'no-cloud-profile',
    icon: CloudOff,
    title: {
      zh: 'Profile 资产不上厂商云',
      en: 'Profile assets do not enter vendor cloud',
    },
    body: {
      zh: '浏览器 Profile、Cookie、本地存储、代理和指纹配置默认留在本机或你的私有部署环境。团队扩容时，数据边界仍由你定义。',
      en: 'Browser profiles, cookies, local storage, proxies, and fingerprint settings stay on the local device or your private deployment by default. Your team defines the data boundary as it scales.',
    },
    tags: ['Profile DB', 'Cookie', 'Proxy'],
  },
  {
    key: 'user-held-keys',
    icon: KeyRound,
    title: {
      zh: '密码与密钥由你持有',
      en: 'Passwords and keys stay with you',
    },
    body: {
      zh: '主密码和派生密钥不上传给 Veil。SQLCipher 整库加密把敏感数据封存在本地数据库里，厂商无法代看、代改或代恢复。',
      en: 'The master password and derived keys are never uploaded to Veil. SQLCipher full-database encryption keeps sensitive data sealed locally, so the vendor cannot inspect, modify, or recover it for you.',
    },
    tags: ['Master key', 'SQLCipher', 'Local vault'],
  },
  {
    key: 'self-hosted-control',
    icon: ServerCog,
    title: {
      zh: '自托管与审计由你掌控',
      en: 'Self-hosting and audit stay under your control',
    },
    body: {
      zh: '企业可以把数据库、服务端和 API/CDP 自动化入口部署在自有环境中，权限、备份、审计和访问策略按内部制度执行。',
      en: 'Enterprise teams can run databases, services, and API/CDP automation endpoints in their own environment, with access, backup, audit, and retention policies handled internally.',
    },
    tags: ['Self-hosted', 'HTTP API', 'CDP'],
  },
];

const ownershipStats = [
  {
    value: '0',
    label: { zh: '云端 Profile 托管', en: 'cloud-hosted profiles' },
  },
  {
    value: '本地',
    label: { zh: '默认数据位置', en: 'default data location' },
  },
  {
    value: '自有',
    label: { zh: '部署与审计边界', en: 'deployment and audit boundary' },
  },
] satisfies Array<{ value: string; label: LocalizedText }>;

function DataBoundaryVisual({ locale }: { locale: Locale }) {
  const localItems = [
    {
      icon: HardDrive,
      label: { zh: '用户设备 / 自有服务器', en: 'User device / owned server' },
      detail: {
        zh: 'Profile、Cookie、代理、指纹配置',
        en: 'Profiles, cookies, proxies, fingerprints',
      },
    },
    {
      icon: LockKeyhole,
      label: { zh: '本地加密数据库', en: 'Local encrypted database' },
      detail: { zh: 'SQLCipher 整库加密', en: 'SQLCipher full-database encryption' },
    },
    {
      icon: ShieldCheck,
      label: { zh: '你掌握主密码与密钥', en: 'You hold the master password and keys' },
      detail: {
        zh: 'Veil 不保存、不托管、不代恢复',
        en: 'Veil does not store, host, or recover them',
      },
    },
  ];

  return (
    <div className="min-w-0">
      <div className="grid gap-4">
        <div className="rounded-lg border border-border bg-background p-5 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-black">
                {locale === 'zh' ? '数据留在你的控制面内' : 'Data stays inside your control plane'}
              </p>
              <p className="mt-1 text-xs text-foreground-muted">
                {locale === 'zh'
                  ? '账号资产、密钥和自动化入口由你的设备或私有环境承载'
                  : 'Account assets, keys, and automation endpoints run on your device or private environment'}
              </p>
            </div>
            <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-teal-50 text-teal-700 ring-1 ring-teal-100 dark:bg-teal-500/10 dark:text-teal-200 dark:ring-teal-400/20">
              <Database className="h-5 w-5" />
            </span>
          </div>
          <div className="mt-5 grid gap-3">
            {localItems.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={getLocalizedText(item.label, 'en')}
                  className="grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-md border border-border bg-surface px-3 py-3"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-md bg-background text-teal-600 shadow-sm">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-black">{getLocalizedText(item.label, locale)}</p>
                    <p className="mt-0.5 truncate text-xs text-foreground-muted">
                      {getLocalizedText(item.detail, locale)}
                    </p>
                  </div>
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-stretch">
          <div className="rounded-lg border border-border bg-surface p-5">
            <p className="text-xs font-black uppercase text-foreground-subtle">
              {locale === 'zh' ? '本地 API / CDP' : 'Local API / CDP'}
            </p>
            <p className="mt-3 font-mono text-xs text-foreground-muted">
              POST /profiles/start
              <br />
              ws://127.0.0.1:7733/cdp
            </p>
          </div>
          <div className="hidden items-center text-teal-600 md:flex">
            <ArrowRight className="h-5 w-5" />
          </div>
          <div className="rounded-lg border border-border bg-surface p-5">
            <p className="text-xs font-black uppercase text-foreground-subtle">
              {locale === 'zh' ? '你的脚本与团队流程' : 'Your scripts and team workflow'}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
              {locale === 'zh'
                ? '自动化可以接入 Profile，但不需要把数据库交给厂商托管。'
                : 'Automation can use profiles without handing the database to vendor hosting.'}
            </p>
          </div>
        </div>

        <div className="rounded-lg border border-dashed border-border-strong bg-background p-5">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-rose-50 text-rose-700 ring-1 ring-rose-100 dark:bg-rose-500/10 dark:text-rose-200 dark:ring-rose-400/20">
              <X className="h-4 w-4" />
            </span>
            <div>
              <p className="font-black">
                {locale === 'zh' ? '不进入 Veil 托管云' : 'Not sent to Veil hosted cloud'}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-foreground-muted">
                {locale === 'zh'
                  ? 'Veil 交付的是可掌控的软件能力，而不是把你的账号资产迁移到第三方数据托管里。'
                  : 'Veil delivers controllable software capability instead of moving your account assets into third-party data hosting.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function DataOwnershipSection() {
  const locale = useLocale() as Locale;

  return (
    <section
      id="data-ownership"
      className="scroll-mt-24 bg-[linear-gradient(180deg,#ffffff_0%,#f8faff_100%)] px-6 py-24 dark:bg-[linear-gradient(180deg,#080d1d_0%,#0d1427_100%)] md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-16">
          <div>
            <p className="text-sm font-black text-teal-600 dark:text-teal-300">
              {locale === 'zh' ? 'Veil 的数据主权优势' : 'Veil data ownership advantage'}
            </p>
            <h2 className="mt-4 max-w-3xl text-3xl font-black leading-tight tracking-normal md:text-5xl">
              {locale === 'zh'
                ? '数据不上传，控制权始终在你手里'
                : 'No data upload. Control stays with you.'}
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-foreground-muted md:text-lg">
              {locale === 'zh'
                ? 'Veil 采用本地优先和可自托管架构。Profile 数据、主密码、加密密钥与自动化入口默认保存在你的设备或自有部署环境中，企业可以按自己的安全制度管理备份、权限和审计。'
                : 'Veil is local-first and self-hostable. Profile data, the master password, encryption keys, and automation endpoints stay on your device or owned deployment by default, so teams can manage backup, access, and audit policies under their own security program.'}
            </p>

            <dl className="mt-8 grid gap-3 sm:grid-cols-3">
              {ownershipStats.map((stat, index) => (
                <div
                  key={getLocalizedText(stat.label, 'en')}
                  className={cn(
                    'rounded-lg border bg-background p-4 shadow-sm',
                    index === 0 ? 'border-teal-200' : 'border-border',
                  )}
                >
                  <dt className="text-xs font-bold text-foreground-muted">
                    {getLocalizedText(stat.label, locale)}
                  </dt>
                  <dd className="mt-2 text-2xl font-black text-foreground">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <DataBoundaryVisual locale={locale} />
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {points.map((point, index) => {
            const Icon = point.icon;
            return (
              <article
                key={point.key}
                className="rounded-lg border border-border bg-background p-6 shadow-sm transition-colors hover:border-teal-300 md:p-7"
              >
                <div
                  className={cn(
                    'inline-flex h-12 w-12 items-center justify-center rounded-md ring-1',
                    index === 0 &&
                      'bg-blue-50 text-blue-700 ring-blue-100 dark:bg-blue-500/10 dark:text-blue-200 dark:ring-blue-400/20',
                    index === 1 &&
                      'bg-emerald-50 text-emerald-700 ring-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-200 dark:ring-emerald-400/20',
                    index === 2 &&
                      'bg-orange-50 text-orange-700 ring-orange-100 dark:bg-orange-500/10 dark:text-orange-200 dark:ring-orange-400/20',
                  )}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-xl font-black">{getLocalizedText(point.title, locale)}</h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground-muted md:text-base">
                  {getLocalizedText(point.body, locale)}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {point.tags.map((tag) => (
                    <span
                      key={`${point.key}-${tag}`}
                      className="rounded-md bg-surface px-2.5 py-1 text-xs font-bold text-foreground-muted ring-1 ring-border"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
