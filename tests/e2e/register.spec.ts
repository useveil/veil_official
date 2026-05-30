import { expect, test } from '@playwright/test';

test('register page preserves referral code', async ({ page }) => {
  await page.goto('/register?ref=TEST-CODE_123');

  await expect(page).toHaveURL(/\/register\?ref=TEST-CODE_123$/);
  await expect(page.getByRole('heading', { name: '注册' })).toBeVisible();
  await expect(page.getByPlaceholder('您的邮箱地址')).toBeVisible();
  await expect(page.getByRole('button', { name: '继续' })).toBeVisible();
  await expect(page.getByText('使用 Google 继续')).toBeVisible();
  await expect(page.getByText('TEST-CODE_123')).toBeVisible();
});
