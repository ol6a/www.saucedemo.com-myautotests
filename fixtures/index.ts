import { test as base } from '@playwright/test';
import { loginTest } from './login.fixture.ts';
import { inventoryTest } from './inventory.fixture.ts';
import { sidebarTest } from './sidebar.fixture.ts';
import { cartTest } from './cart.fixture.ts';
import { authenticatedTest } from './authenticated.fixture.ts';

export const test = base
    .extend(loginTest)
    .extend(inventoryTest)
    .extend(sidebarTest)
    .extend(cartTest)
    .extend(authenticatedTest);

export { expect } from '@playwright/test';