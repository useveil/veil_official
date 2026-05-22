import { cn } from '@/lib/utils';

export type CodeSnippetProps = {
  code: string;
  language?: string;
  filename?: string;
  className?: string;
};

export function CodeSnippet({ code, language, filename, className }: CodeSnippetProps) {
  return (
    <figure
      className={cn(
        'overflow-hidden rounded-lg border border-border bg-ink dark:bg-surface-elevated',
        className,
      )}
    >
      {(language || filename) && (
        <figcaption className="flex items-center justify-between border-b border-border/40 bg-ink-900/60 px-4 py-2 text-xs font-mono">
          <span className="text-ink-300">{filename ?? language}</span>
          {language && filename && <span className="text-ink-500">{language}</span>}
        </figcaption>
      )}
      <pre className="overflow-x-auto p-5 text-sm leading-relaxed text-ink-100 dark:text-foreground">
        <code className="font-mono">{code}</code>
      </pre>
    </figure>
  );
}
