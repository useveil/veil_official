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
  activationCodeLabel: LocalizedText;
  activationCodePlaceholder: LocalizedText;
  verificationCodeLabel: LocalizedText;
  verificationCodePlaceholder: LocalizedText;
  getVerificationCodeLabel: LocalizedText;
  passwordLabel: LocalizedText;
  passwordPlaceholder: LocalizedText;
  confirmPasswordLabel: LocalizedText;
  confirmPasswordPlaceholder: LocalizedText;
  agreementPrefix: LocalizedText;
  termsLabel: LocalizedText;
  privacyLabel: LocalizedText;
  agreementConnector: LocalizedText;
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
    zh: '注册',
    en: 'Register',
    ja: '登録',
    ko: '가입',
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
  activationCodeLabel: {
    zh: '激活码',
    en: 'Activation code',
    ja: 'アクティベーションコード',
    ko: '활성화 코드',
  },
  activationCodePlaceholder: {
    zh: '选填',
    en: 'Optional',
    ja: '任意',
    ko: '선택 사항',
  },
  verificationCodeLabel: {
    zh: '验证码',
    en: 'Verification code',
    ja: '認証コード',
    ko: '인증 코드',
  },
  verificationCodePlaceholder: {
    zh: '请输入验证码',
    en: 'Enter verification code',
    ja: '認証コードを入力',
    ko: '인증 코드를 입력하세요',
  },
  getVerificationCodeLabel: {
    zh: '获取验证码',
    en: 'Get code',
    ja: 'コードを取得',
    ko: '코드 받기',
  },
  passwordLabel: {
    zh: '密码',
    en: 'Password',
    ja: 'パスワード',
    ko: '비밀번호',
  },
  passwordPlaceholder: {
    zh: '请输入密码',
    en: 'Enter password',
    ja: 'パスワードを入力',
    ko: '비밀번호를 입력하세요',
  },
  confirmPasswordLabel: {
    zh: '确认密码',
    en: 'Confirm password',
    ja: 'パスワードを確認',
    ko: '비밀번호 확인',
  },
  confirmPasswordPlaceholder: {
    zh: '请再次输入密码',
    en: 'Enter password again',
    ja: 'もう一度パスワードを入力',
    ko: '비밀번호를 다시 입력하세요',
  },
  agreementPrefix: {
    zh: '我已阅读并同意',
    en: 'I have read and agree to the',
    ja: '私は以下に同意します:',
    ko: '다음을 읽고 동의합니다:',
  },
  termsLabel: {
    zh: '用户协议',
    en: 'Terms of Service',
    ja: '利用規約',
    ko: '이용약관',
  },
  privacyLabel: {
    zh: '隐私政策',
    en: 'Privacy Policy',
    ja: 'プライバシーポリシー',
    ko: '개인정보 처리방침',
  },
  agreementConnector: {
    zh: '和',
    en: 'and',
    ja: 'および',
    ko: '및',
  },
  referralLabel: {
    zh: '激活码',
    en: 'Activation code',
    ja: 'アクティベーションコード',
    ko: '활성화 코드',
  },
};

function getAgreementLabel(locale: Locale) {
  return (
    <>
      {getLocalizedText(registerCopy.agreementPrefix, locale)}{' '}
      <a className="font-medium text-indigo-600 hover:text-indigo-500" href="/terms">
        {getLocalizedText(registerCopy.termsLabel, locale)}
      </a>{' '}
      {getLocalizedText(registerCopy.agreementConnector, locale)}{' '}
      <a className="font-medium text-indigo-600 hover:text-indigo-500" href="/privacy">
        {getLocalizedText(registerCopy.privacyLabel, locale)}
      </a>
    </>
  );
}

export function RegisterContent({
  locale,
  referralCode,
}: {
  locale: Locale;
  referralCode?: string;
}) {
  const downloadHref = '/download';

  return (
    <>
      <style>{`
        html,
        body {
          height: 100%;
          overflow: hidden;
        }
      `}</style>
      <AuthEntryPage
        className="fixed inset-0 z-[60] overflow-hidden"
        copy={{
          title: getLocalizedText(registerCopy.title, locale),
          emailLabel: getLocalizedText(registerCopy.emailLabel, locale),
          emailPlaceholder: getLocalizedText(registerCopy.emailPlaceholder, locale),
          dividerLabel: getLocalizedText(registerCopy.dividerLabel, locale),
          existingAccountLabel: getLocalizedText(registerCopy.existingAccountLabel, locale),
          signInLabel: getLocalizedText(registerCopy.signInLabel, locale),
          activationCodeLabel: getLocalizedText(registerCopy.activationCodeLabel, locale),
          activationCodePlaceholder: getLocalizedText(
            registerCopy.activationCodePlaceholder,
            locale,
          ),
          verificationCodeLabel: getLocalizedText(registerCopy.verificationCodeLabel, locale),
          verificationCodePlaceholder: getLocalizedText(
            registerCopy.verificationCodePlaceholder,
            locale,
          ),
          passwordLabel: getLocalizedText(registerCopy.passwordLabel, locale),
          passwordPlaceholder: getLocalizedText(registerCopy.passwordPlaceholder, locale),
          confirmPasswordLabel: getLocalizedText(registerCopy.confirmPasswordLabel, locale),
          confirmPasswordPlaceholder: getLocalizedText(
            registerCopy.confirmPasswordPlaceholder,
            locale,
          ),
          agreementLabel: getAgreementLabel(locale),
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
        methodLayout="compact"
        referralCode={referralCode}
        showActivationCodeInput
        activationCodeInputName="ref"
        showVerificationCodeInput
        verificationCodeInputName="verificationCode"
        verificationCodeAction={{
          label: getLocalizedText(registerCopy.getVerificationCodeLabel, locale),
        }}
        showPasswordInputs
        requireAgreement
        brandLogoSrc="/brand/veil-app-icon.svg"
        brandLogoAlt="Veil"
      />
    </>
  );
}
