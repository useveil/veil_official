import Link from 'next/link';
import { ArrowLeft, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SITE } from '@/content/constants';

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-2xl flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-sm font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400">
        404
      </p>
      <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">页面找不到了</h1>
      <p className="mt-4 text-base text-foreground-muted">
        我们记录了访问，但没找到你想找的内容。可能是链接已变更，或者这个页面还没生出来。
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Button render={<Link href="/" />}>
          <ArrowLeft className="h-4 w-4" />
          返回首页
        </Button>
        <Button variant="outline" render={<a href={`${SITE.repoUrl}/issues`} target="_blank" rel="noreferrer" />}>
          <Github className="h-4 w-4" />
          报告问题
        </Button>
      </div>
    </main>
  );
}
