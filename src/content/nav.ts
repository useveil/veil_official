export type NavItem = {
  key: string;
  href: string;
  labelKey: string;
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
