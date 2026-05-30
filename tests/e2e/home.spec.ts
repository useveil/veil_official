import { expect, test } from '@playwright/test';

test('首页加载并显示 Hero', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Veil/);
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});

test('首页显示常见问题解答板块', async ({ page }) => {
  await page.goto('/zh');
  await expect(page.getByRole('heading', { name: '常见问题解答' })).toBeVisible();
  await expect(page.getByRole('button', { name: '什么是指纹浏览器？' })).toBeVisible();
});

test('首页显示行业伙伴板块', async ({ page }) => {
  await page.goto('/zh');
  await expect(page.getByRole('heading', { name: '行业应用场景' })).toBeVisible();
  await expect(page.getByRole('heading', { name: '跨境电商' })).toBeVisible();
});

test('首页显示数据主权优势板块', async ({ page }) => {
  await page.goto('/zh');
  await expect(page.getByRole('heading', { name: '数据不上传，控制权始终在你手里' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Profile 资产不上厂商云' })).toBeVisible();
  await expect(page.getByText('不进入 Veil 托管云')).toBeVisible();
});

test('首页显示重构后的核心功能板块', async ({ page }) => {
  await page.goto('/zh');
  await expect(page.getByRole('heading', { name: 'Veil 指纹浏览器核心功能' })).toBeVisible();
  await expect(page.getByRole('heading', { name: '全面多账号防关联管理' })).toBeVisible();
  await expect(page.getByText('Profile isolation').first()).toBeVisible();
});

test('Hero 的下载 CTA 指向下载页', async ({ page }) => {
  // 使用中文路径确保 zh locale
  await page.goto('/zh');
  const downloadCta = page
    .locator('a')
    .filter({ hasText: /立即下载/ })
    .first();
  await expect(downloadCta).toHaveAttribute('href', '/download');
});
