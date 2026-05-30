import { Reveal } from '@/components/motion/Reveal';
import { Button } from '@/components/ui/button';
import { getLocalizedText } from '@/content/features';
import { restrictionPlatforms, riskCards } from '@/content/homepage';
import type { Locale } from '@/i18n/routing';
import { ArrowRight, Ban, CheckCircle2, Fingerprint, ShieldAlert } from 'lucide-react';
import { useLocale } from 'next-intl';

export function AccountRiskSection() {
  const locale = useLocale() as Locale;

  return (
    <section className="bg-background">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:py-28">
        <Reveal>
          <h2 className="text-3xl font-black leading-tight md:text-5xl">
            {locale === 'zh' ? '账号为什么会被平台关联？' : 'Why platforms link accounts'}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-foreground-muted md:text-lg">
            {locale === 'zh'
              ? '平台会同时观察 IP、位置、系统、Cookie、User-Agent、Canvas、WebGL、字体、代理与行为节奏。只隔离其中一项不够，Profile 必须形成长期一致的完整画像。'
              : 'Platforms observe IP, location, OS, cookies, user agent, Canvas, WebGL, fonts, proxies, and behavior cadence together. Isolating one signal is not enough; each profile needs a long-lived coherent identity.'}
          </p>
          <div className="mt-7 flex flex-wrap gap-2">
            {restrictionPlatforms.map((platform) => (
              <span
                key={platform}
                className="rounded-full border border-border bg-surface px-3 py-1.5 text-sm font-bold text-foreground-muted"
              >
                {platform}
              </span>
            ))}
          </div>
          <Button render={<a href="/use-cases" />} className="mt-9" variant="outline">
            {locale === 'zh' ? '查看解决方案' : 'View solutions'}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="relative">
            <div className="grid gap-4">
              {riskCards.map((card, index) => (
                <div
                  key={card.key}
                  className="relative overflow-hidden rounded-lg border border-border bg-surface-elevated p-5 shadow-md"
                >
                  <div className="absolute top-0 right-0 h-20 w-20 bg-[radial-gradient(circle,rgba(255,108,108,0.20),transparent_62%)]" />
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-[#fff1f1] text-[#e5484d] dark:bg-[#e5484d]/10">
                      {index === 0 ? (
                        <Ban className="h-6 w-6" />
                      ) : (
                        <ShieldAlert className="h-6 w-6" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-black">{getLocalizedText(card.label, locale)}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-foreground-muted">
                        {getLocalizedText(card.detail, locale)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-lg border border-teal-200 bg-teal-50 p-5 text-teal-900 shadow-md dark:border-teal-400/20 dark:bg-teal-500/10 dark:text-teal-100">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-md bg-background text-teal-600">
                  <Fingerprint className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-black">
                    {locale === 'zh'
                      ? 'Veil 的答案：完整 Profile，而不是单点伪装'
                      : 'Veil answer: complete profiles, not one-off masking'}
                  </h3>
                  <p className="mt-1 text-sm font-semibold opacity-80">
                    {locale === 'zh'
                      ? '指纹、代理、存储、扩展、自动化会话一起被隔离和审计。'
                      : 'Fingerprint, proxy, storage, extensions, and automation sessions are isolated and audited together.'}
                  </p>
                </div>
                <CheckCircle2 className="ml-auto hidden h-6 w-6 shrink-0 sm:block" />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
