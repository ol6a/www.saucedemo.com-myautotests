import { expect, Page } from "@playwright/test";

export class InventoryPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async verifyIsOnInventoryPage(): Promise<void> {
        await expect(this.page).toHaveURL('https://www.saucedemo.com/inventory.html');
    }
}
