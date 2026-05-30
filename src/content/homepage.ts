import type { LucideIcon } from 'lucide-react';
import {
  Bot,
  Boxes,
  Cable,
  ChartNoAxesCombined,
  CircleAlert,
  DatabaseZap,
  Fingerprint,
  Gauge,
  Globe2,
  KeyRound,
  LockKeyhole,
  Megaphone,
  MessagesSquare,
  Network,
  ShieldCheck,
  ShoppingCart,
  Workflow,
} from 'lucide-react';
import type { LocalizedText } from './features';

export type HeroSignal = {
  value: string;
  label: LocalizedText;
};

export const heroSignals: HeroSignal[] = [
  {
    value: '∞',
    label: { zh: '本地 Profile 数量', en: 'Local profiles' },
  },
  {
    value: '0',
    label: { zh: '厂商明文留存', en: 'vendor plaintext retention' },
  },
  {
    value: '7733',
    label: { zh: '本地自动化 API', en: 'local automation API' },
  },
];

export const heroProofs: LocalizedText[] = [
  {
    zh: '无限本地 Profile，按账号隔离浏览器环境',
    en: 'Unlimited local profiles with per-account browser isolation',
  },
  {
    zh: 'HTTP API + CDP，直接接入 Playwright / Puppeteer',
    en: 'HTTP API + CDP for Playwright / Puppeteer automation',
  },
  {
    zh: 'Profile 数据默认保存在你的设备或自有环境',
    en: 'Profile data stays on your device or owned environment by default',
  },
];

export const restrictionPlatforms = [
  'Facebook',
  'Amazon',
  'Google',
  'TikTok',
  'LinkedIn',
  'Discord',
] as const;

export type RiskCard = {
  key: string;
  label: LocalizedText;
  detail: LocalizedText;
};

export const riskCards: RiskCard[] = [
  {
    key: 'disabled',
    label: { zh: '账号被停用', en: 'Account disabled' },
    detail: {
      zh: '指纹、IP、Cookie 画像发生异常关联',
      en: 'Fingerprint, IP, and cookies correlate unexpectedly',
    },
  },
  {
    key: 'restricted',
    label: { zh: '权限被限制', en: 'Access restricted' },
    detail: { zh: '平台识别到跨账号共用浏览器环境', en: 'Platform detects shared browser context' },
  },
  {
    key: 'locked',
    label: { zh: '登录被锁定', en: 'Login locked' },
    detail: {
      zh: '时区、语言、代理链路前后不一致',
      en: 'Timezone, language, and proxy lane drift',
    },
  },
];

export type FingerprintFactor = {
  key: string;
  label: string;
  status: LocalizedText;
};

export const fingerprintFactors: FingerprintFactor[] = [
  { key: 'canvas', label: 'Canvas', status: { zh: '稳定', en: 'stable' } },
  { key: 'webgl', label: 'WebGL', status: { zh: '稳定', en: 'stable' } },
  { key: 'audio', label: 'Audio', status: { zh: '稳定', en: 'stable' } },
  { key: 'fonts', label: 'Fonts', status: { zh: '隔离', en: 'isolated' } },
  { key: 'timezone', label: 'Timezone', status: { zh: '匹配', en: 'matched' } },
  { key: 'proxy', label: 'Proxy', status: { zh: '健康', en: 'healthy' } },
];

export type ShowcaseFeature = {
  key: string;
  icon: LucideIcon;
  title: LocalizedText;
  body: LocalizedText;
};

export const showcaseFeatures: ShowcaseFeature[] = [
  {
    key: 'profiles',
    icon: Boxes,
    title: { zh: '全面多账号防关联管理', en: 'Anti-linking profile management' },
    body: {
      zh: '通过为每个账号创建独立 Profile，Veil 将指纹、Cookie、缓存、扩展、代理和本地存储隔离管理。团队可以在同一台设备上安全运行多个账号环境，降低因浏览器环境重叠带来的关联风险。',
      en: 'Create a separate profile for each account. Veil isolates fingerprints, cookies, cache, extensions, proxies, and local storage so teams can safely operate multiple account environments on one device.',
    },
  },
  {
    key: 'fingerprint',
    icon: Fingerprint,
    title: { zh: '稳定一致的真实浏览器环境', en: 'Stable real-browser environments' },
    body: {
      zh: 'Veil 围绕真实浏览器上下文构建 Profile，Canvas、WebGL、Audio、字体、语言、时区等关键环境信号跨会话保持一致。你可以为不同业务场景配置长期稳定的账号画像，而不是每次登录都重新伪装。',
      en: 'Veil builds profiles around real browser contexts, keeping Canvas, WebGL, Audio, fonts, language, timezone, and other signals consistent across sessions. Configure durable account identities instead of masking from scratch every time.',
    },
  },
  {
    key: 'automation',
    icon: Workflow,
    title: { zh: '高效浏览器自动化', en: 'Efficient browser automation' },
    body: {
      zh: '通过本地 HTTP API 启动 Profile，再使用返回的 CDP WebSocket 地址接入 Playwright、Puppeteer 或 Selenium。账号环境、代理、会话与自动化任务可以统一调度，适合批量操作、检查和复盘。',
      en: 'Start profiles through the local HTTP API, then connect Playwright, Puppeteer, or Selenium using the returned CDP WebSocket endpoint. Account environments, proxies, sessions, and automation tasks can be orchestrated together.',
    },
  },
  {
    key: 'encryption',
    icon: LockKeyhole,
    title: { zh: '更安心的数据加密保护', en: 'Safer encrypted data protection' },
    body: {
      zh: 'Profile 数据、主密码和加密密钥默认保存在你的设备或自有环境中。Veil 使用 SQLCipher 整库加密、主密码本地派生和独立 API Key 设计，帮助团队在使用自动化和多账号协作时仍保持清晰的数据边界。',
      en: 'Profile data, the master password, and encryption keys stay on your device or owned environment by default. SQLCipher full-database encryption, local key derivation, and separate API keys keep data boundaries clear during automation and team workflows.',
    },
  },
  {
    key: 'network',
    icon: Network,
    title: { zh: '代理与泄漏风险可视化', en: 'Proxy and leak visibility' },
    body: {
      zh: '出站连接、DNS、WebRTC、代理健康状态都能被审计和复盘。',
      en: 'Outbound traffic, DNS, WebRTC, and proxy health are visible and auditable.',
    },
  },
  {
    key: 'daemon',
    icon: Gauge,
    title: { zh: '独立后台 Daemon', en: 'Independent background daemon' },
    body: {
      zh: 'UI 与浏览器运行时解耦，多开、崩溃恢复、脚本任务都有清晰边界。',
      en: 'UI and runtime are decoupled for multi-window work, crash recovery, and scripted tasks.',
    },
  },
];

export type IndustryPartner = {
  key: string;
  icon: LucideIcon;
  title: LocalizedText;
  body: LocalizedText;
  href: string;
  chips: string[];
  wide?: boolean;
};

export const industryPartnerHeading: LocalizedText = {
  zh: '行业应用场景',
  en: 'Industry use cases',
};

export const industryPartners: IndustryPartner[] = [
  {
    key: 'affiliate',
    icon: Megaphone,
    title: { zh: '联盟营销', en: 'Affiliate marketing' },
    body: {
      zh: '为广告账号、落地页测试和渠道投放建立独立 Profile，绑定稳定代理与指纹画像，降低账号环境交叉带来的关联风险。',
      en: 'Create isolated profiles for ad accounts, landing-page tests, and campaign channels, with stable proxy and fingerprint mapping to reduce environment overlap.',
    },
    href: '/use-cases',
    chips: ['Meta', 'G Ads', 'TikTok'],
  },
  {
    key: 'ecommerce',
    icon: ShoppingCart,
    title: { zh: '跨境电商', en: 'Cross-border e-commerce' },
    body: {
      zh: '为不同店铺、运营人员和区域市场分配独立浏览器环境，让店铺登录、商品维护、客服与数据检查保持清晰边界。',
      en: 'Assign separate browser environments for stores, operators, and markets so sign-ins, listings, support, and checks stay clearly separated.',
    },
    href: '/use-cases',
    chips: ['Amazon', 'Shopify', 'Shopee', 'Temu'],
  },
  {
    key: 'data-automation',
    icon: Bot,
    title: { zh: '网络爬虫', en: 'Web crawling & automation' },
    body: {
      zh: '通过 HTTP API 启动 Profile，并用 CDP 接入 Playwright / Puppeteer / Selenium，在真实浏览器上下文中执行合规采集与自动化任务。',
      en: 'Start profiles through HTTP and connect Playwright, Puppeteer, or Selenium over CDP to run compliant collection and automation in real browser contexts.',
    },
    href: '/automation',
    chips: ['API', 'CDP', 'Logs'],
  },
  {
    key: 'digital-marketing',
    icon: ChartNoAxesCombined,
    title: { zh: '数字营销', en: 'Digital marketing' },
    body: {
      zh: '集中管理广告投放、竞品研究、素材测试和市场验证所需的账号环境，让团队协作更高效，也更容易复盘每次操作。',
      en: 'Manage account environments for paid media, competitor research, creative testing, and market validation with cleaner collaboration and review trails.',
    },
    href: '/use-cases',
    chips: ['Ads', 'SEO', 'CRM'],
    wide: true,
  },
  {
    key: 'social-ops',
    icon: MessagesSquare,
    title: { zh: '社媒运营', en: 'Social media operations' },
    body: {
      zh: '为多个社媒账号建立稳定、可长期使用的 Profile，隔离 Cookie、扩展、代理和本地存储，帮助团队搭建可持续运营的账号矩阵。',
      en: 'Build durable profiles for social accounts, isolating cookies, extensions, proxies, and local storage so teams can operate account matrices sustainably.',
    },
    href: '/use-cases',
    chips: ['X', 'LinkedIn', 'Discord'],
    wide: true,
  },
];

export type WorkflowStep = {
  key: string;
  icon: LucideIcon;
  title: LocalizedText;
  body: LocalizedText;
};

export const workflowSteps: WorkflowStep[] = [
  {
    key: 'create',
    icon: Fingerprint,
    title: { zh: '创建稳定画像', en: 'Create a stable identity' },
    body: {
      zh: '为账号固定指纹种子、代理、时区、语言与扩展集合。',
      en: 'Pin a fingerprint seed, proxy, timezone, language, and extension set.',
    },
  },
  {
    key: 'operate',
    icon: Globe2,
    title: { zh: '隔离运行账号', en: 'Run accounts in isolation' },
    body: {
      zh: '同一设备上多窗口并行，Cookie 和本地存储互不交叉。',
      en: 'Run multiple windows on one device without cookie or local-storage bleed.',
    },
  },
  {
    key: 'automate',
    icon: Cable,
    title: { zh: '接入自动化', en: 'Attach automation' },
    body: {
      zh: '脚本通过本地 API 调度 Profile，不触碰主密码和人工会话。',
      en: 'Scripts orchestrate profiles through the local API without touching the master password.',
    },
  },
];

export type SecurityProof = {
  key: string;
  icon: LucideIcon;
  title: LocalizedText;
  body: LocalizedText;
};

export const securityProofs: SecurityProof[] = [
  {
    key: 'local-first',
    icon: DatabaseZap,
    title: { zh: '数据在你的设备上', en: 'Data stays on your device' },
    body: {
      zh: 'Veil 不提供云端数据托管，也不保存 Profile 明文。',
      en: 'Veil does not host cloud profile data or retain plaintext.',
    },
  },
  {
    key: 'keys',
    icon: KeyRound,
    title: { zh: '密钥不离开本机', en: 'Keys never leave the machine' },
    body: {
      zh: '主密码与派生密钥只在本机使用，服务端无法重置或读取。',
      en: 'The master password and derived keys are used locally, not resettable by a server.',
    },
  },
  {
    key: 'threats',
    icon: CircleAlert,
    title: { zh: '威胁模型讲清楚', en: 'Clear threat model' },
    body: {
      zh: '明确列出覆盖与不覆盖的风险，避免用安全话术替代边界。',
      en: 'Covered and uncovered risks are named clearly instead of hidden behind vague security language.',
    },
  },
  {
    key: 'audit',
    icon: ShieldCheck,
    title: { zh: '实现可被审计', en: 'Inspectable implementation' },
    body: {
      zh: '加密链路、自动化鉴权、出站连接都对应可检查的系统设计。',
      en: 'Encryption, automation auth, and outbound connections map to inspectable system design.',
    },
  },
];
