import { test as base } from '@playwright/test';
import { Page } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';
import { SidebarMenu } from '../pages/SidebarMenu';
import { CartPage } from '../pages/CartPage';
import { LoginPage } from '../pages/LoginPage';

export const authenticatedTest = base.extend<{
    authorization: { 
        page: Page;
        inventoryPage: InventoryPage;
        sidebarMenu: SidebarMenu;
        cartPage: CartPage;
    };
}>({
    authorization: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);
        const sidebarMenu = new SidebarMenu(page);
        const cartPage = new CartPage(page);
        
        await loginPage.goto();
        await loginPage.login('standard_user', 'secret_sauce');
        await inventoryPage.verifyIsOnInventoryPage();
        
        await use({ 
            page,
            inventoryPage,
            sidebarMenu,
            cartPage
        });
    }
});