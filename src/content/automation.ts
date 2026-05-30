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

// 启动 Profile，拿到浏览器 CDP 连接地址
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

// cdpEndpoint 来自 /profiles/:id/start 的返回值
const cdpEndpoint = process.env.VEIL_CDP_ENDPOINT!;

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
    code: `import os

from selenium import webdriver
from selenium.webdriver.chrome.options import Options

options = Options()
# VEIL_CDP_HOST 从 cdpEndpoint 中取 host:port，例如 127.0.0.1:<cdp-port>
options.debugger_address = os.environ["VEIL_CDP_HOST"]

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
      {
        zh: '细粒度作用域（read / write / admin）',
        en: 'Fine-grained scopes (read / write / admin)',
      },
      {
        zh: 'API Key 可独立回收，不影响主密码',
        en: 'API keys revocable without touching master password',
      },
    ],
  },
  {
    key: 'cdp',
    icon: Globe2,
    label: 'CDP WebSocket',
    endpoint: 'ws://127.0.0.1:<cdp-port>/devtools/browser/:id',
    purpose: { zh: '浏览器连接地址', en: 'Browser connection address' },
    authMode: { zh: '连接时绑定 Profile', en: 'Bound to profile at connect time' },
    description: {
      zh: '这是 Profile 启动后返回给自动化框架的 CDP WebSocket 地址，用来导航、截图、注入脚本与监听网络；它不是第二套 HTTP API。',
      en: 'This is the CDP WebSocket address returned after a profile starts. Automation frameworks use it for navigation, screenshots, script injection, and network observation. It is not a second HTTP API.',
    },
    highlights: [
      { zh: '与社区 CDP 工具 100% 兼容', en: '100% compatible with community CDP tools' },
      {
        zh: '地址由启动 Profile 的 HTTP API 返回',
        en: 'Address returned by the HTTP API that starts the profile',
      },
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
    label: {
      zh: '启动 Profile，拿到浏览器连接地址',
      en: 'Start a profile and get its browser connection',
    },
    description: {
      zh: '通过 HTTP API 启动指定 Profile，返回的 cdpEndpoint 可直接传给 Playwright / Puppeteer / Selenium。',
      en: 'Start a profile via the HTTP API. The returned cdpEndpoint plugs directly into Playwright, Puppeteer, or Selenium.',
    },
    language: 'shell',
    code: `curl -X POST http://127.0.0.1:7733/profiles/$PROFILE_ID/start \\
  -H "Authorization: Bearer $VEIL_API_KEY"
# => { "cdpEndpoint": "ws://127.0.0.1:<cdp-port>/devtools/browser/abc..." }`,
  },
  {
    key: 'connect',
    label: { zh: '用任意 CDP 框架接入', en: 'Connect with any CDP framework' },
    description: {
      zh: 'Playwright 一行代码即可接入。所有操作都跑在隔离 Profile 内，自动化访问不污染人类用户会话。',
      en: 'Playwright connects in one line. All operations run inside the isolated profile — automation never pollutes human user sessions.',
    },
    language: 'typescript',
    code: 'const browser = await chromium.connectOverCDP(cdpEndpoint);',
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
