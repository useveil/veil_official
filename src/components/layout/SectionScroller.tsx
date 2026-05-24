'use client';

import { useEffect } from 'react';

type TrackedSection = {
  id: string;
  path: string;
};

const allowedSections = new Set([
  'security',
  'use-cases',
  'automation',
  'compare',
  'use-case-multi-account',
  'use-case-web3',
  'use-case-ecommerce',
  'use-case-automation',
]);

const localeSegments = new Set(['zh', 'en', 'ja', 'ko']);

function getLocalizedPath(path: string) {
  const [firstSegment] = window.location.pathname.split('/').filter(Boolean);
  const localePrefix = firstSegment && localeSegments.has(firstSegment) ? `/${firstSegment}` : '';
  return `${localePrefix}${path === '/' ? '' : path}` || '/';
}

function replacePath(path: string) {
  const nextPath = getLocalizedPath(path);
  if (window.location.pathname === nextPath && !window.location.search && !window.location.hash)
    return;
  window.history.replaceState(window.history.state, '', nextPath);
}

function getActivePath(trackedSections: TrackedSection[], defaultPath?: string) {
  const anchorY = Math.min(Math.max(window.innerHeight * 0.6, 240), 480);
  const currentY = window.scrollY + anchorY;
  let activePath: string | undefined;
  let hasMeasuredSection = false;

  for (const item of trackedSections) {
    const element = document.getElementById(item.id);
    if (!element) continue;

    hasMeasuredSection = true;
    if (element.offsetTop <= currentY) {
      activePath = item.path;
    } else {
      break;
    }
  }

  if (activePath) return activePath;
  return hasMeasuredSection ? defaultPath : undefined;
}

export function SectionScroller({
  section,
  trackedSections = [],
  defaultPath,
}: {
  section?: string;
  trackedSections?: TrackedSection[];
  defaultPath?: string;
}) {
  useEffect(() => {
    if (!section || !allowedSections.has(section)) return;

    const initialPath = trackedSections.find((item) => item.id === section)?.path;
    if (initialPath) replacePath(initialPath);

    const scrollToSection = () => {
      document.getElementById(section)?.scrollIntoView({ block: 'start' });
    };
    const frame = window.requestAnimationFrame(scrollToSection);
    const timeouts = [120, 350, 750, 1150].map((delay) =>
      window.setTimeout(scrollToSection, delay),
    );

    return () => {
      window.cancelAnimationFrame(frame);
      for (const timeout of timeouts) window.clearTimeout(timeout);
    };
  }, [section, trackedSections]);

  useEffect(() => {
    if (trackedSections.length === 0) return;

    let frame: number | undefined;
    const shouldDeferInitialUpdate = Boolean(
      section && trackedSections.some((item) => item.id === section),
    );
    let isInitialScrollPending = shouldDeferInitialUpdate;

    const updatePath = () => {
      const activePath = getActivePath(trackedSections, defaultPath);
      if (activePath) replacePath(activePath);
    };

    const scheduleUpdate = () => {
      if (isInitialScrollPending) return;
      if (frame !== undefined) return;
      frame = window.requestAnimationFrame(() => {
        frame = undefined;
        updatePath();
      });
    };

    const initialUpdate = window.setTimeout(
      () => {
        isInitialScrollPending = false;
        updatePath();
      },
      shouldDeferInitialUpdate ? 1250 : 0,
    );

    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);

    return () => {
      window.clearTimeout(initialUpdate);
      if (frame !== undefined) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
    };
  }, [defaultPath, section, trackedSections]);

  return null;
}
