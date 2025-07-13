import { InventoryPage } from '../pages/InventoryPage';

export const inventoryFixtures = {
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },
};
