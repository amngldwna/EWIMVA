// Подключение необходимых библиотек
const express = require('express'); // Фреймворк для создания сервера
const mongoose = require('mongoose'); // Библиотека для работы с MongoDB
const cors = require('cors'); // Middleware для обработки CORS
const dotenv = require('dotenv'); // Библиотека для работы с переменными окружения

// Подключение маршрутов
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');

// Загрузка переменных окружения из файла .env
dotenv.config();

// Создание экземпляра приложения Express
const app = express();

// Подключение middleware
app.use(cors()); // Разрешение кросс-доменных запросов
app.use(express.json()); // Парсинг JSON-тела запросов

// Подключение маршрутов к API
app.use('/api/auth', authRoutes); // Маршруты для аутентификации
app.use('/api/products', productRoutes); // Маршруты для продуктов
app.use('/api/orders', orderRoutes); // Маршруты для заказов

// Подключение к MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Atlas подключена')) // Успешное подключение
  .catch((err) => console.error('Ошибка подключения к MongoDB Atlas:', err)); // Обработка ошибок

// Запуск сервера
const PORT = process.env.PORT || 5000; // Использование порта из .env или 5000 по умолчанию
app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`)); // Запуск сервера
