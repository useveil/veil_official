import { Button } from '@/components/ui/button';
import { SITE } from '@/content/constants';
import { GitBranch, Github } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function OpenSourceCallout() {
  const t = useTranslations('home.openSource');

  return (
    <section className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400">
              {t('eyebrow')}
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">{t('title')}</h2>
            <p className="mt-4 text-base text-foreground-muted leading-relaxed">{t('body')}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button render={<a href={SITE.repoUrl} target="_blank" rel="noreferrer" />}>
                <Github className="h-4 w-4" />
                {t('repoCta')}
              </Button>
              <Button
                render={
                  <a
                    href={`${SITE.repoUrl}/blob/main/CONTRIBUTING.md`}
                    target="_blank"
                    rel="noreferrer"
                  />
                }
                variant="outline"
              >
                <GitBranch className="h-4 w-4" />
                {t('contributeCta')}
              </Button>
            </div>
          </div>
          <div className="rounded-lg border border-border bg-background p-6 font-mono text-sm">
            <pre className="overflow-x-auto">
              <code className="text-foreground-muted">
                <span className="text-teal-600 dark:text-teal-400">$</span> git clone {SITE.repoUrl}
                {'\n'}
                <span className="text-teal-600 dark:text-teal-400">$</span> cd veil_official
                {'\n'}
                <span className="text-teal-600 dark:text-teal-400">$</span> pnpm install && pnpm dev
                {'\n'}
                {'\n'}
                <span className="text-foreground-subtle">{`# License: ${SITE.license}`}</span>
                {'\n'}
                <span className="text-foreground-subtle">{'# Tests:   560+ automated'}</span>
              </code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
