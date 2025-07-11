import { expect, Page } from "@playwright/test";

export class SidebarMenu {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async open(): Promise<void> {
        await this.page.click('#react-burger-menu-btn');
        await this.page.waitForSelector('#logout_sidebar_link', { state: 'visible' });
    }

    async logout(): Promise<void> {
        await this.open();
        await this.page.click('#logout_sidebar_link');
    }
}