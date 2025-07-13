import { test as base } from '@playwright/test';
import type { LoginPage } from '../pages/LoginPage';
import type { CartPage } from '../pages/CartPage';
import type { InventoryPage } from '../pages/InventoryPage';
import type { SidebarMenu } from '../pages/SidebarMenu';
import type { Page } from '@playwright/test';

import { loginFixtures } from './login.fixture';
import { cartFixtures } from './cart.fixture';
import { inventoryFixtures } from './inventory.fixture';
import { sidebarFixtures } from './sidebar.fixture';
import { authorizationFixtures } from './authenticated.fixture';

// 🔹 Типизация всех фикстур, включая authorization
type MyFixtures = {
  loginPage: LoginPage;
  cartPage: CartPage;
  inventoryPage: InventoryPage;
  sidebarMenu: SidebarMenu;
  authorization: {
    page: Page;
    inventoryPage: InventoryPage;
    sidebarMenu: SidebarMenu;
    cartPage: CartPage;
  };
};

export const test = base
  .extend<MyFixtures>(loginFixtures)
  .extend(cartFixtures)
  .extend(inventoryFixtures)
  .extend(sidebarFixtures)
  .extend(authorizationFixtures);

export const expect = test.expect;