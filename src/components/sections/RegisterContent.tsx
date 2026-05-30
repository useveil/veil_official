import { Button } from '@/components/ui/button';
import { type LocalizedText, getLocalizedText } from '@/content/features';
import type { Locale } from '@/i18n/routing';
import { ArrowDownToLine, BadgeCheck, Gift, ShieldCheck, Sparkles } from 'lucide-react';

type RegisterCopy = {
  eyebrow: LocalizedText;
  title: LocalizedText;
  description: LocalizedText;
  referralLabel: LocalizedText;
  referralTitle: LocalizedText;
  referralBody: LocalizedText;
  noReferralBody: LocalizedText;
  primaryCta: LocalizedText;
  secondaryCta: LocalizedText;
  notes: LocalizedText[];
};

const registerCopy: RegisterCopy = {
  eyebrow: {
    zh: '账号注册',
    en: 'Account registration',
    ja: 'アカウント登録',
    ko: '계정 등록',
  },
  title: {
    zh: '创建 Veil 账号，继续进入桌面端',
    en: 'Create a Veil account and continue in the desktop app',
    ja: 'Veil アカウントを作成してデスクトップアプリへ',
    ko: 'Veil 계정을 만들고 데스크톱 앱에서 계속하세요',
  },
  description: {
    zh: 'Veil 的账号登录与注册由桌面端统一接入 WorkOS AuthKit。这个页面会保留邀请信息，并引导你下载桌面端完成注册或登录。',
    en: 'Veil sign-in and registration are handled by WorkOS AuthKit inside the desktop app. This page preserves referral details and guides you to the desktop app to finish registration or sign-in.',
    ja: 'Veil のログインと登録は、デスクトップアプリ内の WorkOS AuthKit で処理されます。このページでは紹介情報を保持し、登録またはログインを完了できるよう案内します。',
    ko: 'Veil 로그인과 가입은 데스크톱 앱의 WorkOS AuthKit에서 처리됩니다. 이 페이지는 추천 정보를 보존하고 데스크톱 앱에서 가입 또는 로그인을 마칠 수 있게 안내합니다.',
  },
  referralLabel: {
    zh: '邀请码',
    en: 'Referral code',
    ja: '紹介コード',
    ko: '추천 코드',
  },
  referralTitle: {
    zh: '邀请链接已识别',
    en: 'Referral link detected',
    ja: '紹介リンクを検出しました',
    ko: '추천 링크가 감지되었습니다',
  },
  referralBody: {
    zh: '下载并打开 Veil 桌面端后，使用同一账号完成注册。邀请码会用于关联邀请奖励。',
    en: 'Download and open the Veil desktop app, then register with the same account. The code is used to link referral rewards.',
    ja: 'Veil デスクトップアプリをダウンロードして開き、同じアカウントで登録してください。このコードは紹介特典の関連付けに使用されます。',
    ko: 'Veil 데스크톱 앱을 다운로드해 열고 같은 계정으로 가입하세요. 이 코드는 추천 보상 연결에 사용됩니다.',
  },
  noReferralBody: {
    zh: '下载 Veil 桌面端后，可直接在应用内注册或登录账号。',
    en: 'After downloading the Veil desktop app, you can register or sign in directly inside the app.',
    ja: 'Veil デスクトップアプリをダウンロードした後、アプリ内で直接登録またはログインできます。',
    ko: 'Veil 데스크톱 앱을 다운로드한 뒤 앱 안에서 바로 가입하거나 로그인할 수 있습니다.',
  },
  primaryCta: {
    zh: '下载桌面端',
    en: 'Download desktop app',
    ja: 'デスクトップ版をダウンロード',
    ko: '데스크톱 앱 다운로드',
  },
  secondaryCta: {
    zh: '查看价格方案',
    en: 'View pricing',
    ja: '料金を見る',
    ko: '가격 보기',
  },
  notes: [
    {
      zh: '统一账号入口',
      en: 'Unified account entry',
      ja: '共通アカウント入口',
      ko: '통합 계정 진입점',
    },
    {
      zh: '本地 Vault 保护 Profile 数据',
      en: 'Local Vault protects profile data',
      ja: 'ローカル Vault が Profile データを保護',
      ko: '로컬 Vault가 Profile 데이터를 보호',
    },
    {
      zh: '邀请奖励在账号中心关联',
      en: 'Referral rewards link in the account center',
      ja: '紹介特典はアカウントセンターで関連付け',
      ko: '추천 보상은 계정 센터에서 연결',
    },
  ],
};

export function RegisterContent({
  locale,
  referralCode,
}: {
  locale: Locale;
  referralCode?: string;
}) {
  const title = getLocalizedText(registerCopy.title, locale);
  const description = getLocalizedText(registerCopy.description, locale);

  return (
    <section className="mx-auto grid max-w-7xl gap-10 px-6 py-20 md:grid-cols-[minmax(0,1fr)_420px] md:items-center md:py-28">
      <div>
        <p className="text-xs font-semibold uppercase text-teal-600 dark:text-teal-400">
          {getLocalizedText(registerCopy.eyebrow, locale)}
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl font-black leading-tight md:text-6xl">{title}</h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-foreground-muted md:text-lg">
          {description}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button render={<a href="/download" />} size="lg">
            <ArrowDownToLine className="h-4 w-4" />
            {getLocalizedText(registerCopy.primaryCta, locale)}
          </Button>
          <Button render={<a href="/pricing" />} size="lg" variant="outline">
            <Sparkles className="h-4 w-4" />
            {getLocalizedText(registerCopy.secondaryCta, locale)}
          </Button>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-3">
          {registerCopy.notes.map((note) => (
            <div
              key={note.zh}
              className="flex min-h-14 items-center gap-2 rounded-lg border border-border bg-surface-elevated px-3 py-2 text-sm font-bold shadow-sm"
            >
              <BadgeCheck className="h-4 w-4 shrink-0 text-teal-600 dark:text-teal-400" />
              <span>{getLocalizedText(note, locale)}</span>
            </div>
          ))}
        </div>
      </div>

      <aside className="rounded-lg border border-border bg-surface-elevated p-6 shadow-lg shadow-teal-500/10">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-teal-50 text-teal-700 dark:bg-teal-500/10 dark:text-teal-200">
            {referralCode ? <Gift className="h-5 w-5" /> : <ShieldCheck className="h-5 w-5" />}
          </div>
          <div>
            <h2 className="text-lg font-black">
              {referralCode
                ? getLocalizedText(registerCopy.referralTitle, locale)
                : getLocalizedText(registerCopy.title, locale)}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
              {getLocalizedText(
                referralCode ? registerCopy.referralBody : registerCopy.noReferralBody,
                locale,
              )}
            </p>
          </div>
        </div>

        {referralCode ? (
          <div className="mt-6 rounded-lg border border-teal-500/20 bg-teal-50 p-4 dark:bg-teal-500/10">
            <p className="text-xs font-black uppercase text-teal-700 dark:text-teal-200">
              {getLocalizedText(registerCopy.referralLabel, locale)}
            </p>
            <p className="mt-2 break-all font-mono text-lg font-black text-foreground">
              {referralCode}
            </p>
          </div>
        ) : null}

        <div className="mt-6 overflow-hidden rounded-lg border border-border bg-background">
          <img
            src="/images/veil-desktop-profile-list.png"
            alt=""
            className="block aspect-[16/10] w-full object-cover object-left-top"
          />
        </div>
      </aside>
    </section>
  );
}
