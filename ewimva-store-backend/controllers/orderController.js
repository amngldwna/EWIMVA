// Подключение моделей
const Order = require('../models/Order');
const Product = require('../models/Product');

// Функция создания нового заказа
const createOrder = async (req, res) => {
const { products, shippingAddress } = req.body;
try {
// Расчет общей суммы заказа
let totalAmount = 0;
for (const item of products) {
    const product = await Product.findById(item.product);
    if (!product) {
    return res.status(404).json({ message: `Товар ${item.product} не найден` });
    }
    totalAmount += product.price * item.quantity;
}

// Создание нового заказа
const order = new Order({
    user: req.user.id,
    products,
    totalAmount,
    shippingAddress,
});

// Сохранение заказа в базе данных
await order.save();
res.status(201).json(order);
} catch (err) {
res.status(500).json({ message: 'Ошибка сервера' });
}
};

// Функция получения заказов пользователя
const getUserOrders = async (req, res) => {
try {
// Поиск всех заказов пользователя с данными о продуктах
const orders = await Order.find({ user: req.user.id }).populate('products.product');
res.json(orders);
} catch (err) {
res.status(500).json({ message: 'Ошибка сервера' });
}
};

// Функция получения всех заказов (для администраторов)
const getAllOrders = async (req, res) => {
try {
// Поиск всех заказов с данными о пользователе и продуктах
const orders = await Order.find().populate('user').populate('products.product');
res.json(orders);
} catch (err) {
res.status(500).json({ message: 'Ошибка сервера' });
}
};

// Функция обновления статуса заказа
const updateOrderStatus = async (req, res) => {
const { status } = req.body;
try {
// Обновление статуса заказа по ID
const order = await Order.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
);
if (!order) {
    return res.status(404).json({ message: 'Заказ не найден' });
}
res.json(order);
} catch (err) {
res.status(500).json({ message: 'Ошибка сервера' });
}
};

module.exports = { createOrder, getUserOrders, getAllOrders, updateOrderStatus };
