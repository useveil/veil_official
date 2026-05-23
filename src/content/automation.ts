import { Cable, Globe2, KeyRound, Network, Sparkles } from 'lucide-react';
import type { LocalizedText } from './features';

export type AutomationExample = {
  key: string;
  framework: 'playwright' | 'puppeteer' | 'selenium' | 'curl';
  language: 'typescript' | 'javascript' | 'python' | 'shell';
  title: LocalizedText;
  code: string;
};

export const automationExamples: AutomationExample[] = [
  {
    key: 'playwright-connect',
    framework: 'playwright',
    language: 'typescript',
    title: {
      zh: 'Playwright 连接已运行的 Veil Profile',
      en: 'Playwright connecting to a running Veil profile',
    },
    code: `import { chromium } from 'playwright';

const VEIL_API = 'http://127.0.0.1:7733';
const API_KEY = process.env.VEIL_API_KEY!;

// 启动 Profile，拿到它的 CDP 端点
const res = await fetch(\`\${VEIL_API}/profiles/\${profileId}/start\`, {
  method: 'POST',
  headers: { Authorization: \`Bearer \${API_KEY}\` },
});
const { cdpEndpoint } = await res.json();

// 用 Playwright 直接接入
const browser = await chromium.connectOverCDP(cdpEndpoint);
const context = browser.contexts()[0];
const page = await context.newPage();
await page.goto('https://example.com');
`,
  },
  {
    key: 'puppeteer-connect',
    framework: 'puppeteer',
    language: 'javascript',
    title: {
      zh: 'Puppeteer 接入 CDP',
      en: 'Puppeteer connecting via CDP',
    },
    code: `import puppeteer from 'puppeteer';

const cdpEndpoint = 'ws://127.0.0.1:9222/devtools/browser/<id>';

const browser = await puppeteer.connect({
  browserWSEndpoint: cdpEndpoint,
  defaultViewport: null,
});

const page = (await browser.pages())[0];
await page.goto('https://example.com');
`,
  },
  {
    key: 'selenium-python',
    framework: 'selenium',
    language: 'python',
    title: {
      zh: 'Selenium (Python) 接入',
      en: 'Selenium (Python) integration',
    },
    code: `from selenium import webdriver
from selenium.webdriver.chrome.options import Options

options = Options()
options.debugger_address = "127.0.0.1:9222"

driver = webdriver.Chrome(options=options)
driver.get("https://example.com")
print(driver.title)
driver.quit()
`,
  },
  {
    key: 'curl-list-profiles',
    framework: 'curl',
    language: 'shell',
    title: {
      zh: '列出所有 Profile',
      en: 'List all profiles',
    },
    code: `curl -X GET http://127.0.0.1:7733/profiles \\
  -H "Authorization: Bearer $VEIL_API_KEY" \\
  -H "Content-Type: application/json"
`,
  },
];

// =================================================
// Dual-channel architecture
// =================================================

export type Channel = {
  key: string;
  icon: typeof Cable;
  label: string;
  endpoint: string;
  purpose: LocalizedText;
  authMode: LocalizedText;
  description: LocalizedText;
  highlights: LocalizedText[];
};

export const channels: Channel[] = [
  {
    key: 'http-api',
    icon: Cable,
    label: 'HTTP API',
    endpoint: 'http://127.0.0.1:7733',
    purpose: { zh: 'Profile 生命周期', en: 'Profile lifecycle' },
    authMode: { zh: 'Bearer API Key', en: 'Bearer API Key' },
    description: {
      zh: '管理 Profile 的创建、启动、停止、销毁，以及读取健康状态。所有调用都需要 API Key，独立于主密码。',
      en: 'Create, start, stop, and destroy profiles. Read health status. Every call requires an API Key, independent from the master password.',
    },
    highlights: [
      { zh: 'RESTful 端点 · JSON 请求 / 响应', en: 'RESTful endpoints · JSON request / response' },
      { zh: '细粒度作用域（read / write / admin）', en: 'Fine-grained scopes (read / write / admin)' },
      { zh: 'API Key 可独立回收，不影响主密码', en: 'API keys revocable without touching master password' },
    ],
  },
  {
    key: 'cdp',
    icon: Globe2,
    label: 'CDP',
    endpoint: 'ws://127.0.0.1:9222/devtools/browser/:id',
    purpose: { zh: '页面级操作', en: 'Page-level operations' },
    authMode: { zh: '连接时绑定 Profile', en: 'Bound to profile at connect time' },
    description: {
      zh: '标准 Chrome DevTools Protocol。导航、截图、注入脚本、监听网络——Playwright / Puppeteer / Selenium 全部原生兼容。',
      en: 'Standard Chrome DevTools Protocol. Navigate, screenshot, inject scripts, observe network — natively compatible with Playwright / Puppeteer / Selenium.',
    },
    highlights: [
      { zh: '与社区 CDP 工具 100% 兼容', en: '100% compatible with community CDP tools' },
      { zh: '端点仅在 Profile 启动后开放', en: 'Endpoint exposed only after profile starts' },
      { zh: '断开后自动清理会话状态', en: 'Session state auto-cleaned on disconnect' },
    ],
  },
];

// =================================================
// Quick start steps
// =================================================

export type QuickStartStep = {
  key: string;
  label: LocalizedText;
  description: LocalizedText;
  code: string;
  language: 'shell' | 'json' | 'typescript';
};

export const quickStartSteps: QuickStartStep[] = [
  {
    key: 'install',
    label: { zh: '生成 API Key', en: 'Generate API Key' },
    description: {
      zh: '在 Veil 桌面端 Settings → Automation 中创建 API Key。Key 独立于主密码，可按 scope 限定权限。',
      en: 'In the Veil desktop app, go to Settings → Automation to create an API key. Keys are independent from the master password and scope-limited.',
    },
    language: 'shell',
    code: `export VEIL_API_KEY="vk_live_xxxxxxxxxxxx"`,
  },
  {
    key: 'start-profile',
    label: { zh: '启动 Profile，拿到 CDP 端点', en: 'Start a profile and grab its CDP endpoint' },
    description: {
      zh: '通过 HTTP API 启动指定 Profile，返回的 cdpEndpoint 可直接传给 Playwright / Puppeteer / Selenium。',
      en: 'Start a profile via the HTTP API. The returned cdpEndpoint plugs directly into Playwright, Puppeteer, or Selenium.',
    },
    language: 'shell',
    code: `curl -X POST http://127.0.0.1:7733/profiles/$PROFILE_ID/start \\
  -H "Authorization: Bearer $VEIL_API_KEY"
# => { "cdpEndpoint": "ws://127.0.0.1:9222/devtools/browser/abc..." }`,
  },
  {
    key: 'connect',
    label: { zh: '用任意 CDP 框架接入', en: 'Connect with any CDP framework' },
    description: {
      zh: 'Playwright 一行代码即可接入。所有操作都跑在隔离 Profile 内，自动化访问不污染人类用户会话。',
      en: 'Playwright connects in one line. All operations run inside the isolated profile — automation never pollutes human user sessions.',
    },
    language: 'typescript',
    code: `const browser = await chromium.connectOverCDP(cdpEndpoint);`,
  },
];

// =================================================
// API endpoint reference
// =================================================

export type ApiEndpoint = {
  method: 'GET' | 'POST' | 'DELETE' | 'PATCH';
  path: string;
  description: LocalizedText;
  auth: 'bearer' | 'none';
};

export const apiEndpoints: ApiEndpoint[] = [
  {
    method: 'GET',
    path: '/health',
    description: { zh: '健康检查（无需鉴权）', en: 'Health check (no auth)' },
    auth: 'none',
  },
  {
    method: 'GET',
    path: '/profiles',
    description: { zh: '列出所有 Profile', en: 'List all profiles' },
    auth: 'bearer',
  },
  {
    method: 'POST',
    path: '/profiles',
    description: { zh: '创建新 Profile（指纹种子由系统生成）', en: 'Create profile (fingerprint seed auto-generated)' },
    auth: 'bearer',
  },
  {
    method: 'GET',
    path: '/profiles/:id',
    description: { zh: '获取 Profile 详情与运行状态', en: 'Get profile details and runtime status' },
    auth: 'bearer',
  },
  {
    method: 'POST',
    path: '/profiles/:id/start',
    description: { zh: '启动 Profile，返回 CDP 端点', en: 'Start profile, returns CDP endpoint' },
    auth: 'bearer',
  },
  {
    method: 'POST',
    path: '/profiles/:id/stop',
    description: { zh: '停止 Profile，清理会话', en: 'Stop profile, clean session' },
    auth: 'bearer',
  },
  {
    method: 'DELETE',
    path: '/profiles/:id',
    description: { zh: '销毁 Profile（密文与本地副本均删除）', en: 'Destroy profile (ciphertext + local copy removed)' },
    auth: 'bearer',
  },
  {
    method: 'GET',
    path: '/profiles/:id/audit',
    description: { zh: '导出 Profile 出站连接审计日志', en: 'Export outbound audit log for profile' },
    auth: 'bearer',
  },
];

// =================================================
// Auth callout
// =================================================

export type AuthFeature = {
  key: string;
  icon: typeof KeyRound;
  title: LocalizedText;
  body: LocalizedText;
};

export const authFeatures: AuthFeature[] = [
  {
    key: 'independent',
    icon: KeyRound,
    title: { zh: '与主密码完全分离', en: 'Fully separated from master password' },
    body: {
      zh: 'API Key 在自己的 keyring 里，丢失或泄漏不会暴露主密码；反之亦然。',
      en: 'API keys live in their own keyring. Losing or leaking one never exposes the master password — and vice versa.',
    },
  },
  {
    key: 'scope',
    icon: Network,
    title: { zh: '可细粒度限定作用域', en: 'Fine-grained scope control' },
    body: {
      zh: '每把 Key 可单独授权 read / write / admin，绑定到指定 Profile 集合。',
      en: 'Each key gets its own scope (read / write / admin) and can be bound to a specific set of profiles.',
    },
  },
  {
    key: 'rotate',
    icon: Sparkles,
    title: { zh: '可独立轮换与吊销', en: 'Rotate and revoke independently' },
    body: {
      zh: '在桌面端一键吊销，正在跑的连接会被立刻断开，无需重新输入主密码。',
      en: 'One click in the desktop app revokes the key. Running connections drop immediately — no master password re-entry needed.',
    },
  },
];
