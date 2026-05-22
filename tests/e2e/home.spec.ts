import { expect, test } from '@playwright/test';

test('首页加载并显示 Hero', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Veil/);
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});

test('Hero 的下载 CTA 指向 GitHub releases', async ({ page }) => {
  // 使用中文路径确保 zh locale
  await page.goto('/zh');
  const downloadCta = page.locator('a').filter({ hasText: /下载 v0\.1/ }).first();
  await expect(downloadCta).toHaveAttribute('href', /github\.com.*releases/);
  await expect(downloadCta).toHaveAttribute('target', '_blank');
});
