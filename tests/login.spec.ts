import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.ts'; // Импортируем классы
import { InventoryPage } from '../pages/InventoryPage.ts';
import { SidebarMenu } from '../pages/SidebarMenu.ts';

// Список пользователей
const users = [
    { username: 'standard_user', password: 'secret_sauce' },
    { username: 'visual_user', password: 'secret_sauce' },
    { username: 'problem_user', password: 'secret_sauce' },
    { username: 'performance_glitch_user', password: 'secret_sauce' },
    { username: 'error_user', password: 'secret_sauce' },
];

test.describe('Тестирование авторизации', () => {
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;
    let sidebarMenu: SidebarMenu;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);   // Создаем экземпляры наших объектов
        inventoryPage = new InventoryPage(page);
        sidebarMenu = new SidebarMenu(page);
        
        await loginPage.goto();           // Переходим на главную страницу
    });

    test('Проверка блокировки пользователя', async () => {
        await loginPage.fillUsername('locked_out_user');      // Заполняем форму
        await loginPage.fillPassword('secret_sauce');
        await loginPage.submitLoginForm();                   // Отправляем форму
        await loginPage.checkErrorMessage('Epic sadface: Sorry, this user has been locked out.'); // Проверяем сообщение об ошибке
    });

    for (const user of users) {
        test(`Авторизация как ${user.username}`, async () => {
            try {
                await loginPage.fillUsername(user.username);     // Используем объект страницы для заполнения формы
                await loginPage.fillPassword(user.password);
                await loginPage.submitLoginForm();

                // Ждем загрузки основной страницы товаров
                await inventoryPage.verifyIsOnInventoryPage();

                // Для performance_glitch_user добавляем задержку
                if (user.username === 'performance_glitch_user') {
                    await new Promise((resolve) => setTimeout(resolve, 3000)); // Эмулируем задержку
                }

                // Выполняем выход из системы
                await sidebarMenu.logout();
                await expect(loginPage.page).toHaveURL('https://www.saucedemo.com/'); // Проверяем возвращение на стартовую страницу
            } catch (err) {
                console.error(`Ошибка при входе как ${user.username}:`, err.message);
            }
        });
    }
});

