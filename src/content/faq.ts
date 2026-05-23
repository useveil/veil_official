import type { LocalizedText } from './features';

export type FaqItem = {
  key: string;
  question: LocalizedText;
  answer: LocalizedText;
};

export type FaqGroup = {
  key: string;
  title: LocalizedText;
  items: FaqItem[];
};

export const faqGroups: FaqGroup[] = [
  {
    key: 'security',
    title: { zh: '安全与加密', en: 'Security & Encryption' },
    items: [
      {
        key: 'master-password-lost',
        question: {
          zh: '忘记主密码怎么办？',
          en: 'What if I forget my master password?',
        },
        answer: {
          zh: 'Veil 的设计是：服务端无法重置主密码。请在初始化时妥善保存 24 词 BIP39 恢复短语；它是找回数据的唯一方式。',
          en: 'By design, the server cannot reset your master password. Keep the 24-word BIP39 recovery phrase safe — it is the only way to recover data.',
        },
      },
      {
        key: 'server-breach',
        question: {
          zh: '如果服务端被攻破，我的数据会泄露吗？',
          en: 'What happens if the server is breached?',
        },
        answer: {
          zh: '不会泄露明文。所有同步内容在客户端使用 AES-256-GCM 加密；密钥从未离开你的设备。攻击者只能拿到密文。',
          en: 'No plaintext leaks. Synced content is AES-256-GCM encrypted on the client; keys never leave your device. Attackers only see ciphertext.',
        },
      },
    ],
  },
  {
    key: 'automation',
    title: { zh: '自动化与开发', en: 'Automation & Development' },
    items: [
      {
        key: 'cdp-compatible',
        question: {
          zh: 'Veil 兼容现有的 Playwright / Puppeteer 脚本吗？',
          en: 'Is Veil compatible with existing Playwright / Puppeteer scripts?',
        },
        answer: {
          zh: '兼容。Veil 暴露标准 CDP 端点，可直接作为远程浏览器接入。同时提供 HTTP API 管理 Profile 生命周期。',
          en: 'Yes. Veil exposes standard CDP endpoints that connect as a remote browser. An HTTP API also manages profile lifecycle.',
        },
      },
      {
        key: 'api-rate-limit',
        question: {
          zh: 'API 调用有限制吗？',
          en: 'Are there API rate limits?',
        },
        answer: {
          zh: '本地 API 无人为限速。请注意本机性能上限：默认建议同时活跃 Profile ≤ 50。',
          en: 'No artificial rate limits on the local API. Note the local performance cap: we recommend ≤ 50 concurrent active profiles by default.',
        },
      },
    ],
  },
  {
    key: 'open-source',
    title: { zh: '开源与商业', en: 'Open Source & Commercial' },
    items: [
      {
        key: 'license',
        question: {
          zh: 'Veil 用什么开源协议？可以二次开发吗？',
          en: 'What is the license? Can I fork and modify?',
        },
        answer: {
          zh: 'AGPL-3.0。允许审计、编译、修改和自托管。如果你把修改版作为网络服务对外提供，需要按 AGPL 公开你的修改。',
          en: 'AGPL-3.0. You may audit, build, modify, and self-host. If you offer a modified version as a network service, you must publish your modifications under AGPL.',
        },
      },
      {
        key: 'pricing',
        question: {
          zh: '本体收费吗？',
          en: 'Is the core product paid?',
        },
        answer: {
          zh: '不收费。Veil 桌面端完全免费且开源。未来零知识云同步会以订阅形式提供，但本体永远免费。',
          en: 'No. The Veil desktop app is free and open source. A future zero-knowledge cloud sync will be a subscription, but the core stays free forever.',
        },
      },
    ],
  },
];
