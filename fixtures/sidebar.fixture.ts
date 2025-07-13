import { SidebarMenu } from '../pages/SidebarMenu';

export const sidebarFixtures = {
  sidebarMenu: async ({ page }, use) => {
    await use(new SidebarMenu(page));
  },
};
