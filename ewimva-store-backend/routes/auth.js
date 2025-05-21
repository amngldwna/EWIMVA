// Подключение библиотеки Express для создания маршрутов
const express = require('express');
// Создание экземпляра маршрутизатора
const router = express.Router();
// Подключение контроллеров для обработки запросов аутентификации
const authController = require('../controllers/authController');

// Маршрут для регистрации нового пользователя
router.post('/register', authController.register);
// Маршрут для входа пользователя
router.post('/login', authController.login);
// Маршрут для получения профиля пользователя
router.get('/profile', authController.getProfile);

// Экспорт маршрутизатора
module.exports = router;
