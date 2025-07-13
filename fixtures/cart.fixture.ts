import { CartPage } from '../pages/CartPage';

export const cartFixtures = {
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
};
