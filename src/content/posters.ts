import type { LocalizedText } from './features';

export type PosterAsset = {
  key: string;
  src: string;
  width: number;
  height: number;
  alt: LocalizedText;
  title: LocalizedText;
  caption: LocalizedText;
};

export const heroPoster: PosterAsset = {
  key: 'encryption-stack',
  src: '/images/posters/poster-encryption-stack.svg',
  width: 1200,
  height: 1500,
  alt: {
    zh: 'Veil 加密栈：从主密码到 SQLCipher 整库加密的四层结构示意图',
    en: 'Veil encryption stack: four-layer diagram from master password to SQLCipher full-database encryption',
  },
  title: {
    zh: '层层可审计',
    en: 'Auditable, layer by layer',
  },
  caption: {
    zh: 'Argon2id · AES-256-GCM · SQLCipher',
    en: 'Argon2id · AES-256-GCM · SQLCipher',
  },
};

export const galleryPosters: PosterAsset[] = [
  {
    key: 'fingerprint',
    src: '/images/posters/poster-fingerprint.svg',
    width: 1280,
    height: 800,
    alt: {
      zh: '抽象指纹纹路与种子稳定性可视化',
      en: 'Abstract fingerprint pattern with deterministic seed metadata',
    },
    title: {
      zh: '确定性指纹画像',
      en: 'Deterministic fingerprint',
    },
    caption: {
      zh: 'Canvas / WebGL / Audio 信号跨会话一致',
      en: 'Canvas / WebGL / Audio signals stable across sessions',
    },
  },
  {
    key: 'network-audit',
    src: '/images/posters/poster-network-audit.svg',
    width: 1280,
    height: 800,
    alt: {
      zh: '出站连接审计示意图：本机 Profile 与外部节点的连接关系',
      en: 'Outbound audit diagram: connections between the local profile and external nodes',
    },
    title: {
      zh: '出站全部可见',
      en: 'Every outbound, visible',
    },
    caption: {
      zh: '代理健康 · DNS / WebRTC 泄漏防护',
      en: 'Proxy health · DNS / WebRTC leak guard',
    },
  },
  {
    key: 'isolation',
    src: '/images/posters/poster-isolation.svg',
    width: 1280,
    height: 800,
    alt: {
      zh: '四个 Profile 隔离卡片：Vault / Wallet / Shop / Bot',
      en: 'Four isolated profile cards: Vault / Wallet / Shop / Bot',
    },
    title: {
      zh: '隔离即基础设施',
      en: 'Isolation as infrastructure',
    },
    caption: {
      zh: '独立代理 / DNS / 加密容器，无 cross-context 残留',
      en: 'Per-profile proxy / DNS / encrypted container — no cross-context residue',
    },
  },
];
