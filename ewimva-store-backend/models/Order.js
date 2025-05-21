// Подключение библиотеки Mongoose для работы с MongoDB
const mongoose = require('mongoose');

// Определение схемы для модели заказа
const orderSchema = new mongoose.Schema({
// Ссылка на пользователя, сделавшего заказ
user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
// Список продуктов в заказе
products: [{
// Ссылка на продукт
product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
// Количество единиц продукта
quantity: { type: Number, required: true },
}],
// Общая сумма заказа
totalAmount: { type: Number, required: true },
// Статус заказа (возможные значения: в ожидании, отправлен, доставлен)
status: { type: String, enum: ['pending', 'shipped', 'delivered'], default: 'pending' },
// Адрес доставки
shippingAddress: { type: String, required: true },
// Дата создания заказа
createdAt: { type: Date, default: Date.now },
});

// Экспорт модели заказа
module.exports = mongoose.model('Order', orderSchema);
