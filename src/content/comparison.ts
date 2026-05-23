import type { LocalizedText } from './features';

export type ComparisonCell = LocalizedText | { value: 'yes' | 'no' | 'partial' };

export type ComparisonRow = {
  key: string;
  feature: LocalizedText;
  veil: ComparisonCell;
  multilogin: ComparisonCell;
  adspower: ComparisonCell;
  bitbrowser: ComparisonCell;
  vmlogin: ComparisonCell;
};

export const comparisonColumns = [
  'veil',
  'multilogin',
  'adspower',
  'bitbrowser',
  'vmlogin',
] as const;
export const comparisonLabels = {
  veil: 'Veil',
  multilogin: 'Multilogin',
  adspower: 'AdsPower',
  bitbrowser: 'BitBrowser',
  vmlogin: 'VMLogin',
};

export const comparisonRows: ComparisonRow[] = [
  {
    key: 'self-hosted',
    feature: { zh: '可自托管', en: 'Self-hostable' },
    veil: { value: 'yes' },
    multilogin: { value: 'no' },
    adspower: { value: 'no' },
    bitbrowser: { value: 'no' },
    vmlogin: { value: 'no' },
  },
  {
    key: 'zero-knowledge',
    feature: { zh: '零知识加密同步', en: 'Zero-knowledge sync' },
    veil: { zh: '路线图（Phase 2）', en: 'On roadmap (Phase 2)' },
    multilogin: { value: 'no' },
    adspower: { value: 'no' },
    bitbrowser: { value: 'no' },
    vmlogin: { value: 'no' },
  },
  {
    key: 'local-encryption',
    feature: { zh: '本机整库加密', en: 'Local full-database encryption' },
    veil: { zh: 'SQLCipher', en: 'SQLCipher' },
    multilogin: { value: 'partial' },
    adspower: { value: 'no' },
    bitbrowser: { value: 'no' },
    vmlogin: { value: 'no' },
  },
  {
    key: 'cdp-compatible',
    feature: { zh: 'CDP 兼容（Playwright/Puppeteer）', en: 'CDP-compatible' },
    veil: { value: 'yes' },
    multilogin: { value: 'yes' },
    adspower: { value: 'yes' },
    bitbrowser: { value: 'yes' },
    vmlogin: { value: 'yes' },
  },
  {
    key: 'http-api',
    feature: { zh: 'HTTP API', en: 'HTTP API' },
    veil: { value: 'yes' },
    multilogin: { value: 'yes' },
    adspower: { value: 'yes' },
    bitbrowser: { value: 'yes' },
    vmlogin: { value: 'partial' },
  },
  {
    key: 'price',
    feature: { zh: '本体价格', en: 'Core pricing' },
    veil: { zh: '免费', en: 'Free' },
    multilogin: { zh: '$99/月起', en: 'From $99/mo' },
    adspower: { zh: '$5.4/月起', en: 'From $5.4/mo' },
    bitbrowser: { zh: '免费 + 收费档', en: 'Free + paid tiers' },
    vmlogin: { zh: '$59/月起', en: 'From $59/mo' },
  },
];
