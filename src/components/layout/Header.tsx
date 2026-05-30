import { buttonVariants } from '@/components/ui/button';
import { primaryNav } from '@/content/nav';
import { cn } from '@/lib/utils';
import { ArrowDownToLine, Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { LanguageSwitch } from './LanguageSwitch';
import { Logo } from './Logo';
import { MobileNav } from './MobileNav';
import { ThemeToggle } from './ThemeToggle';

export function Header() {
  const t = useTranslations();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/70 bg-background/88 shadow-sm shadow-ink-900/5 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-6 px-5 sm:px-6">
        <div className="flex items-center gap-8">
          <Logo />
          <nav aria-label="主导航" className="hidden items-center gap-5 xl:gap-7 lg:flex">
            {primaryNav.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="text-sm font-semibold text-foreground-muted transition-colors hover:text-foreground"
              >
                {t(item.labelKey as 'nav.security')}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-1 md:flex">
            <ThemeToggle />
            <LanguageSwitch />
          </div>
          <Link
            href="/download"
            className="hidden items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold text-foreground-muted transition-colors hover:bg-muted hover:text-foreground md:inline-flex"
          >
            <ArrowDownToLine className="h-4 w-4" />
            {t('common.download')}
          </Link>
          <Link
            href="/pricing"
            className={cn(buttonVariants({ size: 'sm' }), 'hidden md:inline-flex')}
          >
            <Sparkles className="h-4 w-4" />
            {t('common.buy')}
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
