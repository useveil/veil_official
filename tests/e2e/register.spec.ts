import { expect, test } from '@playwright/test';

test('register page preserves referral code', async ({ page }) => {
  await page.goto('/register?ref=TEST-CODE_123');

  await expect(page).toHaveURL(/\/register\?ref=TEST-CODE_123$/);
  await expect(page.getByRole('heading', { name: /创建 Veil 账号/ })).toBeVisible();
  await expect(page.getByText('TEST-CODE_123')).toBeVisible();
});
