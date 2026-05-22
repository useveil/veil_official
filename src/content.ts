import {
  Blocks,
  Braces,
  Download,
  Fingerprint,
  Gauge,
  KeyRound,
  LockKeyhole,
  Network,
  ShieldCheck,
  TerminalSquare,
  Workflow,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type Feature = {
  icon: LucideIcon;
  title: string;
  body: string;
};

export type DownloadOption = {
  icon: LucideIcon;
  title: string;
  body: string;
  action: string;
  href: string;
};

export const featureBlocks: Feature[] = [
  {
    icon: LockKeyhole,
    title: '零知识加密',
    body: '主密码只留在本机，敏感数据经客户端加密后落库，云同步也只处理密文。',
  },
  {
    icon: Fingerprint,
    title: '一致的指纹画像',
    body: 'Profile 使用确定性种子，Canvas、WebGL、Audio、字体、平台等信号保持一致。',
  },
  {
    icon: Network,
    title: '网络行为透明',
    body: '本机出站连接、代理健康、DNS 与 WebRTC 泄漏风险都能在 UI 中被看见。',
  },
  {
    icon: Workflow,
    title: '自动化友好',
    body: '内置 HTTP API 与 CDP 代理，可直接连接 Playwright、Puppeteer 和 Selenium。',
  },
  {
    icon: Gauge,
    title: '独立 Daemon',
    body: 'UI 与后台进程解耦，任务运行、窗口多开和崩溃恢复都有清晰边界。',
  },
  {
    icon: Blocks,
    title: '开源可审计',
    body: '核心引擎 AGPL-3.0 开源，用户可以审计、编译、自托管和独立验证承诺。',
  },
];

export const downloadOptions: DownloadOption[] = [
  {
    icon: Download,
    title: '预编译安装包',
    body: '适用于 macOS、Windows、Linux。v0.1.0 RC 发布后从 Releases 获取最新包。',
    action: '打开 Releases',
    href: 'https://github.com/veil-browser/veil-browser/releases',
  },
  {
    icon: Braces,
    title: '从源码构建',
    body: '克隆仓库后运行桌面构建脚本，适合审计、二次开发和自托管团队。',
    action: '查看源码',
    href: 'https://github.com/veil-browser/veil-browser',
  },
  {
    icon: TerminalSquare,
    title: '自动化接入',
    body: '使用本地 API Key 和 CDP 端点，把 Profile 直接接入现有脚本。',
    action: '阅读文档',
    href: 'https://github.com/veil-browser/veil-browser#%E9%80%9A%E8%BF%87-api-%E8%87%AA%E5%8A%A8%E5%8C%96',
  },
];

export const trustPoints = [
  'Argon2id + AES-256-GCM + SQLCipher 整库加密',
  'BIP39 24 词恢复短语，丢失主密码无法由服务端找回',
  'API Key 强制鉴权，独立于主密码并可细粒度回收',
  '560+ 自动化测试覆盖 Core、Daemon 与代理组件',
];

export const roadmap = [
  {
    phase: 'Phase 1',
    title: '单机完整版',
    status: 'v0.1.0 RC',
    body: '桌面端、Profile、代理、指纹引擎、审计日志和自动化 API 已形成闭环。',
  },
  {
    phase: 'Phase 2',
    title: '零知识云同步',
    status: '计划中',
    body: '服务端只保存密文，密钥继续由用户持有，用订阅服务换取多设备便利。',
  },
  {
    phase: 'Phase 3',
    title: '企业版与更多终端',
    status: '未来',
    body: '面向团队协作、权限治理、批量运营和更复杂的安全审计场景。',
  },
];

export const navItems = [
  { label: '特性', href: '#features' },
  { label: '安全', href: '#security' },
  { label: '示例图', href: '#gallery' },
  { label: '下载', href: '#download' },
];

export const posterAssets = [
  {
    src: '/images/poster-zero-knowledge.svg',
    alt: 'Veil 零知识加密海报',
  },
  {
    src: '/images/poster-profile-grid.svg',
    alt: 'Veil Profile 管理示例图',
  },
  {
    src: '/images/poster-automation.svg',
    alt: 'Veil 自动化 API 示例图',
  },
];
