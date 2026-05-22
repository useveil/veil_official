import { ArrowDownToLine } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { primaryNav } from '@/content/nav';
import { SITE } from '@/content/constants';
import { LanguageSwitch } from './LanguageSwitch';
import { Logo } from './Logo';
import { MobileNav } from './MobileNav';
import { ThemeToggle } from './ThemeToggle';
import { cn } from '@/lib/utils';

export function Header() {
  const t = useTranslations();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-6">
        <div className="flex items-center gap-8">
          <Logo />
          <nav aria-label="主导航" className="hidden md:flex items-center gap-6">
            {primaryNav.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="text-sm font-medium text-foreground-muted transition-colors hover:text-foreground"
              >
                {t(item.labelKey as 'nav.security')}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-1">
          <div className="hidden md:flex items-center gap-1">
            <ThemeToggle />
            <LanguageSwitch />
          </div>
          <a
            href={SITE.releaseUrl}
            target="_blank"
            rel="noreferrer"
            className={cn(buttonVariants({ size: 'sm' }), 'hidden md:inline-flex')}
          >
            <ArrowDownToLine className="h-4 w-4" />
            {t('common.download')}
          </a>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
