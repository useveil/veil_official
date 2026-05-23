import type { Locale } from '@/i18n/routing';
import type { LucideIcon } from 'lucide-react';
import { Blocks, Fingerprint, Gauge, LockKeyhole, Network, Workflow } from 'lucide-react';

export type LocalizedText = Partial<Record<Locale, string>> & { zh: string; en: string };

export function getLocalizedText(text: LocalizedText, locale: Locale) {
  return text[locale] ?? text.en;
}

export type Feature = {
  key: string;
  icon: LucideIcon;
  title: LocalizedText;
  body: LocalizedText;
  highlight?: boolean;
};

export const features: Feature[] = [
  {
    key: 'zero-knowledge',
    icon: LockKeyhole,
    title: {
      zh: '零知识加密',
      en: 'Zero-knowledge encryption',
    },
    body: {
      zh: '主密码只留在本机，敏感数据经客户端加密后落库，云同步也只处理密文。',
      en: 'Master password stays on your device. Sensitive data is client-side encrypted before storage; cloud sync only handles ciphertext.',
    },
    highlight: true,
  },
  {
    key: 'deterministic-fingerprint',
    icon: Fingerprint,
    title: {
      zh: '一致的指纹画像',
      en: 'Deterministic fingerprint',
    },
    body: {
      zh: 'Profile 使用确定性种子，Canvas、WebGL、Audio、字体、平台等信号保持一致。',
      en: 'Profiles use deterministic seeds. Canvas, WebGL, Audio, fonts, and platform signals stay consistent across sessions.',
    },
    highlight: true,
  },
  {
    key: 'transparent-network',
    icon: Network,
    title: {
      zh: '网络行为透明',
      en: 'Transparent network behavior',
    },
    body: {
      zh: '本机出站连接、代理健康、DNS 与 WebRTC 泄漏风险都能在 UI 中被看见。',
      en: 'Outbound connections, proxy health, DNS and WebRTC leak risks are all visible in the UI.',
    },
  },
  {
    key: 'automation-ready',
    icon: Workflow,
    title: {
      zh: '自动化友好',
      en: 'Automation-ready',
    },
    body: {
      zh: '内置 HTTP API 与 CDP 代理，可直接连接 Playwright、Puppeteer 和 Selenium。',
      en: 'Built-in HTTP API and CDP proxy connect directly to Playwright, Puppeteer, and Selenium.',
    },
  },
  {
    key: 'independent-daemon',
    icon: Gauge,
    title: {
      zh: '独立 Daemon',
      en: 'Independent daemon',
    },
    body: {
      zh: 'UI 与后台进程解耦，任务运行、窗口多开和崩溃恢复都有清晰边界。',
      en: 'UI and background process are decoupled with clear boundaries for task execution, multi-window, and crash recovery.',
    },
  },
  {
    key: 'open-auditable',
    icon: Blocks,
    title: {
      zh: '开源可审计',
      en: 'Open and auditable',
    },
    body: {
      zh: '核心引擎 AGPL-3.0 开源，用户可以审计、编译、自托管和独立验证承诺。',
      en: 'Core engine is AGPL-3.0 licensed. Users can audit, compile, self-host, and independently verify our promises.',
    },
    highlight: true,
  },
];
