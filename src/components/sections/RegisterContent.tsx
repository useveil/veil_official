import { type LocalizedText, getLocalizedText } from '@/content/features';
import type { Locale } from '@/i18n/routing';
import { AuthEntryPage } from '@veil/auth-pages';

type RegisterCopy = {
  title: LocalizedText;
  emailLabel: LocalizedText;
  emailPlaceholder: LocalizedText;
  continueLabel: LocalizedText;
  dividerLabel: LocalizedText;
  googleLabel: LocalizedText;
  githubLabel: LocalizedText;
  appleLabel: LocalizedText;
  existingAccountLabel: LocalizedText;
  signInLabel: LocalizedText;
  terms: LocalizedText;
  referralLabel: LocalizedText;
};

const registerCopy: RegisterCopy = {
  title: {
    zh: '注册',
    en: 'Register',
    ja: '登録',
    ko: '가입',
  },
  emailLabel: {
    zh: '邮箱',
    en: 'Email',
    ja: 'メール',
    ko: '이메일',
  },
  emailPlaceholder: {
    zh: '您的邮箱地址',
    en: 'Your email address',
    ja: 'メールアドレス',
    ko: '이메일 주소',
  },
  continueLabel: {
    zh: '继续',
    en: 'Continue',
    ja: '続行',
    ko: '계속',
  },
  dividerLabel: {
    zh: '或',
    en: 'or',
    ja: 'または',
    ko: '또는',
  },
  googleLabel: {
    zh: '使用 Google 继续',
    en: 'Continue with Google',
    ja: 'Google で続行',
    ko: 'Google로 계속',
  },
  githubLabel: {
    zh: '使用 GitHub 继续',
    en: 'Continue with GitHub',
    ja: 'GitHub で続行',
    ko: 'GitHub로 계속',
  },
  appleLabel: {
    zh: '使用 Apple 继续',
    en: 'Continue with Apple',
    ja: 'Apple で続行',
    ko: 'Apple로 계속',
  },
  existingAccountLabel: {
    zh: '已有账户？',
    en: 'Already have an account?',
    ja: 'すでにアカウントをお持ちですか？',
    ko: '이미 계정이 있으신가요?',
  },
  signInLabel: {
    zh: '登录',
    en: 'Sign in',
    ja: 'ログイン',
    ko: '로그인',
  },
  terms: {
    zh: '创建账户即表示您同意 服务条款和 隐私政策',
    en: 'By creating an account, you agree to the Terms of Service and Privacy Policy.',
    ja: 'アカウントを作成すると、利用規約とプライバシーポリシーに同意したことになります。',
    ko: '계정을 만들면 서비스 약관 및 개인정보 처리방침에 동의하는 것입니다.',
  },
  referralLabel: {
    zh: '邀请码',
    en: 'Referral code',
    ja: '紹介コード',
    ko: '추천 코드',
  },
};

export function RegisterContent({
  locale,
  referralCode,
}: {
  locale: Locale;
  referralCode?: string;
}) {
  const downloadHref = '/download';

  return (
    <AuthEntryPage
      className="fixed inset-0 z-[60] overflow-y-auto"
      copy={{
        title: getLocalizedText(registerCopy.title, locale),
        emailLabel: getLocalizedText(registerCopy.emailLabel, locale),
        emailPlaceholder: getLocalizedText(registerCopy.emailPlaceholder, locale),
        dividerLabel: getLocalizedText(registerCopy.dividerLabel, locale),
        existingAccountLabel: getLocalizedText(registerCopy.existingAccountLabel, locale),
        signInLabel: getLocalizedText(registerCopy.signInLabel, locale),
        terms: getLocalizedText(registerCopy.terms, locale),
        referralLabel: getLocalizedText(registerCopy.referralLabel, locale),
      }}
      primaryAction={{
        href: downloadHref,
        label: getLocalizedText(registerCopy.continueLabel, locale),
      }}
      secondaryAction={{
        href: downloadHref,
        label: getLocalizedText(registerCopy.signInLabel, locale),
      }}
      methods={[
        {
          id: 'google',
          href: downloadHref,
          label: getLocalizedText(registerCopy.googleLabel, locale),
        },
        {
          id: 'github',
          href: downloadHref,
          label: getLocalizedText(registerCopy.githubLabel, locale),
        },
        {
          id: 'apple',
          href: downloadHref,
          label: getLocalizedText(registerCopy.appleLabel, locale),
        },
      ]}
      referralCode={referralCode}
      brandLogoSrc="/brand/veil-app-icon.svg"
      brandLogoAlt="Veil"
    />
  );
}
