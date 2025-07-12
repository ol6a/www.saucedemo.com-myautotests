import { test as base } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';

export const inventoryTest = base.extend<{
    inventoryPage: InventoryPage;
}>({
    inventoryPage: async ({ page }, use) => {
        await use(new InventoryPage(page));
    }
});