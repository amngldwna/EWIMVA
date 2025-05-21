// Подключение библиотеки Mongoose для работы с MongoDB
const mongoose = require('mongoose');

// Определение схемы для модели продукта
const productSchema = new mongoose.Schema({
// Название продукта
name: { type: String, required: true },
// Описание продукта
description: { type: String },
// Цена продукта
price: { type: Number, required: true },
// Категория продукта
category: { type: String, required: true },
// Пол, для которого предназначен продукт (женский или мужской)
gender: { type: String, enum: ['women', 'men'], required: true },
// Ссылка на изображение продукта
image: { type: String },
// Количество продукта на складе
stock: { type: Number, default: 0 },
// Флаг, указывающий, является ли продукт новинкой
isNewArrival: { type: Boolean, default: false },
// Дата создания продукта
createdAt: { type: Date, default: Date.now },
});

// Экспорт модели продукта
module.exports = mongoose.model('Product', productSchema);
