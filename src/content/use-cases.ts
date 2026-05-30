import type { LucideIcon } from 'lucide-react';
import {
  Boxes,
  CircuitBoard,
  Megaphone,
  SearchCode,
  ShoppingCart,
  TerminalSquare,
} from 'lucide-react';
import type { LocalizedText } from './features';

export type UseCase = {
  key: string;
  icon: LucideIcon;
  title: LocalizedText;
  tagline: LocalizedText;
  narrative: LocalizedText;
  capabilities: LocalizedText[];
  platforms: string[];
};

export const useCases: UseCase[] = [
  {
    key: 'affiliate',
    icon: Megaphone,
    title: { zh: '联盟营销', en: 'Affiliate marketing' },
    tagline: {
      zh: '让广告账号、落地页和测试环境保持独立',
      en: 'Keep ad accounts, landing pages, and testing environments separate',
    },
    narrative: {
      zh: '为广告投放与联盟营销团队提供稳定 Profile、代理映射和自动化接入，降低账号之间因为浏览器环境重叠而被关联的风险。',
      en: 'Stable profiles, proxy mapping, and automation access for ad and affiliate teams, reducing risk from overlapping browser environments.',
    },
    capabilities: [
      { zh: '账号级指纹种子与代理绑定', en: 'Account-level fingerprint seed and proxy binding' },
      { zh: '批量打开、检查与回收 Profile', en: 'Batch open, inspect, and recycle profiles' },
      { zh: '可审计的自动化脚本接入', en: 'Auditable automation access' },
    ],
    platforms: ['Facebook', 'Google Ads', 'TikTok'],
  },
  {
    key: 'multi-account',
    icon: Boxes,
    title: { zh: '多账号运营', en: 'Multi-account operations' },
    tagline: {
      zh: '一台机器，几十个完全隔离的身份',
      en: 'Dozens of fully isolated identities on a single machine',
    },
    narrative: {
      zh: '每个 Profile 拥有独立的指纹画像、Cookie、缓存、扩展和代理通道。窗口之间无 cross-context 残留；本机不留明文数据；同步只处理密文。适合广告、社媒、电商等高价值多账号场景。',
      en: 'Each Profile holds its own fingerprint, cookies, cache, extensions, and proxy lane. No cross-context residue between windows; no plaintext on disk; only ciphertext synced. Ideal for ad, social, and e-commerce multi-account operations.',
    },
    capabilities: [
      {
        zh: '确定性指纹种子，画像跨会话稳定',
        en: 'Deterministic seeds, stable identities across sessions',
      },
      { zh: '每 Profile 独立代理、独立 DNS', en: 'Per-profile proxy, per-profile DNS' },
      {
        zh: '本地数据 AES-256 加密 + SQLCipher 整库',
        en: 'AES-256 + SQLCipher full-database encryption',
      },
    ],
    platforms: ['Facebook', 'LinkedIn', 'Discord'],
  },
  {
    key: 'web3',
    icon: CircuitBoard,
    title: { zh: 'Web3 钱包隔离', en: 'Web3 wallet isolation' },
    tagline: {
      zh: '把私钥风险关在最小的容器里',
      en: 'Contain key risk in the smallest possible container',
    },
    narrative: {
      zh: '每个钱包 Profile 与浏览扩展、Cookie、签名授权完全隔离。可审计每次出站连接；恢复短语本机持有，丢失主密码无法找回，也无法被服务端窃取。',
      en: 'Each wallet profile is fully isolated from other extensions, cookies, and signing approvals. Every outbound connection is auditable. Recovery phrase stays local — server-side compromise cannot leak it.',
    },
    capabilities: [
      { zh: 'BIP39 24 词恢复短语', en: 'BIP39 24-word recovery phrase' },
      { zh: '出站连接审计', en: 'Outbound connection audit' },
      { zh: '钱包扩展隔离', en: 'Wallet extension isolation' },
    ],
    platforms: ['MetaMask', 'WalletConnect', 'DeFi'],
  },
  {
    key: 'ecommerce',
    icon: ShoppingCart,
    title: { zh: '电商运营', en: 'E-commerce operations' },
    tagline: {
      zh: '稳定的店铺画像，可解释的合规姿态',
      en: 'Stable storefront identities with explainable compliance',
    },
    narrative: {
      zh: '店铺 Profile 的指纹、IP、时区、语言、字体保持一致；可审计的运行日志便于合规交付；崩溃恢复保证长时间会话不丢工作。',
      en: 'Storefront profiles maintain consistent fingerprint, IP, timezone, language, and fonts. Auditable run logs enable compliance reporting; crash recovery protects long-running sessions.',
    },
    capabilities: [
      { zh: '稳定 IP / 时区 / 语言映射', en: 'Stable IP / timezone / language mapping' },
      { zh: '审计日志可导出', en: 'Exportable audit logs' },
      { zh: '崩溃恢复保留会话', en: 'Crash-resilient sessions' },
    ],
    platforms: ['Amazon', 'Shopify', 'Shopee', 'Temu'],
  },
  {
    key: 'web-scraping',
    icon: SearchCode,
    title: { zh: '自动化采集', en: 'Browser automation' },
    tagline: {
      zh: '用真实浏览器上下文运行脚本任务',
      en: 'Run scripted work in real browser contexts',
    },
    narrative: {
      zh: '通过本地 HTTP API 启动 Profile，再让 CDP 框架接管页面。适合需要隔离账号、代理、会话和运行日志的自动化团队。',
      en: 'Start profiles through the local HTTP API and hand them to CDP frameworks. Useful for teams that need isolated accounts, proxies, sessions, and run logs.',
    },
    capabilities: [
      {
        zh: 'Playwright / Puppeteer / Selenium 接入',
        en: 'Playwright / Puppeteer / Selenium access',
      },
      { zh: 'Profile 生命周期 API', en: 'Profile lifecycle API' },
      { zh: '脚本访问与主密码分离', en: 'Script access separated from the master password' },
    ],
    platforms: ['Playwright', 'Puppeteer', 'Selenium'],
  },
  {
    key: 'automation',
    icon: TerminalSquare,
    title: { zh: '自动化团队', en: 'Automation teams' },
    tagline: {
      zh: 'Profile 即基础设施，Playwright 直接接入',
      en: 'Profiles as infrastructure, Playwright connects directly',
    },
    narrative: {
      zh: '通过本地 HTTP 管理 API 启动 Profile，再使用返回的 CDP WebSocket 地址接入自动化框架。API Key 与主密码独立，可细粒度授权与回收；560+ 自动化测试覆盖核心组件。',
      en: 'Start profiles through the local HTTP management API, then connect automation frameworks using the returned CDP WebSocket address. API keys are independent from the master password, with fine-grained scopes and revocation; 560+ automated tests cover core components.',
    },
    capabilities: [
      { zh: 'HTTP 管理 API + CDP 连接地址', en: 'HTTP management API + CDP connection address' },
      {
        zh: 'Playwright / Puppeteer / Selenium 兼容',
        en: 'Playwright / Puppeteer / Selenium compatible',
      },
      { zh: 'API Key 细粒度权限', en: 'Fine-grained API key permissions' },
    ],
    platforms: ['HTTP API', 'CDP', 'CI'],
  },
];
