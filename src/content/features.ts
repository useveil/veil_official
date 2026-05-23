import type { Locale } from '@/i18n/routing';
import type { LucideIcon } from 'lucide-react';
import { Fingerprint, Gauge, LockKeyhole, Network, ServerCog, Workflow } from 'lucide-react';

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
    key: 'no-data-retention',
    icon: LockKeyhole,
    title: {
      zh: '我们不存你的数据',
      en: "We don't store your data",
    },
    body: {
      zh: '主密码与加密密钥只留在你的设备上。我们卖软件，不提供数据托管，没有任何上传通道，攻不破我们也救不了我们——因为我们这里没东西可拿。',
      en: 'Master password and encryption keys live only on your device. We sell software, not data hosting — there is no upload channel and nothing for an attacker to take from us.',
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
    key: 'self-hostable',
    icon: ServerCog,
    title: {
      zh: '完全可自托管',
      en: 'Fully self-hostable',
    },
    body: {
      zh: '个人版和企业版都支持私有部署。所有运行时（数据库、密钥、自动化端点）只跑在你自己的机器或服务器上，从不经过我们的基础设施。',
      en: 'Both personal and enterprise editions support private deployment. Every runtime piece — database, keys, automation endpoints — runs on your own machine or server, never on our infrastructure.',
    },
    highlight: true,
  },
];
