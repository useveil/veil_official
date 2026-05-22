import type { MDXComponents } from 'mdx/types';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="mb-6 text-3xl font-bold tracking-tight md:text-4xl">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="mt-12 mb-4 text-2xl font-semibold tracking-tight md:text-3xl">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 mb-3 text-xl font-semibold tracking-tight">{children}</h3>
    ),
    p: ({ children }) => (
      <p className="my-4 text-base leading-relaxed text-foreground-muted">{children}</p>
    ),
    ul: ({ children }) => <ul className="my-4 list-disc space-y-2 pl-6">{children}</ul>,
    ol: ({ children }) => <ol className="my-4 list-decimal space-y-2 pl-6">{children}</ol>,
    li: ({ children }) => <li className="text-base text-foreground-muted">{children}</li>,
    code: ({ children }) => (
      <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-sm">{children}</code>
    ),
    pre: ({ children }) => (
      <pre className="my-6 overflow-x-auto rounded-lg border border-border bg-surface-elevated p-5 text-sm">
        {children}
      </pre>
    ),
    a: ({ href, children }) => (
      <a
        href={href}
        className="font-medium text-teal-600 underline-offset-2 hover:underline dark:text-teal-400"
      >
        {children}
      </a>
    ),
    ...components,
  };
}
