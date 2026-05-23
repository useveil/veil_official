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
          en: "No. Veil sells software, not data hosting. All profile data, cookies, cache, and encryption keys live only on your device. We have no upload channel and no storage to retain them.",
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
