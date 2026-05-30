import { SITE } from '@/content/constants';
import { footerGroups } from '@/content/nav';
import type { Route } from 'next';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Logo } from './Logo';

export function Footer() {
  const t = useTranslations();

  return (
    <footer className="mt-28 border-t border-border/70 bg-surface/80">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_repeat(4,minmax(0,1fr))]">
          <div>
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-foreground-muted">
              {t('footer.tagline')}
            </p>
            <p className="mt-5 inline-flex rounded-full border border-border bg-background px-3 py-1 text-xs font-semibold text-foreground-subtle">
              {SITE.licenseLabel}
            </p>
          </div>
          {footerGroups.map((group) => (
            <div key={group.titleKey}>
              <h3 className="text-xs font-bold uppercase text-foreground">
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
                        className="text-sm font-medium text-foreground-muted transition-colors hover:text-foreground"
                      >
                        {t(item.labelKey as 'nav.security')}
                      </a>
                    ) : (
                      <Link
                        href={item.href as Route}
                        className="text-sm font-medium text-foreground-muted transition-colors hover:text-foreground"
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
        <div className="mt-12 flex items-center justify-between border-t border-border pt-6 text-xs text-foreground-subtle">
          <p>© {new Date().getFullYear()} Veil</p>
          <p className="font-mono">v{SITE.currentVersion}</p>
        </div>
      </div>
    </footer>
  );
}
