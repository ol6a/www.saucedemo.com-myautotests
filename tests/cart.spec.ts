import { test, expect } from '../fixtures/index.ts';

test.describe('Тестирование корзины', () => {
    test('Добавление товара в корзину', async ({ authorization }) => {
        const { inventoryPage, cartPage } = authorization;
        await inventoryPage.addItemToCart('Sauce Labs Backpack');
        await cartPage.verifyCartItemsCount(1);
    });

    test('Удаление товара из корзины через инвентарь', async ({ authorization }) => {
        const { inventoryPage, cartPage } = authorization;
        await inventoryPage.addItemToCart('Sauce Labs Bike Light');
        await cartPage.verifyCartItemsCount(1);
        await inventoryPage.removeItemFromInventory('Sauce Labs Bike Light');
        await cartPage.verifyCartItemsCount(0);
    });

    test('Удаление товара из корзины через страницу корзины', async ({ authorization }) => {
        const { inventoryPage, cartPage } = authorization;
        await inventoryPage.addItemToCart('Sauce Labs Bolt T-Shirt');
        await cartPage.verifyCartItemsCount(1);
        await cartPage.goto();
        await cartPage.removeItemFromCart('Sauce Labs Bolt T-Shirt');
        await cartPage.verifyCartItemsCount(0);
    });

    test('Проверка содержимого корзины', async ({ authorization }) => {
        const { inventoryPage, cartPage } = authorization;
        await inventoryPage.addItemToCart('Sauce Labs Fleece Jacket');
        await inventoryPage.addItemToCart('Sauce Labs Onesie');
        await cartPage.verifyCartItemsCount(2);
        await cartPage.goto();
        await cartPage.verifyCartContainsItems([
            'Sauce Labs Fleece Jacket',
            'Sauce Labs Onesie'
        ]);
    });

    test('Продолжение покупок из корзины', async ({ authorization }) => {
        const { inventoryPage, cartPage } = authorization;
        await inventoryPage.addItemToCart('Test.allTheThings() T-Shirt (Red)');
        await cartPage.goto();
        await cartPage.continueShopping();
        await inventoryPage.verifyIsOnInventoryPage();
    });
});