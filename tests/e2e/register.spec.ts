import { expect, test, type Page } from '@playwright/test';

const mobileContentSelectors = [
  'input[name="email"]',
  'input[name="ref"]',
  'input[name="verificationCode"]',
  'input[name="password"]',
  'input[name="confirmPassword"]',
  'input[name="agreementAccepted"]',
  'button[type="submit"]',
  'section > div:nth-of-type(2)',
];

async function getFieldTops(page: Page) {
  return page.evaluate(() => {
    const getTop = (name: string) =>
      document.querySelector<HTMLInputElement>(`input[name="${name}"]`)?.getBoundingClientRect()
        .top ?? 0;

    return [
      getTop('email'),
      getTop('ref'),
      getTop('verificationCode'),
      getTop('password'),
      getTop('confirmPassword'),
    ];
  });
}

async function getMobileContentBottom(page: Page) {
  return page.evaluate((selectors) => {
    const bottoms = selectors.map(
      (selector) => document.querySelector(selector)?.getBoundingClientRect().bottom ?? 0,
    );

    return Math.ceil(Math.max(...bottoms));
  }, mobileContentSelectors);
}

test('register page preserves referral code', async ({ page }) => {
  await page.goto('/register?ref=TEST-CODE_123');

  await expect(page).toHaveURL(/\/register\?ref=TEST-CODE_123$/);
  await expect(page.getByRole('heading', { name: '注册' })).toBeVisible();
  await expect(page.getByLabel('激活码')).toHaveValue('TEST-CODE_123');
  await expect(page.getByLabel('验证码')).toBeVisible();
  await expect(page.getByPlaceholder('请输入验证码')).toBeVisible();
  await expect(page.getByRole('button', { name: '获取验证码' })).toBeVisible();
  await expect(page.getByLabel('密码', { exact: true })).toBeVisible();
  await expect(page.getByLabel('确认密码')).toBeVisible();
  await expect(page.getByPlaceholder('您的邮箱地址')).toBeVisible();
  await expect(page.getByPlaceholder('选填')).toBeVisible();
  await expect(page.getByText('用户协议')).toBeVisible();
  await expect(page.getByText('隐私政策')).toBeVisible();
  await expect(page.getByRole('button', { name: '注册' })).toBeDisabled();
  await page.locator('input[name="agreementAccepted"]').check();
  await expect(page.getByRole('button', { name: '注册' })).toBeEnabled();
  await expect(page.getByRole('link', { name: '使用 Google 继续' })).toBeVisible();
  await expect(page.getByRole('link', { name: '使用 GitHub 继续' })).toBeVisible();
  await expect(page.getByRole('link', { name: '使用 Apple 继续' })).toBeVisible();

  const fieldOrder = await getFieldTops(page);
  expect(fieldOrder[0]).toBeLessThan(fieldOrder[1]);
  expect(fieldOrder[1]).toBeLessThan(fieldOrder[2]);
  expect(fieldOrder[2]).toBeLessThan(fieldOrder[3]);
  expect(fieldOrder[3]).toBeLessThan(fieldOrder[4]);

  await page.setViewportSize({ width: 390, height: 844 });
  await expect
    .poll(() =>
      page.evaluate(() => ({
        bodyOverflowY: getComputedStyle(document.body).overflowY,
        documentOverflowY: getComputedStyle(document.documentElement).overflowY,
        authHeight: document.querySelector('main')?.getBoundingClientRect().height,
        viewportHeight: window.innerHeight,
      })),
    )
    .toEqual({
      bodyOverflowY: 'hidden',
      documentOverflowY: 'hidden',
      authHeight: 844,
      viewportHeight: 844,
    });

  const contentBottom = await getMobileContentBottom(page);
  expect(contentBottom).toBeLessThanOrEqual(844);
});

test('register page always shows activation code field', async ({ page }) => {
  await page.goto('/register');

  await expect(page.getByRole('heading', { name: '注册' })).toBeVisible();
  await expect(page.getByLabel('激活码')).toBeVisible();
  await expect(page.getByLabel('激活码')).toHaveValue('');
  await expect(page.getByPlaceholder('选填')).toBeVisible();
  await expect(page.getByLabel('验证码')).toBeVisible();
  await expect(page.getByRole('button', { name: '获取验证码' })).toBeVisible();
  await expect(page.getByLabel('密码', { exact: true })).toBeVisible();
  await expect(page.getByLabel('确认密码')).toBeVisible();
  await expect(page.getByRole('button', { name: '注册' })).toBeDisabled();
});
