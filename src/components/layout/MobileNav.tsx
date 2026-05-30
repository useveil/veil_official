'use client';

import { Button } from '@/components/ui/button';
import { buttonVariants } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { primaryNav } from '@/content/nav';
import { cn } from '@/lib/utils';
import { ArrowDownToLine, Menu, Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useState } from 'react';
import { LanguageSwitch } from './LanguageSwitch';
import { ThemeToggle } from './ThemeToggle';

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
              className="rounded-md px-3 py-3 text-base font-semibold text-foreground-muted transition-colors hover:bg-muted hover:text-foreground"
            >
              {t(item.labelKey as 'nav.security')}
            </Link>
          ))}
        </nav>
        <div className="mt-6 flex items-center gap-2 border-t border-border pt-6">
          <ThemeToggle />
          <LanguageSwitch />
        </div>
        <Link
          href="/pricing"
          onClick={() => setOpen(false)}
          className={cn(buttonVariants(), 'mt-4 w-full')}
        >
          <Sparkles className="h-4 w-4" />
          {t('common.buy')}
        </Link>
        <Link
          href="/download"
          onClick={() => setOpen(false)}
          className={cn(buttonVariants({ variant: 'outline' }), 'mt-3 w-full')}
        >
          <ArrowDownToLine className="h-4 w-4" />
          {t('common.download')}
        </Link>
      </SheetContent>
    </Sheet>
  );
}
