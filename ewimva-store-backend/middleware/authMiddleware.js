// Подключение библиотеки для работы с JWT
const jwt = require('jsonwebtoken');

// Middleware для проверки аутентификации пользователя
const authMiddleware = (req, res, next) => {
// Извлечение токена из заголовка Authorization, удаляя префикс 'Bearer '
const token = req.header('Authorization')?.replace('Bearer ', '');

// Проверка наличия токена
if (!token) {
return res.status(401).json({ message: 'Нет токена, доступ запрещен' });
}

try {
// Проверка валидности токена и декодирование его содержимого
const decoded = jwt.verify(token, process.env.JWT_SECRET);
// Добавление данных пользователя в объект запроса
req.user = decoded;
// Переход к следующей middleware или маршруту
next();
} catch (err) {
// Обработка ошибки при недействительном токене
res.status(401).json({ message: 'Токен недействителен' });
}
};

// Middleware для проверки прав администратора
const adminMiddleware = (req, res, next) => {
// Проверка, является ли пользователь администратором
if (req.user.role !== 'admin') {
return res.status(403).json({ message: 'Требуется доступ администратора' });
}
// Переход к следующей middleware или маршруту
next();
};

// Экспорт middleware-функций
module.exports = { authMiddleware, adminMiddleware };
