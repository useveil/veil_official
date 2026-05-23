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
  { key: 'pricing', href: '/pricing', labelKey: 'nav.pricing' },
  { key: 'changelog', href: '/changelog', labelKey: 'nav.changelog' },
];

export const footerGroups: { titleKey: string; items: NavItem[] }[] = [
  {
    titleKey: 'footer.groups.product',
    items: [
      { key: 'security', href: '/security', labelKey: 'nav.security' },
      { key: 'useCases', href: '/use-cases', labelKey: 'nav.useCases' },
      { key: 'compare', href: '/compare', labelKey: 'nav.compare' },
      { key: 'pricing', href: '/pricing', labelKey: 'nav.pricing' },
      { key: 'download', href: '/download', labelKey: 'nav.download' },
    ],
  },
  {
    titleKey: 'footer.groups.developers',
    items: [
      { key: 'automation', href: '/automation', labelKey: 'nav.automation' },
      { key: 'changelog', href: '/changelog', labelKey: 'nav.changelog' },
    ],
  },
  {
    titleKey: 'footer.groups.community',
    items: [
      { key: 'faq', href: '/faq', labelKey: 'nav.faq' },
      { key: 'contact', href: 'mailto:hi@useveil.xyz', labelKey: 'nav.contact' },
    ],
  },
];
