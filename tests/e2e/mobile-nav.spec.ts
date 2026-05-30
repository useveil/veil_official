import { expect, test } from '@playwright/test';

test.use({ viewport: { width: 375, height: 812 } });

test('移动端打开菜单抽屉', async ({ page }) => {
  await page.goto('/');
  // MobileNav SheetTrigger aria-label="打开菜单"
  await page.getByRole('button', { name: '打开菜单' }).click();
  // SheetContent 基于 @base-ui/react/dialog，渲染 role="dialog"
  await expect(page.getByRole('dialog')).toBeVisible();
  // primaryNav 第一项为 security，中文显示"产品功能"
  await expect(
    page
      .locator('a')
      .filter({ hasText: /产品功能|features/i })
      .last(),
  ).toBeVisible();
});
