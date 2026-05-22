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
