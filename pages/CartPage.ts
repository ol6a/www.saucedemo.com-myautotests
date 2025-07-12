import { expect, Page } from "@playwright/test";

export class CartPage {
    readonly page: Page;
    
    // Локаторы
    private readonly cartItems = () => this.page.locator('.cart_item');
    private readonly cartItem = (itemName: string) => this.page.locator('.cart_item', { hasText: itemName });
    private readonly cartBadge = () => this.page.locator('.shopping_cart_badge');

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
        return await this.cartBadge().isVisible() 
            ? parseInt(await this.cartBadge().textContent() || '0') 
            : 0;
    }

    async verifyCartItemsCount(expectedCount: number) {
        const actualCount = await this.getCartItemsCount();
        expect(actualCount).toBe(expectedCount);
    }

    async verifyCartContainsItems(itemNames: string[]) {
        await expect(this.cartItems()).toHaveCount(itemNames.length);
        for (const itemName of itemNames) {
            await expect(this.cartItem(itemName)).toBeVisible();
        }
    }

    async removeItemFromCart(itemName: string) {
        await this.cartItem(itemName).locator('button').click();
        await expect(this.cartItem(itemName)).not.toBeVisible();
    }

    async continueShopping() {
        await this.page.click('[data-test="continue-shopping"]');
    }

    async checkout() {
        await this.page.click('[data-test="checkout"]');
    }
}