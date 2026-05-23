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
    veil: { zh: '免费 · 无限环境', en: 'Free · unlimited profiles' },
    multilogin: { zh: '$7.08/月 · 10 环境', en: '$7.08/mo · 10 profiles' },
    adspower: { zh: '$7.2/月 · 10 环境', en: '$7.2/mo · 10 profiles' },
    bitbrowser: { zh: '$10/月 · 50 环境', en: '$10/mo · 50 profiles' },
    vmlogin: { zh: '$100/月 · 200 环境', en: '$100/mo · 200 profiles' },
  },
];
