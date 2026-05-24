import type { LocalizedText } from './features';

export type LegalDocumentKey = 'team' | 'terms' | 'privacy' | 'refund';

export type LegalSection = {
  key: string;
  title: LocalizedText;
  body: LocalizedText[];
  items?: LocalizedText[];
};

export type LegalDocument = {
  key: LegalDocumentKey;
  path: `/${LegalDocumentKey}`;
  eyebrow: LocalizedText;
  title: LocalizedText;
  description: LocalizedText;
  updatedAt: string;
  contact: LocalizedText;
  sections: LegalSection[];
};

export const legalDocuments: Record<LegalDocumentKey, LegalDocument> = {
  team: {
    key: 'team',
    path: '/team',
    eyebrow: { zh: '公司', en: 'Company' },
    title: { zh: '团队与公司信息', en: 'Team and Company Information' },
    description: {
      zh: '本页列明 Veil 的团队定位、运营联系、业务沟通渠道与安全报告方式。具体法律主体以订单、发票、合同或双方书面确认为准。',
      en: 'This page provides Veil team information, operational contact channels, business communication channels, and security reporting guidance. The specific legal entity is determined by the applicable order, invoice, contract, or written confirmation.',
    },
    updatedAt: '2026-05-24',
    contact: {
      zh: '公司信息、企业采购、媒体、合作或安全报告，请联系 support@useveil.xyz。',
      en: 'For company information, enterprise procurement, press, partnerships, or security reports, contact support@useveil.xyz.',
    },
    sections: [
      {
        key: 'overview',
        title: { zh: '一、基本信息', en: '1. Overview' },
        body: [
          {
            zh: 'Veil 是面向专业用户和企业用户的商业软件产品，主要提供本地优先的浏览器 Profile 隔离、指纹环境管理、许可证交付、下载更新、客户支持及企业部署相关服务。',
            en: 'Veil is a commercial software product for professional and enterprise users. It provides local-first browser profile isolation, fingerprint-environment management, license delivery, downloads and updates, customer support, and enterprise deployment services.',
          },
          {
            zh: 'Veil 的具体运营主体、签约主体、开票主体或企业交付主体，应以订单页面、发票、合同、采购文件或双方书面确认的信息为准。本页面不替代任何已签署的书面协议。',
            en: 'The specific operating entity, contracting entity, invoicing entity, or enterprise-delivery entity for Veil is determined by the applicable order page, invoice, contract, procurement document, or written confirmation. This page does not replace any executed written agreement.',
          },
        ],
      },
      {
        key: 'business-scope',
        title: { zh: '二、业务范围', en: '2. Business scope' },
        body: [
          {
            zh: 'Veil 团队的工作范围包括产品研发、软件许可、版本发布、文档维护、客户支持、安全响应、企业部署沟通、采购与发票协助，以及与产品正常运营相关的必要事务。',
            en: 'The Veil team’s work includes product development, software licensing, version releases, documentation, customer support, security response, enterprise deployment communications, procurement and invoice assistance, and other matters necessary for ordinary product operations.',
          },
        ],
        items: [
          {
            zh: '产品与许可：许可证购买、许可交付、版本下载、更新与补丁。',
            en: 'Product and licensing: license purchase, license delivery, version downloads, updates, and patches.',
          },
          {
            zh: '技术支持：安装、激活、配置、故障排查、安全报告和版本问题沟通。',
            en: 'Technical support: installation, activation, configuration, troubleshooting, security reports, and version-related communications.',
          },
          {
            zh: '企业服务：自托管评估、采购流程、合同沟通、发票信息和部署边界确认。',
            en: 'Enterprise services: self-hosting assessment, procurement workflow, contract communications, invoice information, and deployment-scope confirmation.',
          },
        ],
      },
      {
        key: 'contact-channels',
        title: { zh: '三、联系方式', en: '3. Contact channels' },
        body: [
          {
            zh: '统一联系邮箱为 support@useveil.xyz。为便于处理，请在邮件标题中注明事项类型，例如“采购咨询”“许可证问题”“发票信息”“企业部署”“安全报告”或“媒体合作”。',
            en: 'The unified contact email is support@useveil.xyz. To help us process requests, include the matter type in the email subject, such as “procurement inquiry,” “license issue,” “invoice information,” “enterprise deployment,” “security report,” or “press partnership.”',
          },
          {
            zh: '请勿通过邮件、工单、聊天工具或任何非加密渠道发送主密码、恢复短语、Cookie、完整 Profile、代理密钥、钱包凭据或其他高敏感数据。',
            en: 'Do not send master passwords, recovery phrases, cookies, complete profiles, proxy credentials, wallet credentials, or other highly sensitive data through email, tickets, chat tools, or any non-encrypted channel.',
          },
        ],
      },
      {
        key: 'security-reporting',
        title: { zh: '四、安全报告', en: '4. Security reporting' },
        body: [
          {
            zh: '如果你认为 Veil 官网、下载、许可证交付、桌面软件或企业部署材料存在安全问题，可以发送安全报告至 support@useveil.xyz。请尽量提供受影响版本、复现步骤、影响范围、相关日志片段和联系方式。',
            en: 'If you believe there is a security issue in the Veil website, downloads, license delivery, desktop software, or enterprise deployment materials, send a security report to support@useveil.xyz. Please include the affected version, reproduction steps, impact scope, relevant log excerpts, and contact details where possible.',
          },
          {
            zh: '在我们完成核实和修复前，请避免公开披露可被直接利用的漏洞细节。我们也不会要求你提供与报告无关的账号密码、恢复短语、Cookie 或完整本地数据。',
            en: 'Before verification and remediation are completed, avoid public disclosure of directly exploitable vulnerability details. We will not ask for account passwords, recovery phrases, cookies, or complete local data unrelated to the report.',
          },
        ],
      },
      {
        key: 'procurement',
        title: { zh: '五、企业采购与开票', en: '5. Enterprise procurement and invoicing' },
        body: [
          {
            zh: '企业采购、合同、发票、供应商登记、安全问卷或自托管部署范围确认，请通过 support@useveil.xyz 联系。请在邮件中说明公司名称、联系人、采购计划、预计席位或部署规模、需要的合同或发票信息。',
            en: 'For enterprise procurement, contracts, invoices, vendor registration, security questionnaires, or self-hosting deployment-scope confirmation, contact support@useveil.xyz. Include the company name, contact person, procurement plan, expected seats or deployment scale, and required contract or invoice information.',
          },
        ],
      },
      {
        key: 'updates',
        title: { zh: '六、信息更新', en: '6. Updates to this page' },
        body: [
          {
            zh: '本页可能因运营主体、联系方式、业务范围或企业交付流程变化而更新。涉及具体交易、合同或发票的信息，以双方确认的交易文件为准。',
            en: 'This page may be updated due to changes in operating entity, contact channels, business scope, or enterprise-delivery workflow. Information for a specific transaction, contract, or invoice is governed by the transaction documents confirmed by both parties.',
          },
        ],
      },
    ],
  },
  terms: {
    key: 'terms',
    path: '/terms',
    eyebrow: { zh: '法务', en: 'Legal' },
    title: { zh: '服务条款', en: 'Terms of Service' },
    description: {
      zh: '本服务条款适用于 Veil 官网、软件许可、下载、更新、支持与企业服务。购买、下载、安装、访问或使用 Veil，即表示你同意受本条款约束。',
      en: 'These Terms of Service apply to the Veil website, software licenses, downloads, updates, support, and enterprise services. By purchasing, downloading, installing, accessing, or using Veil, you agree to be bound by these terms.',
    },
    updatedAt: '2026-05-24',
    contact: {
      zh: '条款问题请联系 support@useveil.xyz。',
      en: 'For questions about these terms, contact support@useveil.xyz.',
    },
    sections: [
      {
        key: 'acceptance',
        title: { zh: '一、接受条款与签约主体', en: '1. Acceptance and contracting entity' },
        body: [
          {
            zh: '你购买、下载、安装、访问或使用 Veil，即表示你已阅读、理解并同意本服务条款、隐私协议、退款政策，以及订单、发票、报价单、采购文件或双方书面确认中载明的补充条款。',
            en: 'By purchasing, downloading, installing, accessing, or using Veil, you confirm that you have read, understood, and agreed to these Terms of Service, the Privacy Policy, the Refund Policy, and any supplemental terms stated in an order, invoice, quote, procurement document, or written confirmation.',
          },
          {
            zh: '如你代表公司、组织或其他主体使用 Veil，你声明并保证你有权代表该主体接受本条款。Veil 的具体签约主体、开票主体和争议相对方，以适用的订单、发票、合同或双方书面确认为准。',
            en: 'If you use Veil on behalf of a company, organization, or other entity, you represent and warrant that you have authority to accept these terms on behalf of that entity. The specific contracting entity, invoicing entity, and dispute counterparty for Veil are determined by the applicable order, invoice, contract, or written confirmation.',
          },
          {
            zh: '如本条款与双方另行签署的书面协议存在冲突，就冲突事项以书面协议为准；未冲突部分仍适用本条款。',
            en: 'If these terms conflict with a separately executed written agreement between the parties, the written agreement controls for the conflicting matter, and the non-conflicting parts of these terms remain in effect.',
          },
        ],
      },
      {
        key: 'definitions',
        title: { zh: '二、定义', en: '2. Definitions' },
        body: [
          {
            zh: '除非上下文另有说明，本条款中的下列术语具有以下含义：',
            en: 'Unless the context provides otherwise, the following terms have the meanings below:',
          },
        ],
        items: [
          {
            zh: '“Veil”指 Veil 官网、桌面软件、许可交付、下载、更新、文档、支持和企业服务。',
            en: '“Veil” means the Veil website, desktop software, license delivery, downloads, updates, documentation, support, and enterprise services.',
          },
          {
            zh: '“软件”指 Veil 提供的客户端、安装包、补丁、更新、命令行工具、接口、配置文件、文档及相关组件。',
            en: '“Software” means clients, installers, patches, updates, command-line tools, interfaces, configuration files, documentation, and related components provided by Veil.',
          },
          {
            zh: '“许可证”指你依据订单、订阅或书面协议取得的有限软件使用权。',
            en: '“License” means the limited right to use the Software that you obtain under an order, subscription, or written agreement.',
          },
          {
            zh: '“用户”或“你”指购买、下载、安装、访问或使用 Veil 的个人、公司、组织或其他主体。',
            en: '“User” or “you” means the individual, company, organization, or other entity that purchases, downloads, installs, accesses, or uses Veil.',
          },
        ],
      },
      {
        key: 'license-grant',
        title: { zh: '三、许可证授予与范围', en: '3. License grant and scope' },
        body: [
          {
            zh: '在你持续遵守本条款并已支付适用费用的前提下，我们授予你一项有限的、非独占的、不可转让的、不可再许可的、可撤销的软件使用许可，用于在许可期限和授权范围内安装、访问和使用 Veil。',
            en: 'Subject to your continued compliance with these terms and payment of applicable fees, we grant you a limited, non-exclusive, non-transferable, non-sublicensable, revocable license to install, access, and use Veil within the license term and authorized scope.',
          },
        ],
        items: [
          {
            zh: '个人版、团队版、企业版、自托管、席位数、设备数、更新权益、支持范围和使用期限，以订单、价格页、发票、合同或双方书面确认为准。',
            en: 'Personal, team, enterprise, self-hosted, seat count, device count, update entitlement, support scope, and term are determined by the applicable order, pricing page, invoice, contract, or written confirmation.',
          },
          {
            zh: '除非另有书面授权，你不得出售、出租、出借、转让、共享、托管给未授权第三方，或以任何方式绕过许可证、席位、设备、激活或使用限制。',
            en: 'Unless separately authorized in writing, you may not sell, rent, lend, transfer, share, host for unauthorized third parties, or bypass license, seat, device, activation, or usage limits in any way.',
          },
          {
            zh: '本条款未明示授予的所有权利均由 Veil 或相应权利人保留。',
            en: 'All rights not expressly granted in these terms are reserved by Veil or the applicable rights holder.',
          },
        ],
      },
      {
        key: 'license-management',
        title: {
          zh: '四、许可证交付、激活与账号安全',
          en: '4. License delivery, activation, and account security',
        },
        body: [
          {
            zh: '你应提供真实、准确、完整且可联系的购买、开票和许可证信息，并妥善保管许可证、下载链接、激活信息、邮箱账号、设备、主密码、恢复短语和其他访问凭据。',
            en: 'You must provide true, accurate, complete, and reachable purchase, invoicing, and license information, and you are responsible for safeguarding licenses, download links, activation information, email accounts, devices, master passwords, recovery phrases, and other access credentials.',
          },
        ],
        items: [
          {
            zh: '因你保管不当、共享许可证、邮箱失控、设备失控、代理或自动化脚本配置错误造成的损失，由你自行承担。',
            en: 'You are responsible for losses caused by improper safeguarding, license sharing, loss of email-account control, device compromise, proxy misconfiguration, or automation-script errors.',
          },
          {
            zh: '如你发现许可证泄露、未授权使用、安全事件或付款异常，应及时通过 support@useveil.xyz 联系我们。',
            en: 'If you discover license leakage, unauthorized use, a security incident, or payment anomaly, contact us promptly at support@useveil.xyz.',
          },
        ],
      },
      {
        key: 'fees-refunds',
        title: { zh: '五、费用、税费与退款', en: '5. Fees, taxes, and refunds' },
        body: [
          {
            zh: 'Veil 的价格、计费周期、可用功能、更新权益和支持范围，以购买时展示的价格页、订单、发票、合同或双方书面确认为准。除非另有说明，费用不包含你所在地可能适用的税费、银行费用、汇兑费用或第三方服务费用。',
            en: 'Veil pricing, billing period, available features, update entitlement, and support scope are determined by the pricing page, order, invoice, contract, or written confirmation shown or issued at purchase. Unless otherwise stated, fees do not include taxes, bank charges, currency-exchange costs, or third-party service fees that may apply in your location.',
          },
          {
            zh: '退款适用单独公布的退款政策。除退款政策、强制性法律规定或双方书面约定另有规定外，已交付或已激活的许可证费用通常不予退还。',
            en: 'Refunds are governed by the separately published Refund Policy. Except as provided in that policy, mandatory law, or a written agreement between the parties, fees for delivered or activated licenses are generally non-refundable.',
          },
        ],
      },
      {
        key: 'updates-support',
        title: { zh: '六、更新、补丁与支持', en: '6. Updates, patches, and support' },
        body: [
          {
            zh: '在有效许可期内，你可以获得适用版本的下载、更新和补丁。我们可能基于安全、兼容性、法律合规、产品规划或商业原因，调整、暂停或停止部分功能、平台支持、下载渠道或更新机制。',
            en: 'During an active license term, you may receive downloads, updates, and patches for applicable versions. We may modify, suspend, or discontinue certain features, platform support, download channels, or update mechanisms for security, compatibility, legal compliance, product planning, or business reasons.',
          },
          {
            zh: '除非企业合同或 SLA 另有约定，我们不承诺固定响应时间、修复时间、版本发布日期、持续兼容所有第三方平台或持续支持所有旧版本。',
            en: 'Unless an enterprise contract or SLA provides otherwise, we do not guarantee fixed response times, fix times, release dates, continuous compatibility with all third-party platforms, or continued support for all legacy versions.',
          },
        ],
      },
      {
        key: 'user-responsibilities',
        title: {
          zh: '七、用户责任与可接受使用',
          en: '7. User responsibilities and acceptable use',
        },
        body: [
          {
            zh: '你应自行确保使用 Veil 的方式符合适用法律法规、监管要求、第三方平台规则、账号协议、代理服务条款、数据保护要求和内部合规制度。Veil 提供隔离、配置和自动化能力，但不授权任何违法、侵权、欺诈、攻击、垃圾信息、规避风控或违反第三方合法规则的行为。',
            en: 'You are responsible for ensuring that your use of Veil complies with applicable laws, regulations, regulatory requirements, third-party platform rules, account agreements, proxy-service terms, data-protection requirements, and internal compliance policies. Veil provides isolation, configuration, and automation capabilities, but does not authorize unlawful, infringing, fraudulent, attacking, spam, risk-control evasion, or third-party-rule-violating conduct.',
          },
        ],
        items: [
          {
            zh: '不得使用 Veil 进行未授权访问、凭据盗取、恶意软件传播、钓鱼、垃圾信息、欺诈交易、侵犯知识产权或侵犯他人隐私。',
            en: 'Do not use Veil for unauthorized access, credential theft, malware distribution, phishing, spam, fraudulent transactions, intellectual-property infringement, or privacy violations.',
          },
          {
            zh: '不得干扰、破坏、扫描、压测或试图绕过 Veil 官网、许可证、下载、更新、安全或计费系统。',
            en: 'Do not interfere with, disrupt, scan, stress test, or attempt to bypass Veil website, license, download, update, security, or billing systems.',
          },
          {
            zh: '不得移除版权、商标、许可证、归属声明或安全提示。',
            en: 'Do not remove copyright, trademark, license, attribution, or security notices.',
          },
        ],
      },
      {
        key: 'restrictions',
        title: { zh: '八、使用限制', en: '8. Restrictions' },
        body: [
          {
            zh: '除非适用法律明确允许或我们书面授权，你不得对 Veil 进行反向工程、反编译、反汇编、规避技术保护措施、绕过许可证校验、修改许可逻辑、制作衍生授权系统、转售访问能力或向未授权第三方提供托管服务。',
            en: 'Except where expressly permitted by applicable law or authorized by us in writing, you may not reverse engineer, decompile, disassemble, circumvent technical protection measures, bypass license checks, modify licensing logic, create derivative authorization systems, resell access, or provide hosted services to unauthorized third parties.',
          },
        ],
      },
      {
        key: 'ip-feedback',
        title: { zh: '九、知识产权与反馈', en: '9. Intellectual property and feedback' },
        body: [
          {
            zh: 'Veil 及其软件、界面、文档、标识、商标、代码、架构、文本、图形和相关材料的知识产权归 Veil 或相应权利人所有。本条款不向你转让任何所有权。',
            en: 'Veil and its software, interfaces, documentation, logos, trademarks, code, architecture, text, graphics, and related materials are owned by Veil or the applicable rights holders. These terms do not transfer ownership to you.',
          },
          {
            zh: '你向我们提供的建议、问题、反馈或改进意见，可由我们在不向你支付费用的情况下用于改进产品、文档、服务和安全流程；但我们不会因此取得你本地 Profile 数据或客户业务数据的所有权。',
            en: 'Suggestions, issues, feedback, or improvement ideas you provide may be used by us to improve products, documentation, services, and security processes without payment to you; however, we do not obtain ownership of your local profile data or customer business data as a result.',
          },
        ],
      },
      {
        key: 'data-security',
        title: { zh: '十、数据、隐私与安全', en: '10. Data, privacy, and security' },
        body: [
          {
            zh: '我们按照隐私协议处理个人信息。Veil 的本地优先设计不改变你对自己设备、系统环境、主密码、恢复短语、代理、第三方账号、自动化脚本、备份和自托管环境的管理责任。',
            en: 'We process personal information according to the Privacy Policy. Veil’s local-first design does not change your responsibility for managing your devices, system environment, master password, recovery phrase, proxies, third-party accounts, automation scripts, backups, and self-hosted environment.',
          },
          {
            zh: '你理解任何软件、网络、代理、浏览器环境或自动化工具均无法保证绝对安全、绝对稳定或对所有第三方平台持续有效。',
            en: 'You understand that no software, network, proxy, browser environment, or automation tool can guarantee absolute security, absolute stability, or continuous effectiveness on all third-party platforms.',
          },
        ],
      },
      {
        key: 'third-party-services',
        title: { zh: '十一、第三方服务', en: '11. Third-party services' },
        body: [
          {
            zh: 'Veil 可能与支付、邮件、官网托管、CDN、安全防护、代码托管、下载分发、代理、浏览器内核、操作系统、自动化框架或第三方平台交互。第三方服务由其各自提供方控制，并受其条款、隐私政策、可用性和技术限制约束。',
            en: 'Veil may interact with payment, email, website hosting, CDN, security, code hosting, download distribution, proxy, browser engine, operating system, automation framework, or third-party platform services. Third-party services are controlled by their respective providers and governed by their own terms, privacy policies, availability, and technical limitations.',
          },
          {
            zh: '我们不对第三方服务的可用性、价格、规则变化、账号处置、封禁、代理质量、付款处理、数据处理或安全事件承担责任，但强制性法律另有规定的除外。',
            en: 'We are not responsible for third-party service availability, pricing, rule changes, account actions, bans, proxy quality, payment processing, data processing, or security incidents, except where mandatory law provides otherwise.',
          },
        ],
      },
      {
        key: 'suspension-termination',
        title: { zh: '十二、暂停与终止', en: '12. Suspension and termination' },
        body: [
          {
            zh: '如你违反本条款、未支付费用、滥用许可证、干扰系统安全、侵犯第三方权益、从事违法或高风险活动，或我们根据法律、监管、安全或商业风险判断有必要采取措施，我们可以暂停或终止许可交付、更新、支持、下载或后续服务。',
            en: 'If you breach these terms, fail to pay fees, abuse a license, interfere with system security, infringe third-party rights, engage in unlawful or high-risk activity, or if we determine that action is necessary for legal, regulatory, security, or business-risk reasons, we may suspend or terminate license delivery, updates, support, downloads, or further services.',
          },
          {
            zh: '终止后，你应停止使用受影响的许可证和软件版本，并删除或停止访问未授权副本。订阅到期或服务终止不会赋予我们访问、锁定或删除你本地数据的权利。',
            en: 'After termination, you must stop using the affected license and software versions and delete or stop accessing unauthorized copies. Subscription expiration or service termination does not give us the right to access, lock, or delete your local data.',
          },
        ],
      },
      {
        key: 'disclaimers',
        title: { zh: '十三、免责声明', en: '13. Disclaimers' },
        body: [
          {
            zh: '在适用法律允许的最大范围内，Veil 按“现状”和“可用状态”提供。我们不保证软件无错误、不中断、完全安全、完全兼容你的环境、满足所有业务需求、持续兼容任何第三方平台，或保证第三方账号结果、代理质量、自动化成功率、业务收益、合规结果或风控结果。',
            en: 'To the maximum extent permitted by applicable law, Veil is provided “as is” and “as available.” We do not guarantee that the Software will be error-free, uninterrupted, fully secure, fully compatible with your environment, satisfy all business needs, remain compatible with any third-party platform, or guarantee third-party account outcomes, proxy quality, automation success rates, business results, compliance results, or risk-control outcomes.',
          },
        ],
      },
      {
        key: 'liability',
        title: { zh: '十四、责任限制', en: '14. Limitation of liability' },
        body: [
          {
            zh: '在适用法律允许的最大范围内，我们不对间接损失、附带损失、特殊损失、惩罚性损害、利润损失、业务中断、数据丢失、账号处置、第三方服务故障或替代服务成本承担责任。',
            en: 'To the maximum extent permitted by applicable law, we are not liable for indirect, incidental, special, punitive, or consequential damages, lost profits, business interruption, data loss, account actions, third-party service failures, or substitute-service costs.',
          },
          {
            zh: '在适用法律允许的最大范围内，我们因 Veil 或本条款产生的累计责任总额，不超过你在引发责任事件前十二个月内就相关许可证实际向我们支付的费用；如你未支付费用，则累计责任总额以适用法律允许的最低金额为限。本限制不适用于法律不得限制的责任。',
            en: 'To the maximum extent permitted by applicable law, our aggregate liability arising from Veil or these terms will not exceed the fees you actually paid to us for the relevant license during the twelve months before the event giving rise to liability; if you paid no fees, aggregate liability is limited to the lowest amount permitted by applicable law. This limitation does not apply to liabilities that cannot be limited by law.',
          },
        ],
      },
      {
        key: 'indemnity',
        title: { zh: '十五、赔偿', en: '15. Indemnity' },
        body: [
          {
            zh: '因你违反本条款、违法使用 Veil、侵犯第三方权利、错误配置代理或自动化脚本、违反第三方平台规则，或你提交给我们的内容引发的第三方索赔、损失、罚款、费用和合理律师费，你应在适用法律允许范围内对我们进行赔偿并使我们免受损害。',
            en: 'To the extent permitted by applicable law, you will indemnify and hold us harmless from third-party claims, losses, penalties, costs, and reasonable attorneys’ fees arising from your breach of these terms, unlawful use of Veil, infringement of third-party rights, proxy or automation-script misconfiguration, violation of third-party platform rules, or content you submit to us.',
          },
        ],
      },
      {
        key: 'changes',
        title: { zh: '十六、条款变更', en: '16. Changes to these terms' },
        body: [
          {
            zh: '我们可能因法律法规、产品功能、服务方式、安全要求或商业安排变化而更新本条款。重大变更会通过官网、更新日期、订单流程或必要时通过邮件提示。变更后的条款自页面载明日期或公告说明的日期起生效；你在生效后继续使用 Veil，即视为接受变更。',
            en: 'We may update these terms due to changes in laws, product features, service delivery, security requirements, or business arrangements. Material changes will be indicated on the website, through the update date, in the order flow, or by email where necessary. Updated terms become effective on the date shown on the page or stated in the notice; continued use of Veil after the effective date constitutes acceptance of the changes.',
          },
        ],
      },
      {
        key: 'governing-law',
        title: { zh: '十七、法律适用与争议解决', en: '17. Governing law and disputes' },
        body: [
          {
            zh: '除订单、合同或双方书面确认另有约定外，本条款的法律适用和争议解决方式，以具体签约主体所在地法律和有管辖权的法院或争议解决机构为准。正式上线前，应将本条替换为与你的实际运营主体、注册地和销售地区匹配的具体法域与争议解决条款。',
            en: 'Unless an order, contract, or written confirmation provides otherwise, the governing law and dispute-resolution forum for these terms are determined by the law and competent courts or dispute-resolution body of the specific contracting entity’s location. Before production use, this clause should be replaced with a specific jurisdiction and dispute-resolution clause matching your actual operating entity, place of registration, and sales regions.',
          },
        ],
      },
      {
        key: 'contact',
        title: { zh: '十八、联系方式', en: '18. Contact' },
        body: [
          {
            zh: '如对本条款、许可证、订单、发票、退款、企业采购或安全事项有疑问，请联系 support@useveil.xyz。',
            en: 'For questions about these terms, licenses, orders, invoices, refunds, enterprise procurement, or security matters, contact support@useveil.xyz.',
          },
        ],
      },
    ],
  },
  privacy: {
    key: 'privacy',
    path: '/privacy',
    eyebrow: { zh: '法务', en: 'Legal' },
    title: { zh: '隐私协议', en: 'Privacy Policy' },
    description: {
      zh: '本政策说明 Veil 官网、软件许可、下载、支持和企业沟通场景下的个人信息处理规则，包括处理目的、处理方式、信息类别、保存期限和用户权利。',
      en: 'This policy explains how personal information is processed across the Veil website, software licensing, downloads, support, and enterprise communications, including purposes, methods, categories, retention, and user rights.',
    },
    updatedAt: '2026-05-24',
    contact: {
      zh: '如需访问、更正、删除个人信息，或对本政策提出问题，请联系 support@useveil.xyz。',
      en: 'For privacy requests, contact support@useveil.xyz.',
    },
    sections: [
      {
        key: 'scope-controller',
        title: { zh: '一、适用范围与处理者', en: '1. Scope and controller' },
        body: [
          {
            zh: '本隐私协议适用于 Veil 官网、软件下载与更新、许可证购买与交付、邮件支持、企业采购和企业部署沟通。你通过 Veil 打开的第三方网站、第三方平台账号、代理服务、支付服务或代码托管服务，不适用本政策，而适用对应第三方的隐私规则。',
            en: 'This Privacy Policy applies to the Veil website, software downloads and updates, license purchase and delivery, email support, enterprise procurement, and enterprise deployment communications. Third-party websites, third-party platform accounts, proxy services, payment services, and code-hosting services that you access through or in relation to Veil are governed by their own privacy policies.',
          },
          {
            zh: '本政策中的“我们”指 Veil 产品及官网的运营方；具体签约主体、开票主体或企业客户处理主体，以订单、发票、合同或双方书面确认为准。隐私事务联系方式为 support@useveil.xyz。',
            en: 'In this policy, “we” refers to the operator of the Veil product and website. The specific contracting, invoicing, or enterprise-processing entity is determined by the applicable order, invoice, contract, or written confirmation. Privacy contact: support@useveil.xyz.',
          },
        ],
      },
      {
        key: 'local-data',
        title: {
          zh: '二、本地数据与我们不收集的信息',
          en: '2. Local data and information we do not collect',
        },
        body: [
          {
            zh: 'Veil 的核心产品形态是本地优先软件。除非你主动提交给我们，Profile 数据、Cookie、本地缓存、浏览历史、主密码、恢复短语、加密密钥、代理账号或密钥、自动化端点、钱包助记词及其他本地敏感数据，不会上传到 Veil 运营方控制的服务器。',
            en: 'Veil is designed as local-first software. Unless you voluntarily submit it to us, profile data, cookies, local cache, browsing history, master passwords, recovery phrases, encryption keys, proxy accounts or credentials, automation endpoints, wallet seed phrases, and other local sensitive data are not uploaded to servers controlled by the Veil operator.',
          },
          {
            zh: '我们无法恢复你的主密码，也无法解密未由你主动提供给我们的本地加密数据。请勿通过邮件、工单、聊天工具或任何非加密渠道向我们发送主密码、恢复短语、Cookie、完整 Profile、代理密钥、钱包凭据或其他高敏感数据。',
            en: 'We cannot recover your master password or decrypt locally encrypted data that you have not voluntarily provided. Do not send master passwords, recovery phrases, cookies, complete profiles, proxy credentials, wallet credentials, or other highly sensitive data through email, tickets, chat, or other non-encrypted channels.',
          },
        ],
      },
      {
        key: 'collected-data',
        title: {
          zh: '三、我们可能处理的个人信息类别',
          en: '3. Categories of personal information we may process',
        },
        body: [
          {
            zh: '在提供官网访问、许可交付、下载更新、客户支持、发票、采购和企业部署服务时，我们可能在必要范围内处理以下信息：',
            en: 'When providing website access, license delivery, downloads, updates, customer support, invoices, procurement, and enterprise deployment services, we may process the following information as necessary:',
          },
        ],
        items: [
          {
            zh: '账号与联系信息：邮箱、姓名或称呼、公司名称、职位、所在国家或地区、沟通记录。',
            en: 'Account and contact information: email address, name or handle, company name, job title, country or region, and communication records.',
          },
          {
            zh: '交易与许可信息：订单编号、购买计划、许可证邮箱、付款状态、退款状态、发票信息、企业合同信息。完整银行卡号、支付账户密码等付款敏感信息由支付服务商处理，我们通常不直接接收。',
            en: 'Transaction and license information: order ID, purchased plan, license email, payment status, refund status, invoice details, and enterprise contract information. Full card numbers, payment-account passwords, and similar sensitive payment data are handled by payment providers and are not usually received directly by us.',
          },
          {
            zh: '服务与技术信息：许可证激活状态、下载记录、版本号、错误描述、你主动提供的日志片段、设备和系统环境说明、企业部署需求。',
            en: 'Service and technical information: license activation status, download records, version number, error descriptions, log excerpts you voluntarily provide, device and system environment descriptions, and enterprise deployment requirements.',
          },
          {
            zh: '网站与安全日志：访问时间、IP 地址、User-Agent、请求路径、来源页面、错误日志、风控或安全事件记录。此类信息主要由托管、CDN、安全或日志服务生成。',
            en: 'Website and security logs: access time, IP address, user agent, request path, referrer, error logs, and risk-control or security-event records. This information is primarily generated by hosting, CDN, security, or logging services.',
          },
        ],
      },
      {
        key: 'purposes',
        title: { zh: '四、处理目的与处理方式', en: '4. Purposes and methods of processing' },
        body: [
          {
            zh: '我们仅在具有明确、合理且必要目的时处理个人信息。处理方式包括收集、存储、使用、核验、分析、传输、提供、删除或依法留存。',
            en: 'We process personal information only for specific, reasonable, and necessary purposes. Processing methods may include collection, storage, use, verification, analysis, transfer, provision, deletion, or legally required retention.',
          },
        ],
        items: [
          {
            zh: '完成购买、许可证交付、激活校验、版本更新、退款、发票和订阅管理。',
            en: 'To complete purchases, license delivery, activation checks, version updates, refunds, invoices, and subscription management.',
          },
          {
            zh: '提供客户支持、故障排查、安全响应、企业部署评估、合同沟通和售后服务。',
            en: 'To provide customer support, troubleshooting, security response, enterprise deployment assessment, contract communication, and after-sales service.',
          },
          {
            zh: '维护官网、下载、许可证和邮件系统的可用性、安全性、防滥用能力和审计记录。',
            en: 'To maintain availability, security, abuse prevention, and audit records for the website, downloads, licensing, and email systems.',
          },
          {
            zh: '遵守适用法律、监管要求、税务、会计、争议处理和权利保护义务。',
            en: 'To comply with applicable legal, regulatory, tax, accounting, dispute-resolution, and rights-protection obligations.',
          },
        ],
      },
      {
        key: 'cookies',
        title: { zh: '五、Cookie 与同类技术', en: '5. Cookies and similar technologies' },
        body: [
          {
            zh: '官网可能使用为页面语言、主题偏好、会话、安全、防滥用或基础统计所必需的 Cookie 或同类技术。若未来使用非必要的分析、广告或跨站追踪技术，我们会在上线前补充说明，并在适用法律要求时提供选择或同意机制。',
            en: 'The website may use cookies or similar technologies necessary for page language, theme preference, sessions, security, abuse prevention, or basic statistics. If we later use non-essential analytics, advertising, or cross-site tracking technologies, we will update this policy and provide choice or consent mechanisms where required by applicable law.',
          },
        ],
      },
      {
        key: 'sharing',
        title: {
          zh: '六、共享、委托处理与第三方服务',
          en: '6. Sharing, processors, and third-party services',
        },
        body: [
          {
            zh: '我们不会出售你的个人信息，也不会将本地 Profile 内容提供给广告网络。为实现本政策所述目的，我们可能向必要的第三方服务商提供有限信息，或由其代为处理信息，包括支付、邮件、官网托管、CDN、安全防护、代码托管、下载分发、客户支持、会计、法务和企业交付服务商。',
            en: 'We do not sell your personal information or provide local profile contents to advertising networks. To achieve the purposes described in this policy, we may provide limited information to necessary third-party service providers or have them process information on our behalf, including payment, email, website hosting, CDN, security, code hosting, download distribution, customer support, accounting, legal, and enterprise-delivery providers.',
          },
          {
            zh: '我们也可能在法律法规、监管要求、司法或行政程序、保护用户或公众安全、处理安全事件、执行条款或维护合法权益所必需时，依法披露相关信息。',
            en: 'We may also disclose relevant information when required by laws, regulations, regulatory requirements, judicial or administrative procedures, protection of users or public safety, security incident response, terms enforcement, or protection of lawful rights and interests.',
          },
        ],
      },
      {
        key: 'cross-border',
        title: { zh: '七、跨境传输', en: '7. Cross-border transfers' },
        body: [
          {
            zh: '由于官网托管、邮件、支付、代码托管、下载分发或企业沟通服务可能部署在不同国家或地区，你的联系信息、交易信息、服务日志或支持信息可能被传输至你所在地以外的地区。我们会在业务必要范围内使用这些服务，并要求服务商按照其安全和隐私承诺处理相关信息。',
            en: 'Because website hosting, email, payment, code hosting, download distribution, or enterprise communication services may be deployed in different countries or regions, your contact information, transaction information, service logs, or support information may be transferred outside your location. We use these services only as necessary for business purposes and require providers to handle relevant information according to their security and privacy commitments.',
          },
        ],
      },
      {
        key: 'retention',
        title: { zh: '八、保存期限', en: '8. Retention' },
        body: [
          {
            zh: '我们仅在实现处理目的所需的最短期限内保存个人信息，但法律法规、税务、会计、审计、争议解决、安全调查或合同履行要求更长期限的除外。许可证、订单、发票和合同记录可能在法定或合理商业期限内保留；支持邮件和诊断材料将在完成支持、争议处理或安全调查后，在合理期限内删除或匿名化。',
            en: 'We retain personal information only for the shortest period necessary to achieve the processing purpose, unless longer retention is required by laws, tax, accounting, audit, dispute resolution, security investigation, or contract performance. License, order, invoice, and contract records may be retained for statutory or reasonable business periods; support emails and diagnostic materials will be deleted or anonymized within a reasonable period after support, dispute resolution, or security investigation is completed.',
          },
        ],
      },
      {
        key: 'security-measures',
        title: { zh: '九、安全措施', en: '9. Security measures' },
        body: [
          {
            zh: '我们采取合理的管理、技术和组织措施保护所处理的信息，包括访问控制、最小权限、必要的加密或传输保护、安全日志、备份、供应商评估和安全事件响应。任何互联网传输或电子存储方式都无法保证绝对安全，因此你也应妥善保护设备、邮箱、许可证、主密码、恢复短语和代理凭据。',
            en: 'We use reasonable administrative, technical, and organizational measures to protect processed information, including access control, least privilege, encryption or transport protection where appropriate, security logging, backups, vendor review, and security incident response. No internet transmission or electronic storage method can be guaranteed absolutely secure, so you should also protect your device, email account, license, master password, recovery phrase, and proxy credentials.',
          },
        ],
      },
      {
        key: 'rights',
        title: { zh: '十、你的权利', en: '10. Your rights' },
        body: [
          {
            zh: '在适用法律允许的范围内，你可以通过 support@useveil.xyz 请求查询、复制、更正、补充、删除个人信息，撤回同意，注销相关联系记录，限制或拒绝特定处理，或要求解释本政策。为保护信息安全，我们可能需要核验你的身份，并可能在法律允许范围内拒绝重复、过度、影响他人权益、违反法定义务或无法核验身份的请求。',
            en: 'To the extent permitted by applicable law, you may contact support@useveil.xyz to request access, copy, correction, supplementation, deletion, consent withdrawal, cancellation of relevant contact records, restriction or objection to certain processing, or explanation of this policy. To protect information security, we may need to verify your identity and may reject requests that are repetitive, excessive, affect others’ rights, violate legal obligations, or cannot be identity-verified where permitted by law.',
          },
        ],
      },
      {
        key: 'minors',
        title: { zh: '十一、未成年人', en: '11. Minors' },
        body: [
          {
            zh: 'Veil 面向具有相应民事行为能力的专业用户和企业用户，不面向未成年人提供。未成年人不应购买、下载或使用 Veil；如我们发现误收未成年人个人信息，会在核实后删除或采取其他必要措施。',
            en: 'Veil is intended for professional and enterprise users with the capacity to enter into relevant transactions. It is not directed to minors. Minors should not purchase, download, or use Veil; if we discover that we have inadvertently received a minor’s personal information, we will delete it or take other necessary measures after verification.',
          },
        ],
      },
      {
        key: 'changes',
        title: { zh: '十二、政策变更', en: '12. Changes to this policy' },
        body: [
          {
            zh: '我们可能因产品功能、服务提供方式、法律法规或第三方服务变化而更新本政策。重大变更会在官网显著位置、页面更新日期或必要时通过邮件提示。更新后的政策自页面载明日期或公告说明的日期起生效。',
            en: 'We may update this policy due to changes in product features, service delivery, laws and regulations, or third-party services. Material changes will be indicated on the website, through the page update date, or by email where necessary. The updated policy becomes effective on the date shown on the page or stated in the notice.',
          },
        ],
      },
    ],
  },
  refund: {
    key: 'refund',
    path: '/refund',
    eyebrow: { zh: '法务', en: 'Legal' },
    title: { zh: '退款政策', en: 'Refund Policy' },
    description: {
      zh: '购买后 7 天内、未激活或仅短暂激活的许可证支持全额退款。',
      en: 'Licenses are eligible for a full refund within 7 days of purchase if not activated or only briefly activated.',
    },
    updatedAt: '2026-05-23',
    contact: {
      zh: '退款请求请联系 support@useveil.xyz。',
      en: 'For refund requests, contact support@useveil.xyz.',
    },
    sections: [
      {
        key: 'eligibility',
        title: { zh: '退款条件', en: 'Eligibility' },
        body: [
          {
            zh: '购买后 7 天内、未激活或仅短暂激活的许可证支持全额退款。这里的短暂激活通常指激活时间不超过 24 小时，且没有明显滥用、批量转售或违反服务条款的行为。',
            en: 'A license is eligible for a full refund within 7 days of purchase if it is not activated or only briefly activated. Brief activation generally means no more than 24 hours of activation without obvious abuse, bulk resale, or violation of the Terms of Service.',
          },
        ],
      },
      {
        key: 'not-refundable',
        title: { zh: '通常不退款的情况', en: 'Usually non-refundable' },
        body: [
          {
            zh: '超过 7 天、激活超过 24 小时、企业定制交付、已完成的大量支持服务、违反条款、滥用退款流程或与非法使用相关的购买，原则上不支持退款。',
            en: 'Purchases are usually non-refundable after 7 days, after more than 24 hours of activation, for custom enterprise delivery, for substantial completed support work, after terms violations, refund-process abuse, or purchases tied to unlawful use.',
          },
        ],
      },
      {
        key: 'request',
        title: { zh: '如何申请', en: 'How to request a refund' },
        body: [
          {
            zh: '请用购买时的邮箱发送邮件到 support@useveil.xyz，附上订单信息、许可证邮箱和简短原因。不要在邮件中发送主密码、恢复短语、Cookie、Profile 或其他敏感数据。',
            en: 'Email support@useveil.xyz from the purchasing email address with order details, license email, and a short reason. Do not send master passwords, recovery phrases, cookies, profiles, or other sensitive data.',
          },
        ],
      },
      {
        key: 'processing',
        title: { zh: '处理方式', en: 'Processing' },
        body: [
          {
            zh: '退款审核通过后，会尽量退回原付款渠道。银行、支付处理方或地区差异可能影响到账时间。',
            en: 'Approved refunds are sent back through the original payment channel when possible. Bank, payment processor, or regional differences may affect arrival time.',
          },
        ],
      },
    ],
  },
};
