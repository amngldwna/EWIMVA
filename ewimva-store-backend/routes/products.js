// Подключение библиотеки Express для создания маршрутов
const express = require('express');
// Создание экземпляра маршрутизатора
const router = express.Router();
// Подключение контроллеров для обработки запросов продуктов
const productController = require('../controllers/productController');
// Подключение middleware для аутентификации и проверки прав администратора
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

// Маршрут для получения списка продуктов (доступен всем)
router.get('/', productController.getProducts);
// Маршрут для получения продукта по ID (доступен всем)
router.get('/:id', productController.getProductById);
// Маршрут для добавления нового продукта (требуется аутентификация и права администратора)
router.post('/', [authMiddleware, adminMiddleware], productController.addProduct);
// Маршрут для обновления продукта по ID (требуется аутентификация и права администратора)
router.put('/:id', [authMiddleware, adminMiddleware], productController.updateProduct);
// Маршрут для удаления продукта по ID (требуется аутентификация и права администратора)
router.delete('/:id', [authMiddleware, adminMiddleware], productController.deleteProduct);

// Экспорт маршрутизатора
module.exports = router;
