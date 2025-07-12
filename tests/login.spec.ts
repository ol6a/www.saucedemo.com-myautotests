import { test, expect } from '../fixtures/login.fixture.ts';
const BASE_URL = 'https://www.saucedemo.com/';
const TEST_USERS = {
    STANDARD: { username: 'standard_user', password: 'secret_sauce' },
    LOCKED: { username: 'locked_out_user', password: 'secret_sauce' },
    PERFORMANCE: { username: 'performance_glitch_user', password: 'secret_sauce' },
    PROBLEM: { username: 'problem_user', password: 'secret_sauce' },
    ERROR: { username: 'error_user', password: 'secret_sauce' },
    VISUAL: { username: 'visual_user', password: 'secret_sauce' }
};

test.describe('Тестирование авторизации', () => {
    test('Проверка блокировки пользователя', async ({ loginPage }) => {
        await loginPage.login(TEST_USERS.LOCKED.username, TEST_USERS.LOCKED.password);
        await loginPage.checkErrorMessage('Epic sadface: Sorry, this user has been locked out.');
    });

    test('Успешная авторизация стандартного пользователя', async ({ 
        loginPage, 
        inventoryPage, 
        sidebarMenu 
    }) => {
        await loginPage.login(TEST_USERS.STANDARD.username, TEST_USERS.STANDARD.password);
        await inventoryPage.verifyIsOnInventoryPage();
        await sidebarMenu.logout();
        await expect(loginPage.page).toHaveURL(BASE_URL);
    });

    test('Авторизация пользователя с проблемами', async ({ loginPage, inventoryPage }) => {
        await loginPage.login(TEST_USERS.PROBLEM.username, TEST_USERS.PROBLEM.password);
        await inventoryPage.verifyIsOnInventoryPage();
    });

    test('Авторизация пользователя с задержкой', async ({ loginPage, inventoryPage }) => {
        await loginPage.login(TEST_USERS.PERFORMANCE.username, TEST_USERS.PERFORMANCE.password);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        await inventoryPage.verifyIsOnInventoryPage();
    });

    test('Авторизация визуального пользователя', async ({ loginPage, inventoryPage }) => {
        await loginPage.login(TEST_USERS.VISUAL.username, TEST_USERS.VISUAL.password);
        await inventoryPage.verifyIsOnInventoryPage();
    });

    test('Авторизация проблемного пользователя', async ({ loginPage, inventoryPage }) => {
        await loginPage.login(TEST_USERS.ERROR.username, TEST_USERS.ERROR.password);
        await inventoryPage.verifyIsOnInventoryPage();
    });
});

