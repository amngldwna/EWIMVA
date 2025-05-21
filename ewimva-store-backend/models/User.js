// Подключение библиотеки Mongoose для работы с MongoDB
const mongoose = require('mongoose');

// Определение схемы для модели пользователя
const userSchema = new mongoose.Schema({
// Имя пользователя
name: { type: String, required: true },
// Email пользователя (уникальный)
email: { type: String, required: true, unique: true },
// Пароль пользователя
password: { type: String, required: true },
// Роль пользователя (пользователь или администратор)
role: { type: String, enum: ['user', 'admin'], default: 'user' },
// Адрес пользователя
address: { type: String },
// Телефон пользователя
phone: { type: String },
// Дата рождения пользователя
birthDate: { type: Date },
// Пол пользователя (женский или мужской)
gender: { type: String, enum: ['женский', 'мужской'] },
// Список избранных продуктов пользователя
favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
// Дата создания пользователя
createdAt: { type: Date, default: Date.now },
});

// Экспорт модели пользователя
module.exports = mongoose.model('User', userSchema);
