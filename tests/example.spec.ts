import { test, expect } from '@playwright/test';

const url = 'https://www.saucedemo.com/';
const username = 'standard_user';
const correctPassword = 'secret_sauce';
const incorrectPassword = '12345';

async function login(page, user: string, password: string) {
  await page.goto(url);
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill(user);
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill(password);
  await page.locator('[data-test="login-button"]').click();
}

test.beforeEach(async ({ page }) => {
  await page.goto(url);
});

test('Login with correct password', async ({ page }) => {
  await login(page, username, correctPassword);
  
  await expect(page.locator('[data-test="shopping-cart-link"]')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Open Menu' })).toBeVisible();
  
  await page.getByRole('button', { name: 'Open Menu' }).click();
  await expect(page.locator('[data-test="logout-sidebar-link"]')).toContainText('Logout');
  
  await page.getByRole('button', { name: 'Close Menu' }).click();
  await expect(page.locator('[data-test="title"]')).toContainText('Products');
});

test('Login with incorrect password', async ({ page }) => {
  await login(page, username, incorrectPassword);
  
  await expect(page.locator('[data-test="error"]')).toBeVisible();
  await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username and password do not match any user in this service');
  await expect(page.locator('[data-test="login-button"]')).toBeVisible();
  await expect(page.locator('[data-test="login-button"]')).toHaveText('Login');
});

