import { expect, test } from '@playwright/test';

test('未知路径展示 404 并提供回首页入口', async ({ page }) => {
  await page.goto('/this-page-truly-does-not-exist');
  await expect(page.getByText(/404/)).toBeVisible();
  // not-found.tsx 中 href="/" 的"返回首页"按钮
  await page.getByRole('link', { name: /返回首页/i }).click();
  // 默认 locale zh 使用 as-needed 前缀，首页为 /（无前缀）
  await expect(page).toHaveURL(/^http:\/\/localhost:5173\/(en\/?)?$/);
});
