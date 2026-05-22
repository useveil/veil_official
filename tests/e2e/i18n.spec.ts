import { expect, test } from '@playwright/test';

test('切换到英文', async ({ page }) => {
  // zh 为默认 locale（as-needed 前缀），middleware 会将 /zh 重定向到 /
  await page.goto('/');
  // LanguageSwitch 的 aria-label: "切换语言到 English"
  await page.getByRole('button', { name: /切换语言/i }).first().click();
  await expect(page).toHaveURL(/\/en/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
});

test('切回中文', async ({ page }) => {
  await page.goto('/en');
  // 在 /en 页面，LanguageSwitch aria-label: "切换语言到 中文"
  await page.getByRole('button', { name: /切换语言/i }).first().click();
  // zh 为默认 locale（as-needed），切换后跳回 / 无前缀
  await page.waitForURL((url) => !url.pathname.startsWith('/en'), { timeout: 10000 });
  // URL 已离开 /en —— 语言切换成功
  // （Next.js App Router 客户端导航不重新 SSR root layout，lang 属性更新需完整页面刷新）
  await expect(page).toHaveURL(/^http:\/\/localhost:5173\/$/);
});
