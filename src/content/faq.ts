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
    key: 'product-basics',
    title: { zh: '指纹浏览器与 Veil 基础', en: 'Fingerprint browser & Veil basics' },
    items: [
      {
        key: 'what-is-fingerprint-browser',
        question: {
          zh: '什么是指纹浏览器？',
          en: 'What is a fingerprint browser?',
        },
        answer: {
          zh: '指纹浏览器用于为不同账号创建彼此隔离、长期稳定的浏览器环境。网站通常会综合观察 IP、时区、语言、系统、字体、Canvas、WebGL、Cookie、扩展和本地存储等信号；如果多个账号共用同一套环境，就更容易被关联。Veil 的目标不是“随机伪装”，而是让每个 Profile 形成可持续使用的一致身份画像。',
          en: 'A fingerprint browser creates isolated, long-lived browser environments for different accounts. Websites can correlate IP, timezone, language, OS, fonts, Canvas, WebGL, cookies, extensions, and local storage. Veil focuses on consistent per-profile identities rather than random masking.',
        },
      },
      {
        key: 'how-veil-works',
        question: {
          zh: 'Veil 是如何提供防关联浏览器环境的？',
          en: 'How does Veil provide anti-linking browser environments?',
        },
        answer: {
          zh: 'Veil 用 Profile 作为账号环境的基本单位。每个 Profile 可以拥有独立指纹种子、Cookie、缓存、扩展、代理配置、语言、时区和自动化会话。桌面端负责创建和运行这些环境，本地 Daemon 管理 Profile 生命周期；需要脚本接入时，再通过 HTTP API 启动 Profile 并返回 CDP WebSocket 地址。',
          en: 'Veil uses profiles as the base unit for account environments. Each profile can have its own fingerprint seed, cookies, cache, extensions, proxy settings, language, timezone, and automation session. The desktop app and local daemon manage profile lifecycle, while the HTTP API can start a profile and return a CDP WebSocket endpoint for automation.',
        },
      },
      {
        key: 'proxy-support',
        question: {
          zh: 'Veil 支持哪些代理？会内置代理服务吗？',
          en: 'Which proxies does Veil support? Does it include proxy hosting?',
        },
        answer: {
          zh: 'Veil 面向按 Profile 配置代理的工作流，设计上支持常见 HTTP / HTTPS / SOCKS5 代理，并强调代理、DNS、WebRTC 泄漏风险的可见性。Veil 不售卖也不托管代理 IP；你可以接入自己购买或自建的代理服务，并把代理与 Profile 稳定绑定。',
          en: 'Veil is built for per-profile proxy workflows and is designed around common HTTP, HTTPS, and SOCKS5 proxies, with visibility into proxy, DNS, and WebRTC leak risks. Veil does not sell or host proxy IPs. You bring your own proxy service and bind it to profiles.',
        },
      },
      {
        key: 'veil-advantages',
        question: {
          zh: 'Veil 和常见指纹浏览器相比，核心优势是什么？',
          en: 'What makes Veil different from common fingerprint browsers?',
        },
        answer: {
          zh: 'Veil 更强调数据主权、部署灵活性和可集成能力。Profile 数据、主密码与加密密钥默认保存在你的设备或自有环境中，团队可以根据合规与运营需求选择本地使用或私有化部署；同时，SQLCipher 整库加密、HTTP API、CDP 自动化与可审计安全边界都作为标准能力提供。换句话说，Veil 提供的是一套可控、可部署、可集成的浏览器环境管理软件，而不是额外接管你敏感数据的托管平台。',
          en: 'Veil is local-first and self-hostable. We do not host profile data in our cloud, and we do not store your master password or encryption keys. Personal and enterprise editions are designed around local databases, SQLCipher full-database encryption, HTTP API, CDP automation, and inspectable security boundaries. In short: Veil sells software, not data hosting.',
        },
      },
      {
        key: 'is-veil-free',
        question: {
          zh: 'Veil 是否免费？可以先试用吗？',
          en: 'Is Veil free? Can I try it first?',
        },
        answer: {
          zh: 'Veil 是商业订阅软件，当前价格以价格页展示为准。我们不提供“永久免费云环境”，因为 Veil 的定位不是数据托管服务。你可以先查看下载页、价格页、FAQ、安全模型和对比页确认是否符合需求；购买后 7 天内、未激活或仅短暂激活的许可证支持全额退款。',
          en: 'Veil is commercial subscription software, with current pricing shown on the pricing page. We do not provide a forever-free hosted cloud environment because Veil is not a data-hosting service. You can review the download, pricing, FAQ, security model, and comparison pages before purchase; full refund is available within 7 days if the license is not activated or only briefly activated.',
        },
      },
      {
        key: 'is-veil-safe',
        question: {
          zh: 'Veil 安全吗？它不能防护哪些风险？',
          en: 'Is Veil safe? What risks does it not protect against?',
        },
        answer: {
          zh: 'Veil 的安全设计包括主密码本机持有、Argon2id 密钥派生、AES-256-GCM 内容加密、SQLCipher 整库加密、API Key 与主密码分离，以及明确的威胁模型。但它不能替代你的终端安全：如果本机已被恶意软件控制、主密码泄漏、代理本身不可信，或你违反目标平台规则，Veil 不能保证账号不出问题。',
          en: 'Veil includes local master-password handling, Argon2id key derivation, AES-256-GCM content encryption, SQLCipher full-database encryption, API keys separated from the master password, and a clear threat model. It does not replace endpoint security: if your device is compromised, your master password leaks, your proxy is untrusted, or you violate platform rules, Veil cannot guarantee account outcomes.',
        },
      },
    ],
  },
  {
    key: 'pricing',
    title: { zh: '价格与许可', en: 'Pricing & Licensing' },
    items: [
      {
        key: 'subscription-terms',
        question: {
          zh: 'Veil 怎么收费？',
          en: 'How does Veil pricing work?',
        },
        answer: {
          zh: 'Veil 是订阅制商业软件，三档：$29.9 / 1 年、$69.9 / 3 年、$100 / 5 年。所有档共享完全相同的功能集与无限 Profile，差别只是订阅时长与平均月成本。订阅期内可获得全部更新。',
          en: 'Veil is commercial subscription software with three tiers: $29.9 / 1 year, $69.9 / 3 years, $100 / 5 years. All tiers share the exact same feature set and unlimited profiles — only the duration and average monthly cost differ. Updates are included during the subscription period.',
        },
      },
      {
        key: 'subscription-expiry',
        question: {
          zh: '订阅过期会怎样？',
          en: 'What happens when my subscription expires?',
        },
        answer: {
          zh: '过期后软件不会自动锁定你的本地数据——所有密钥都在你的设备上。但你将无法接收新版本与安全补丁；建议在到期前续订或迁出数据。',
          en: 'After expiry, your local data is not locked — all keys live on your device. You will not receive new releases or security patches, however. We recommend renewing or migrating your data before the term ends.',
        },
      },
      {
        key: 'refund',
        question: {
          zh: '可以退款吗？',
          en: 'Do you offer refunds?',
        },
        answer: {
          zh: '购买后 7 天内、未激活或仅短暂激活的许可证支持全额退款。已超过 7 天或激活超过 24 小时的订阅原则上不退，特殊情况请邮件联系。',
          en: 'Full refund within 7 days of purchase if the license is not activated or only briefly activated. Subscriptions beyond 7 days or activated more than 24 hours are non-refundable by default; please contact us by email for special cases.',
        },
      },
    ],
  },
  {
    key: 'self-host',
    title: { zh: '自托管与部署', en: 'Self-hosting & Deployment' },
    items: [
      {
        key: 'self-host-difference',
        question: {
          zh: '自托管和官方版有什么不同？',
          en: 'How does self-hosting differ from the official build?',
        },
        answer: {
          zh: '功能完全一致。自托管意味着 Veil 的所有运行时——数据库、密钥、自动化端点——都跑在你自己的机器或私有服务器上，从不经过我们的基础设施。我们不提供数据托管，也无法访问你的任何数据。',
          en: 'Feature parity is identical. Self-hosting means every runtime piece — database, keys, automation endpoints — runs on your own machine or private server, never touching our infrastructure. We do not provide data hosting and cannot access any of your data.',
        },
      },
      {
        key: 'self-host-enterprise',
        question: {
          zh: '企业版自托管有额外要求吗？',
          en: 'Are there extra requirements for enterprise self-hosting?',
        },
        answer: {
          zh: '没有强制硬件要求。企业版增加多人协作、SSO 接入、组级权限等特性，需要单独购买许可证。建议先用个人版自托管验证流程，再考虑企业版。',
          en: 'No special hardware requirements. The enterprise edition adds team collaboration, SSO, group permissions and requires a separate license. We recommend evaluating self-hosting on the personal edition first before switching to enterprise.',
        },
      },
    ],
  },
  {
    key: 'privacy',
    title: { zh: '隐私与数据', en: 'Privacy & Data' },
    items: [
      {
        key: 'data-retention',
        question: {
          zh: '我的数据会上传到 Veil 吗？',
          en: 'Does my data get uploaded to Veil?',
        },
        answer: {
          zh: '不会。Veil 卖的是软件而不是数据托管服务——所有 Profile 数据、Cookie、缓存、加密密钥都只存在你的设备上，我们没有任何上传通道也没有任何存储能力。',
          en: 'No. Veil sells software, not data hosting. All profile data, cookies, cache, and encryption keys live only on your device. We have no upload channel and no storage to retain them.',
        },
      },
      {
        key: 'master-password-lost',
        question: {
          zh: '忘记主密码怎么办？',
          en: 'What if I forget my master password?',
        },
        answer: {
          zh: '主密码无法由我们重置，因为它从未离开你的设备。请妥善保存初始化时的 24 词 BIP39 恢复短语——它是找回数据的唯一方式。',
          en: 'We cannot reset your master password because it never reaches us. Keep the 24-word BIP39 recovery phrase generated at setup — it is the only way to recover your data.',
        },
      },
    ],
  },
  {
    key: 'roadmap',
    title: { zh: '路线图与源码', en: 'Roadmap & Source' },
    items: [
      {
        key: 'source-release',
        question: {
          zh: '听说桌面端会开源，是真的吗？',
          en: 'I heard the desktop client will be open-sourced — is that true?',
        },
        answer: {
          zh: '是。桌面端源码会在产品成熟到某个里程碑时公开发布，方便用户审计核心实现。指纹引擎、自动化端点、补丁分发等核心商业模块仍保持闭源。具体开源时间会在路线图上提前公布。',
          en: 'Yes. The desktop client source will be made public when the product hits a designated milestone, allowing independent audit of the core. Core commercial modules — the fingerprint engine, automation endpoints, patch distribution — will remain closed. The exact timing will be announced on the roadmap.',
        },
      },
      {
        key: 'automation-compat',
        question: {
          zh: 'Veil 兼容 Playwright / Puppeteer / Selenium 吗？',
          en: 'Is Veil compatible with Playwright / Puppeteer / Selenium?',
        },
        answer: {
          zh: '兼容。Veil 暴露标准 Chrome DevTools Protocol 端点，可作为远程浏览器直接接入。配套的 HTTP API 用于管理 Profile 生命周期。',
          en: 'Yes. Veil exposes standard Chrome DevTools Protocol endpoints that connect as a remote browser. The HTTP API on the side manages profile lifecycle.',
        },
      },
    ],
  },
];
