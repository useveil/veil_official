import type { LocalizedText } from './features';

export type Platform = {
  key: 'macos' | 'windows' | 'linux';
  label: string;
  icon: string;
  filename: LocalizedText;
  archs: string[];
  url: string;
  sha256: string;
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
