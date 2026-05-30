import { type Page, expect, test } from '@playwright/test';

async function chooseLanguage(page: Page, name: RegExp) {
  await page
    .getByRole('button', { name: /select language/i })
    .first()
    .click();
  const item = page.getByRole('menuitemradio', { name });
  await expect(item).toBeVisible();
  await item.click();
}

test('切换到英文', async ({ page }) => {
  // zh 为默认 locale（as-needed 前缀），middleware 会将 /zh 重定向到 /
  await page.goto('/');
  await chooseLanguage(page, /English/);
  await expect(page).toHaveURL(/\/en/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
});

test('切回中文', async ({ page }) => {
  await page.goto('/en');
  await chooseLanguage(page, /中文/);
  // zh 为默认 locale（as-needed），切换后跳回 / 无前缀
  await expect(page).toHaveURL(/^http:\/\/localhost:5173\/$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'zh');
});

test('切换到日语和韩语', async ({ page }) => {
  await page.goto('/');

  await chooseLanguage(page, /日本語/);
  await expect(page).toHaveURL(/\/ja/);
  await page.waitForLoadState('networkidle');
  await expect(page.locator('html')).toHaveAttribute('lang', 'ja');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

  await chooseLanguage(page, /한국어/);
  await expect(page).toHaveURL(/\/ko/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'ko');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});
