export type NavItem = {
  key: string;
  href: string;
  labelKey: string;
};

export const primaryNav: NavItem[] = [
  { key: 'security', href: '/security', labelKey: 'nav.security' },
  { key: 'useCases', href: '/use-cases', labelKey: 'nav.useCases' },
  { key: 'automation', href: '/automation', labelKey: 'nav.automation' },
  { key: 'pricing', href: '/pricing', labelKey: 'nav.pricing' },
  { key: 'compare', href: '/compare', labelKey: 'nav.compare' },
  { key: 'faq', href: '/faq', labelKey: 'nav.faq' },
];

export const footerGroups: { titleKey: string; items: NavItem[] }[] = [
  {
    titleKey: 'footer.groups.product',
    items: [
      { key: 'security', href: '/security', labelKey: 'nav.security' },
      { key: 'useCases', href: '/use-cases', labelKey: 'nav.useCases' },
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
    titleKey: 'footer.groups.company',
    items: [
      { key: 'team', href: '/team', labelKey: 'nav.team' },
      { key: 'faq', href: '/faq', labelKey: 'nav.faq' },
      { key: 'contact', href: 'mailto:support@useveil.xyz', labelKey: 'nav.contact' },
    ],
  },
  {
    titleKey: 'footer.groups.legal',
    items: [
      { key: 'terms', href: '/terms', labelKey: 'nav.terms' },
      { key: 'privacy', href: '/privacy', labelKey: 'nav.privacy' },
      { key: 'refund', href: '/refund', labelKey: 'nav.refund' },
    ],
  },
];
