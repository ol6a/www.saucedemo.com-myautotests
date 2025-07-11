import { test as base, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.ts';
import { InventoryPage } from '../pages/InventoryPage.ts';
import { SidebarMenu } from '../pages/SidebarMenu.ts';

type MyFixtures = {
    loginPage: LoginPage;
    inventoryPage: InventoryPage;
    sidebarMenu: SidebarMenu;
    authenticatedPage: { page: Page; inventoryPage: InventoryPage; sidebarMenu: SidebarMenu };
};

export const test = base.extend<MyFixtures>({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto(); // Переносим переход на страницу в фикстуру
        await use(loginPage);
    },
    
    inventoryPage: async ({ page }, use) => {
        await use(new InventoryPage(page));
    },
    
    sidebarMenu: async ({ page }, use) => {
        await use(new SidebarMenu(page));
    },
    
    authenticatedPage: async ({ loginPage, inventoryPage, sidebarMenu }, use) => {
        // Фикстура для уже авторизованного состояния
        await loginPage.login('standard_user', 'secret_sauce');
        await use({ page: loginPage.page, inventoryPage, sidebarMenu });
    }
});

export { expect } from '@playwright/test';