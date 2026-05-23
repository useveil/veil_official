import { expect, test } from '@playwright/test';

test('点击 ThemeToggle 在三态间循环', async ({ page }) => {
  await page.goto('/');
  // ThemeToggle aria-label: "切换主题（当前 system）"
  const toggle = page.getByRole('button', { name: /切换主题/i }).first();
  const html = page.locator('html');

  // system → light
  await toggle.click();
  await expect(async () => {
    const cls = await html.getAttribute('class');
    expect(cls ?? '').not.toMatch(/dark/);
  }).toPass();

  // light → dark
  await toggle.click();
  await expect(html).toHaveClass(/dark/);

  // dark → system
  await toggle.click();
});
