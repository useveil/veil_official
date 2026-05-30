import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowLeft, Mail } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-2xl flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-sm font-semibold uppercase text-teal-600 dark:text-teal-400">
        404
      </p>
      <h1 className="mt-4 text-4xl font-bold md:text-5xl">页面找不到了</h1>
      <p className="mt-4 text-base text-foreground-muted">
        我们记录了访问，但没找到你想找的内容。可能是链接已变更，或者这个页面还没生出来。
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <a href="/" className={cn(buttonVariants())}>
          <ArrowLeft className="h-4 w-4" />
          返回首页
        </a>
        <a href="mailto:support@useveil.xyz" className={cn(buttonVariants({ variant: 'outline' }))}>
          <Mail className="h-4 w-4" />
          联系我们
        </a>
      </div>
    </main>
  );
}
