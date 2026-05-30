import { RegisterContent } from '@/components/sections/RegisterContent';
import { type Locale, routing } from '@/i18n/routing';
import { buildPageMetadata } from '@/lib/seo';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';

type RegisterPageProps = {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const REGISTER_TITLE: Record<Locale, string> = {
  zh: '注册 Veil',
  en: 'Register for Veil',
  ja: 'Veil に登録',
  ko: 'Veil 가입',
};

const REGISTER_DESCRIPTION: Record<Locale, string> = {
  zh: '打开 Veil 注册入口，保留邀请信息，并下载桌面端完成账号注册或登录。',
  en: 'Open the Veil registration entry, preserve referral details, and download the desktop app to finish registration or sign-in.',
  ja: 'Veil の登録入口を開き、紹介情報を保持して、デスクトップアプリで登録またはログインを完了します。',
  ko: 'Veil 가입 진입점을 열고 추천 정보를 보존한 뒤 데스크톱 앱에서 가입 또는 로그인을 완료합니다.',
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return buildPageMetadata({
    locale,
    namespace: 'home.hero',
    path: '/register',
    titleOverride: REGISTER_TITLE[locale],
    descriptionOverride: REGISTER_DESCRIPTION[locale],
  });
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RegisterPage({ params, searchParams }: RegisterPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <RegisterContent locale={locale} referralCode={readReferralCode(await searchParams)} />;
}

function readReferralCode(searchParams: Record<string, string | string[] | undefined>) {
  const raw = searchParams.ref;
  const value = Array.isArray(raw) ? raw[0] : raw;
  const trimmed = value?.trim();
  if (!trimmed) return undefined;

  const normalized = trimmed.replace(/[^\w-]/g, '').slice(0, 64);
  return normalized || undefined;
}
