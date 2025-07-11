
import { expect, Page } from "@playwright/test";

export class LoginPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto(): Promise<void> {
        await this.page.goto('https://www.saucedemo.com/');
    }

    async fillUsername(username: string): Promise<void> {
        await this.page.fill('[data-test="username"]', username);
    }

    async fillPassword(password: string): Promise<void> {
        await this.page.fill('[data-test="password"]', password);
    }

    async submitLoginForm(): Promise<void> {
        await this.page.click('[data-test="login-button"]');
    }

    async checkErrorMessage(message: string): Promise<void> {
        const errorElement = this.page.locator('h3[data-test="error"]');
        await expect(errorElement).toBeVisible({ timeout: 5000 });
        await expect(errorElement).toContainText(message);
    }

    async login(username: string, password: string): Promise<void> {
        await this.fillUsername(username);
        await this.fillPassword(password);
        await this.submitLoginForm();
    }
}
