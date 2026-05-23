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
      zh: '桌面端、Profile、代理、指纹引擎、运行审计与自动化 API 已形成闭环。',
      en: 'Desktop app, profiles, proxy, fingerprint engine, runtime audit log, and automation API form a complete loop.',
    },
  },
  {
    phase: 'Phase 2',
    title: { zh: '企业自托管 · 团队协作', en: 'Enterprise self-hosting · team collaboration' },
    status: { zh: '计划中', en: 'Planned' },
    statusVariant: 'planned',
    body: {
      zh: '私有部署、SSO、组级权限、批量运营与审计交付。仍然不留存任何客户数据，所有运行时在你自己的基础设施里。',
      en: 'Private deployment, SSO, group permissions, batch operations and audit handoff. Still zero customer-data retention — every runtime piece lives on your own infrastructure.',
    },
  },
  {
    phase: 'Phase 3',
    title: { zh: '桌面端源码开放', en: 'Desktop source release' },
    status: { zh: '未来', en: 'Future' },
    statusVariant: 'planned',
    body: {
      zh: '桌面端核心源码将在产品达到稳定里程碑时公开，便于独立审计。指纹引擎、补丁分发与企业版自动化等模块仍保留为闭源商业部分。',
      en: 'The desktop core source will be made public once the product hits a stable milestone, enabling independent audit. The fingerprint engine, patch distribution, and enterprise automation will remain closed commercial components.',
    },
  },
];
