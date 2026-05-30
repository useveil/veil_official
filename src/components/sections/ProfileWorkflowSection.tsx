import { Reveal } from '@/components/motion/Reveal';
import { getLocalizedText } from '@/content/features';
import { fingerprintFactors, workflowSteps } from '@/content/homepage';
import type { Locale } from '@/i18n/routing';
import { CheckCircle2 } from 'lucide-react';
import { useLocale } from 'next-intl';

export function ProfileWorkflowSection() {
  const locale = useLocale() as Locale;

  return (
    <section className="overflow-hidden bg-surface">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:py-32">
        <Reveal>
          <h2 className="text-3xl font-black leading-tight md:text-5xl">
            {locale === 'zh'
              ? '在一台设备上管理多个账号？'
              : 'Managing many accounts on one device?'}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-foreground-muted md:text-lg">
            {locale === 'zh'
              ? 'Veil 把账号环境做成可复用的 Profile 资产：创建时锁定画像，运行时隔离上下文，需要自动化时再把 Profile 交给脚本。'
              : 'Veil turns account environments into reusable profile assets: lock identity at creation, isolate context at runtime, then hand the profile to automation when needed.'}
          </p>
          <ol className="mt-8 grid gap-4">
            {workflowSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <li key={step.key} className="flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-background text-teal-600 shadow-sm">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="text-xs font-black uppercase text-foreground-subtle">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <h3 className="mt-1 text-lg font-black">
                      {getLocalizedText(step.title, locale)}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-foreground-muted">
                      {getLocalizedText(step.body, locale)}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="rounded-lg border border-border bg-background p-5 shadow-lg">
            <div className="grid gap-4 md:grid-cols-[1fr_1.1fr]">
              <div className="rounded-lg bg-ink p-5 text-ink-50 dark:bg-ink-900">
                <div className="text-sm font-bold text-ink-300">Profile blueprint</div>
                <div className="mt-4 grid gap-3">
                  {fingerprintFactors.map((factor) => (
                    <div
                      key={factor.key}
                      className="rounded-md border border-white/10 bg-white/5 p-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs text-ink-300">{factor.label}</span>
                        <span className="text-xs font-bold text-teal-300">
                          {getLocalizedText(factor.status, locale)}
                        </span>
                      </div>
                      <div className="mt-3 h-2 rounded-full bg-white/10">
                        <div className="h-full w-[88%] rounded-full bg-teal-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid content-between gap-4">
                <div className="rounded-lg border border-border bg-surface p-5">
                  <h3 className="font-black">
                    {locale === 'zh'
                      ? '同一设备，不同身份边界'
                      : 'One device, separate identity boundaries'}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                    {locale === 'zh'
                      ? '缓存、Cookie、本地存储、代理和浏览器指纹按 Profile 切分，降低跨账号串联。'
                      : 'Cache, cookies, local storage, proxy, and browser fingerprints are split by profile.'}
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-surface p-5">
                  <h3 className="font-black">
                    {locale === 'zh'
                      ? '脚本接入，不污染人工会话'
                      : 'Scripts connect without polluting human sessions'}
                  </h3>
                  <ul className="mt-3 grid gap-2 text-sm font-semibold text-foreground-muted">
                    {['HTTP API', 'CDP WebSocket', 'Playwright', 'Puppeteer'].map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-teal-600" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
