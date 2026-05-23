import { SITE } from '@/content/constants';
import { footerGroups } from '@/content/nav';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import type { Route } from 'next';
import { Logo } from './Logo';

export function Footer() {
  const t = useTranslations();

  return (
    <footer className="border-t border-border bg-surface mt-32">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-foreground-muted">
              {t('footer.tagline')}
            </p>
            <p className="mt-3 text-xs text-foreground-subtle font-mono">{SITE.licenseLabel}</p>
          </div>
          {footerGroups.map((group) => (
            <div key={group.titleKey}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground-subtle">
                {t(group.titleKey as 'footer.groups.product')}
              </h3>
              <ul className="mt-4 flex flex-col gap-2">
                {group.items.map((item) => (
                  <li key={item.key}>
                    {item.href.startsWith('http') || item.href.startsWith('mailto:') ? (
                      <a
                        href={item.href}
                        {...(item.href.startsWith('http')
                          ? { target: '_blank', rel: 'noreferrer' }
                          : {})}
                        className="text-sm text-foreground-muted hover:text-foreground transition-colors"
                      >
                        {t(item.labelKey as 'nav.security')}
                      </a>
                    ) : (
                      <Link
                        href={item.href as Route}
                        className="text-sm text-foreground-muted hover:text-foreground transition-colors"
                      >
                        {t(item.labelKey as 'nav.security')}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 border-t border-border pt-6 flex items-center justify-between text-xs text-foreground-subtle">
          <p>© {new Date().getFullYear()} Veil</p>
          <p className="font-mono">v{SITE.currentVersion}</p>
        </div>
      </div>
    </footer>
  );
}
