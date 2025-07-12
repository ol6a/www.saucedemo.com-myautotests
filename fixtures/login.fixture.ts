import { test as base, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.ts';
import { InventoryPage } from '../pages/InventoryPage.ts';
import { SidebarMenu } from '../pages/SidebarMenu.ts';
import { CartPage } from '../pages/CartPage.ts';

type MyFixtures = {
    loginPage: LoginPage;
    inventoryPage: InventoryPage;
    sidebarMenu: SidebarMenu;
    cartPage: CartPage;
    authenticatedPage: { 
        page: Page; 
        inventoryPage: InventoryPage; 
        sidebarMenu: SidebarMenu;
        cartPage: CartPage;
    };
};

export const test = base.extend<MyFixtures>({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto(); 
        await use(loginPage);
    },
    
    inventoryPage: async ({ page }, use) => {
        await use(new InventoryPage(page));
    },
    
    sidebarMenu: async ({ page }, use) => {
        await use(new SidebarMenu(page));
    },
    
    cartPage: async ({ page }, use) => {
        await use(new CartPage(page));
    },
    
    authenticatedPage: async ({ loginPage, inventoryPage, sidebarMenu, cartPage }, use) => {
        await loginPage.goto();
        await loginPage.login('standard_user', 'secret_sauce');
        await inventoryPage.verifyIsOnInventoryPage();
        await use({ 
            page: loginPage.page, 
            inventoryPage, 
            sidebarMenu,
            cartPage
        });
    }
});

export { expect } from '@playwright/test';