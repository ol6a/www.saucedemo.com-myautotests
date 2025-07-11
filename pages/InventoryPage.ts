import { expect, Page } from "@playwright/test";

export class InventoryPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async verifyIsOnInventoryPage() {
        await expect(this.page).toHaveURL('https://www.saucedemo.com/inventory.html');
        await expect(this.page.locator('.title')).toHaveText('Products');
    }

    async addItemToCart(itemName: string) {
        const item = this.page.locator('.inventory_item', { hasText: itemName });
        await item.locator('button').click();
        await expect(item.locator('button')).toHaveText('Remove');
    }

    async removeItemFromInventory(itemName: string) {
        const item = this.page.locator('.inventory_item', { hasText: itemName });
        await item.locator('button').click();
        await expect(item.locator('button')).toHaveText('Add to cart');
    }

    async getItemPrice(itemName: string) {
        const item = this.page.locator('.inventory_item', { hasText: itemName });
        return await item.locator('.inventory_item_price').textContent();
    }

    async openCart() {
        await this.page.click('.shopping_cart_link');
    }
}