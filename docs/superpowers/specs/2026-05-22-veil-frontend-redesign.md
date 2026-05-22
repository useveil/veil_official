# Veil 官网前端重构设计文档

| 字段 | 值 |
|---|---|
| 日期 | 2026-05-22 |
| 分支 | `feat/nextjs-rewrite`（实施阶段创建）|
| 范围 | 完整重构 Veil 官方网站（替换当前 Vite + React 单页结构） |
| 状态 | 设计已批准，进入实施规划 |

---

## 1 · 目标与动机

### 现状

- 当前为 Vite 6 + React 18 + 纯 CSS 单页站点
- 所有 UI 在单个 `src/App.tsx`（290 行）+ `src/styles.css`（790 行）
- 单页 + 锚点跳转，所有版块塞在首页，纵向滚动 ~5500px
- 内容定义在 `src/content.ts`
- 没有 i18n、没有暗色模式、没有动效、没有 SEO 元数据生成
- 部署到 Vercel

### 目标

把站点升级为可长期演进的产品官网：

1. **技术栈现代化** — 迁移到 Next.js 16 App Router + Tailwind CSS v4 + shadcn/ui
2. **视觉重做** — Architectural Minimal 风格（Linear / Vercel / Anthropic 谱系），亮色为主、暗色一等公民
3. **信息架构升级** — 由单页拆为多页路由，避免首页臃肿
4. **内容扩展** — 增加 Use Cases / Security 详情 / 对比表 / Automation / Changelog / FAQ 等版块
5. **国际化** — 支持中文（默认）+ 英文
6. **可维护** — 内容与展示分离，结构化数据 + MDX，组件分层清晰

### 非目标

- 不引入 Cache Components / PPR（静态官网 SSG 已足够）
- 不引入 CMS（内容量小，文件即可）
- 不引入 Storybook、Chromatic、monorepo
- 不做 testimonials / pricing 版块（产品早期，无素材）

---

## 2 · 关键决策一览

| 维度 | 决策 |
|---|---|
| 整体方向 | C — 全面升级：技术栈 + 视觉 + 内容 |
| 视觉风格 | A — Architectural Minimal（亮色极简） |
| 路由结构 | B — 多页（Next.js App Router）|
| i18n | zh-CN 默认 + en；as-needed 策略（`/` vs `/en/...`）|
| 暗色模式 | 跟随系统 + 手动切换；默认亮色 |
| 框架 | Next.js 16 App Router |
| 样式 | Tailwind CSS v4（CSS-first `@theme`）|
| UI 套件 | shadcn/ui（按需复制）|
| 状态 | next-themes（主题）+ next-intl（i18n）|
| 字体 | Geist Sans + Geist Mono（英）+ Noto Sans SC（中）|
| 内容 | TS 结构化为主；Changelog 用 MDX；UI 字符串用 next-intl JSON |
| 动效 | Motion 库 + View Transitions；遵守 `prefers-reduced-motion` |
| 图标 | lucide-react（保留）|
| 包管理 | pnpm |
| Lint / Format | Biome |
| 测试 | Vitest（unit）+ Playwright（4 条关键路径 E2E） |
| 部署 | Vercel + `vercel.ts`（替代 `vercel.json`）|
| 实施策略 | 并行分支 `feat/nextjs-rewrite` → 合并后切流 |

---

## 3 · 信息架构

### 3.1 路由表（8 个路由，11 个版块）

| 路由 | 包含的版块 | 主要受众 |
|---|---|---|
| `/` | Hero · Features 摘要（3 张精选）· Use Cases 摘要（4 个人群入口）· Roadmap 精简版（3 phase）· Open Source 区 · Final CTA | 所有人 |
| `/security` | 加密栈流程图（Argon2id → AES-GCM → SQLCipher）· 密钥流转 · 威胁模型 · BIP39 恢复 · Trust Points 详情 | 安全敏感 / 自托管派 |
| `/use-cases` | 4 个人群分区：多账号运营 · Web3 · 电商 · 自动化团队（每区一个场景叙事 + 关键能力）| 多账号 + Web3 + 电商 |
| `/compare` | 大型对比表 vs Multilogin / AdsPower / BitBrowser / VMLogin（特性矩阵 + 开源 / 自托管 / 价格 / 自动化深度）| 评估期用户 |
| `/automation` | API 总览 · CDP 示例 · Playwright / Puppeteer / Selenium 代码片段 · 接入指引 | 开发者 |
| `/download` | 三平台下载卡片 · SHA-256 校验和 · 从源码构建步骤 · 自动化接入引导 | 所有人 |
| `/changelog` | 版本列表 + 每版本详情（MDX）· 顶部完整 Roadmap | 关注更新者 |
| `/faq` | 常见问题（TS 结构化，按主题分组：安全 / 隐私 / 自动化 / 商业 / 开源）| 评估期用户 |

### 3.2 全局元素

每页都包含：

- **Header**：Logo · Nav · LanguageSwitch · ThemeToggle · Download CTA
- **Footer**：Logo · 简介 · 链接组（产品 / 文档 / 社区 / 法律）· License · GitHub · 选语言

### 3.3 URL 与 i18n

- 路由策略：**as-needed**
- 中文默认：`/security`、`/compare`
- 英文显式：`/en/security`、`/en/compare`
- 双语 hreflang 自动注入到 `<head>`

---

## 4 · 视觉系统

### 4.1 颜色 Token

#### 中性灰阶（Ink Scale，11 阶）

```
ink-50    #f6f8fa     最浅
ink-100   #eef1f5
ink-200   #dfe5ec     边框
ink-300   #c4cdd9
ink-400   #97a3b3     次要前景
ink-500   #6b7787
ink-600   #4a5564     次要文本
ink-700   #2f3845
ink-800   #1a212d
ink-900   #0e1421
ink       #0a0e1a     主前景
```

#### 品牌色（Brand Accent）

```
teal        #14b8a6     主要 accent / CTA hover
teal-soft   #5eead4     暗色模式 accent
teal-faint  #ccfbf1     高亮背景 / 状态标
```

克制使用：每屏不超过 1-2 处 teal，强调"信任 / 健康 / 加密"。

#### 暗色模式映射

- 背景：`#070a0f`（背景）/ `#0e1117`（卡片）/ `#161b22`（高亮卡片）
- 前景：`#e6edf5`（主）/ `#97a3b3`（次）
- 边框：`rgba(255,255,255,0.08)`
- accent：`#5eead4`

### 4.2 字体

| 用途 | 字体 | Variable |
|---|---|---|
| 英文 / 数字 / 主 sans | Geist Sans | `--font-sans` |
| 中文主字体 | Noto Sans SC（思源黑体）| `--font-cjk` |
| 标签 / 代码 / 数据点缀 | Geist Mono | `--font-mono` |

**字号 scale**（紧凑字距 -0.025 ~ -0.035em 用于标题）：

```
xs    12px / 1.5
sm    14px / 1.55
base  16px / 1.6
lg    17px / 1.65    (body)
xl    20px / 1.5
2xl   24px / 1.35
3xl   30px / 1.2
4xl   36px / 1.1     (section title)
5xl   48px / 1.05
6xl   60px / 1.0
7xl   72px / 0.98    (hero)
```

字重：300 / 400 / 500 / 600 / 700。

### 4.3 间距与圆角

- 间距 scale：Tailwind v4 默认（4px base）
- 圆角：`4 / 6 / 8 / 12 / 16` —— 不用大圆角，避免 cute 感
- 边框：1px hairline，颜色用 `ink-200`（亮）/ `rgba(255,255,255,0.08)`（暗）
- 阴影：极克制，仅 `sm / md / lg` 三档，无彩色阴影

### 4.4 动效 Tokens

| 速度 | 时长 | 缓动 | 用途 |
|---|---|---|---|
| fast | 150ms | `ease-out` | 按钮 hover · 切换 · 微反馈 |
| default | 240ms | `cubic-bezier(.22,1,.36,1)` | 卡片浮起 · 进场 · 颜色过渡 |
| slow | 480ms | `cubic-bezier(.22,1,.36,1)` | Hero stagger · 滚动揭示 |

**动效使用范围**：

- Motion 库：Hero stagger 进场、`whileInView` 滚动揭示、按钮微交互
- View Transitions API：页面切换、列表项进入详情
- 全局遵守 `prefers-reduced-motion`，关闭所有非必要动效

---

## 5 · 代码与内容组织

### 5.1 目录结构

```
veil-official/
├── public/                          # 静态资源（保留现有 brand/、images/）
├── src/
│   ├── app/
│   │   ├── layout.tsx               # root layout（fonts、theme provider）
│   │   ├── globals.css              # Tailwind v4 入口 + @theme tokens
│   │   ├── not-found.tsx
│   │   ├── sitemap.ts
│   │   ├── robots.ts
│   │   └── [locale]/                # next-intl 路由
│   │       ├── layout.tsx           # locale layout（Header / Footer / i18n provider）
│   │       ├── page.tsx             # 首页
│   │       ├── security/page.tsx
│   │       ├── use-cases/page.tsx
│   │       ├── compare/page.tsx
│   │       ├── automation/page.tsx
│   │       ├── download/page.tsx
│   │       ├── faq/page.tsx
│   │       └── changelog/
│   │           ├── page.tsx          # 版本列表
│   │           └── [slug]/page.tsx   # 单版本详情（MDX）
│   ├── components/
│   │   ├── ui/                       # shadcn 原子：Button / Card / Badge / Accordion / Tabs / Tooltip / Sheet
│   │   ├── layout/                   # Header / Footer / LanguageSwitch / ThemeToggle / MobileNav
│   │   ├── sections/                 # Hero / FeatureGrid / UseCaseGrid / SecurityStack / ComparisonTable / CodeSnippet / DownloadGrid / RoadmapList / FaqAccordion
│   │   └── motion/                   # Reveal / StaggerChildren
│   ├── content/
│   │   ├── features.ts
│   │   ├── use-cases.ts
│   │   ├── comparison.ts
│   │   ├── trust-points.ts
│   │   ├── faq.ts
│   │   ├── roadmap.ts
│   │   ├── nav.ts
│   │   ├── constants.ts              # repo / release URL 等
│   │   └── changelog/
│   │       └── 0.1.0-rc.mdx
│   ├── i18n/
│   │   ├── routing.ts                # next-intl 路由配置
│   │   ├── request.ts                # locale 加载
│   │   └── messages/
│   │       ├── zh.json
│   │       └── en.json
│   ├── lib/
│   │   ├── utils.ts                  # cn() helper
│   │   ├── changelog.ts              # MDX 读取 + frontmatter 解析
│   │   └── seo.ts                    # metadata helpers
│   └── middleware.ts                 # next-intl middleware
├── tests/
│   ├── unit/                         # Vitest
│   └── e2e/                          # Playwright
├── biome.json
├── next.config.ts
├── tsconfig.json
├── vercel.ts                         # 替代 vercel.json
├── package.json
└── README.md
```

### 5.2 组件分层

| 层 | 用途 | 例 |
|---|---|---|
| `ui/` | shadcn 原子，只接受 design tokens | Button、Card、Badge、Accordion、Tabs、Tooltip、Sheet |
| `layout/` | 跨页框架组件 | Header、Footer、LanguageSwitch、ThemeToggle、MobileNav |
| `sections/` | 页面里大块可复用区 | Hero、FeatureGrid、ComparisonTable |
| `motion/` | 动效封装（统一受 reduced-motion 控制） | Reveal、StaggerChildren |

页面文件（`app/[locale]/.../page.tsx`）只组合 sections，不直接写 markup。

### 5.3 内容模型

| 内容类型 | 存储 | 理由 |
|---|---|---|
| Features / UseCases / Compare / Trust / Roadmap / FAQ / Nav | `content/*.ts`（导出 typed 常量） | 结构化、类型安全、易跨语言渲染 |
| Changelog | `content/changelog/*.mdx` | 富文本 + 代码块、按版本独立文件 |
| UI 字符串（按钮、说明、CTA） | `i18n/messages/{zh,en}.json` | next-intl 标准做法 |
| 长文（Security 详情、Use Case 叙述） | TS 数据里的 `{ zh: '...', en: '...' }` 对象 | 单文件易维护，无需 MDX |

### 5.4 i18n 实现细节

- 库：`next-intl`
- 路由策略：as-needed，默认 zh 不带前缀
- 中间件：`src/middleware.ts` 处理 locale detection 与重定向
- 字符串组织：按页面分组，如 `home.hero.title`、`security.stack.argon2.body`
- 构建：`generateStaticParams` 为每个 locale 预渲染所有页面（纯 SSG）
- 语言切换：保持当前路径，仅替换 locale 前缀
- Fallback：缺失字符串自动 fallback 到 zh

### 5.5 暗色模式实现细节

- 库：`next-themes`
- 配置：`attribute="class"`、`defaultTheme="system"`、`enableSystem={true}`
- Token：`globals.css` 用 `@theme` 定义两套 CSS variables，`.dark` 切换
- 防 FOUC：next-themes 内置 inline script
- ThemeToggle：三态切换（System / Light / Dark）

---

## 6 · 测试 / 错误 / SEO / 性能

### 6.1 测试范围

| 类型 | 工具 | 覆盖范围 | 不覆盖 |
|---|---|---|---|
| Unit | Vitest | `lib/*`（cn、changelog parser、seo helpers）、`LanguageSwitch`、`ThemeToggle` 逻辑 | 静态展示组件 |
| E2E | Playwright | 4 条关键路径（见 6.2） | 完整内容断言 |
| Visual regression | 人眼 + Vercel preview | 每页在亮/暗 + zh/en 4 个组合下扫一眼 | 不引入 Chromatic |

### 6.2 E2E 关键路径

1. 首页加载 + Hero 渲染 + Download CTA 可点击且跳转到 GitHub releases
2. 切语言：zh → en，URL 前缀变化、`<html lang>` 变化、主 H1 内容变化
3. 切暗色：System → Light → Dark，`<html class>` 切换、localStorage 持久化
4. 移动端 nav 打开 / 关闭（Sheet）+ 404 页面跳转回首页

### 6.3 错误处理

- `not-found.tsx`：友好 404，链接回首页 + GitHub
- 旧站 URL 兼容：
  - `/index.html` → `/`（vercel.ts permanent redirect）
  - 锚点 hash（`/#security` 等）由浏览器处理；hash 不到达服务器，无需 server redirect。新站首页仍保留 `#features` 等锚点（首页有摘要区），自然兼容
- i18n 字符串缺失：next-intl 默认 fallback 到 zh
- 不存在服务端逻辑，不需要 `error.tsx`

### 6.4 SEO + 元数据

- 每页 `generateMetadata`：title / description / canonical / og:image / twitter card
- og 图片：`@vercel/og` 动态生成（含页面 title 的渐变背景图）
- `sitemap.ts` + `robots.ts`（Next.js metadata API 自动生成）
- JSON-LD：`SoftwareApplication` + `Organization`
- 双语 hreflang 自动注入

### 6.5 性能目标

- 字体：`next/font/google`（Geist）+ `next/font/local`（Noto Sans SC 子集，目标 < 200KB）
- 图片：现有 PNG → AVIF/WebP，全部走 `next/image`
- 现有 SVG poster 保留为静态资产
- Lighthouse 目标：Performance ≥ 95、Accessibility = 100、SEO = 100、Best Practices = 100
- Bundle size：first-load JS ≤ 120KB（gzip）

### 6.6 部署配置（`vercel.ts`）

```ts
import { routes, type VercelConfig } from '@vercel/config/v1';

export const config: VercelConfig = {
  framework: 'nextjs',
  buildCommand: 'pnpm build',
  redirects: [
    routes.redirect('/index.html', '/', { permanent: true }),
  ],
  headers: [
    routes.cacheControl('/_next/static/(.*)', {
      public: true, maxAge: '1 year', immutable: true
    }),
  ],
};
```

> 注：锚点 hash（`#features` / `#security` 等）由浏览器处理，不到达服务端，因此无法在 `vercel.ts` 里做 server redirect。新站首页保留对应锚点，自然兼容。

---

## 7 · 实施时序

### 阶段规划

| Phase | 内容 | 大致 |
|---|---|---|
| 0 · 设置 | 分支 `feat/nextjs-rewrite`、删除 Vite 文件、Next.js 16 / Tailwind v4 / Biome / shadcn / next-intl / next-themes / Motion 初始化 | 半天 |
| 1 · 基础设施 | Root layout、Header、Footer、ThemeToggle、LanguageSwitch、tokens（`@theme`）、字体加载 | 1 天 |
| 2 · 内容迁移 | `content/*.ts` 全部就位（中文先到位、英文先用 placeholder） | 半天 |
| 3 · 首页 | Hero + Features + UseCases 摘要 + Roadmap + Final CTA + 摘要式版块装配 | 1 天 |
| 4 · 信任页 | `/security`、`/compare`、`/faq`、`/download` | 1.5 天 |
| 5 · 开发者页 | `/use-cases`、`/automation`、`/changelog`（MDX 流水线 + 首个 release）| 1.5 天 |
| 6 · 英文 + SEO | en 翻译 + og 图片 + sitemap + robots + JSON-LD | 1 天 |
| 7 · 动效 + 移动端 | Motion 整合 + View Transitions + 移动端打磨 | 1 天 |
| 8 · 测试 + 上线 | Vitest + Playwright 关键路径 + Lighthouse 调优 + 切流 | 1 天 |

总计 **~9 个工作日**预估（Claude 协助会显著快于该数字）。

### 切流策略

1. 开发期：`main` 上的 Vite 站点继续可部署
2. `feat/nextjs-rewrite` 分支 Vercel preview 自动生成预览 URL，逐阶段验收
3. 全部就绪后合并到 `main`：删除 Vite 配置 + `App.tsx` + `styles.css` + `content.ts`
4. Vercel 检测到 Next.js 项目自动重新构建
5. `vercel.ts` redirects 处理旧 URL

---

## 8 · 风险与缓解

| 风险 | 缓解 |
|---|---|
| Noto Sans SC 完整字库太大（>5MB） | 子集化只保留 GB2312 + 项目用词，控制在 < 200KB |
| Tailwind v4 + shadcn 仍在快速迭代 | 锁定 minor 版本，遇到 breaking change 在合并前修 |
| `vercel.ts` 仍较新（@vercel/config） | 如果遇到不兼容，回退到 `vercel.json` |
| 英文翻译质量 | 第一版机翻 + 人工 review；提供 GitHub issue 模板让用户报错 |
| 旧锚点 URL 来自外链 SEO | 通过 vercel redirects 全部映射 + Search Console 提交 sitemap |

---

## 9 · 验收标准

- 所有 8 个路由在 zh / en 双语下可访问
- Lighthouse Performance ≥ 95、Accessibility = 100
- Playwright 4 条关键路径全通过
- 暗 / 亮模式切换无 FOUC
- 旧 URL（含锚点）通过 redirects 正确映射
- 移动端 ≤ 360px 宽度下无横向滚动 / 文字溢出
- `pnpm build` 无 warnings、无 type errors
- `biome check` 无 errors

---

## 10 · 不在本次范围

- Blog（MDX 框架已就位，未来加 `/blog` 路由即可）
- Testimonials / 用户案例叙事（等积累素材）
- Pricing（云同步版本发布后再补）
- Storybook / Chromatic
- 第三种语言
- 内嵌完整文档（仍指向外部仓库 README，未来可改为 fumadocs 或独立 docs 站）
