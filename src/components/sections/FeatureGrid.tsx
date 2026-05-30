import { Button } from '@/components/ui/button';
import { getLocalizedText } from '@/content/features';
import { showcaseFeatures } from '@/content/homepage';
import type { Locale } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import { ArrowRight, CheckCircle2, Circle, ShieldCheck } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

export type FeatureGridProps = {
  variant?: 'all' | 'highlight';
};

const mockRows = [
  ['FB-Brand-01', 'US Residential', '98%'],
  ['AMZ-Store-07', 'DE Static ISP', '96%'],
  ['Web3-Wallet-12', 'SG Dedicated', '99%'],
];

const mockFactors = ['Canvas', 'WebGL', 'Audio', 'Fonts'];

function FeatureMockup({ featureKey }: { featureKey: string }) {
  if (featureKey === 'fingerprint') {
    return (
      <div className="relative mx-auto w-full max-w-sm">
        <div className="absolute -top-3 left-6 h-44 w-[78%] rounded-lg bg-[linear-gradient(135deg,#c6d2ff,#f0b7ff)] opacity-80" />
        <div className="relative rounded-lg border border-border bg-white p-4 shadow-lg dark:bg-surface-elevated">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-black">Fingerprint health</p>
              <p className="text-xs text-foreground-muted">Seed locked · 6 signals stable</p>
            </div>
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-black text-emerald-700">
              99%
            </span>
          </div>
          <div className="grid gap-2">
            {[
              ['Canvas', 'stable', 'w-[92%]'],
              ['WebGL', 'stable', 'w-[88%]'],
              ['Audio', 'stable', 'w-[84%]'],
              ['Timezone', 'matched', 'w-[96%]'],
              ['Fonts', 'isolated', 'w-[78%]'],
            ].map(([name, status, width]) => (
              <div key={name} className="rounded-md border border-border bg-surface px-3 py-2">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-black">{name}</span>
                  <span className="font-bold text-teal-600">{status}</span>
                </div>
                <div className="mt-2 h-1.5 rounded-full bg-teal-100">
                  <div className={cn('h-1.5 rounded-full bg-teal-500', width)} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-md border border-border bg-surface p-3">
            <p className="text-[11px] font-black">Profile seed</p>
            <p className="mt-1 font-mono text-[10px] text-foreground-muted">
              vk_8f4a... locked across sessions
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (featureKey === 'automation') {
    return (
      <div className="relative mx-auto w-full max-w-sm">
        <div className="absolute -top-3 left-6 h-36 w-[84%] rounded-lg bg-[linear-gradient(135deg,#c6d2ff,#f0b7ff)] opacity-80" />
        <div className="relative rounded-lg border border-border bg-white p-4 shadow-lg dark:bg-surface-elevated">
          <div className="mb-4 flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
            <span className="ml-auto rounded-full bg-teal-50 px-2 py-1 text-[10px] font-black text-teal-700">
              CDP connected
            </span>
          </div>
          <div className="grid gap-3 md:grid-cols-[0.75fr_1fr]">
            <div className="rounded-md border border-border bg-surface p-3">
              <p className="text-[11px] font-black text-foreground">Profile queue</p>
              <div className="mt-3 space-y-2">
                {['FB-Brand-01', 'AMZ-Store-07', 'Shop-SEA-03'].map((item) => (
                  <div key={item} className="rounded-md bg-white px-2 py-2 text-[10px] shadow-sm">
                    <CheckCircle2 className="mr-1 inline h-3 w-3 text-teal-600" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-md border border-border bg-surface p-3">
              <p className="text-[11px] font-black text-foreground">Automation run</p>
              <div className="mt-3 rounded-md bg-white p-3 font-mono text-[10px] text-foreground-muted shadow-sm">
                POST /profiles/start
                <br />
                ws://127.0.0.1:7733/cdp
              </div>
              <div className="mt-3 h-2 rounded-full bg-teal-100">
                <div className="h-2 w-3/4 rounded-full bg-teal-500" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (featureKey === 'encryption') {
    return (
      <div className="relative mx-auto w-full max-w-sm">
        <div className="absolute -top-3 left-6 h-40 w-[78%] rounded-lg bg-[linear-gradient(135deg,#c6d2ff,#f0b7ff)] opacity-80" />
        <div className="relative rounded-lg border border-border bg-white p-4 shadow-lg dark:bg-surface-elevated">
          <div className="grid gap-3">
            <div className="rounded-md border border-border bg-surface p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-black">Local vault</p>
                  <p className="text-xs text-foreground-muted">SQLCipher enabled</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {['Master key', 'API key', 'Cookies', 'Audit log'].map((item) => (
                <div key={item} className="rounded-md border border-border bg-surface px-3 py-3">
                  <p className="text-[11px] font-black">{item}</p>
                  <div className="mt-2 h-1.5 rounded-full bg-teal-100">
                    <div className="h-1.5 w-4/5 rounded-full bg-teal-500" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative mx-auto w-full max-w-sm">
      <div className="absolute -top-3 left-6 h-44 w-[78%] rounded-lg bg-[linear-gradient(135deg,#c6d2ff,#f0b7ff)] opacity-80" />
      <div className="relative overflow-hidden rounded-lg border border-border bg-white shadow-lg dark:bg-surface-elevated">
        <div className="flex items-center gap-2 border-border border-b bg-surface px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
          <span className="ml-auto rounded-full bg-white px-3 py-1 text-[10px] font-black text-teal-700">
            Isolated
          </span>
        </div>
        <div className="grid grid-cols-[0.76fr_1.24fr]">
          <aside className="border-border border-r bg-surface p-4">
            <div className="rounded-md bg-teal-500 px-3 py-2 text-xs font-black text-white">
              New profile
            </div>
            <div className="mt-4 space-y-2 text-[11px] font-bold text-foreground-muted">
              {['Environment', 'Proxy health', 'Automation'].map((item) => (
                <div key={item} className="rounded-md bg-white px-3 py-2">
                  {item}
                </div>
              ))}
            </div>
          </aside>
          <div className="p-4">
            <p className="text-sm font-black">Profile isolation</p>
            <div className="mt-3 space-y-2">
              {mockRows.map(([name, proxy, score]) => (
                <div
                  key={name}
                  className="grid grid-cols-[1fr_auto] items-center gap-3 rounded-md border border-border bg-surface px-3 py-2"
                >
                  <div>
                    <p className="text-[11px] font-black">{name}</p>
                    <p className="text-[10px] text-foreground-muted">{proxy}</p>
                  </div>
                  <span className="text-xs font-black text-teal-600">{score}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {mockFactors.map((factor) => (
                <div key={factor} className="rounded-md bg-surface px-2 py-2 text-[10px]">
                  <Circle className="mr-1 inline h-2 w-2 fill-teal-500 text-teal-500" />
                  {factor}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FeatureGrid({ variant = 'all' }: FeatureGridProps) {
  const t = useTranslations('home.features');
  const common = useTranslations('common');
  const locale = useLocale() as Locale;
  const items = variant === 'highlight' ? showcaseFeatures.slice(0, 4) : showcaseFeatures;

  return (
    <section id="features" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-24 md:py-32">
      <h2 className="mx-auto max-w-4xl text-center text-3xl font-black tracking-normal md:text-5xl">
        {t('title')}
      </h2>

      <div className="mt-16 space-y-24 md:mt-20 md:space-y-28">
        {items.map((feature, index) => {
          const isReversed = index % 2 === 1;

          return (
            <article
              key={feature.key}
              className={cn(
                'grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16',
                isReversed && 'lg:grid-cols-[0.85fr_1.15fr]',
              )}
            >
              <div className={cn(isReversed && 'lg:order-2')}>
                <h3 className="text-2xl font-black md:text-4xl">
                  {getLocalizedText(feature.title, locale)}
                </h3>
                <p className="mt-5 max-w-3xl text-base text-foreground-muted leading-relaxed md:text-lg">
                  {getLocalizedText(feature.body, locale)}
                </p>
                <Button
                  render={<a href="/download" />}
                  variant="outline"
                  size="lg"
                  className="mt-9 min-w-44 rounded-full border-teal-500 text-teal-600 hover:bg-teal-50"
                >
                  {common('download')}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
              <div className={cn('min-w-0', isReversed && 'lg:order-1')}>
                <FeatureMockup featureKey={feature.key} />
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
