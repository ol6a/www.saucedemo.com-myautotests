import { expect, Page } from "@playwright/test";

export class SidebarMenu {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async open(): Promise<void> {
        await this.page.click('#react-burger-menu-btn');
    }

    async logout(): Promise<void> {
        await this.open(); // открываем меню
        const logoutLink = this.page.locator('#logout_sidebar_link');
        await expect(logoutLink).toBeVisible();
        await logoutLink.click();
    }
}
