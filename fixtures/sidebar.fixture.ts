import { test as base } from '@playwright/test';
import { SidebarMenu } from '../pages/SidebarMenu';

export const sidebarTest = base.extend<{
    sidebarMenu: SidebarMenu;
}>({
    sidebarMenu: async ({ page }, use) => {
        await use(new SidebarMenu(page));
    }
});