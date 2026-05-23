import { type Page, expect, test } from '@playwright/test';

async function chooseLanguage(page: Page, name: RegExp) {
  await page
    .getByRole('button', { name: /select language/i })
    .first()
    .click();
  await page.getByRole('menuitemradio', { name }).click();
}

test('在 /en/security 点击切换：URL 与文本都应回到中文 /security', async ({ page, context }) => {
  // 清掉残留 cookie 与 storage，避免上一次测试影响
  await context.clearCookies();

  await page.goto('/en/security');
  // 等英文 H2 渲染（确认我们真的在 en 版本）
  await expect(
    page.getByRole('heading', { name: /from master password|encryption stack/i }).first(),
  ).toBeVisible();

  await chooseLanguage(page, /中文/);

  // URL 应不再以 /en 开头
  await page.waitForURL((url) => !url.pathname.startsWith('/en/'), { timeout: 5000 });
  expect(new URL(page.url()).pathname).toBe('/security');

  // 文本应该切到中文：Section 标题用 "加密栈" 或 "完整路径"
  await expect(page.getByRole('heading', { name: /加密栈|完整路径|可信/ }).first()).toBeVisible({
    timeout: 5000,
  });
});

test('从中文 /security 切回英文：URL 应加 /en 前缀', async ({ page, context }) => {
  await context.clearCookies();

  await page.goto('/security');
  await expect(page.getByRole('heading', { name: /加密栈|完整路径/ }).first()).toBeVisible();

  await chooseLanguage(page, /English/);

  await page.waitForURL((url) => url.pathname.startsWith('/en/'), { timeout: 5000 });
  expect(new URL(page.url()).pathname).toBe('/en/security');

  await expect(
    page.getByRole('heading', { name: /encryption stack|from master password/i }).first(),
  ).toBeVisible({ timeout: 5000 });
});
