import { test, expect } from '../fixtures/login.fixture.ts';

test.describe('Тестирование корзины', () => {
    test('Добавление товара в корзину', async ({ authenticatedPage }) => {
        const { inventoryPage, cartPage } = authenticatedPage;
        await inventoryPage.addItemToCart('Sauce Labs Backpack');
        await cartPage.verifyCartItemsCount(1);
    });

    test('Удаление товара из корзины через инвентарь', async ({ authenticatedPage }) => {
        const { inventoryPage, cartPage } = authenticatedPage;
        await inventoryPage.addItemToCart('Sauce Labs Bike Light');
        await cartPage.verifyCartItemsCount(1);
        await inventoryPage.removeItemFromInventory('Sauce Labs Bike Light');
        await cartPage.verifyCartItemsCount(0);
    });

    test('Удаление товара из корзины через страницу корзины', async ({ authenticatedPage }) => {
        const { inventoryPage, cartPage } = authenticatedPage;
        await inventoryPage.addItemToCart('Sauce Labs Bolt T-Shirt');
        await cartPage.verifyCartItemsCount(1);
        await cartPage.goto();
        await cartPage.removeItemFromCart('Sauce Labs Bolt T-Shirt');
        await cartPage.verifyCartItemsCount(0);
    });

    test('Проверка содержимого корзины', async ({ authenticatedPage }) => {
        const { inventoryPage, cartPage } = authenticatedPage;
        await inventoryPage.addItemToCart('Sauce Labs Fleece Jacket');
        await inventoryPage.addItemToCart('Sauce Labs Onesie');
        await cartPage.verifyCartItemsCount(2);
        await cartPage.goto();
        await expect(cartPage.page.locator('.cart_item')).toHaveCount(2);
        await expect(cartPage.page.locator('.cart_item', { hasText: 'Sauce Labs Fleece Jacket' })).toBeVisible();
        await expect(cartPage.page.locator('.cart_item', { hasText: 'Sauce Labs Onesie' })).toBeVisible();
    });

    test('Продолжение покупок из корзины', async ({ authenticatedPage }) => {
        const { inventoryPage, cartPage } = authenticatedPage;
        await inventoryPage.addItemToCart('Test.allTheThings() T-Shirt (Red)');
        await cartPage.goto();
        await cartPage.continueShopping();
        await inventoryPage.verifyIsOnInventoryPage();
    });
});