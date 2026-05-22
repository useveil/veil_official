'use client';

import { Menu, ArrowDownToLine } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { LanguageSwitch } from './LanguageSwitch';
import { ThemeToggle } from './ThemeToggle';
import { primaryNav } from '@/content/nav';
import { SITE } from '@/content/constants';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function MobileNav() {
  const t = useTranslations();
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button variant="ghost" size="icon" className="md:hidden" aria-label="打开菜单">
            <Menu className="h-5 w-5" />
          </Button>
        }
      />
      <SheetContent side="right" className="w-72">
        <SheetTitle className="sr-only">导航菜单</SheetTitle>
        <nav className="mt-8 flex flex-col gap-1">
          {primaryNav.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              onClick={() => setOpen(false)}
              className="px-3 py-3 text-base font-medium hover:bg-ink-50 rounded-md transition-colors"
            >
              {t(item.labelKey as 'nav.security')}
            </Link>
          ))}
        </nav>
        <div className="mt-6 flex items-center gap-2 border-t border-border pt-6">
          <ThemeToggle />
          <LanguageSwitch />
        </div>
        <a
          href={SITE.releaseUrl}
          target="_blank"
          rel="noreferrer"
          className={cn(buttonVariants(), 'mt-4 w-full')}
        >
          <ArrowDownToLine className="h-4 w-4" />
          {t('common.download')}
        </a>
      </SheetContent>
    </Sheet>
  );
}
