import { getLocalizedText } from '@/content/features';
import { type LegalDocumentKey, legalDocuments } from '@/content/legal';
import type { Locale } from '@/i18n/routing';
import { useLocale } from 'next-intl';

export function LegalDocument({ documentKey }: { documentKey: LegalDocumentKey }) {
  const locale = useLocale() as Locale;
  const document = legalDocuments[documentKey];
  const metaLabels =
    locale === 'zh'
      ? { updatedAt: '更新日期', contact: '联系邮箱' }
      : { updatedAt: 'Last updated', contact: 'Contact' };

  return (
    <main className="mx-auto max-w-4xl px-6 py-24 md:py-32">
      <section>
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400">
          {getLocalizedText(document.eyebrow, locale)}
        </p>
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          {getLocalizedText(document.title, locale)}
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-relaxed text-foreground-muted md:text-lg">
          {getLocalizedText(document.description, locale)}
        </p>
        <dl className="mt-8 grid gap-4 border-y border-border py-6 text-sm text-foreground-muted sm:grid-cols-2">
          <div>
            <dt className="font-medium text-foreground">{metaLabels.updatedAt}</dt>
            <dd className="mt-1 font-mono text-xs text-foreground-subtle">{document.updatedAt}</dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">{metaLabels.contact}</dt>
            <dd className="mt-1">
              <a
                className="text-teal-700 hover:text-teal-600 dark:text-teal-300"
                href="mailto:support@useveil.xyz"
              >
                support@useveil.xyz
              </a>
            </dd>
          </div>
        </dl>
      </section>

      <div className="mt-14 space-y-12">
        {document.sections.map((section) => (
          <section key={section.key} className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">
              {getLocalizedText(section.title, locale)}
            </h2>
            <div className="space-y-4 text-base leading-8 text-foreground-muted">
              {section.body.map((paragraph) => (
                <p key={getLocalizedText(paragraph, locale)}>
                  {getLocalizedText(paragraph, locale)}
                </p>
              ))}
              {section.items && (
                <ul className="list-disc space-y-3 pl-6">
                  {section.items.map((item) => (
                    <li key={getLocalizedText(item, locale)}>{getLocalizedText(item, locale)}</li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        ))}
      </div>

      <p className="mt-16 border-t border-border pt-6 text-sm leading-relaxed text-foreground-muted">
        {getLocalizedText(document.contact, locale)}
      </p>
    </main>
  );
}
