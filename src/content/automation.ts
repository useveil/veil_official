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
