import { expect, Page } from "@playwright/test";

export class CartPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto() {
        await this.page.click('.shopping_cart_link');
        await this.verifyIsOnCartPage();
    }

    async verifyIsOnCartPage() {
        await expect(this.page).toHaveURL('https://www.saucedemo.com/cart.html');
        await expect(this.page.locator('.title')).toHaveText('Your Cart');
    }

    async getCartItemsCount() {
        const badge = this.page.locator('.shopping_cart_badge');
        return await badge.isVisible() ? parseInt(await badge.textContent() || '0') : 0;
    }

    async verifyCartItemsCount(expectedCount: number) {
        const actualCount = await this.getCartItemsCount();
        expect(actualCount).toBe(expectedCount);
    }

    async removeItemFromCart(itemName: string) {
        const item = this.page.locator('.cart_item', { hasText: itemName });
        await item.locator('button').click();
        await expect(item).not.toBeVisible();
    }

    async continueShopping() {
        await this.page.click('[data-test="continue-shopping"]');
    }

    async checkout() {
        await this.page.click('[data-test="checkout"]');
    }
}