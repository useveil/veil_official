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
