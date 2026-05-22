'use client';

import { Monitor, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const order = ['system', 'light', 'dark'] as const;
type ThemeKey = (typeof order)[number];

const icons: Record<ThemeKey, React.ComponentType<{ className?: string }>> = {
  system: Monitor,
  light: Sun,
  dark: Moon,
};

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <Button variant="ghost" size="icon" className={className} aria-label="切换主题" />;
  }

  const current = (theme as ThemeKey) ?? 'system';
  const Icon = icons[current];

  function cycle() {
    const next = order[(order.indexOf(current) + 1) % order.length];
    setTheme(next);
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={cycle}
      aria-label={`切换主题（当前 ${current}）`}
      className={cn('relative', className)}
    >
      <Icon className="h-4 w-4" />
    </Button>
  );
}
