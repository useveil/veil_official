# Veil 前端重构实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 把 Veil 官网从 Vite + React 单页改写为 Next.js 16 多页站点，应用 Architectural Minimal 视觉风格，支持 zh-CN(默认)/en 双语、亮/暗主题，覆盖 8 个路由（首页 / security / use-cases / compare / automation / download / changelog / faq）。

**Architecture:** Next.js 16 App Router + `[locale]` 段做 i18n。Tailwind v4 CSS-first（`@theme`）。组件四层：`ui/`（shadcn 原子）/ `layout/`（跨页框架）/ `sections/`（页面区块）/ `motion/`（动效封装）。内容三种来源：`content/*.ts`（结构化数据）+ `content/changelog/*.mdx`（富文本）+ `i18n/messages/{zh,en}.json`（UI 字符串）。纯 SSG，除 next-intl middleware 外无服务端运行时。

**Tech Stack:** Next.js 16 · React 19 · TypeScript 5 · Tailwind CSS v4 · shadcn/ui · next-intl · next-themes · Motion · Geist + Noto Sans SC · pnpm · Biome · Vitest · Playwright · Vercel

**Branch:** `feat/nextjs-rewrite`

---

## File Structure

下面列出本次会**创建**或**修改**的所有文件，及其单一职责。

### 顶层配置

| 文件 | 状态 | 职责 |
|---|---|---|
| `package.json` | 重写 | 依赖声明 + scripts（Next.js 16 而非 Vite）|
| `pnpm-lock.yaml` | 创建 | pnpm 锁文件（替代 package-lock.json）|
| `tsconfig.json` | 重写 | Next.js 兼容的 TS 配置 |
| `next.config.ts` | 创建 | Next.js 配置：MDX、i18n 入口、images |
| `next-env.d.ts` | 创建 | Next.js 类型声明（自动）|
| `tailwind.config.ts` | 不创建 | Tailwind v4 用 CSS `@theme`，无需 JS 配置 |
| `postcss.config.mjs` | 创建 | Tailwind v4 PostCSS 插件 |
| `biome.json` | 创建 | Biome lint + format 配置 |
| `vercel.ts` | 创建 | Vercel 部署配置（替代 vercel.json）|
| `vercel.json` | 删除 | 由 vercel.ts 取代 |
| `vite.config.ts` | 删除 | 不再使用 Vite |
| `index.html` | 删除 | Next.js 不需要根 HTML |
| `.gitignore` | 修改 | 添加 `.next/`、`*.tsbuildinfo` |
| `README.md` | 修改 | 更新构建命令为 pnpm + Next.js |
| `components.json` | 创建 | shadcn CLI 配置 |

### `src/app/`（路由）

| 文件 | 职责 |
|---|---|
| `src/app/layout.tsx` | Root layout：字体、ThemeProvider、html lang 占位 |
| `src/app/globals.css` | Tailwind v4 入口 + `@theme` tokens（亮/暗）|
| `src/app/not-found.tsx` | 全局 404 |
| `src/app/sitemap.ts` | 自动 sitemap |
| `src/app/robots.ts` | 自动 robots.txt |
| `src/app/[locale]/layout.tsx` | Locale layout：next-intl provider、Header、Footer |
| `src/app/[locale]/page.tsx` | 首页 |
| `src/app/[locale]/security/page.tsx` | 安全详情页 |
| `src/app/[locale]/use-cases/page.tsx` | 使用场景页 |
| `src/app/[locale]/compare/page.tsx` | 对比页 |
| `src/app/[locale]/automation/page.tsx` | 自动化接入页 |
| `src/app/[locale]/download/page.tsx` | 下载页 |
| `src/app/[locale]/faq/page.tsx` | FAQ 页 |
| `src/app/[locale]/changelog/page.tsx` | Changelog 列表 |
| `src/app/[locale]/changelog/[slug]/page.tsx` | Changelog 单版本详情（MDX）|
| `src/app/[locale]/opengraph-image.tsx` | OG 图片生成（@vercel/og）|

### `src/components/ui/`（shadcn 原子）

由 `shadcn@latest add` 自动生成，包括：`button.tsx` / `card.tsx` / `badge.tsx` / `accordion.tsx` / `tabs.tsx` / `tooltip.tsx` / `sheet.tsx`。

### `src/components/layout/`

| 文件 | 职责 |
|---|---|
| `Header.tsx` | 顶部导航 + Logo + 操作区 |
| `Footer.tsx` | 底部 |
| `LanguageSwitch.tsx` | 语言切换 |
| `ThemeToggle.tsx` | 主题切换（System / Light / Dark）|
| `MobileNav.tsx` | 移动端抽屉（用 shadcn Sheet）|
| `Logo.tsx` | Veil logo 组件（含 SVG mark）|

### `src/components/sections/`

| 文件 | 职责 |
|---|---|
| `Hero.tsx` | 首页 Hero（大标题 + CTA + Trust badges）|
| `FeatureGrid.tsx` | 6 特性网格（也可配置为 3 摘要）|
| `UseCaseGrid.tsx` | 4 人群入口卡片 |
| `UseCaseDeep.tsx` | `/use-cases` 完整版（每人群一区）|
| `SecurityStack.tsx` | 加密栈可视化 |
| `SecurityThreatModel.tsx` | 威胁模型表格 |
| `TrustList.tsx` | 信任要点列表 |
| `ComparisonTable.tsx` | 与竞品对比表 |
| `CodeSnippet.tsx` | 带语言标签的代码块（用于 /automation）|
| `AutomationApi.tsx` | API + CDP 示例集合 |
| `DownloadGrid.tsx` | 多平台下载卡片（含 SHA256）|
| `RoadmapList.tsx` | Roadmap 卡片列表 |
| `OpenSourceCallout.tsx` | 开源呼吁区 |
| `FaqAccordion.tsx` | FAQ 折叠面板（按主题分组）|
| `FinalCTA.tsx` | 通用 CTA 收尾区 |
| `ChangelogList.tsx` | Changelog 列表 |

### `src/components/motion/`

| 文件 | 职责 |
|---|---|
| `Reveal.tsx` | `whileInView` 滚动揭示（封装 motion）|
| `StaggerChildren.tsx` | 子元素 stagger 进场 |

### `src/content/`

| 文件 | 职责 |
|---|---|
| `constants.ts` | repo / release URL、版本号、平台 ID |
| `nav.ts` | 导航项 |
| `features.ts` | 6 个 Feature（带 zh/en 文本对象）|
| `use-cases.ts` | 4 个人群用例（带详细叙事）|
| `comparison.ts` | 对比表数据（columns + rows）|
| `trust-points.ts` | 信任要点 |
| `roadmap.ts` | 路线图 |
| `faq.ts` | FAQ（按主题分组）|
| `automation.ts` | 自动化代码示例集合 |
| `download.ts` | 平台下载元数据 |
| `changelog/0.1.0-rc.mdx` | 首个 release |

### `src/i18n/`

| 文件 | 职责 |
|---|---|
| `routing.ts` | next-intl 路由配置 |
| `request.ts` | locale 加载逻辑 |
| `messages/zh.json` | 中文 UI 字符串 |
| `messages/en.json` | 英文 UI 字符串 |

### `src/lib/`

| 文件 | 职责 |
|---|---|
| `utils.ts` | `cn()` helper（shadcn 标配）|
| `changelog.ts` | MDX 读取、frontmatter 解析、按版本排序 |
| `seo.ts` | `buildMetadata()` helper |

### `src/middleware.ts`

next-intl 中间件，处理 locale 检测、重定向。

### `tests/`

| 文件 | 职责 |
|---|---|
| `tests/unit/utils.test.ts` | `cn()` 测试 |
| `tests/unit/changelog.test.ts` | MDX 解析测试 |
| `tests/unit/seo.test.ts` | metadata 测试 |
| `tests/e2e/home.spec.ts` | 首页 + CTA |
| `tests/e2e/i18n.spec.ts` | 切语言 |
| `tests/e2e/theme.spec.ts` | 切暗色 |
| `tests/e2e/mobile-nav.spec.ts` | 移动 nav + 404 |
| `vitest.config.ts` | Vitest 配置 |
| `playwright.config.ts` | Playwright 配置 |

### 删除

| 文件 | 说明 |
|---|---|
| `src/App.tsx` | 由路由替代 |
| `src/main.tsx` | 由 Next.js root layout 替代 |
| `src/styles.css` | 由 globals.css 替代 |
| `src/content.ts` | 拆分为 `content/*.ts` |
| `vite.config.ts` | 不再使用 Vite |
| `index.html` | Next.js 不需要 |
| `package-lock.json` | 由 pnpm-lock.yaml 替代 |
| `vercel.json` | 由 vercel.ts 替代 |
| `dist/` | Vite 输出，由 `.next/` 替代 |

---

## Phase 0 · Setup

### Task 0.1 — 创建特性分支 + 归档当前状态

**Files:** （仅 git 操作）

- [ ] **Step 1: 确认当前在 main 分支且工作区干净**

```bash
git status
git branch --show-current
```

Expected: `main`，无未提交改动（spec 在前面已提交）。

- [ ] **Step 2: 给当前 Vite 站点打归档 tag（便于回滚）**

```bash
git tag -a archive/vite-original -m "归档：重构前的 Vite 单页站点"
```

- [ ] **Step 3: 创建并切到特性分支**

```bash
git checkout -b feat/nextjs-rewrite
```

Expected: `Switched to a new branch 'feat/nextjs-rewrite'`

- [ ] **Step 4: 启用 pnpm（如未启用）**

```bash
corepack enable
corepack prepare pnpm@latest --activate
pnpm --version
```

Expected: 输出 pnpm 版本号 ≥ 9.x。

---

### Task 0.2 — 删除 Vite 项目文件

**Files:**
- Delete: `vite.config.ts`、`index.html`、`src/App.tsx`、`src/main.tsx`、`src/styles.css`、`src/content.ts`、`package-lock.json`、`node_modules/`、`dist/`、`vercel.json`、`tsconfig.json`、`package.json`

- [ ] **Step 1: 删除 Vite 配置和入口文件**

```bash
rm vite.config.ts index.html
rm src/App.tsx src/main.tsx src/styles.css src/content.ts
```

- [ ] **Step 2: 删除旧锁文件和构建产物**

```bash
rm -f package-lock.json
rm -rf node_modules dist
```

- [ ] **Step 3: 删除被替换的根配置**

```bash
rm package.json tsconfig.json vercel.json
```

- [ ] **Step 4: 验证 src 已空**

```bash
ls src/ 2>/dev/null && echo "src 仍存在" || echo "src 已空或不存在"
```

Expected: 输出 "src 已空或不存在" 或 src 目录为空。

- [ ] **Step 5: 提交清理**

```bash
git add -A
git commit -m "chore: 清空 Vite 项目文件，准备 Next.js 16 重写"
```

---

### Task 0.3 — 创建 `package.json` 并安装依赖

**Files:**
- Create: `package.json`

- [ ] **Step 1: 写 `package.json`**

```json
{
  "name": "veil-official-site",
  "version": "0.2.0",
  "private": true,
  "type": "module",
  "packageManager": "pnpm@9.15.0",
  "scripts": {
    "dev": "next dev --port 5173",
    "build": "next build",
    "start": "next start",
    "lint": "biome check .",
    "format": "biome format --write .",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:e2e": "playwright test"
  },
  "dependencies": {
    "@vercel/og": "^0.6.5",
    "clsx": "^2.1.1",
    "lucide-react": "^0.460.0",
    "motion": "^11.15.0",
    "next": "^16.0.0",
    "next-intl": "^3.26.0",
    "next-themes": "^0.4.4",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "tailwind-merge": "^2.5.5",
    "gray-matter": "^4.0.3"
  },
  "devDependencies": {
    "@biomejs/biome": "^1.9.4",
    "@playwright/test": "^1.49.1",
    "@tailwindcss/postcss": "^4.0.0",
    "@types/node": "^22.10.2",
    "@types/react": "^19.0.2",
    "@types/react-dom": "^19.0.2",
    "@vitejs/plugin-react": "^4.3.4",
    "@vitest/ui": "^2.1.8",
    "jsdom": "^25.0.1",
    "postcss": "^8.4.49",
    "tailwindcss": "^4.0.0",
    "typescript": "^5.7.2",
    "vitest": "^2.1.8"
  }
}
```

- [ ] **Step 2: 安装依赖**

```bash
pnpm install
```

Expected: 安装成功，生成 `pnpm-lock.yaml` 与 `node_modules/`。可能出现 peer dependency warning，可忽略。

- [ ] **Step 3: 验证 Next.js 可用**

```bash
pnpm next --version
```

Expected: 输出 `16.x.x`。

- [ ] **Step 4: 提交**

```bash
git add package.json pnpm-lock.yaml
git commit -m "feat: 添加 Next.js 16 + Tailwind v4 + 依赖"
```

---

### Task 0.4 — 创建 TypeScript 与 Next.js 配置

**Files:**
- Create: `tsconfig.json`、`next.config.ts`、`next-env.d.ts`

- [ ] **Step 1: 写 `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "ES2022"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules", ".next", "dist"]
}
```

- [ ] **Step 2: 写 `next.config.ts`**

```ts
import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import createMDX from '@next/mdx';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');
const withMDX = createMDX();

const nextConfig: NextConfig = {
  pageExtensions: ['ts', 'tsx', 'mdx'],
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    typedRoutes: true,
  },
};

export default withNextIntl(withMDX(nextConfig));
```

- [ ] **Step 3: 写 `next-env.d.ts`**

```ts
/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.
```

- [ ] **Step 4: 安装 MDX 依赖**

```bash
pnpm add @next/mdx @mdx-js/loader @mdx-js/react @types/mdx
```

- [ ] **Step 5: 提交**

```bash
git add tsconfig.json next.config.ts next-env.d.ts package.json pnpm-lock.yaml
git commit -m "feat: 配置 TypeScript 与 Next.js (含 MDX/next-intl 插件)"
```

---

### Task 0.5 — 配置 Tailwind CSS v4

**Files:**
- Create: `postcss.config.mjs`

- [ ] **Step 1: 写 `postcss.config.mjs`**

```js
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};
```

- [ ] **Step 2: 提交**

```bash
git add postcss.config.mjs
git commit -m "feat: 配置 Tailwind v4 PostCSS"
```

---

### Task 0.6 — 配置 Biome

**Files:**
- Create: `biome.json`

- [ ] **Step 1: 写 `biome.json`**

```json
{
  "$schema": "https://biomejs.dev/schemas/1.9.4/schema.json",
  "vcs": {
    "enabled": true,
    "clientKind": "git",
    "useIgnoreFile": true
  },
  "files": {
    "ignoreUnknown": false,
    "ignore": [".next", "node_modules", "dist", "public", "*.mdx"]
  },
  "formatter": {
    "enabled": true,
    "indentStyle": "space",
    "indentWidth": 2,
    "lineWidth": 100
  },
  "organizeImports": {
    "enabled": true
  },
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true,
      "a11y": {
        "useKeyWithClickEvents": "off"
      },
      "style": {
        "noNonNullAssertion": "off"
      }
    }
  },
  "javascript": {
    "formatter": {
      "quoteStyle": "single",
      "jsxQuoteStyle": "double",
      "semicolons": "always",
      "trailingCommas": "all"
    }
  }
}
```

- [ ] **Step 2: 验证 Biome 可运行**

```bash
pnpm biome --version
```

Expected: 输出 `1.9.x`。

- [ ] **Step 3: 提交**

```bash
git add biome.json
git commit -m "feat: 配置 Biome（替代 ESLint + Prettier）"
```

---

### Task 0.7 — 创建最小 Next.js app 骨架并验证启动

**Files:**
- Create: `src/app/layout.tsx`、`src/app/page.tsx`、`src/app/globals.css`、`src/lib/utils.ts`

- [ ] **Step 1: 写最小 `src/app/globals.css`**

```css
@import 'tailwindcss';

@theme {
  --color-background: #ffffff;
  --color-foreground: #0a0e1a;
}

body {
  background-color: var(--color-background);
  color: var(--color-foreground);
}
```

- [ ] **Step 2: 写最小 `src/app/layout.tsx`**

```tsx
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Veil',
  description: 'Open-source, self-hosted, zero-knowledge fingerprint browser.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 3: 写临时 `src/app/page.tsx`**

```tsx
export default function HomePage() {
  return (
    <main className="p-8">
      <h1 className="text-4xl font-bold">Veil — Next.js 骨架已就绪</h1>
      <p className="mt-4 text-neutral-600">本页将在 Phase 3 被真正首页替换。</p>
    </main>
  );
}
```

- [ ] **Step 4: 写 `src/lib/utils.ts`（shadcn 标配的 cn helper）**

```ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

- [ ] **Step 5: 启动 dev 服务器验证**

```bash
pnpm dev
```

Expected: 在 `http://localhost:5173` 可访问，显示 "Veil — Next.js 骨架已就绪"。按 Ctrl+C 停止。

- [ ] **Step 6: 验证构建通过**

```bash
pnpm build
```

Expected: 构建成功，输出 `Compiled successfully`。

- [ ] **Step 7: 提交**

```bash
git add src/ .gitignore
git commit -m "feat: Next.js 16 骨架启动成功"
```

注：如果 `.gitignore` 没有 `.next/`，加上。

---

### Task 0.8 — 初始化 shadcn/ui 并添加基础原子

**Files:**
- Create: `components.json`
- 由 CLI 创建: `src/components/ui/button.tsx` 等

- [ ] **Step 1: 初始化 shadcn**

```bash
pnpm dlx shadcn@latest init -d
```

按提示选择：
- Style: `new-york`
- Base color: `slate`
- CSS variables: `yes`

预期生成 `components.json`。

- [ ] **Step 2: 添加常用原子组件**

```bash
pnpm dlx shadcn@latest add button card badge accordion tabs tooltip sheet
```

Expected: `src/components/ui/` 下生成 `button.tsx`、`card.tsx` 等 7 个文件。

- [ ] **Step 3: 验证 shadcn 组件可用**

替换 `src/app/page.tsx`：

```tsx
import { Button } from '@/components/ui/button';

export default function HomePage() {
  return (
    <main className="p-8">
      <h1 className="text-4xl font-bold">Veil — Next.js 骨架已就绪</h1>
      <Button className="mt-4">shadcn 按钮测试</Button>
    </main>
  );
}
```

```bash
pnpm dev
```

Expected: 页面显示一个 shadcn 风格的黑色按钮。停止 dev。

- [ ] **Step 4: 提交**

```bash
git add components.json src/components/ src/app/page.tsx
git commit -m "feat: 初始化 shadcn/ui 并添加 7 个基础原子"
```

---

## Phase 1 · 基础设施

### Task 1.1 — 定义完整设计 tokens（亮/暗双模）

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: 重写 `src/app/globals.css`**

```css
@import 'tailwindcss';

/* =================================================== */
/* @theme — Tailwind v4 设计 tokens                    */
/* =================================================== */
@theme {
  /* === 字体（在 layout.tsx 中通过 next/font 注入 CSS variable） === */
  --font-sans: var(--font-geist-sans), 'Noto Sans SC', ui-sans-serif, system-ui, sans-serif;
  --font-mono: var(--font-geist-mono), ui-monospace, 'Cascadia Code', monospace;

  /* === Ink Scale（亮色模式的中性色） === */
  --color-ink-50: #f6f8fa;
  --color-ink-100: #eef1f5;
  --color-ink-200: #dfe5ec;
  --color-ink-300: #c4cdd9;
  --color-ink-400: #97a3b3;
  --color-ink-500: #6b7787;
  --color-ink-600: #4a5564;
  --color-ink-700: #2f3845;
  --color-ink-800: #1a212d;
  --color-ink-900: #0e1421;
  --color-ink: #0a0e1a;

  /* === Brand Accent === */
  --color-teal-50: #ecfdf5;
  --color-teal-100: #ccfbf1;
  --color-teal-200: #99f6e4;
  --color-teal-300: #5eead4;
  --color-teal-400: #2dd4bf;
  --color-teal-500: #14b8a6;
  --color-teal-600: #0d9488;
  --color-teal-700: #0f766e;
  --color-teal-800: #115e59;
  --color-teal-900: #134e4a;

  /* === 语义化别名（默认 = 亮色） === */
  --color-background: #ffffff;
  --color-surface: #fafbfc;
  --color-surface-elevated: #ffffff;
  --color-foreground: #0a0e1a;
  --color-foreground-muted: #4a5564;
  --color-foreground-subtle: #6b7787;
  --color-border: #dfe5ec;
  --color-border-strong: #c4cdd9;
  --color-accent: #14b8a6;
  --color-accent-foreground: #ffffff;
  --color-ring: #14b8a6;

  /* === 圆角 === */
  --radius-xs: 4px;
  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;

  /* === 阴影 === */
  --shadow-sm: 0 1px 2px 0 rgb(7 17 31 / 0.04);
  --shadow-md: 0 4px 12px -2px rgb(7 17 31 / 0.06), 0 2px 4px -1px rgb(7 17 31 / 0.04);
  --shadow-lg: 0 16px 40px -8px rgb(7 17 31 / 0.08), 0 8px 16px -4px rgb(7 17 31 / 0.04);

  /* === 动效 === */
  --ease-architect: cubic-bezier(0.22, 1, 0.36, 1);
  --duration-fast: 150ms;
  --duration-default: 240ms;
  --duration-slow: 480ms;
}

/* =================================================== */
/* 暗色模式覆写                                          */
/* =================================================== */
.dark {
  --color-background: #070a0f;
  --color-surface: #0e1117;
  --color-surface-elevated: #161b22;
  --color-foreground: #e6edf5;
  --color-foreground-muted: #97a3b3;
  --color-foreground-subtle: #6b7787;
  --color-border: rgb(255 255 255 / 0.08);
  --color-border-strong: rgb(255 255 255 / 0.16);
  --color-accent: #5eead4;
  --color-accent-foreground: #0a0e1a;
  --color-ring: #5eead4;

  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.2);
  --shadow-md: 0 4px 12px -2px rgb(0 0 0 / 0.3), 0 2px 4px -1px rgb(0 0 0 / 0.2);
  --shadow-lg: 0 16px 40px -8px rgb(0 0 0 / 0.4), 0 8px 16px -4px rgb(0 0 0 / 0.3);
}

/* =================================================== */
/* 基础重置                                              */
/* =================================================== */
* {
  box-sizing: border-box;
  border-color: var(--color-border);
}

html {
  scroll-behavior: smooth;
  text-size-adjust: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  background-color: var(--color-background);
  color: var(--color-foreground);
  font-family: var(--font-sans);
  font-feature-settings: 'cv11', 'ss01';
  line-height: 1.6;
}

::selection {
  background-color: var(--color-teal-200);
  color: var(--color-ink);
}

.dark ::selection {
  background-color: var(--color-teal-700);
  color: var(--color-ink-50);
}

/* 遵循 prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

- [ ] **Step 2: 验证 tokens 可用**

```bash
pnpm dev
```

打开浏览器 → 在 DevTools 检查 `body` 元素，确认看到 `--color-background` 等 CSS 变量。停止 dev。

- [ ] **Step 3: 提交**

```bash
git add src/app/globals.css
git commit -m "feat: 完整设计 tokens（亮/暗双模 + Ink/Teal 色阶）"
```

---

### Task 1.2 — 加载字体（Geist + Noto Sans SC）

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: 重写 `src/app/layout.tsx`，注入 next/font**

```tsx
import type { Metadata } from 'next';
import { Geist, Geist_Mono, Noto_Sans_SC } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

const notoSansSC = Noto_Sans_SC({
  variable: '--font-noto-sans-sc',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  preload: false,
});

export const metadata: Metadata = {
  title: 'Veil',
  description: 'Open-source, self-hosted, zero-knowledge fingerprint browser.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} ${notoSansSC.variable}`}>
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 2: 启动 dev 验证字体加载**

```bash
pnpm dev
```

打开 `http://localhost:5173`，在 DevTools 检查 `<body>` 是否有 `--font-geist-sans` 等变量。停止 dev。

- [ ] **Step 3: 提交**

```bash
git add src/app/layout.tsx
git commit -m "feat: 加载 Geist + Noto Sans SC 字体"
```

---

### Task 1.3 — next-intl 路由配置 + middleware

**Files:**
- Create: `src/i18n/routing.ts`、`src/i18n/request.ts`、`src/middleware.ts`、`src/i18n/messages/zh.json`、`src/i18n/messages/en.json`

- [ ] **Step 1: 写 `src/i18n/routing.ts`**

```ts
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['zh', 'en'],
  defaultLocale: 'zh',
  localePrefix: 'as-needed',
});

export type Locale = (typeof routing.locales)[number];
```

- [ ] **Step 2: 写 `src/i18n/request.ts`**

```ts
import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
```

- [ ] **Step 3: 写 `src/middleware.ts`**

```ts
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
```

- [ ] **Step 4: 写初始 `src/i18n/messages/zh.json`（占位，后续 Phase 6 补全）**

```json
{
  "common": {
    "download": "下载",
    "viewSource": "查看源码",
    "skeleton": "骨架占位"
  }
}
```

- [ ] **Step 5: 写初始 `src/i18n/messages/en.json`**

```json
{
  "common": {
    "download": "Download",
    "viewSource": "View Source",
    "skeleton": "Skeleton placeholder"
  }
}
```

- [ ] **Step 6: 提交**

```bash
git add src/i18n/ src/middleware.ts
git commit -m "feat: next-intl 路由配置（zh 默认 + en，as-needed 策略）"
```

---

### Task 1.4 — 把路由迁到 `[locale]/` 段

**Files:**
- Move: `src/app/page.tsx` → `src/app/[locale]/page.tsx`
- Create: `src/app/[locale]/layout.tsx`

- [ ] **Step 1: 创建 [locale] 目录并移动 page.tsx**

```bash
mkdir -p src/app/\[locale\]
git mv src/app/page.tsx src/app/\[locale\]/page.tsx
```

- [ ] **Step 2: 更新 `src/app/[locale]/page.tsx` 使其依赖 locale param**

```tsx
import { setRequestLocale } from 'next-intl/server';
import { Button } from '@/components/ui/button';
import { routing, type Locale } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="p-8">
      <h1 className="text-4xl font-bold">Veil — locale: {locale}</h1>
      <Button className="mt-4">shadcn 按钮</Button>
    </main>
  );
}
```

- [ ] **Step 3: 写 `src/app/[locale]/layout.tsx`**

```tsx
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { routing, type Locale } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale)) notFound();

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
```

- [ ] **Step 4: 更新 `src/app/layout.tsx` —— html lang 由 [locale] 决定，所以这里写 `<html lang="zh-CN">` 不再准确，但 root layout 必须有 html。**

把 `src/app/layout.tsx` 的 `<html lang="zh-CN">` 改为 `<html suppressHydrationWarning>`（lang 由更深的 [locale] 层注入是 next-intl 的常见模式，但 Next.js root layout 必须有 html/body，所以 lang 由 root layout 保留并通过 middleware 注入正确值）。

修改后的 `src/app/layout.tsx`：

```tsx
import type { Metadata } from 'next';
import { Geist, Geist_Mono, Noto_Sans_SC } from 'next/font/google';
import { getLocale } from 'next-intl/server';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

const notoSansSC = Noto_Sans_SC({
  variable: '--font-noto-sans-sc',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  preload: false,
});

export const metadata: Metadata = {
  title: 'Veil',
  description: 'Open-source, self-hosted, zero-knowledge fingerprint browser.',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} ${notoSansSC.variable}`}>
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 5: 启动 dev 验证**

```bash
pnpm dev
```

访问：
- `http://localhost:5173/` → 显示 "Veil — locale: zh"
- `http://localhost:5173/en` → 显示 "Veil — locale: en"

停止 dev。

- [ ] **Step 6: 提交**

```bash
git add src/app/
git commit -m "feat: 把路由迁入 [locale] 段（zh 默认 + en 显式）"
```

---

### Task 1.5 — 集成 next-themes ThemeProvider

**Files:**
- Create: `src/components/layout/ThemeProvider.tsx`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: 创建 `src/components/layout/ThemeProvider.tsx`**

```tsx
'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { ComponentProps } from 'react';

export function ThemeProvider({ children, ...props }: ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
```

- [ ] **Step 2: 在 root layout 包裹 ThemeProvider**

修改 `src/app/layout.tsx` 的 body 内：

```tsx
<body className={`${geistSans.variable} ${geistMono.variable} ${notoSansSC.variable}`}>
  <ThemeProvider>{children}</ThemeProvider>
</body>
```

并在文件顶部 import：

```tsx
import { ThemeProvider } from '@/components/layout/ThemeProvider';
```

- [ ] **Step 3: 验证暗色 class 切换**

启动 dev：

```bash
pnpm dev
```

打开浏览器 DevTools Console，运行：

```js
document.documentElement.classList.add('dark');
```

Expected: 背景变深（验证 `.dark { --color-background: #070a0f }` 生效）。停止 dev。

- [ ] **Step 4: 提交**

```bash
git add src/components/layout/ThemeProvider.tsx src/app/layout.tsx
git commit -m "feat: 集成 next-themes ThemeProvider"
```

---

### Task 1.6 — Logo / ThemeToggle / LanguageSwitch 组件

**Files:**
- Create: `src/components/layout/Logo.tsx`、`src/components/layout/ThemeToggle.tsx`、`src/components/layout/LanguageSwitch.tsx`

- [ ] **Step 1: 写 `Logo.tsx`**

```tsx
import Link from 'next/link';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Veil 首页"
      className={cn('inline-flex items-center gap-2', className)}
    >
      <img src="/brand/veil-mark.svg" alt="" className="h-7 w-7" />
      <span className="text-lg font-semibold tracking-tight">Veil</span>
    </Link>
  );
}
```

- [ ] **Step 2: 写 `ThemeToggle.tsx`**

```tsx
'use client';

import { Monitor, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const order = ['system', 'light', 'dark'] as const;
type ThemeKey = (typeof order)[number];

const icons: Record<ThemeKey, React.ComponentType<{ className?: string }>> = {
  system: Monitor,
  light: Sun,
  dark: Moon,
};

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <Button variant="ghost" size="icon" className={className} aria-label="切换主题" />;
  }

  const current = (theme as ThemeKey) ?? 'system';
  const Icon = icons[current];

  function cycle() {
    const next = order[(order.indexOf(current) + 1) % order.length];
    setTheme(next);
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={cycle}
      aria-label={`切换主题（当前 ${current}）`}
      className={cn('relative', className)}
    >
      <Icon className="h-4 w-4" />
    </Button>
  );
}
```

- [ ] **Step 3: 写 `LanguageSwitch.tsx`**

```tsx
'use client';

import { Languages } from 'lucide-react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { routing } from '@/i18n/routing';
import { cn } from '@/lib/utils';

export function LanguageSwitch({ className }: { className?: string }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function switchTo(target: string) {
    // 去掉当前 locale 前缀（如有）
    let path = pathname;
    for (const l of routing.locales) {
      if (path.startsWith(`/${l}/`) || path === `/${l}`) {
        path = path.slice(l.length + 1) || '/';
        break;
      }
    }
    const next = target === routing.defaultLocale ? path : `/${target}${path === '/' ? '' : path}`;
    router.push(next);
  }

  const next = locale === 'zh' ? 'en' : 'zh';

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={() => switchTo(next)}
      className={cn('gap-1.5', className)}
      aria-label={`切换语言到 ${next === 'zh' ? '中文' : 'English'}`}
    >
      <Languages className="h-4 w-4" />
      <span className="text-xs font-medium uppercase tracking-wider">{next}</span>
    </Button>
  );
}
```

- [ ] **Step 4: 在临时首页里测试一下三个组件能渲染**

修改 `src/app/[locale]/page.tsx`：

```tsx
import { setRequestLocale } from 'next-intl/server';
import { Logo } from '@/components/layout/Logo';
import { ThemeToggle } from '@/components/layout/ThemeToggle';
import { LanguageSwitch } from '@/components/layout/LanguageSwitch';
import { routing, type Locale } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="p-8 flex items-center gap-4">
      <Logo />
      <ThemeToggle />
      <LanguageSwitch />
      <span className="text-sm text-ink-500">locale: {locale}</span>
    </main>
  );
}
```

启动 dev 验证：

```bash
pnpm dev
```

测试：点击 ThemeToggle 在三态间循环，点击 LanguageSwitch 在 zh / en 间切换。停止 dev。

- [ ] **Step 5: 提交**

```bash
git add src/components/layout/ src/app/[locale]/page.tsx
git commit -m "feat: Logo / ThemeToggle（三态）/ LanguageSwitch 组件"
```

---

### Task 1.7 — Header + Footer + MobileNav

**Files:**
- Create: `src/components/layout/Header.tsx`、`src/components/layout/Footer.tsx`、`src/components/layout/MobileNav.tsx`、`src/content/nav.ts`、`src/content/constants.ts`

- [ ] **Step 1: 写 `src/content/constants.ts`**

```ts
export const SITE = {
  name: 'Veil',
  shortDescription: 'Open-source, self-hosted, zero-knowledge fingerprint browser.',
  repoUrl: 'https://github.com/useveil/veil_official',
  releaseUrl: 'https://github.com/useveil/veil_official/releases',
  currentVersion: '0.1.0-rc',
  license: 'AGPL-3.0',
} as const;
```

- [ ] **Step 2: 写 `src/content/nav.ts`**

```ts
export type NavItem = {
  key: string;
  href: string;
  labelKey: string; // 指向 i18n messages 中的 nav.<key>
};

export const primaryNav: NavItem[] = [
  { key: 'security', href: '/security', labelKey: 'nav.security' },
  { key: 'useCases', href: '/use-cases', labelKey: 'nav.useCases' },
  { key: 'compare', href: '/compare', labelKey: 'nav.compare' },
  { key: 'automation', href: '/automation', labelKey: 'nav.automation' },
  { key: 'changelog', href: '/changelog', labelKey: 'nav.changelog' },
];

export const footerGroups: { titleKey: string; items: NavItem[] }[] = [
  {
    titleKey: 'footer.groups.product',
    items: [
      { key: 'security', href: '/security', labelKey: 'nav.security' },
      { key: 'useCases', href: '/use-cases', labelKey: 'nav.useCases' },
      { key: 'compare', href: '/compare', labelKey: 'nav.compare' },
      { key: 'download', href: '/download', labelKey: 'nav.download' },
    ],
  },
  {
    titleKey: 'footer.groups.developers',
    items: [
      { key: 'automation', href: '/automation', labelKey: 'nav.automation' },
      { key: 'changelog', href: '/changelog', labelKey: 'nav.changelog' },
      { key: 'source', href: 'https://github.com/useveil/veil_official', labelKey: 'nav.source' },
    ],
  },
  {
    titleKey: 'footer.groups.community',
    items: [
      { key: 'faq', href: '/faq', labelKey: 'nav.faq' },
      { key: 'issues', href: 'https://github.com/useveil/veil_official/issues', labelKey: 'nav.issues' },
    ],
  },
];
```

- [ ] **Step 3: 写 `src/components/layout/MobileNav.tsx`**

```tsx
'use client';

import { Menu, ArrowDownToLine } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { LanguageSwitch } from './LanguageSwitch';
import { ThemeToggle } from './ThemeToggle';
import { primaryNav } from '@/content/nav';
import { SITE } from '@/content/constants';

export function MobileNav() {
  const t = useTranslations();
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden" aria-label="打开菜单">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-72">
        <SheetTitle className="sr-only">导航菜单</SheetTitle>
        <nav className="mt-8 flex flex-col gap-1">
          {primaryNav.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              onClick={() => setOpen(false)}
              className="px-3 py-3 text-base font-medium hover:bg-ink-50 rounded-md transition-colors"
            >
              {t(item.labelKey as 'nav.security')}
            </Link>
          ))}
        </nav>
        <div className="mt-6 flex items-center gap-2 border-t border-border pt-6">
          <ThemeToggle />
          <LanguageSwitch />
        </div>
        <Button asChild className="mt-4 w-full">
          <a href={SITE.releaseUrl} target="_blank" rel="noreferrer">
            <ArrowDownToLine className="h-4 w-4" />
            {t('common.download')}
          </a>
        </Button>
      </SheetContent>
    </Sheet>
  );
}
```

- [ ] **Step 4: 写 `src/components/layout/Header.tsx`**

```tsx
import { ArrowDownToLine } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { primaryNav } from '@/content/nav';
import { SITE } from '@/content/constants';
import { LanguageSwitch } from './LanguageSwitch';
import { Logo } from './Logo';
import { MobileNav } from './MobileNav';
import { ThemeToggle } from './ThemeToggle';

export function Header() {
  const t = useTranslations();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-6">
        <div className="flex items-center gap-8">
          <Logo />
          <nav aria-label="主导航" className="hidden md:flex items-center gap-6">
            {primaryNav.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="text-sm font-medium text-foreground-muted transition-colors hover:text-foreground"
              >
                {t(item.labelKey as 'nav.security')}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-1">
          <div className="hidden md:flex items-center gap-1">
            <ThemeToggle />
            <LanguageSwitch />
          </div>
          <Button asChild size="sm" className="hidden md:inline-flex">
            <a href={SITE.releaseUrl} target="_blank" rel="noreferrer">
              <ArrowDownToLine className="h-4 w-4" />
              {t('common.download')}
            </a>
          </Button>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
```

- [ ] **Step 5: 写 `src/components/layout/Footer.tsx`**

```tsx
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { footerGroups } from '@/content/nav';
import { SITE } from '@/content/constants';
import { Logo } from './Logo';

export function Footer() {
  const t = useTranslations();

  return (
    <footer className="border-t border-border bg-surface mt-32">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-foreground-muted">
              {t('footer.tagline')}
            </p>
            <p className="mt-3 text-xs text-foreground-subtle font-mono">{SITE.license}</p>
          </div>
          {footerGroups.map((group) => (
            <div key={group.titleKey}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground-subtle">
                {t(group.titleKey as 'footer.groups.product')}
              </h3>
              <ul className="mt-4 flex flex-col gap-2">
                {group.items.map((item) => (
                  <li key={item.key}>
                    {item.href.startsWith('http') ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm text-foreground-muted hover:text-foreground transition-colors"
                      >
                        {t(item.labelKey as 'nav.security')}
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        className="text-sm text-foreground-muted hover:text-foreground transition-colors"
                      >
                        {t(item.labelKey as 'nav.security')}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 border-t border-border pt-6 flex items-center justify-between text-xs text-foreground-subtle">
          <p>© {new Date().getFullYear()} Veil</p>
          <p className="font-mono">v{SITE.currentVersion}</p>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 6: 把 Header/Footer 放进 `[locale]/layout.tsx`**

替换 `src/app/[locale]/layout.tsx`：

```tsx
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { routing, type Locale } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale)) notFound();

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <div className="flex min-h-dvh flex-col">
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
      </div>
    </NextIntlClientProvider>
  );
}
```

- [ ] **Step 7: 扩展 i18n messages**

更新 `src/i18n/messages/zh.json`：

```json
{
  "common": {
    "download": "下载",
    "viewSource": "查看源码",
    "skeleton": "骨架占位"
  },
  "nav": {
    "security": "安全",
    "useCases": "应用场景",
    "compare": "对比",
    "automation": "自动化",
    "changelog": "更新日志",
    "download": "下载",
    "faq": "常见问题",
    "source": "源代码",
    "issues": "提交问题"
  },
  "footer": {
    "tagline": "开源、自托管、零知识加密的指纹浏览器。数据在本机加密，网络行为可见，指纹画像由受控 Profile 生成。",
    "groups": {
      "product": "产品",
      "developers": "开发者",
      "community": "社区"
    }
  }
}
```

更新 `src/i18n/messages/en.json`：

```json
{
  "common": {
    "download": "Download",
    "viewSource": "View Source",
    "skeleton": "Skeleton placeholder"
  },
  "nav": {
    "security": "Security",
    "useCases": "Use Cases",
    "compare": "Compare",
    "automation": "Automation",
    "changelog": "Changelog",
    "download": "Download",
    "faq": "FAQ",
    "source": "Source",
    "issues": "Report Issue"
  },
  "footer": {
    "tagline": "Open-source, self-hosted, zero-knowledge encrypted fingerprint browser. Data encrypted locally, network behavior visible, fingerprint generated from controlled profiles.",
    "groups": {
      "product": "Product",
      "developers": "Developers",
      "community": "Community"
    }
  }
}
```

- [ ] **Step 8: 简化 `[locale]/page.tsx` 测试**

```tsx
import { setRequestLocale } from 'next-intl/server';
import { routing, type Locale } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="mx-auto max-w-7xl px-6 py-24">
      <h1 className="text-5xl font-bold tracking-tight">首页占位（locale: {locale}）</h1>
      <p className="mt-4 text-foreground-muted">Phase 3 会构建真正的 Hero。</p>
    </main>
  );
}
```

- [ ] **Step 9: 启动 dev 验证**

```bash
pnpm dev
```

验证：
- Header 居中，含 Logo、5 个导航、ThemeToggle、LanguageSwitch、Download 按钮
- 切语言：链接和按钮文本变化
- 切主题：背景颜色变化
- 缩窄到 < 768px：导航折叠到 MobileNav，点击汉堡打开 Sheet
- Footer 显示三个链接组

停止 dev。

- [ ] **Step 10: 提交**

```bash
git add src/
git commit -m "feat: Header / Footer / MobileNav + 完整导航 i18n"
```

---

## Phase 1 完成检查

阶段验收：dev 服务器跑得起来，所有路由（`/`、`/en`）可访问且 Header/Footer 正常显示，亮/暗主题切换无 FOUC，中英切换正确。

---

## Phase 2 · 内容迁移

### Task 2.1 — Features 数据

**Files:**
- Create: `src/content/features.ts`

- [ ] **Step 1: 写 `src/content/features.ts`**

```ts
import type { LucideIcon } from 'lucide-react';
import {
  Blocks,
  Fingerprint,
  Gauge,
  LockKeyhole,
  Network,
  Workflow,
} from 'lucide-react';

export type LocalizedText = { zh: string; en: string };

export type Feature = {
  key: string;
  icon: LucideIcon;
  title: LocalizedText;
  body: LocalizedText;
  highlight?: boolean; // 首页摘要选用
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
```

- [ ] **Step 2: 提交**

```bash
git add src/content/features.ts
git commit -m "feat(content): Features 数据（6 项，含 zh/en + 3 个 highlight）"
```

---

### Task 2.2 — Use Cases 数据

**Files:**
- Create: `src/content/use-cases.ts`

- [ ] **Step 1: 写 `src/content/use-cases.ts`**

```ts
import type { LucideIcon } from 'lucide-react';
import {
  Boxes,
  CircuitBoard,
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
};

export const useCases: UseCase[] = [
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
      { zh: '确定性指纹种子，画像跨会话稳定', en: 'Deterministic seeds, stable identities across sessions' },
      { zh: '每 Profile 独立代理、独立 DNS', en: 'Per-profile proxy, per-profile DNS' },
      { zh: '本地数据 AES-256 加密 + SQLCipher 整库', en: 'AES-256 + SQLCipher full-database encryption' },
    ],
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
      zh: '通过本地 HTTP API + CDP 端点，把每个隔离身份变成可程序化资源。API Key 与主密码独立，可细粒度授权与回收；560+ 自动化测试覆盖核心组件。',
      en: 'Local HTTP API + CDP endpoints expose each isolated identity as a programmable resource. API keys are independent from the master password, with fine-grained scopes and revocation; 560+ automated tests cover core components.',
    },
    capabilities: [
      { zh: 'HTTP API + CDP 双通道', en: 'HTTP API + CDP dual channel' },
      { zh: 'Playwright / Puppeteer / Selenium 兼容', en: 'Playwright / Puppeteer / Selenium compatible' },
      { zh: 'API Key 细粒度权限', en: 'Fine-grained API key permissions' },
    ],
  },
];
```

- [ ] **Step 2: 提交**

```bash
git add src/content/use-cases.ts
git commit -m "feat(content): Use Cases 数据（4 个人群，含完整叙事 + 能力清单）"
```

---

### Task 2.3 — Trust Points / Roadmap / Download / FAQ

**Files:**
- Create: `src/content/trust-points.ts`、`src/content/roadmap.ts`、`src/content/download.ts`、`src/content/faq.ts`

- [ ] **Step 1: 写 `src/content/trust-points.ts`**

```ts
import type { LucideIcon } from 'lucide-react';
import { CheckCircle2, FileKey2, KeyRound, ShieldCheck } from 'lucide-react';
import type { LocalizedText } from './features';

export type TrustPoint = {
  key: string;
  icon: LucideIcon;
  title: LocalizedText;
  body: LocalizedText;
};

export const trustPoints: TrustPoint[] = [
  {
    key: 'encryption-stack',
    icon: ShieldCheck,
    title: { zh: '加密栈', en: 'Encryption stack' },
    body: {
      zh: 'Argon2id 密钥派生 + AES-256-GCM 内容加密 + SQLCipher 整库加密。每层都可独立审计。',
      en: 'Argon2id key derivation + AES-256-GCM content encryption + SQLCipher full-database encryption. Each layer is independently auditable.',
    },
  },
  {
    key: 'recovery',
    icon: KeyRound,
    title: { zh: 'BIP39 恢复', en: 'BIP39 recovery' },
    body: {
      zh: '24 词恢复短语，丢失主密码无法由服务端找回——这是设计而非缺陷。',
      en: '24-word recovery phrase. If the master password is lost, the server cannot help you recover — by design.',
    },
  },
  {
    key: 'api-keys',
    icon: FileKey2,
    title: { zh: 'API Key 鉴权', en: 'API key authentication' },
    body: {
      zh: 'API Key 强制鉴权，独立于主密码并可细粒度回收。自动化访问与人类访问分离。',
      en: 'API keys enforce authentication, separate from the master password, with fine-grained revocation. Automation access stays isolated from human access.',
    },
  },
  {
    key: 'test-coverage',
    icon: CheckCircle2,
    title: { zh: '560+ 测试覆盖', en: '560+ tests' },
    body: {
      zh: '560+ 自动化测试覆盖 Core、Daemon 与代理组件，CI 每次提交都重跑。',
      en: '560+ automated tests cover Core, Daemon, and proxy components. CI re-runs them on every commit.',
    },
  },
];
```

- [ ] **Step 2: 写 `src/content/roadmap.ts`**

```ts
import type { LocalizedText } from './features';

export type RoadmapPhase = {
  phase: string;
  title: LocalizedText;
  status: LocalizedText;
  statusVariant: 'shipped' | 'active' | 'planned';
  body: LocalizedText;
};

export const roadmap: RoadmapPhase[] = [
  {
    phase: 'Phase 1',
    title: { zh: '单机完整版', en: 'Single-device complete' },
    status: { zh: 'v0.1.0 RC', en: 'v0.1.0 RC' },
    statusVariant: 'active',
    body: {
      zh: '桌面端、Profile、代理、指纹引擎、审计日志和自动化 API 已形成闭环。',
      en: 'Desktop app, profiles, proxy, fingerprint engine, audit log, and automation API form a complete loop.',
    },
  },
  {
    phase: 'Phase 2',
    title: { zh: '零知识云同步', en: 'Zero-knowledge cloud sync' },
    status: { zh: '计划中', en: 'Planned' },
    statusVariant: 'planned',
    body: {
      zh: '服务端只保存密文，密钥继续由用户持有，用订阅服务换取多设备便利。',
      en: 'Server only stores ciphertext; keys stay with users. Subscription unlocks multi-device convenience.',
    },
  },
  {
    phase: 'Phase 3',
    title: { zh: '企业版与更多终端', en: 'Enterprise & more endpoints' },
    status: { zh: '未来', en: 'Future' },
    statusVariant: 'planned',
    body: {
      zh: '面向团队协作、权限治理、批量运营和更复杂的安全审计场景。',
      en: 'Team collaboration, permission governance, batch operations, and advanced security audit scenarios.',
    },
  },
];
```

- [ ] **Step 3: 写 `src/content/download.ts`**

```ts
import type { LocalizedText } from './features';

export type Platform = {
  key: 'macos' | 'windows' | 'linux';
  label: string;
  icon: string; // path under /public/brand/
  filename: LocalizedText;
  archs: string[];
  url: string;
  sha256: string; // 实际发布时填入；此处先占位
};

export const platforms: Platform[] = [
  {
    key: 'macos',
    label: 'macOS',
    icon: '/brand/platform-macos.svg',
    filename: { zh: 'Veil-0.1.0-RC.dmg', en: 'Veil-0.1.0-RC.dmg' },
    archs: ['Universal (Intel + Apple Silicon)'],
    url: 'https://github.com/useveil/veil_official/releases/latest',
    sha256: 'PENDING',
  },
  {
    key: 'windows',
    label: 'Windows',
    icon: '/brand/platform-windows.svg',
    filename: { zh: 'Veil-0.1.0-RC-x64.exe', en: 'Veil-0.1.0-RC-x64.exe' },
    archs: ['x64', 'ARM64'],
    url: 'https://github.com/useveil/veil_official/releases/latest',
    sha256: 'PENDING',
  },
  {
    key: 'linux',
    label: 'Linux',
    icon: '/brand/platform-linux.svg',
    filename: { zh: 'Veil-0.1.0-RC.AppImage', en: 'Veil-0.1.0-RC.AppImage' },
    archs: ['x64', 'ARM64'],
    url: 'https://github.com/useveil/veil_official/releases/latest',
    sha256: 'PENDING',
  },
];
```

- [ ] **Step 4: 写 `src/content/faq.ts`**

```ts
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
```

- [ ] **Step 5: 提交**

```bash
git add src/content/
git commit -m "feat(content): Trust points / Roadmap / Download platforms / FAQ"
```

---

### Task 2.4 — Comparison 表 + Automation 代码示例

**Files:**
- Create: `src/content/comparison.ts`、`src/content/automation.ts`

- [ ] **Step 1: 写 `src/content/comparison.ts`**

```ts
import type { LocalizedText } from './features';

export type ComparisonCell = LocalizedText | { value: 'yes' | 'no' | 'partial' };

export type ComparisonRow = {
  key: string;
  feature: LocalizedText;
  veil: ComparisonCell;
  multilogin: ComparisonCell;
  adspower: ComparisonCell;
  bitbrowser: ComparisonCell;
  vmlogin: ComparisonCell;
};

export const comparisonColumns = ['veil', 'multilogin', 'adspower', 'bitbrowser', 'vmlogin'] as const;
export const comparisonLabels = {
  veil: 'Veil',
  multilogin: 'Multilogin',
  adspower: 'AdsPower',
  bitbrowser: 'BitBrowser',
  vmlogin: 'VMLogin',
};

export const comparisonRows: ComparisonRow[] = [
  {
    key: 'open-source',
    feature: { zh: '开源', en: 'Open source' },
    veil: { value: 'yes' },
    multilogin: { value: 'no' },
    adspower: { value: 'no' },
    bitbrowser: { value: 'no' },
    vmlogin: { value: 'no' },
  },
  {
    key: 'self-hosted',
    feature: { zh: '可自托管', en: 'Self-hostable' },
    veil: { value: 'yes' },
    multilogin: { value: 'no' },
    adspower: { value: 'no' },
    bitbrowser: { value: 'no' },
    vmlogin: { value: 'no' },
  },
  {
    key: 'zero-knowledge',
    feature: { zh: '零知识加密同步', en: 'Zero-knowledge sync' },
    veil: { zh: '路线图（Phase 2）', en: 'On roadmap (Phase 2)' },
    multilogin: { value: 'no' },
    adspower: { value: 'no' },
    bitbrowser: { value: 'no' },
    vmlogin: { value: 'no' },
  },
  {
    key: 'local-encryption',
    feature: { zh: '本机整库加密', en: 'Local full-database encryption' },
    veil: { zh: 'SQLCipher', en: 'SQLCipher' },
    multilogin: { value: 'partial' },
    adspower: { value: 'no' },
    bitbrowser: { value: 'no' },
    vmlogin: { value: 'no' },
  },
  {
    key: 'cdp-compatible',
    feature: { zh: 'CDP 兼容（Playwright/Puppeteer）', en: 'CDP-compatible' },
    veil: { value: 'yes' },
    multilogin: { value: 'yes' },
    adspower: { value: 'yes' },
    bitbrowser: { value: 'yes' },
    vmlogin: { value: 'yes' },
  },
  {
    key: 'http-api',
    feature: { zh: 'HTTP API', en: 'HTTP API' },
    veil: { value: 'yes' },
    multilogin: { value: 'yes' },
    adspower: { value: 'yes' },
    bitbrowser: { value: 'yes' },
    vmlogin: { value: 'partial' },
  },
  {
    key: 'audit-log',
    feature: { zh: '可导出审计日志', en: 'Exportable audit log' },
    veil: { value: 'yes' },
    multilogin: { value: 'partial' },
    adspower: { value: 'no' },
    bitbrowser: { value: 'no' },
    vmlogin: { value: 'no' },
  },
  {
    key: 'price',
    feature: { zh: '本体价格', en: 'Core pricing' },
    veil: { zh: '免费', en: 'Free' },
    multilogin: { zh: '$99/月起', en: 'From $99/mo' },
    adspower: { zh: '$5.4/月起', en: 'From $5.4/mo' },
    bitbrowser: { zh: '免费 + 收费档', en: 'Free + paid tiers' },
    vmlogin: { zh: '$59/月起', en: 'From $59/mo' },
  },
];
```

- [ ] **Step 2: 写 `src/content/automation.ts`**

```ts
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
```

- [ ] **Step 3: 提交**

```bash
git add src/content/comparison.ts src/content/automation.ts
git commit -m "feat(content): Comparison 表 + Automation 代码示例"
```

---

## Phase 3 · 首页 Sections

### Task 3.1 — Hero section

**Files:**
- Create: `src/components/sections/Hero.tsx`

- [ ] **Step 1: 写 `Hero.tsx`**

```tsx
import { ArrowDownToLine, GitBranch, LockKeyhole, MonitorCheck, Shield } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { SITE } from '@/content/constants';

const trustBadges = [
  { icon: Shield, key: 'license' },
  { icon: LockKeyhole, key: 'sqlcipher' },
  { icon: MonitorCheck, key: 'platforms' },
] as const;

export function Hero() {
  const t = useTranslations('home.hero');

  return (
    <section className="relative overflow-hidden border-b border-border">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(45,212,191,0.10),transparent_70%)]"
      />
      <div className="mx-auto max-w-7xl px-6 pt-24 pb-32 lg:pt-32 lg:pb-40">
        <div className="max-w-4xl">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface-elevated px-3 py-1 text-xs font-medium uppercase tracking-wider text-foreground-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
            {t('eyebrow')}
          </p>
          <h1 className="text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
            {t('title')}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-foreground-muted leading-relaxed">
            {t('subtitle')}
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <a href={SITE.releaseUrl} target="_blank" rel="noreferrer">
                <ArrowDownToLine className="h-4 w-4" />
                {t('primaryCta')}
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={SITE.repoUrl} target="_blank" rel="noreferrer">
                <GitBranch className="h-4 w-4" />
                {t('secondaryCta')}
              </a>
            </Button>
          </div>
          <ul className="mt-10 flex flex-wrap gap-3">
            {trustBadges.map(({ icon: Icon, key }) => (
              <li
                key={key}
                className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-3 py-2 text-xs font-medium text-foreground-muted"
              >
                <Icon className="h-3.5 w-3.5" />
                {t(`badges.${key}` as 'badges.license')}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: 补充 i18n 字符串到 `src/i18n/messages/zh.json`**

在 `zh.json` 中加入：

```json
"home": {
  "hero": {
    "eyebrow": "v0.1.0 RC · 开源 · 零知识加密",
    "title": "把"相信平台"换成"验证系统"",
    "subtitle": "Veil 是一个开源、自托管、零知识加密的指纹浏览器。数据在本机加密，网络行为可见，指纹画像由受控 Profile 生成——面向高价值多账号、Web3、电商和自动化团队。",
    "primaryCta": "下载 v0.1 RC",
    "secondaryCta": "查看源码",
    "badges": {
      "license": "AGPL-3.0",
      "sqlcipher": "SQLCipher",
      "platforms": "macOS · Windows · Linux"
    }
  }
}
```

补充到 `src/i18n/messages/en.json`：

```json
"home": {
  "hero": {
    "eyebrow": "v0.1.0 RC · Open source · Zero-knowledge",
    "title": "Trust nothing. Verify everything.",
    "subtitle": "Veil is an open-source, self-hosted, zero-knowledge encrypted fingerprint browser. Data is encrypted locally, network behavior is visible, and fingerprints come from controlled profiles — for high-value multi-account operations, Web3, e-commerce, and automation teams.",
    "primaryCta": "Download v0.1 RC",
    "secondaryCta": "View Source",
    "badges": {
      "license": "AGPL-3.0",
      "sqlcipher": "SQLCipher",
      "platforms": "macOS · Windows · Linux"
    }
  }
}
```

- [ ] **Step 3: 在首页临时挂上 Hero 验证**

修改 `src/app/[locale]/page.tsx`：

```tsx
import { setRequestLocale } from 'next-intl/server';
import { Hero } from '@/components/sections/Hero';
import { routing, type Locale } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <Hero />;
}
```

- [ ] **Step 4: 启动 dev 验证**

```bash
pnpm dev
```

验证：
- Hero 居中，大标题清晰
- 下载 + 查看源码两个 CTA
- 三个 trust badge
- 中英切换正常

停止 dev。

- [ ] **Step 5: 提交**

```bash
git add src/components/sections/Hero.tsx src/app/[locale]/page.tsx src/i18n/messages/
git commit -m "feat(sections): Hero + i18n 字符串"
```

---

### Task 3.2 — FeatureGrid section

**Files:**
- Create: `src/components/sections/FeatureGrid.tsx`、`src/components/sections/SectionHeading.tsx`

- [ ] **Step 1: 写 `SectionHeading.tsx`（通用版块标题）**

```tsx
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'max-w-3xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      {eyebrow && (
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{title}</h2>
      {description && (
        <p className="mt-4 text-base text-foreground-muted leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
```

- [ ] **Step 2: 写 `FeatureGrid.tsx`**

```tsx
import { useLocale, useTranslations } from 'next-intl';
import { features } from '@/content/features';
import type { Locale } from '@/i18n/routing';
import { SectionHeading } from './SectionHeading';

export type FeatureGridProps = {
  /** 'all' 渲染全部 6 项，'highlight' 只渲染 highlight=true 的项 */
  variant?: 'all' | 'highlight';
};

export function FeatureGrid({ variant = 'all' }: FeatureGridProps) {
  const t = useTranslations('home.features');
  const locale = useLocale() as Locale;
  const items = variant === 'highlight' ? features.filter((f) => f.highlight) : features;

  return (
    <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">
      <SectionHeading
        eyebrow={t('eyebrow')}
        title={t('title')}
        description={t('description')}
      />
      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((feature) => {
          const Icon = feature.icon;
          return (
            <li
              key={feature.key}
              className="group relative rounded-lg border border-border bg-surface-elevated p-6 transition-colors hover:border-border-strong"
            >
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-teal-50 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-semibold tracking-tight">
                {feature.title[locale]}
              </h3>
              <p className="mt-2 text-sm text-foreground-muted leading-relaxed">
                {feature.body[locale]}
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
```

- [ ] **Step 3: 补 i18n 字符串**

`zh.json` 加：

```json
"home": {
  "hero": { /* 前面已有 */ },
  "features": {
    "eyebrow": "为什么选择 Veil",
    "title": "把"相信平台"换成"验证系统"",
    "description": "六个核心特性，决定了 Veil 与其他指纹浏览器的根本差异。"
  }
}
```

`en.json` 加：

```json
"home": {
  "hero": { /* 前面已有 */ },
  "features": {
    "eyebrow": "Why Veil",
    "title": "Replace "trust the platform" with "verify the system"",
    "description": "Six core features that set Veil apart from other fingerprint browsers."
  }
}
```

- [ ] **Step 4: 在首页挂上 FeatureGrid（highlight 变体，只显示 3 个）**

修改 `src/app/[locale]/page.tsx`：

```tsx
import { setRequestLocale } from 'next-intl/server';
import { FeatureGrid } from '@/components/sections/FeatureGrid';
import { Hero } from '@/components/sections/Hero';
import { routing, type Locale } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <FeatureGrid variant="highlight" />
    </>
  );
}
```

- [ ] **Step 5: 验证**

```bash
pnpm dev
```

页面应显示 3 个高亮特性卡。停止 dev。

- [ ] **Step 6: 提交**

```bash
git add src/components/sections/ src/app/[locale]/page.tsx src/i18n/messages/
git commit -m "feat(sections): FeatureGrid + 通用 SectionHeading"
```

---

### Task 3.3 — UseCaseGrid 摘要版 section

**Files:**
- Create: `src/components/sections/UseCaseGrid.tsx`

- [ ] **Step 1: 写 `UseCaseGrid.tsx`**

```tsx
import { ArrowUpRight } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { useCases } from '@/content/use-cases';
import type { Locale } from '@/i18n/routing';
import { SectionHeading } from './SectionHeading';

export function UseCaseGrid() {
  const t = useTranslations('home.useCases');
  const locale = useLocale() as Locale;

  return (
    <section className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <SectionHeading
          eyebrow={t('eyebrow')}
          title={t('title')}
          description={t('description')}
        />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2">
          {useCases.map((useCase) => {
            const Icon = useCase.icon;
            return (
              <li key={useCase.key}>
                <Link
                  href={{ pathname: `/use-cases#${useCase.key}` }}
                  className="group block h-full rounded-lg border border-border bg-background p-7 transition-all hover:border-border-strong hover:shadow-md"
                >
                  <div className="flex items-start justify-between">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-ink-100 text-ink dark:bg-ink-800 dark:text-ink-50">
                      <Icon className="h-5 w-5" />
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-foreground-subtle transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold tracking-tight">
                    {useCase.title[locale]}
                  </h3>
                  <p className="mt-2 text-sm font-medium text-foreground-muted">
                    {useCase.tagline[locale]}
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: 补 i18n**

`zh.json` 的 `home`：

```json
"useCases": {
  "eyebrow": "应用场景",
  "title": "为高价值身份隔离而生",
  "description": "无论是多账号、钱包隔离、电商运营，还是自动化团队——Veil 都把"隔离"做成了可验证的工程问题。"
}
```

`en.json` 的 `home`：

```json
"useCases": {
  "eyebrow": "Use cases",
  "title": "Built for high-value identity isolation",
  "description": "Multi-account, wallet isolation, storefront operations, automation teams — Veil turns "isolation" into a verifiable engineering concern."
}
```

- [ ] **Step 3: 挂到首页**

`src/app/[locale]/page.tsx`：

```tsx
import { setRequestLocale } from 'next-intl/server';
import { FeatureGrid } from '@/components/sections/FeatureGrid';
import { Hero } from '@/components/sections/Hero';
import { UseCaseGrid } from '@/components/sections/UseCaseGrid';
import { routing, type Locale } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <FeatureGrid variant="highlight" />
      <UseCaseGrid />
    </>
  );
}
```

- [ ] **Step 4: 验证 + 提交**

```bash
pnpm dev   # 检查页面
# Ctrl+C
git add src/components/sections/UseCaseGrid.tsx src/app/[locale]/page.tsx src/i18n/messages/
git commit -m "feat(sections): UseCaseGrid（首页摘要 4 卡）"
```

---

### Task 3.4 — RoadmapList + OpenSourceCallout + FinalCTA

**Files:**
- Create: `src/components/sections/RoadmapList.tsx`、`src/components/sections/OpenSourceCallout.tsx`、`src/components/sections/FinalCTA.tsx`

- [ ] **Step 1: 写 `RoadmapList.tsx`**

```tsx
import { useLocale, useTranslations } from 'next-intl';
import { roadmap, type RoadmapPhase } from '@/content/roadmap';
import type { Locale } from '@/i18n/routing';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { SectionHeading } from './SectionHeading';

const variantClasses: Record<RoadmapPhase['statusVariant'], string> = {
  shipped: 'bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-200',
  active: 'bg-teal-500 text-white dark:bg-teal-400 dark:text-ink',
  planned: 'bg-ink-100 text-ink-700 dark:bg-ink-800 dark:text-ink-200',
};

export function RoadmapList({ compact = false }: { compact?: boolean }) {
  const t = useTranslations('home.roadmap');
  const locale = useLocale() as Locale;

  return (
    <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">
      <SectionHeading eyebrow={t('eyebrow')} title={t('title')} />
      <ol className="mt-12 divide-y divide-border border-y border-border">
        {roadmap.map((item) => (
          <li
            key={item.phase}
            className={cn(
              'grid gap-4 py-7 md:grid-cols-[200px_1fr_auto] md:items-center md:gap-8',
            )}
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                {item.phase}
              </p>
              <h3 className="mt-1 text-lg font-semibold tracking-tight">
                {item.title[locale]}
              </h3>
            </div>
            {!compact && (
              <p className="text-sm text-foreground-muted leading-relaxed">
                {item.body[locale]}
              </p>
            )}
            <Badge className={cn('justify-self-start md:justify-self-end', variantClasses[item.statusVariant])}>
              {item.status[locale]}
            </Badge>
          </li>
        ))}
      </ol>
    </section>
  );
}
```

- [ ] **Step 2: 写 `OpenSourceCallout.tsx`**

```tsx
import { GitBranch, Github, Star } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { SITE } from '@/content/constants';

export function OpenSourceCallout() {
  const t = useTranslations('home.openSource');

  return (
    <section className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400">
              {t('eyebrow')}
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              {t('title')}
            </h2>
            <p className="mt-4 text-base text-foreground-muted leading-relaxed">
              {t('body')}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild>
                <a href={SITE.repoUrl} target="_blank" rel="noreferrer">
                  <Github className="h-4 w-4" />
                  {t('repoCta')}
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href={`${SITE.repoUrl}/blob/main/CONTRIBUTING.md`} target="_blank" rel="noreferrer">
                  <GitBranch className="h-4 w-4" />
                  {t('contributeCta')}
                </a>
              </Button>
            </div>
          </div>
          <div className="rounded-lg border border-border bg-background p-6 font-mono text-sm">
            <pre className="overflow-x-auto">
              <code className="text-foreground-muted">
                <span className="text-teal-600 dark:text-teal-400">$</span> git clone {SITE.repoUrl}
                {`\n`}
                <span className="text-teal-600 dark:text-teal-400">$</span> cd veil_official
                {`\n`}
                <span className="text-teal-600 dark:text-teal-400">$</span> pnpm install && pnpm dev
                {`\n`}
                {`\n`}
                <span className="text-foreground-subtle">{`# License: ${SITE.license}`}</span>
                {`\n`}
                <span className="text-foreground-subtle">{`# Tests:   560+ automated`}</span>
              </code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: 写 `FinalCTA.tsx`**

```tsx
import { ArrowDownToLine, Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { SITE } from '@/content/constants';

export function FinalCTA() {
  const t = useTranslations('home.finalCta');

  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-3xl px-6 py-24 md:py-32 text-center">
        <Sparkles className="mx-auto h-8 w-8 text-teal-500 dark:text-teal-400" />
        <h2 className="mt-6 text-3xl font-bold tracking-tight md:text-4xl">{t('title')}</h2>
        <p className="mt-4 text-base text-foreground-muted leading-relaxed">{t('body')}</p>
        <Button asChild size="lg" className="mt-10">
          <a href={SITE.releaseUrl} target="_blank" rel="noreferrer">
            <ArrowDownToLine className="h-4 w-4" />
            {t('cta')}
          </a>
        </Button>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: 补 i18n（roadmap / openSource / finalCta）**

`zh.json` 的 `home` 加：

```json
"roadmap": {
  "eyebrow": "路线图",
  "title": "从本地安全，到零知识协作"
},
"openSource": {
  "eyebrow": "开源",
  "title": "让安全承诺能被看见、被审计、被重新构建",
  "body": "Veil 核心引擎采用 AGPL-3.0 开源协议。你可以审计代码、独立编译、自托管运行，并验证我们的所有安全承诺。",
  "repoCta": "前往 GitHub",
  "contributeCta": "参与贡献"
},
"finalCta": {
  "title": "你不需要相信我们。",
  "body": "你只需要让自己有能力验证我们。下载 Veil，把安全承诺变成可被检查的工程事实。",
  "cta": "前往下载"
}
```

`en.json` 的 `home` 加：

```json
"roadmap": {
  "eyebrow": "Roadmap",
  "title": "From local security to zero-knowledge collaboration"
},
"openSource": {
  "eyebrow": "Open source",
  "title": "Make security promises visible, auditable, and rebuildable",
  "body": "Veil's core engine is AGPL-3.0 licensed. You can audit the code, build it yourself, self-host it, and verify every security claim we make.",
  "repoCta": "Open on GitHub",
  "contributeCta": "Contribute"
},
"finalCta": {
  "title": "You don't need to trust us.",
  "body": "You just need the ability to verify us. Download Veil and turn security promises into checkable engineering facts.",
  "cta": "Download now"
}
```

- [ ] **Step 5: 装配首页**

```tsx
import { setRequestLocale } from 'next-intl/server';
import { FeatureGrid } from '@/components/sections/FeatureGrid';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { Hero } from '@/components/sections/Hero';
import { OpenSourceCallout } from '@/components/sections/OpenSourceCallout';
import { RoadmapList } from '@/components/sections/RoadmapList';
import { UseCaseGrid } from '@/components/sections/UseCaseGrid';
import { routing, type Locale } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <FeatureGrid variant="highlight" />
      <UseCaseGrid />
      <RoadmapList compact />
      <OpenSourceCallout />
      <FinalCTA />
    </>
  );
}
```

- [ ] **Step 6: 验证 + 提交**

```bash
pnpm dev   # 检查整个首页流畅
# Ctrl+C
git add src/
git commit -m "feat: 首页装配完成（Hero + Features + UseCases + Roadmap + OpenSource + FinalCTA）"
```

---

## Phase 3 完成检查

阶段验收：首页在 zh / en、亮 / 暗 4 个组合下视觉一致、内容正确、无横向滚动、CTA 可点击。

---

## Phase 4 · 信任页（/security · /compare · /faq · /download）

### Task 4.1 — SecurityStack section（加密栈可视化）

**Files:**
- Create: `src/components/sections/SecurityStack.tsx`

- [ ] **Step 1: 写 `SecurityStack.tsx`**

```tsx
import { ArrowDown, Database, FileLock2, KeyRound, Lock } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import type { LocalizedText } from '@/content/features';
import type { Locale } from '@/i18n/routing';
import { SectionHeading } from './SectionHeading';

type StackLayer = {
  key: string;
  icon: typeof Lock;
  label: LocalizedText;
  detail: LocalizedText;
};

const layers: StackLayer[] = [
  {
    key: 'password',
    icon: KeyRound,
    label: { zh: '主密码（用户输入）', en: 'Master password (user input)' },
    detail: { zh: '永远不上传，永远不可重置', en: 'Never uploaded, never resettable' },
  },
  {
    key: 'kdf',
    icon: Lock,
    label: { zh: 'Argon2id 密钥派生', en: 'Argon2id key derivation' },
    detail: {
      zh: 'memory-hard 抗 GPU/ASIC 暴力破解',
      en: 'memory-hard, resistant to GPU/ASIC brute-force',
    },
  },
  {
    key: 'aes',
    icon: FileLock2,
    label: { zh: 'AES-256-GCM 内容加密', en: 'AES-256-GCM content encryption' },
    detail: {
      zh: '每条记录独立 IV，完整性自带验证',
      en: 'Per-record IV with built-in integrity verification',
    },
  },
  {
    key: 'sqlcipher',
    icon: Database,
    label: { zh: 'SQLCipher 整库加密', en: 'SQLCipher full-database encryption' },
    detail: {
      zh: '元数据、索引、临时表一律加密',
      en: 'Metadata, indexes, and temp tables all encrypted',
    },
  },
];

export function SecurityStack() {
  const t = useTranslations('security.stack');
  const locale = useLocale() as Locale;

  return (
    <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">
      <SectionHeading
        eyebrow={t('eyebrow')}
        title={t('title')}
        description={t('description')}
      />
      <ol className="mt-12 grid gap-3 md:max-w-2xl">
        {layers.map((layer, index) => {
          const Icon = layer.icon;
          return (
            <li key={layer.key}>
              <div className="flex items-center gap-4 rounded-lg border border-border bg-surface-elevated p-5">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-teal-50 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-mono font-semibold tracking-tight">
                    {layer.label[locale]}
                  </h3>
                  <p className="mt-1 text-sm text-foreground-muted">
                    {layer.detail[locale]}
                  </p>
                </div>
              </div>
              {index < layers.length - 1 && (
                <div className="flex justify-center py-1.5" aria-hidden>
                  <ArrowDown className="h-4 w-4 text-foreground-subtle" />
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
```

- [ ] **Step 2: 提交**

```bash
git add src/components/sections/SecurityStack.tsx
git commit -m "feat(sections): SecurityStack 加密栈可视化"
```

---

### Task 4.2 — TrustList + SecurityThreatModel sections

**Files:**
- Create: `src/components/sections/TrustList.tsx`、`src/components/sections/SecurityThreatModel.tsx`

- [ ] **Step 1: 写 `TrustList.tsx`**

```tsx
import { useLocale, useTranslations } from 'next-intl';
import { trustPoints } from '@/content/trust-points';
import type { Locale } from '@/i18n/routing';
import { SectionHeading } from './SectionHeading';

export function TrustList() {
  const t = useTranslations('security.trust');
  const locale = useLocale() as Locale;

  return (
    <section className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <SectionHeading eyebrow={t('eyebrow')} title={t('title')} />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2">
          {trustPoints.map((item) => {
            const Icon = item.icon;
            return (
              <li
                key={item.key}
                className="rounded-lg border border-border bg-background p-6"
              >
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-ink-100 text-ink dark:bg-ink-800 dark:text-ink-50">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold tracking-tight">
                  {item.title[locale]}
                </h3>
                <p className="mt-2 text-sm text-foreground-muted leading-relaxed">
                  {item.body[locale]}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: 写 `SecurityThreatModel.tsx`**

```tsx
import { Check, X } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import type { LocalizedText } from '@/content/features';
import type { Locale } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import { SectionHeading } from './SectionHeading';

type ThreatRow = {
  key: string;
  threat: LocalizedText;
  protected: boolean;
  reasoning: LocalizedText;
};

const threats: ThreatRow[] = [
  {
    key: 'server-breach',
    threat: { zh: '服务端整库泄漏', en: 'Server-side full-database leak' },
    protected: true,
    reasoning: {
      zh: '只能拿到密文。主密钥从未离开用户设备。',
      en: 'Only ciphertext exfiltrated. Master key never leaves the user device.',
    },
  },
  {
    key: 'admin-malicious',
    threat: { zh: '云服务管理员恶意访问', en: 'Cloud admin actively malicious' },
    protected: true,
    reasoning: {
      zh: '同上：没有密钥就读不到明文。',
      en: 'Same as above: no key, no plaintext.',
    },
  },
  {
    key: 'mitm-cdn',
    threat: { zh: 'CDN / TLS 中间人攻击', en: 'CDN / TLS man-in-the-middle' },
    protected: true,
    reasoning: {
      zh: '客户端 → 服务端的全部数据都是预先加密的密文。',
      en: 'All client→server payloads are pre-encrypted ciphertext.',
    },
  },
  {
    key: 'master-pw-leak',
    threat: { zh: '用户主密码泄漏', en: 'User master password leaked' },
    protected: false,
    reasoning: {
      zh: '主密码 = 所有数据的根。请使用密码管理器 + 不在多个服务复用。',
      en: 'Master password = root of all data. Use a password manager and never reuse.',
    },
  },
  {
    key: 'device-malware',
    threat: { zh: '本机被植入键盘记录恶意软件', en: 'Local device infected with keylogger malware' },
    protected: false,
    reasoning: {
      zh: '本地安全是用户自身的责任范围。Veil 不能替代终端 EDR。',
      en: 'Local-device security is the user\\'s responsibility. Veil cannot substitute for endpoint EDR.',
    },
  },
  {
    key: 'physical-coercion',
    threat: { zh: '物理胁迫交出主密码', en: 'Physical coercion to reveal master password' },
    protected: false,
    reasoning: {
      zh: '密码学解决不了"扳手攻击"。可使用"应急销毁短语"在被胁迫时清空本机数据。',
      en: '"Wrench attacks" are not solvable by cryptography. Use an emergency-wipe phrase to nuke local data under coercion.',
    },
  },
];

export function SecurityThreatModel() {
  const t = useTranslations('security.threats');
  const locale = useLocale() as Locale;

  return (
    <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">
      <SectionHeading
        eyebrow={t('eyebrow')}
        title={t('title')}
        description={t('description')}
      />
      <div className="mt-12 overflow-hidden rounded-lg border border-border">
        <table className="w-full">
          <thead className="bg-surface text-xs font-semibold uppercase tracking-wider text-foreground-subtle">
            <tr>
              <th scope="col" className="px-5 py-3 text-left">{t('headers.threat')}</th>
              <th scope="col" className="px-5 py-3 text-left">{t('headers.protected')}</th>
              <th scope="col" className="px-5 py-3 text-left">{t('headers.reasoning')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border bg-background text-sm">
            {threats.map((row) => (
              <tr key={row.key}>
                <td className="px-5 py-4 font-medium">{row.threat[locale]}</td>
                <td className="px-5 py-4">
                  <span
                    className={cn(
                      'inline-flex h-7 w-7 items-center justify-center rounded-full',
                      row.protected
                        ? 'bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-300'
                        : 'bg-ink-100 text-ink-600 dark:bg-ink-800 dark:text-ink-400',
                    )}
                    aria-label={row.protected ? t('protectedYes') : t('protectedNo')}
                  >
                    {row.protected ? <Check className="h-3.5 w-3.5" /> : <X className="h-3.5 w-3.5" />}
                  </span>
                </td>
                <td className="px-5 py-4 text-foreground-muted">{row.reasoning[locale]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: 提交**

```bash
git add src/components/sections/TrustList.tsx src/components/sections/SecurityThreatModel.tsx
git commit -m "feat(sections): TrustList + SecurityThreatModel"
```

---

### Task 4.3 — `/security` 页面

**Files:**
- Create: `src/app/[locale]/security/page.tsx`

- [ ] **Step 1: 写 `page.tsx`**

```tsx
import { setRequestLocale } from 'next-intl/server';
import { SecurityStack } from '@/components/sections/SecurityStack';
import { SecurityThreatModel } from '@/components/sections/SecurityThreatModel';
import { TrustList } from '@/components/sections/TrustList';
import { routing, type Locale } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function SecurityPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <SecurityStack />
      <TrustList />
      <SecurityThreatModel />
    </>
  );
}
```

- [ ] **Step 2: 补 i18n（security namespace）**

`zh.json` 顶层加：

```json
"security": {
  "stack": {
    "eyebrow": "加密栈",
    "title": "从主密码到密文落库的完整路径",
    "description": "每一层都使用业界标准算法且可独立替换。攻击者拿到任何一层的数据都无法跳到下一层。"
  },
  "trust": {
    "eyebrow": "为什么可信",
    "title": "四个具体承诺，每个都可被验证"
  },
  "threats": {
    "eyebrow": "威胁模型",
    "title": "Veil 防护谁，不防护谁",
    "description": "诚实地列出我们覆盖的威胁与不覆盖的威胁。任何安全产品对"超出威胁模型"的攻击都无能为力。",
    "headers": {
      "threat": "威胁",
      "protected": "是否防护",
      "reasoning": "原因"
    },
    "protectedYes": "已防护",
    "protectedNo": "不在威胁模型内"
  }
}
```

`en.json` 顶层加：

```json
"security": {
  "stack": {
    "eyebrow": "Encryption stack",
    "title": "From master password to ciphertext on disk",
    "description": "Each layer uses industry-standard algorithms and is independently replaceable. Compromising one layer doesn't grant access to the next."
  },
  "trust": {
    "eyebrow": "Why trust this",
    "title": "Four specific promises, each one verifiable"
  },
  "threats": {
    "eyebrow": "Threat model",
    "title": "What Veil protects against — and what it doesn't",
    "description": "We honestly list both the threats we cover and the ones we don't. No security product is effective against attacks outside its threat model.",
    "headers": {
      "threat": "Threat",
      "protected": "Protected",
      "reasoning": "Reasoning"
    },
    "protectedYes": "Protected",
    "protectedNo": "Outside threat model"
  }
}
```

- [ ] **Step 3: 验证 + 提交**

```bash
pnpm dev
# 访问 /security 和 /en/security 检查
# Ctrl+C
git add src/app/[locale]/security/ src/i18n/messages/
git commit -m "feat: /security 页面"
```

---

### Task 4.4 — ComparisonTable section + `/compare` 页面

**Files:**
- Create: `src/components/sections/ComparisonTable.tsx`、`src/app/[locale]/compare/page.tsx`

- [ ] **Step 1: 写 `ComparisonTable.tsx`**

```tsx
import { Check, Minus, X } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import {
  type ComparisonCell,
  comparisonColumns,
  comparisonLabels,
  comparisonRows,
} from '@/content/comparison';
import type { Locale } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import { SectionHeading } from './SectionHeading';

function renderCell(cell: ComparisonCell, locale: Locale, isVeil: boolean) {
  if ('value' in cell) {
    const config = {
      yes: { Icon: Check, className: isVeil ? 'text-teal-500' : 'text-foreground-muted' },
      no: { Icon: X, className: 'text-ink-400 dark:text-ink-500' },
      partial: { Icon: Minus, className: 'text-amber-500' },
    } as const;
    const { Icon, className } = config[cell.value];
    return <Icon className={cn('h-4 w-4', className)} />;
  }
  return <span className={cn('text-sm', isVeil && 'font-semibold')}>{cell[locale]}</span>;
}

export function ComparisonTable() {
  const t = useTranslations('compare');
  const locale = useLocale() as Locale;

  return (
    <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">
      <SectionHeading
        eyebrow={t('eyebrow')}
        title={t('title')}
        description={t('description')}
      />
      <div className="mt-12 overflow-x-auto rounded-lg border border-border">
        <table className="w-full min-w-[720px]">
          <thead className="bg-surface text-xs font-semibold uppercase tracking-wider text-foreground-subtle">
            <tr>
              <th scope="col" className="px-5 py-3 text-left">{t('featureColumn')}</th>
              {comparisonColumns.map((col) => (
                <th
                  key={col}
                  scope="col"
                  className={cn(
                    'px-5 py-3 text-left',
                    col === 'veil' && 'text-teal-700 dark:text-teal-300',
                  )}
                >
                  {comparisonLabels[col]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border bg-background text-sm">
            {comparisonRows.map((row) => (
              <tr key={row.key}>
                <td className="px-5 py-4 font-medium">{row.feature[locale]}</td>
                {comparisonColumns.map((col) => (
                  <td
                    key={col}
                    className={cn(
                      'px-5 py-4',
                      col === 'veil' && 'bg-teal-50/40 dark:bg-teal-900/10',
                    )}
                  >
                    {renderCell(row[col], locale, col === 'veil')}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-xs text-foreground-subtle">{t('footnote')}</p>
    </section>
  );
}
```

- [ ] **Step 2: 写 `/compare/page.tsx`**

```tsx
import { setRequestLocale } from 'next-intl/server';
import { ComparisonTable } from '@/components/sections/ComparisonTable';
import { routing, type Locale } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function ComparePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ComparisonTable />;
}
```

- [ ] **Step 3: 补 i18n（compare namespace）**

`zh.json`：

```json
"compare": {
  "eyebrow": "对比",
  "title": "Veil 与同类工具的核心差异",
  "description": "我们只列可以被独立验证的事实。价格信息基于 2026 年 5 月公开页面。",
  "featureColumn": "特性",
  "footnote": "* 价格信息和功能集合可能随产品更新发生变化。建议在购买前以厂商官网为准。"
}
```

`en.json`：

```json
"compare": {
  "eyebrow": "Compare",
  "title": "How Veil differs from comparable tools",
  "description": "We only list independently verifiable facts. Pricing reflects public pages as of May 2026.",
  "featureColumn": "Feature",
  "footnote": "* Pricing and feature sets may change. Confirm vendor websites before purchasing."
}
```

- [ ] **Step 4: 验证 + 提交**

```bash
pnpm dev
# 访问 /compare 和 /en/compare
# Ctrl+C
git add src/components/sections/ComparisonTable.tsx src/app/[locale]/compare/ src/i18n/messages/
git commit -m "feat: /compare 页面 + ComparisonTable section"
```

---

### Task 4.5 — FaqAccordion section + `/faq` 页面

**Files:**
- Create: `src/components/sections/FaqAccordion.tsx`、`src/app/[locale]/faq/page.tsx`

- [ ] **Step 1: 写 `FaqAccordion.tsx`**

```tsx
import { useLocale, useTranslations } from 'next-intl';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { faqGroups } from '@/content/faq';
import type { Locale } from '@/i18n/routing';
import { SectionHeading } from './SectionHeading';

export function FaqAccordion() {
  const t = useTranslations('faq');
  const locale = useLocale() as Locale;

  return (
    <section className="mx-auto max-w-4xl px-6 py-24 md:py-32">
      <SectionHeading
        eyebrow={t('eyebrow')}
        title={t('title')}
        description={t('description')}
        align="center"
      />
      <div className="mt-12 space-y-10">
        {faqGroups.map((group) => (
          <div key={group.key}>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-foreground-subtle">
              {group.title[locale]}
            </h3>
            <Accordion type="single" collapsible className="w-full">
              {group.items.map((item) => (
                <AccordionItem key={item.key} value={item.key}>
                  <AccordionTrigger className="text-left text-base font-medium">
                    {item.question[locale]}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-foreground-muted leading-relaxed">
                    {item.answer[locale]}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: 写 `/faq/page.tsx`**

```tsx
import { setRequestLocale } from 'next-intl/server';
import { FaqAccordion } from '@/components/sections/FaqAccordion';
import { routing, type Locale } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <FaqAccordion />;
}
```

- [ ] **Step 3: 补 i18n**

`zh.json`：

```json
"faq": {
  "eyebrow": "常见问题",
  "title": "在你决定使用之前",
  "description": "如果下面没有覆盖你的问题，欢迎在 GitHub Issues 直接提问。"
}
```

`en.json`：

```json
"faq": {
  "eyebrow": "FAQ",
  "title": "Before you decide",
  "description": "If your question isn't covered, please open a GitHub issue."
}
```

- [ ] **Step 4: 验证 + 提交**

```bash
pnpm dev
# 访问 /faq，验证三个分组、每组里的折叠面板可以展开收起
# Ctrl+C
git add src/components/sections/FaqAccordion.tsx src/app/[locale]/faq/ src/i18n/messages/
git commit -m "feat: /faq 页面 + FaqAccordion（按主题分组）"
```

---

### Task 4.6 — DownloadGrid section + `/download` 页面

**Files:**
- Create: `src/components/sections/DownloadGrid.tsx`、`src/app/[locale]/download/page.tsx`

- [ ] **Step 1: 写 `DownloadGrid.tsx`**

```tsx
import { ArrowDownToLine, Copy, ShieldCheck } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { platforms, type Platform } from '@/content/download';
import type { Locale } from '@/i18n/routing';
import { SectionHeading } from './SectionHeading';

export function DownloadGrid() {
  const t = useTranslations('download');
  const locale = useLocale() as Locale;

  return (
    <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">
      <SectionHeading
        eyebrow={t('eyebrow')}
        title={t('title')}
        description={t('description')}
        align="center"
      />
      <ul className="mt-12 grid gap-4 md:grid-cols-3">
        {platforms.map((platform) => (
          <li key={platform.key}>
            <PlatformCard platform={platform} locale={locale} t={t} />
          </li>
        ))}
      </ul>
      <div className="mt-12 rounded-lg border border-border bg-surface p-6 md:p-8">
        <div className="flex items-start gap-4">
          <ShieldCheck className="mt-1 h-5 w-5 flex-shrink-0 text-teal-600 dark:text-teal-400" />
          <div>
            <h3 className="text-base font-semibold tracking-tight">
              {t('verification.title')}
            </h3>
            <p className="mt-2 text-sm text-foreground-muted leading-relaxed">
              {t('verification.body')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function PlatformCard({
  platform,
  locale,
  t,
}: {
  platform: Platform;
  locale: Locale;
  t: ReturnType<typeof useTranslations<'download'>>;
}) {
  return (
    <div className="flex h-full flex-col rounded-lg border border-border bg-surface-elevated p-7">
      <div className="text-3xl font-mono font-bold tracking-tight">{platform.label}</div>
      <p className="mt-2 text-xs text-foreground-subtle">{platform.archs.join(' · ')}</p>
      <p className="mt-6 font-mono text-sm text-foreground">{platform.filename[locale]}</p>
      <div className="mt-2 flex items-center gap-1.5 text-xs text-foreground-subtle">
        <code className="truncate font-mono">SHA-256: {platform.sha256.slice(0, 12)}…</code>
        <Button
          variant="ghost"
          size="icon"
          className="h-5 w-5"
          aria-label={t('copyHash')}
        >
          <Copy className="h-3 w-3" />
        </Button>
      </div>
      <Button asChild className="mt-auto w-full pt-6" size="lg">
        <a href={platform.url} target="_blank" rel="noreferrer">
          <ArrowDownToLine className="h-4 w-4" />
          {t('downloadFor', { platform: platform.label })}
        </a>
      </Button>
    </div>
  );
}
```

- [ ] **Step 2: 写 `/download/page.tsx`**

```tsx
import { setRequestLocale } from 'next-intl/server';
import { DownloadGrid } from '@/components/sections/DownloadGrid';
import { routing, type Locale } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function DownloadPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <DownloadGrid />;
}
```

- [ ] **Step 3: 补 i18n**

`zh.json`：

```json
"download": {
  "eyebrow": "下载",
  "title": "选择你的平台",
  "description": "所有发布都附带 SHA-256 校验和与 GitHub 签名。建议在安装前先校验。",
  "downloadFor": "下载 {platform}",
  "copyHash": "复制校验和",
  "verification": {
    "title": "如何验证下载文件",
    "body": "用 shasum -a 256 <文件名> 计算下载文件的哈希，与上面的 SHA-256 对比。也可以在 GitHub Releases 页查看 cosign 签名。"
  }
}
```

`en.json`：

```json
"download": {
  "eyebrow": "Download",
  "title": "Choose your platform",
  "description": "Every release ships with SHA-256 checksums and GitHub-signed artifacts. Please verify before installing.",
  "downloadFor": "Download for {platform}",
  "copyHash": "Copy checksum",
  "verification": {
    "title": "How to verify your download",
    "body": "Compute the hash with shasum -a 256 <filename> and compare to the SHA-256 above. You can also verify cosign signatures on the GitHub Releases page."
  }
}
```

- [ ] **Step 4: 验证 + 提交**

```bash
pnpm dev
# 访问 /download，验证三个平台卡片
# Ctrl+C
git add src/components/sections/DownloadGrid.tsx src/app/[locale]/download/ src/i18n/messages/
git commit -m "feat: /download 页面 + DownloadGrid（含校验和提示）"
```

---

## Phase 4 完成检查

阶段验收：`/security`、`/compare`、`/faq`、`/download` 四个页面在 zh / en + 亮 / 暗下均正常渲染、内容完整、表格可横向滚动、Accordion 可展开。

---

## Phase 5 · 开发者页（/use-cases · /automation · /changelog）

### Task 5.1 — UseCaseDeep section + `/use-cases` 页面

**Files:**
- Create: `src/components/sections/UseCaseDeep.tsx`、`src/app/[locale]/use-cases/page.tsx`

- [ ] **Step 1: 写 `UseCaseDeep.tsx`**

```tsx
import { CheckCircle2 } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useCases } from '@/content/use-cases';
import type { Locale } from '@/i18n/routing';
import { SectionHeading } from './SectionHeading';

export function UseCaseDeep() {
  const t = useTranslations('useCases');
  const locale = useLocale() as Locale;

  return (
    <>
      <section className="mx-auto max-w-7xl px-6 pt-24 md:pt-32">
        <SectionHeading
          eyebrow={t('eyebrow')}
          title={t('title')}
          description={t('description')}
        />
      </section>
      <div className="mx-auto mt-16 max-w-7xl px-6 pb-24 md:pb-32">
        <div className="divide-y divide-border border-y border-border">
          {useCases.map((useCase) => {
            const Icon = useCase.icon;
            return (
              <article
                key={useCase.key}
                id={useCase.key}
                className="grid scroll-mt-24 gap-10 py-16 md:grid-cols-[280px_1fr] md:py-20"
              >
                <header>
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-md bg-ink-100 text-ink dark:bg-ink-800 dark:text-ink-50">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h2 className="mt-5 text-2xl font-bold tracking-tight">
                    {useCase.title[locale]}
                  </h2>
                  <p className="mt-2 text-sm font-medium text-foreground-muted">
                    {useCase.tagline[locale]}
                  </p>
                </header>
                <div>
                  <p className="text-base leading-relaxed text-foreground">
                    {useCase.narrative[locale]}
                  </p>
                  <h3 className="mt-8 text-xs font-semibold uppercase tracking-wider text-foreground-subtle">
                    {t('capabilitiesTitle')}
                  </h3>
                  <ul className="mt-3 grid gap-2">
                    {useCase.capabilities.map((cap, i) => (
                      <li
                        // biome-ignore lint/suspicious/noArrayIndexKey: 静态列表，索引稳定
                        key={i}
                        className="flex items-start gap-3 text-sm text-foreground-muted"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-teal-500 dark:text-teal-400" />
                        <span>{cap[locale]}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </>
  );
}
```

- [ ] **Step 2: 写 `/use-cases/page.tsx`**

```tsx
import { setRequestLocale } from 'next-intl/server';
import { UseCaseDeep } from '@/components/sections/UseCaseDeep';
import { routing, type Locale } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function UseCasesPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <UseCaseDeep />;
}
```

- [ ] **Step 3: 补 i18n**

`zh.json`：

```json
"useCases": {
  "eyebrow": "应用场景",
  "title": "为不同人群，做同一件事：可验证的隔离",
  "description": "四个真实的工作流场景。每个场景下，Veil 关心的不是"看起来安全"，而是"可以被证明安全"。",
  "capabilitiesTitle": "关键能力"
}
```

`en.json`：

```json
"useCases": {
  "eyebrow": "Use cases",
  "title": "Different audiences, same job: verifiable isolation",
  "description": "Four real workflow scenarios. In each one, Veil cares not about looking secure, but about being provably secure.",
  "capabilitiesTitle": "Key capabilities"
}
```

- [ ] **Step 4: 验证 + 提交**

```bash
pnpm dev
# 访问 /use-cases，验证 4 个区块、锚点跳转（首页点击 useCase 卡片应跳到对应区域）
# Ctrl+C
git add src/components/sections/UseCaseDeep.tsx src/app/[locale]/use-cases/ src/i18n/messages/
git commit -m "feat: /use-cases 页面 + UseCaseDeep（4 人群完整叙事）"
```

---

### Task 5.2 — CodeSnippet + AutomationApi sections + `/automation` 页面

**Files:**
- Create: `src/components/sections/CodeSnippet.tsx`、`src/components/sections/AutomationApi.tsx`、`src/app/[locale]/automation/page.tsx`

- [ ] **Step 1: 写 `CodeSnippet.tsx`**

```tsx
import { cn } from '@/lib/utils';

export type CodeSnippetProps = {
  code: string;
  language?: string;
  filename?: string;
  className?: string;
};

export function CodeSnippet({ code, language, filename, className }: CodeSnippetProps) {
  return (
    <figure
      className={cn(
        'overflow-hidden rounded-lg border border-border bg-ink dark:bg-surface-elevated',
        className,
      )}
    >
      {(language || filename) && (
        <figcaption className="flex items-center justify-between border-b border-border/40 bg-ink-900/60 px-4 py-2 text-xs font-mono">
          <span className="text-ink-300">{filename ?? language}</span>
          {language && filename && <span className="text-ink-500">{language}</span>}
        </figcaption>
      )}
      <pre className="overflow-x-auto p-5 text-sm leading-relaxed text-ink-100 dark:text-foreground">
        <code className="font-mono">{code}</code>
      </pre>
    </figure>
  );
}
```

- [ ] **Step 2: 写 `AutomationApi.tsx`**

```tsx
'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { automationExamples } from '@/content/automation';
import type { Locale } from '@/i18n/routing';
import { CodeSnippet } from './CodeSnippet';
import { SectionHeading } from './SectionHeading';

export function AutomationApi() {
  const t = useTranslations('automation');
  const locale = useLocale() as Locale;
  const [active, setActive] = useState(automationExamples[0].key);

  return (
    <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">
      <SectionHeading
        eyebrow={t('eyebrow')}
        title={t('title')}
        description={t('description')}
      />
      <Tabs value={active} onValueChange={setActive} className="mt-12">
        <TabsList className="mb-6 flex h-auto flex-wrap justify-start gap-2 bg-transparent p-0">
          {automationExamples.map((example) => (
            <TabsTrigger
              key={example.key}
              value={example.key}
              className="rounded-md border border-border bg-surface-elevated px-4 py-2 text-sm font-medium data-[state=active]:border-teal-500 data-[state=active]:bg-teal-50 data-[state=active]:text-teal-700 dark:data-[state=active]:bg-teal-900/40 dark:data-[state=active]:text-teal-300"
            >
              {example.framework}
            </TabsTrigger>
          ))}
        </TabsList>
        {automationExamples.map((example) => (
          <TabsContent key={example.key} value={example.key} className="mt-0">
            <h3 className="mb-4 text-sm font-medium text-foreground-muted">
              {example.title[locale]}
            </h3>
            <CodeSnippet
              code={example.code}
              language={example.language}
              filename={`${example.framework}.${
                example.language === 'typescript'
                  ? 'ts'
                  : example.language === 'javascript'
                    ? 'js'
                    : example.language === 'python'
                      ? 'py'
                      : 'sh'
              }`}
            />
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}
```

- [ ] **Step 3: 写 `/automation/page.tsx`**

```tsx
import { setRequestLocale } from 'next-intl/server';
import { AutomationApi } from '@/components/sections/AutomationApi';
import { routing, type Locale } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function AutomationPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AutomationApi />;
}
```

- [ ] **Step 4: 补 i18n**

`zh.json`：

```json
"automation": {
  "eyebrow": "自动化",
  "title": "把 Profile 当作可调用的资源",
  "description": "Veil 提供本地 HTTP API（生命周期管理）+ 标准 CDP 端点（页面操作）。Playwright / Puppeteer / Selenium 都能直接接入。"
}
```

`en.json`：

```json
"automation": {
  "eyebrow": "Automation",
  "title": "Profiles as callable resources",
  "description": "Veil exposes a local HTTP API (lifecycle management) and standard CDP endpoints (page operations). Playwright, Puppeteer, and Selenium all connect directly."
}
```

- [ ] **Step 5: 验证 + 提交**

```bash
pnpm dev
# 访问 /automation，验证 Tabs 切换、代码块正常显示、暗色下颜色合适
# Ctrl+C
git add src/components/sections/ src/app/[locale]/automation/ src/i18n/messages/
git commit -m "feat: /automation 页面 + CodeSnippet + AutomationApi (Tabs)"
```

---

### Task 5.3 — Changelog MDX 流水线

**Files:**
- Create: `src/lib/changelog.ts`、`src/content/changelog/0.1.0-rc.mdx`、`src/mdx-components.tsx`

- [ ] **Step 1: 写 `src/lib/changelog.ts`**

```ts
import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';

const CHANGELOG_DIR = path.join(process.cwd(), 'src/content/changelog');

export type ChangelogFrontmatter = {
  version: string;
  date: string; // ISO 8601
  title: { zh: string; en: string };
  summary: { zh: string; en: string };
  channel: 'stable' | 'rc' | 'beta';
};

export type ChangelogEntry = ChangelogFrontmatter & {
  slug: string;
};

export async function getAllChangelogs(): Promise<ChangelogEntry[]> {
  const files = await fs.readdir(CHANGELOG_DIR);
  const mdxFiles = files.filter((f) => f.endsWith('.mdx'));

  const entries = await Promise.all(
    mdxFiles.map(async (file) => {
      const fullPath = path.join(CHANGELOG_DIR, file);
      const source = await fs.readFile(fullPath, 'utf-8');
      const { data } = matter(source);
      const slug = file.replace(/\.mdx$/, '');
      return { ...(data as ChangelogFrontmatter), slug };
    }),
  );

  return entries.sort((a, b) => b.date.localeCompare(a.date));
}

export async function getChangelogBySlug(slug: string): Promise<ChangelogEntry | null> {
  const entries = await getAllChangelogs();
  return entries.find((e) => e.slug === slug) ?? null;
}
```

- [ ] **Step 2: 写 `src/content/changelog/0.1.0-rc.mdx`**

```mdx
---
version: 0.1.0-rc
date: 2026-05-15
channel: rc
title:
  zh: v0.1.0 RC · 首个公开候选版
  en: v0.1.0 RC · First public release candidate
summary:
  zh: Veil 单机完整版 RC 发布。桌面端、Profile、代理、指纹引擎、审计日志和自动化 API 全部就位。
  en: Veil single-device complete RC is here. Desktop app, profiles, proxy, fingerprint engine, audit log, and automation API are all in place.
---

## 新增

- 桌面端完整 Profile 管理工作台（macOS / Windows / Linux）
- 指纹引擎：Canvas / WebGL / Audio / 字体 / 平台信号确定性生成
- 网络栈：每 Profile 独立代理、独立 DNS、WebRTC 泄漏防护
- 数据层：Argon2id + AES-256-GCM + SQLCipher 整库加密
- 自动化：HTTP API + CDP 端点
- 审计：可导出的运行日志与出站连接记录

## 已知限制

- 云同步未启用（Phase 2 路线图）
- 部分小语种 UI 翻译缺失
- Linux ARM64 包仅有 AppImage，暂未提供 deb / rpm

## 升级路径

首个版本，无需升级。
```

- [ ] **Step 3: 写 `src/mdx-components.tsx`（Next.js MDX 全局组件映射）**

```tsx
import type { MDXComponents } from 'mdx/types';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="mb-6 text-3xl font-bold tracking-tight md:text-4xl">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="mt-12 mb-4 text-2xl font-semibold tracking-tight md:text-3xl">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 mb-3 text-xl font-semibold tracking-tight">{children}</h3>
    ),
    p: ({ children }) => (
      <p className="my-4 text-base leading-relaxed text-foreground-muted">{children}</p>
    ),
    ul: ({ children }) => <ul className="my-4 list-disc space-y-2 pl-6">{children}</ul>,
    ol: ({ children }) => <ol className="my-4 list-decimal space-y-2 pl-6">{children}</ol>,
    li: ({ children }) => <li className="text-base text-foreground-muted">{children}</li>,
    code: ({ children }) => (
      <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-sm">{children}</code>
    ),
    pre: ({ children }) => (
      <pre className="my-6 overflow-x-auto rounded-lg border border-border bg-surface-elevated p-5 text-sm">
        {children}
      </pre>
    ),
    a: ({ href, children }) => (
      <a
        href={href}
        className="font-medium text-teal-600 underline-offset-2 hover:underline dark:text-teal-400"
      >
        {children}
      </a>
    ),
    ...components,
  };
}
```

- [ ] **Step 4: 提交**

```bash
git add src/lib/changelog.ts src/content/changelog/ src/mdx-components.tsx
git commit -m "feat: MDX 流水线 + 首个 release 内容 (0.1.0-rc)"
```

---

### Task 5.4 — Changelog 列表 + 详情页

**Files:**
- Create: `src/components/sections/ChangelogList.tsx`、`src/app/[locale]/changelog/page.tsx`、`src/app/[locale]/changelog/[slug]/page.tsx`

- [ ] **Step 1: 写 `ChangelogList.tsx`**

```tsx
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { Badge } from '@/components/ui/badge';
import type { ChangelogEntry } from '@/lib/changelog';
import type { Locale } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import { SectionHeading } from './SectionHeading';

const channelClasses = {
  stable: 'bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-200',
  rc: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200',
  beta: 'bg-ink-100 text-ink-700 dark:bg-ink-800 dark:text-ink-200',
};

export function ChangelogList({ entries }: { entries: ChangelogEntry[] }) {
  const t = useTranslations('changelog');
  const locale = useLocale() as Locale;

  return (
    <section className="mx-auto max-w-4xl px-6 py-24 md:py-32">
      <SectionHeading eyebrow={t('eyebrow')} title={t('title')} description={t('description')} />
      <ol className="mt-12 divide-y divide-border border-y border-border">
        {entries.map((entry) => (
          <li key={entry.slug}>
            <Link
              href={{ pathname: `/changelog/${entry.slug}` }}
              className="block py-7 transition-colors hover:bg-surface"
            >
              <div className="flex items-baseline gap-3">
                <h3 className="text-xl font-semibold tracking-tight">v{entry.version}</h3>
                <Badge className={cn(channelClasses[entry.channel])}>
                  {entry.channel.toUpperCase()}
                </Badge>
                <time className="font-mono text-xs text-foreground-subtle">{entry.date}</time>
              </div>
              <p className="mt-2 text-base font-medium">{entry.title[locale]}</p>
              <p className="mt-2 text-sm text-foreground-muted leading-relaxed">
                {entry.summary[locale]}
              </p>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
```

- [ ] **Step 2: 写 `src/app/[locale]/changelog/page.tsx`**

```tsx
import { setRequestLocale } from 'next-intl/server';
import { ChangelogList } from '@/components/sections/ChangelogList';
import { getAllChangelogs } from '@/lib/changelog';
import { routing, type Locale } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function ChangelogPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const entries = await getAllChangelogs();
  return <ChangelogList entries={entries} />;
}
```

- [ ] **Step 3: 写 `src/app/[locale]/changelog/[slug]/page.tsx`**

```tsx
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { setRequestLocale } from 'next-intl/server';
import { Badge } from '@/components/ui/badge';
import { getAllChangelogs, getChangelogBySlug } from '@/lib/changelog';
import { routing, type Locale } from '@/i18n/routing';
import { cn } from '@/lib/utils';

const channelClasses = {
  stable: 'bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-200',
  rc: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200',
  beta: 'bg-ink-100 text-ink-700 dark:bg-ink-800 dark:text-ink-200',
};

export async function generateStaticParams() {
  const entries = await getAllChangelogs();
  const params: { locale: Locale; slug: string }[] = [];
  for (const locale of routing.locales) {
    for (const e of entries) params.push({ locale, slug: e.slug });
  }
  return params;
}

export default async function ChangelogDetailPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const entry = await getChangelogBySlug(slug);
  if (!entry) notFound();

  const { default: Body } = await import(`@/content/changelog/${slug}.mdx`);

  return (
    <article className="mx-auto max-w-3xl px-6 py-24 md:py-32">
      <Link
        href={{ pathname: '/changelog' }}
        className="inline-flex items-center gap-1.5 text-sm text-foreground-muted hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Changelog
      </Link>
      <header className="mt-8 border-b border-border pb-8">
        <div className="flex items-baseline gap-3">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">v{entry.version}</h1>
          <Badge className={cn(channelClasses[entry.channel])}>{entry.channel.toUpperCase()}</Badge>
          <time className="font-mono text-xs text-foreground-subtle">{entry.date}</time>
        </div>
        <p className="mt-3 text-xl font-medium">{entry.title[locale]}</p>
        <p className="mt-3 text-base text-foreground-muted leading-relaxed">
          {entry.summary[locale]}
        </p>
      </header>
      <div className="mt-10 prose-mdx">
        <Body />
      </div>
    </article>
  );
}
```

- [ ] **Step 4: 补 i18n**

`zh.json`：

```json
"changelog": {
  "eyebrow": "更新日志",
  "title": "每一次发布都被记录",
  "description": "包含新增、变更、修复、已知限制和升级路径。"
}
```

`en.json`：

```json
"changelog": {
  "eyebrow": "Changelog",
  "title": "Every release, recorded",
  "description": "What's new, what changed, what was fixed, known limits, and upgrade paths."
}
```

- [ ] **Step 5: 验证 + 提交**

```bash
pnpm dev
# 访问 /changelog（看列表），再点 0.1.0-rc 看详情页
# Ctrl+C
git add src/components/sections/ChangelogList.tsx src/app/[locale]/changelog/ src/i18n/messages/
git commit -m "feat: /changelog 列表 + [slug] 详情（含 MDX 全局组件样式）"
```

---

## Phase 5 完成检查

阶段验收：`/use-cases`、`/automation`、`/changelog`、`/changelog/0.1.0-rc` 在 zh / en + 亮 / 暗下均正常渲染。Tabs 切换、MDX 渲染、列表/详情跳转无错。

---

## Phase 6 · SEO / sitemap / OG / 404

### Task 6.1 — `lib/seo.ts` helper + 每页 metadata

**Files:**
- Create: `src/lib/seo.ts`
- Modify: `src/app/[locale]/page.tsx`、`/security/page.tsx`、`/use-cases/page.tsx`、`/compare/page.tsx`、`/automation/page.tsx`、`/download/page.tsx`、`/faq/page.tsx`、`/changelog/page.tsx`

- [ ] **Step 1: 写 `src/lib/seo.ts`**

```ts
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { routing, type Locale } from '@/i18n/routing';
import { SITE } from '@/content/constants';

const PROD_URL = 'https://veil.app'; // 生产域名占位；上线前确认

export type PageSeoInput = {
  locale: Locale;
  /** i18n namespace 形如 'security' / 'home.hero' */
  namespace: string;
  /** 相对路径，如 '/security'，'/' 表示首页 */
  path: string;
  /** 可选：完全覆盖 title/description */
  titleOverride?: string;
  descriptionOverride?: string;
};

export async function buildPageMetadata({
  locale,
  namespace,
  path,
  titleOverride,
  descriptionOverride,
}: PageSeoInput): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace });
  const title = titleOverride ?? (t.has('seoTitle') ? t('seoTitle') : t('title'));
  const description =
    descriptionOverride ?? (t.has('seoDescription') ? t('seoDescription') : t('description'));

  const canonical = path === '/' ? '' : path;
  const url = locale === routing.defaultLocale ? canonical : `/${locale}${canonical}`;
  const fullUrl = `${PROD_URL}${url || '/'}`;

  const alternates: Record<string, string> = {};
  for (const l of routing.locales) {
    const prefix = l === routing.defaultLocale ? '' : `/${l}`;
    alternates[l] = `${PROD_URL}${prefix}${canonical || '/'}`;
  }

  return {
    title: title ? `${title} · ${SITE.name}` : SITE.name,
    description,
    openGraph: {
      title,
      description,
      url: fullUrl,
      siteName: SITE.name,
      locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: fullUrl,
      languages: alternates,
    },
  };
}
```

- [ ] **Step 2: 为每个路由加 `generateMetadata`**

以 `/security` 为例。在 `src/app/[locale]/security/page.tsx` 顶部加：

```tsx
import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({ locale, namespace: 'security.stack', path: '/security' });
}
```

对每个页面重复（namespace 与 path 对应）：

| 页面 | namespace | path |
|---|---|---|
| `/` (homepage) | `home.hero` | `/` |
| `/security` | `security.stack` | `/security` |
| `/use-cases` | `useCases` | `/use-cases` |
| `/compare` | `compare` | `/compare` |
| `/automation` | `automation` | `/automation` |
| `/download` | `download` | `/download` |
| `/faq` | `faq` | `/faq` |
| `/changelog` | `changelog` | `/changelog` |

- [ ] **Step 3: 验证 metadata 注入**

```bash
pnpm dev
```

打开 DevTools → Network → 选择一个页面请求 → Response，确认 `<head>` 内含 `<title>`、`<meta name="description">`、`<link rel="canonical">`、`<link rel="alternate" hreflang="..." >`。停止 dev。

- [ ] **Step 4: 提交**

```bash
git add src/lib/seo.ts src/app/[locale]/
git commit -m "feat(seo): buildPageMetadata helper + 全页 generateMetadata 接入"
```

---

### Task 6.2 — sitemap.ts + robots.ts

**Files:**
- Create: `src/app/sitemap.ts`、`src/app/robots.ts`

- [ ] **Step 1: 写 `src/app/sitemap.ts`**

```ts
import type { MetadataRoute } from 'next';
import { getAllChangelogs } from '@/lib/changelog';
import { routing } from '@/i18n/routing';

const PROD_URL = 'https://veil.app';
const STATIC_PATHS = [
  '/',
  '/security',
  '/use-cases',
  '/compare',
  '/automation',
  '/download',
  '/faq',
  '/changelog',
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  // 静态路由 × 双语
  for (const path of STATIC_PATHS) {
    for (const locale of routing.locales) {
      const prefix = locale === routing.defaultLocale ? '' : `/${locale}`;
      const url = `${PROD_URL}${prefix}${path === '/' ? '' : path}`;
      entries.push({
        url: url || `${PROD_URL}/`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: path === '/' ? 1.0 : 0.8,
      });
    }
  }

  // changelog 每个版本
  const changelogs = await getAllChangelogs();
  for (const log of changelogs) {
    for (const locale of routing.locales) {
      const prefix = locale === routing.defaultLocale ? '' : `/${locale}`;
      entries.push({
        url: `${PROD_URL}${prefix}/changelog/${log.slug}`,
        lastModified: new Date(log.date),
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    }
  }

  return entries;
}
```

- [ ] **Step 2: 写 `src/app/robots.ts`**

```ts
import type { MetadataRoute } from 'next';

const PROD_URL = 'https://veil.app';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
    ],
    sitemap: `${PROD_URL}/sitemap.xml`,
  };
}
```

- [ ] **Step 3: 验证**

```bash
pnpm dev
# 访问 http://localhost:5173/sitemap.xml 看 XML
# 访问 http://localhost:5173/robots.txt 看文本
```

Expected: 两个文件都返回正确内容。停止 dev。

- [ ] **Step 4: 提交**

```bash
git add src/app/sitemap.ts src/app/robots.ts
git commit -m "feat(seo): sitemap.xml + robots.txt"
```

---

### Task 6.3 — Open Graph 图片自动生成

**Files:**
- Create: `src/app/[locale]/opengraph-image.tsx`

- [ ] **Step 1: 写 `opengraph-image.tsx`（应用到所有 locale 页面的默认 OG）**

```tsx
import { ImageResponse } from 'next/og';
import { getTranslations } from 'next-intl/server';
import { type Locale } from '@/i18n/routing';

export const runtime = 'edge';
export const alt = 'Veil — Open-source, self-hosted, zero-knowledge fingerprint browser';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OgImage({
  params,
}: {
  params: { locale: Locale };
}) {
  const t = await getTranslations({ locale: params.locale, namespace: 'home.hero' });

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px',
          background:
            'radial-gradient(80% 60% at 70% 20%, rgba(94,234,212,0.18), transparent 70%), #07111f',
          color: '#e6edf5',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 28, fontWeight: 700 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              background: '#5eead4',
            }}
          />
          Veil
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div
            style={{
              fontFamily: 'monospace',
              fontSize: 18,
              color: '#5eead4',
              textTransform: 'uppercase',
              letterSpacing: 4,
            }}
          >
            {t('eyebrow')}
          </div>
          <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.05, maxWidth: 900 }}>
            {t('title')}
          </div>
          <div style={{ fontSize: 22, color: '#97a3b3', maxWidth: 900, lineHeight: 1.5 }}>
            {t('subtitle')}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
```

- [ ] **Step 2: 验证**

```bash
pnpm dev
# 访问 http://localhost:5173/opengraph-image 应看到 1200×630 的图
```

停止 dev。

- [ ] **Step 3: 提交**

```bash
git add src/app/[locale]/opengraph-image.tsx
git commit -m "feat(seo): 动态 OG 图片（@vercel/og 渲染 Hero 信息）"
```

---

### Task 6.4 — 全局 404 页面

**Files:**
- Create: `src/app/not-found.tsx`

- [ ] **Step 1: 写 `src/app/not-found.tsx`**

```tsx
import Link from 'next/link';
import { ArrowLeft, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SITE } from '@/content/constants';

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-2xl flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-sm font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400">
        404
      </p>
      <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">页面找不到了</h1>
      <p className="mt-4 text-base text-foreground-muted">
        我们记录了访问，但没找到你想找的内容。可能是链接已变更，或者这个页面还没生出来。
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Button asChild>
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
            返回首页
          </Link>
        </Button>
        <Button asChild variant="outline">
          <a href={`${SITE.repoUrl}/issues`} target="_blank" rel="noreferrer">
            <Github className="h-4 w-4" />
            报告问题
          </a>
        </Button>
      </div>
    </main>
  );
}
```

- [ ] **Step 2: 验证**

```bash
pnpm dev
# 访问 http://localhost:5173/this-page-does-not-exist
```

Expected: 404 页面显示，按钮可用。停止 dev。

- [ ] **Step 3: 提交**

```bash
git add src/app/not-found.tsx
git commit -m "feat: 全局 404 页面"
```

---

## Phase 6 完成检查

阶段验收：每页 metadata 完整、sitemap.xml + robots.txt 正常输出、OG 图可访问、404 页友好。

---

## Phase 7 · Motion + 视图过渡

### Task 7.1 — Reveal + StaggerChildren 动效组件

**Files:**
- Create: `src/components/motion/Reveal.tsx`、`src/components/motion/StaggerChildren.tsx`

- [ ] **Step 1: 写 `Reveal.tsx`**

```tsx
'use client';

import { motion, type HTMLMotionProps } from 'motion/react';
import { cn } from '@/lib/utils';

export type RevealProps = HTMLMotionProps<'div'> & {
  delay?: number;
  /** 触发后只播放一次（默认 true）*/
  once?: boolean;
};

export function Reveal({ children, delay = 0, once = true, className, ...rest }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-80px' }}
      transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1], delay }}
      className={cn(className)}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 2: 写 `StaggerChildren.tsx`**

```tsx
'use client';

import { motion, type HTMLMotionProps } from 'motion/react';
import { cn } from '@/lib/utils';

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.04,
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.48, ease: [0.22, 1, 0.36, 1] },
  },
};

export function StaggerChildren({
  children,
  className,
  ...rest
}: HTMLMotionProps<'div'>) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      className={cn(className)}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className, ...rest }: HTMLMotionProps<'div'>) {
  return (
    <motion.div variants={childVariants} className={cn(className)} {...rest}>
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 3: 把 Reveal 接入到 Hero 与 SectionHeading**

修改 `Hero.tsx`，把 `<div className="max-w-4xl">` 改为：

```tsx
import { Reveal } from '@/components/motion/Reveal';

// ...在 return 内：
<Reveal className="max-w-4xl">
  {/* 原内容 */}
</Reveal>
```

修改 `SectionHeading.tsx`，把外层 div 改成：

```tsx
import { Reveal } from '@/components/motion/Reveal';

export function SectionHeading({ /* ... */ }: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        'max-w-3xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      {/* 原内容 */}
    </Reveal>
  );
}
```

- [ ] **Step 4: 把 StaggerChildren 接入到 FeatureGrid 的 `<ul>`**

修改 `FeatureGrid.tsx`，把 `<ul className="...">` 改成 `<StaggerChildren as="ul" className="...">` 并把每个 `<li>` 包成 `<StaggerItem as="li">`。

注意：motion 的 `as` prop 在新版本支持。若你的 Motion 版本不支持，则保留外层 div，把 li 改成 `<StaggerItem>` 内含 `<li>`。简化的做法：

```tsx
// 在 FeatureGrid 组件返回内：
<StaggerChildren className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
  {items.map((feature) => {
    const Icon = feature.icon;
    return (
      <StaggerItem
        key={feature.key}
        className="group relative rounded-lg border border-border bg-surface-elevated p-6 transition-colors hover:border-border-strong"
      >
        {/* 原 li 内的内容 */}
      </StaggerItem>
    );
  })}
</StaggerChildren>
```

去掉外层 `<ul>` 包装。`role="list"` 可加可不加。

- [ ] **Step 5: 验证**

```bash
pnpm dev
```

刷新首页，确认：
- Hero 内容轻微淡入 + 上移 24px
- 滚动到 Features 区时，三张卡片依次淡入
- 在 macOS Settings → Accessibility → Reduce Motion 开启后，刷新页面动画消失（受 prefers-reduced-motion 控制）

停止 dev。

- [ ] **Step 6: 提交**

```bash
git add src/components/motion/ src/components/sections/
git commit -m "feat(motion): Reveal + StaggerChildren 动效组件 + 接入首页"
```

---

### Task 7.2 — View Transitions（Next.js 16 页面切换）

**Files:**
- Modify: `next.config.ts`

- [ ] **Step 1: 在 `next.config.ts` 启用 view transitions（如 Next.js 16 已默认开启可跳过）**

```ts
import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import createMDX from '@next/mdx';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');
const withMDX = createMDX();

const nextConfig: NextConfig = {
  pageExtensions: ['ts', 'tsx', 'mdx'],
  images: { formats: ['image/avif', 'image/webp'] },
  experimental: {
    typedRoutes: true,
    viewTransition: true,
  },
};

export default withNextIntl(withMDX(nextConfig));
```

- [ ] **Step 2: 在 `globals.css` 加 View Transition CSS**

把以下追加到 `src/app/globals.css` 末尾：

```css
@view-transition {
  navigation: auto;
}

::view-transition-old(root),
::view-transition-new(root) {
  animation-duration: 240ms;
  animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
}

::view-transition-old(root) {
  animation-name: vt-fade-out;
}

::view-transition-new(root) {
  animation-name: vt-fade-in;
}

@keyframes vt-fade-out {
  from { opacity: 1; }
  to { opacity: 0; }
}

@keyframes vt-fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@media (prefers-reduced-motion: reduce) {
  ::view-transition-old(root),
  ::view-transition-new(root) {
    animation: none;
  }
}
```

- [ ] **Step 3: 验证**

```bash
pnpm dev
```

在受支持的浏览器（最新 Chrome / Edge / Arc）中点击导航链接（如首页 → /security），观察页面切换是否有平滑淡入淡出。Safari / Firefox 会优雅降级为瞬时切换。

停止 dev。

- [ ] **Step 4: 提交**

```bash
git add next.config.ts src/app/globals.css
git commit -m "feat(motion): View Transitions API（页面切换淡入淡出）"
```

---

## Phase 7 完成检查

阶段验收：滚动 Reveal 动效顺滑、Features 卡片 stagger 进场、页面切换有 View Transition。Reduced motion 偏好被遵守。

---

## Phase 8 · 测试 / 部署 / 切流

### Task 8.1 — Vitest 配置 + cn 工具单元测试

**Files:**
- Create: `vitest.config.ts`、`tests/unit/utils.test.ts`

- [ ] **Step 1: 写 `vitest.config.ts`**

```ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['tests/unit/**/*.test.ts', 'tests/unit/**/*.test.tsx'],
  },
});
```

- [ ] **Step 2: 写 `tests/unit/utils.test.ts`（先写测试）**

```ts
import { describe, expect, it } from 'vitest';
import { cn } from '@/lib/utils';

describe('cn()', () => {
  it('合并多个 class 字符串', () => {
    expect(cn('px-4', 'py-2')).toBe('px-4 py-2');
  });

  it('用 tailwind-merge 去除重复规则（后者覆盖前者）', () => {
    expect(cn('p-4', 'p-2')).toBe('p-2');
  });

  it('忽略 falsy 值', () => {
    expect(cn('text-sm', false, null, undefined, '')).toBe('text-sm');
  });

  it('支持条件对象', () => {
    expect(cn({ 'opacity-50': true, 'hidden': false })).toBe('opacity-50');
  });
});
```

- [ ] **Step 3: 跑测试，确认通过（cn 已存在）**

```bash
pnpm test tests/unit/utils.test.ts
```

Expected: 4 个测试用例全部通过。

- [ ] **Step 4: 提交**

```bash
git add vitest.config.ts tests/
git commit -m "test(unit): Vitest 配置 + cn() 单元测试"
```

---

### Task 8.2 — Changelog parser 单元测试

**Files:**
- Create: `tests/unit/changelog.test.ts`

- [ ] **Step 1: 写测试（先写）**

```ts
import { describe, expect, it } from 'vitest';
import { getAllChangelogs, getChangelogBySlug } from '@/lib/changelog';

describe('changelog parser', () => {
  it('读取所有 MDX 文件并按日期倒序', async () => {
    const entries = await getAllChangelogs();
    expect(entries.length).toBeGreaterThan(0);
    for (let i = 1; i < entries.length; i++) {
      expect(entries[i - 1].date.localeCompare(entries[i].date)).toBeGreaterThanOrEqual(0);
    }
  });

  it('frontmatter 字段齐全', async () => {
    const entries = await getAllChangelogs();
    for (const entry of entries) {
      expect(entry.version).toBeTruthy();
      expect(entry.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(entry.title.zh).toBeTruthy();
      expect(entry.title.en).toBeTruthy();
      expect(['stable', 'rc', 'beta']).toContain(entry.channel);
    }
  });

  it('按 slug 查找', async () => {
    const entry = await getChangelogBySlug('0.1.0-rc');
    expect(entry).not.toBeNull();
    expect(entry?.version).toBe('0.1.0-rc');
  });

  it('找不到时返回 null', async () => {
    expect(await getChangelogBySlug('non-existent')).toBeNull();
  });
});
```

- [ ] **Step 2: 跑测试**

```bash
pnpm test tests/unit/changelog.test.ts
```

Expected: 4 个测试用例全部通过。

- [ ] **Step 3: 提交**

```bash
git add tests/unit/changelog.test.ts
git commit -m "test(unit): changelog parser（4 个用例）"
```

---

### Task 8.3 — SEO helper 单元测试

**Files:**
- Create: `tests/unit/seo.test.ts`

- [ ] **Step 1: 写测试**

```ts
import { describe, expect, it, vi } from 'vitest';

// Mock next-intl/server 的 getTranslations
vi.mock('next-intl/server', () => ({
  getTranslations: vi.fn(async () => {
    const fn = (key: string) => `__${key}__`;
    fn.has = () => false;
    return fn;
  }),
}));

import { buildPageMetadata } from '@/lib/seo';

describe('buildPageMetadata', () => {
  it('首页中文：无 locale 前缀', async () => {
    const meta = await buildPageMetadata({
      locale: 'zh',
      namespace: 'home.hero',
      path: '/',
    });
    expect(meta.alternates?.canonical).toBe('https://veil.app/');
    expect(meta.alternates?.languages?.zh).toBe('https://veil.app/');
    expect(meta.alternates?.languages?.en).toBe('https://veil.app/en/');
  });

  it('内页中文：path 无前缀', async () => {
    const meta = await buildPageMetadata({
      locale: 'zh',
      namespace: 'security.stack',
      path: '/security',
    });
    expect(meta.alternates?.canonical).toBe('https://veil.app/security');
  });

  it('内页英文：path 有 /en 前缀', async () => {
    const meta = await buildPageMetadata({
      locale: 'en',
      namespace: 'security.stack',
      path: '/security',
    });
    expect(meta.alternates?.canonical).toBe('https://veil.app/en/security');
  });

  it('title 拼接 SITE name', async () => {
    const meta = await buildPageMetadata({
      locale: 'zh',
      namespace: 'home.hero',
      path: '/',
    });
    expect(meta.title).toMatch(/Veil$/);
  });
});
```

- [ ] **Step 2: 跑测试**

```bash
pnpm test tests/unit/seo.test.ts
```

Expected: 4 个测试用例全部通过。

- [ ] **Step 3: 提交**

```bash
git add tests/unit/seo.test.ts
git commit -m "test(unit): seo helper（canonical/alternates/title 拼接）"
```

---

### Task 8.4 — Playwright 配置 + 首页 E2E

**Files:**
- Create: `playwright.config.ts`、`tests/e2e/home.spec.ts`

- [ ] **Step 1: 安装 Playwright 浏览器**

```bash
pnpm dlx playwright install chromium
```

- [ ] **Step 2: 写 `playwright.config.ts`**

```ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
  webServer: {
    command: 'pnpm dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
```

- [ ] **Step 3: 写 `tests/e2e/home.spec.ts`**

```ts
import { expect, test } from '@playwright/test';

test('首页加载并显示 Hero', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Veil/);
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});

test('Hero 的下载 CTA 指向 GitHub releases', async ({ page }) => {
  await page.goto('/');
  const downloadCta = page.locator('a').filter({ hasText: /下载 v0\.1/ }).first();
  await expect(downloadCta).toHaveAttribute('href', /github\.com.*releases/);
  await expect(downloadCta).toHaveAttribute('target', '_blank');
});
```

- [ ] **Step 4: 跑测试**

```bash
pnpm test:e2e tests/e2e/home.spec.ts
```

Expected: 2 个 E2E 测试通过。

- [ ] **Step 5: 提交**

```bash
git add playwright.config.ts tests/e2e/
git commit -m "test(e2e): Playwright 配置 + 首页 + Hero CTA"
```

---

### Task 8.5 — E2E：i18n / 主题 / 移动 nav / 404

**Files:**
- Create: `tests/e2e/i18n.spec.ts`、`tests/e2e/theme.spec.ts`、`tests/e2e/mobile-nav.spec.ts`、`tests/e2e/not-found.spec.ts`

- [ ] **Step 1: 写 `tests/e2e/i18n.spec.ts`**

```ts
import { expect, test } from '@playwright/test';

test('切换到英文', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /切换语言|switch language/i }).first().click();
  await expect(page).toHaveURL(/\/en/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
});

test('切回中文', async ({ page }) => {
  await page.goto('/en');
  await page.getByRole('button', { name: /switch language|切换语言/i }).first().click();
  await expect(page).toHaveURL((url) => !url.pathname.startsWith('/en'));
  await expect(page.locator('html')).toHaveAttribute('lang', 'zh');
});
```

- [ ] **Step 2: 写 `tests/e2e/theme.spec.ts`**

```ts
import { expect, test } from '@playwright/test';

test('点击 ThemeToggle 在三态间循环', async ({ page }) => {
  await page.goto('/');
  const toggle = page.getByRole('button', { name: /切换主题|switch theme/i }).first();
  const html = page.locator('html');

  // system → light
  await toggle.click();
  await expect(async () => {
    const cls = await html.getAttribute('class');
    expect(cls ?? '').not.toMatch(/dark/);
  }).toPass();

  // light → dark
  await toggle.click();
  await expect(html).toHaveClass(/dark/);

  // dark → system（回原状）
  await toggle.click();
});
```

- [ ] **Step 3: 写 `tests/e2e/mobile-nav.spec.ts`**

```ts
import { expect, test } from '@playwright/test';

test.use({ viewport: { width: 375, height: 812 } });

test('移动端打开菜单抽屉', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /打开菜单|open menu/i }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(page.locator('a').filter({ hasText: /安全|security/i }).last()).toBeVisible();
});
```

- [ ] **Step 4: 写 `tests/e2e/not-found.spec.ts`**

```ts
import { expect, test } from '@playwright/test';

test('未知路径展示 404 并提供回首页入口', async ({ page }) => {
  await page.goto('/this-page-truly-does-not-exist');
  await expect(page.getByText(/404/)).toBeVisible();
  await page.getByRole('link', { name: /返回首页|back to home/i }).click();
  await expect(page).toHaveURL(/^http:\/\/localhost:5173\/?$/);
});
```

- [ ] **Step 5: 跑全部 E2E**

```bash
pnpm test:e2e
```

Expected: 全部测试通过。若有偶发失败（如 toggle 状态依赖 localStorage），加 `await page.context().clearCookies()` 与 `page.evaluate(() => localStorage.clear())` 到测试前置。

- [ ] **Step 6: 提交**

```bash
git add tests/e2e/
git commit -m "test(e2e): i18n / 主题 / 移动 nav / 404 四条关键路径"
```

---

### Task 8.6 — `vercel.ts` 部署配置

**Files:**
- Create: `vercel.ts`
- Modify: `package.json`（加 `@vercel/config` 依赖）

- [ ] **Step 1: 安装 @vercel/config**

```bash
pnpm add @vercel/config
```

- [ ] **Step 2: 写 `vercel.ts`**

```ts
import { routes, type VercelConfig } from '@vercel/config/v1';

export const config: VercelConfig = {
  framework: 'nextjs',
  buildCommand: 'pnpm build',
  installCommand: 'pnpm install --frozen-lockfile',
  redirects: [
    routes.redirect('/index.html', '/', { permanent: true }),
  ],
  headers: [
    routes.cacheControl('/_next/static/(.*)', {
      public: true,
      maxAge: '1 year',
      immutable: true,
    }),
    routes.cacheControl('/brand/(.*)', {
      public: true,
      maxAge: '7 days',
    }),
  ],
};
```

- [ ] **Step 3: 验证 vercel.ts 解析正常**

```bash
pnpm typecheck
```

Expected: 无 type error。

- [ ] **Step 4: 提交**

```bash
git add vercel.ts package.json pnpm-lock.yaml
git commit -m "feat(deploy): vercel.ts 配置（替代 vercel.json）"
```

---

### Task 8.7 — 全量校验与首次预览部署

- [ ] **Step 1: 全量 lint / typecheck / build / 测试**

```bash
pnpm lint
pnpm typecheck
pnpm build
pnpm test
pnpm test:e2e
```

Expected: 全部通过，无 warnings。

- [ ] **Step 2: 推送特性分支并触发 Vercel preview**

```bash
git push -u origin feat/nextjs-rewrite
```

Vercel 会自动构建 preview 部署。

- [ ] **Step 3: 在 preview URL 上做最终视觉巡检**

逐个访问：

- `/`、`/en/`
- `/security`、`/en/security`
- `/use-cases`、`/en/use-cases`
- `/compare`、`/en/compare`
- `/automation`、`/en/automation`
- `/download`、`/en/download`
- `/faq`、`/en/faq`
- `/changelog`、`/en/changelog/0.1.0-rc`

每页：
- 切亮 / 暗主题 → 无 FOUC、颜色合理
- 切中 / 英 → 内容正确切换、URL 前缀正确
- 移动尺寸（DevTools 360px）→ 无横向滚动、移动 nav 可用

- [ ] **Step 4: Lighthouse 在 preview 上跑一次首页**

DevTools → Lighthouse → 选 Performance / Accessibility / Best Practices / SEO → Mobile + Desktop。

Expected：
- Performance ≥ 95
- Accessibility = 100
- Best Practices ≥ 95
- SEO = 100

若 Performance < 95，常见处置：
- 检查图片是否走 `next/image`（暂未使用图片场景较多，主要是 SVG）
- 检查字体 preload 是否过多

- [ ] **Step 5: 合并到 main**

```bash
git checkout main
git merge --no-ff feat/nextjs-rewrite -m "feat: 完成 Next.js 16 前端重构（替换 Vite 单页）"
git push origin main
```

Vercel 自动重新部署到生产。

- [ ] **Step 6: 验证生产 URL**

访问 https://veil.app（或当前生产域名），重复 Step 3 的巡检。

- [ ] **Step 7: 删除特性分支（可选）**

```bash
git branch -d feat/nextjs-rewrite
git push origin --delete feat/nextjs-rewrite
```

---

## Phase 8 完成检查

阶段验收：
- 所有单元测试 + E2E 测试通过
- Lighthouse 全部 ≥ 95（Accessibility = 100）
- 生产部署可访问，8 个路由 × 双语 = 16 个页面全部正常
- 旧 URL（`/index.html` 等）被 redirect 到新位置

---

## Self-Review（已完成）

### 1 · Spec 覆盖检查

对照 spec 第 3、4、5、6 章逐项核对：

- ✅ 路由（3.1）：8 个路由对应 Phase 3/4/5 + Task 6.1 metadata
- ✅ 全局元素（3.2）：Header / Footer / LanguageSwitch / ThemeToggle 在 Phase 1
- ✅ URL i18n（3.3）：Task 1.3-1.4 实现 as-needed
- ✅ 颜色 token（4.1）：Task 1.1 完整定义
- ✅ 字体（4.2）：Task 1.2 通过 next/font 加载
- ✅ 间距 / 圆角（4.3）：Task 1.1 globals.css
- ✅ 动效 tokens（4.4）：Task 1.1 + Phase 7 接入
- ✅ 目录结构（5.1）：与 Phase 0-8 各任务的 Files 列表完全对应
- ✅ 组件分层（5.2）：ui/ / layout/ / sections/ / motion/ 四层全覆盖
- ✅ 内容模型（5.3）：Phase 2 全部就位
- ✅ i18n（5.4）：Phase 1 + 各 Phase 末尾补 namespace
- ✅ 暗色（5.5）：Task 1.5 + Task 1.1 .dark 覆写
- ✅ 测试（6.1-6.2）：Phase 8 Vitest + Playwright
- ✅ 错误处理（6.3）：Task 6.4 + vercel.ts redirect
- ✅ SEO（6.4）：Task 6.1-6.3
- ✅ 性能（6.5）：Task 8.7 Lighthouse check
- ✅ vercel.ts（6.6）：Task 8.6

### 2 · Placeholder 扫描

- 已扫描"TBD"、"TODO"、"implement later" 等 → 无命中
- SHA-256 字段 = "PENDING" 是已知占位（发布时由 CI 填入），已在 Task 2.3 注明
- 生产域名 `https://veil.app` 是占位，已在 `lib/seo.ts` 注释提示上线前确认

### 3 · 类型一致性

- `LocalizedText = { zh: string; en: string }` 在 `features.ts` 定义，其它内容文件均 import 复用 — 一致 ✓
- `Locale = (typeof routing.locales)[number]` 来自 `i18n/routing` — 一致 ✓
- `cn()` 在 `lib/utils.ts` 定义，所有组件 import `@/lib/utils` — 一致 ✓
- shadcn 组件（Button / Card / Badge / Accordion / Tabs / Tooltip / Sheet）名称一致 ✓
- `ChangelogFrontmatter` / `ChangelogEntry` 类型在 `lib/changelog.ts` 中定义，list/detail page 都用同一接口 ✓

未发现命名漂移。

---

## 执行选择

Plan complete and saved to `docs/superpowers/plans/2026-05-22-veil-frontend-redesign.md`. Two execution options:

**1. Subagent-Driven（推荐）** — 我每个 task 派一个新 subagent，task 之间审查、快速迭代

**2. Inline Execution** — 在当前会话里按计划执行，按检查点分批跑

Which approach?

