import { LoginPage } from '../pages/LoginPage';

export const loginFixtures = {
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await use(loginPage);
  },
};
