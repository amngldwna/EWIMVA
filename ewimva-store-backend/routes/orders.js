// Подключение библиотеки Express для создания маршрутов
const express = require('express');
// Создание экземпляра маршрутизатора
const router = express.Router();
// Подключение контроллеров для обработки запросов заказов
const orderController = require('../controllers/orderController');
// Подключение middleware для аутентификации и проверки прав администратора
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

// Маршрут для создания нового заказа (требуется аутентификация)
router.post('/', authMiddleware, orderController.createOrder);
// Маршрут для получения заказов пользователя (требуется аутентификация)
router.get('/', authMiddleware, orderController.getUserOrders);
// Маршрут для получения всех заказов (требуется аутентификация и права администратора)
router.get('/all', [authMiddleware, adminMiddleware], orderController.getAllOrders);
// Маршрут для обновления статуса заказа по ID (требуется аутентификация и права администратора)
router.put('/:id', [authMiddleware, adminMiddleware], orderController.updateOrderStatus);

// Экспорт маршрутизатора
module.exports = router;
