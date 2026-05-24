import type { LocalizedText } from './features';

export type PricingTier = {
  key: string;
  duration: LocalizedText;
  priceUSD: number;
  monthlyEquivUSD: number;
  savePercent?: number;
  badge?: LocalizedText;
  /** 用作行内的"省 X%"标记或亮点 */
  highlight?: LocalizedText;
  /** 该档相对前一档的对比说明 */
  compareNote?: LocalizedText;
  buyUrl: string;
  recommended?: boolean;
};

export type PricingFeature = {
  key: string;
  label: LocalizedText;
  /** 可选：每档的具体值；若所有档相同，可省略 */
  value?: LocalizedText;
};

export const pricingTiers: PricingTier[] = [
  {
    key: '1y',
    duration: { zh: '1 年', en: '1 year' },
    priceUSD: 29.9,
    monthlyEquivUSD: 2.49,
    badge: { zh: '入门', en: 'Starter' },
    buyUrl: 'mailto:support@useveil.xyz?subject=Veil%20License%20-%201%20year',
  },
  {
    key: '3y',
    duration: { zh: '3 年', en: '3 years' },
    priceUSD: 69.9,
    monthlyEquivUSD: 1.94,
    savePercent: 22,
    badge: { zh: '最受欢迎', en: 'Most popular' },
    highlight: { zh: '相比 1 年订阅省 22%', en: 'Save 22% vs 1-year' },
    buyUrl: 'mailto:support@useveil.xyz?subject=Veil%20License%20-%203%20years',
    recommended: true,
  },
  {
    key: '5y',
    duration: { zh: '5 年', en: '5 years' },
    priceUSD: 100,
    monthlyEquivUSD: 1.67,
    savePercent: 33,
    badge: { zh: '长期方案', en: 'Long-term' },
    highlight: { zh: '相比 1 年订阅省 33%', en: 'Save 33% vs 1-year' },
    buyUrl: 'mailto:support@useveil.xyz?subject=Veil%20License%20-%205%20years',
  },
];

// 所有档共享的能力，避免 marketing 噪音
export const pricingShared: PricingFeature[] = [
  {
    key: 'unlimited-profiles',
    label: { zh: '无限 Profile', en: 'Unlimited profiles' },
  },
  {
    key: 'self-hostable',
    label: { zh: '可自托管（个人版 / 企业版）', en: 'Self-hostable (personal · enterprise)' },
  },
  {
    key: 'no-data-retention',
    label: {
      zh: '不留存你的数据，我们卖软件、不卖数据托管',
      en: "We don't store your data — we sell software, not data hosting",
    },
  },
  {
    key: 'platforms',
    label: { zh: '全平台原生：macOS · Windows · Linux', en: 'Native: macOS · Windows · Linux' },
  },
  {
    key: 'automation',
    label: { zh: 'HTTP API + CDP 自动化端点', en: 'HTTP API + CDP automation endpoints' },
  },
  {
    key: 'updates',
    label: { zh: '订阅期内全部更新与小版本', en: 'All updates during subscription period' },
  },
  {
    key: 'support',
    label: { zh: '邮件 + 社区支持', en: 'Email + community support' },
  },
];
