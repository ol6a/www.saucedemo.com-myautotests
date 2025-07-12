import { test as base } from '@playwright/test';
import { CartPage } from '../pages/CartPage';

export const cartTest = base.extend<{
    cartPage: CartPage;
}>({
    cartPage: async ({ page }, use) => {
        await use(new CartPage(page));
    }
});