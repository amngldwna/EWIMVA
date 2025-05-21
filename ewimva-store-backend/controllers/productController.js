// Подключение модели продукта
const Product = require('../models/Product');

// Функция получения списка продуктов с фильтрацией
const getProducts = async (req, res) => {
try {
// Формирование запроса на основе параметров
const { category, gender, isNewArrival } = req.query;
const query = {};
if (category) query.category = category;
if (gender) query.gender = gender;
if (isNewArrival) query.isNewArrival = isNewArrival === 'true';

// Получение продуктов по запросу
const products = await Product.find(query);
res.json(products);
} catch (err) {
res.status(500).json({ message: 'Ошибка сервера' });
}
};

// Функция получения продукта по ID
const getProductById = async (req, res) => {
try {
// Поиск продукта по ID
const product = await Product.findById(req.params.id);
if (!product) {
    return res.status(404).json({ message: 'Товар не найден' });
}
res.json(product);
} catch (err) {
res.status(500).json({ message: 'Ошибка сервера' });
}
};

// Функция добавления нового продукта
const addProduct = async (req, res) => {
const { name, description, price, category, gender, image, stock, isNewArrival } = req.body;
try {
// Создание нового продукта
const product = new Product({
    name,
    description,
    price,
    category,
    gender,
    image,
    stock,
    isNewArrival,
});
// Сохранение продукта в базе данных
await product.save();
res.status(201).json(product);
} catch (err) {
res.status(500).json({ message: 'Ошибка сервера' });
}
};

// Функция обновления продукта
const updateProduct = async (req, res) => {
try {
// Обновление продукта по ID
const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
if (!product) {
    return res.status(404).json({ message: 'Товар не найден' });
}
res.json(product);
} catch (err) {
res.status(500).json({ message: 'Ошибка сервера' });
}
};

// Функция удаления продукта
const deleteProduct = async (req, res) => {
try {
// Удаление продукта по ID
const product = await Product.findByIdAndDelete(req.params.id);
if (!product) {
    return res.status(404).json({ message: 'Товар не найден' });
}
res.json({ message: 'Товар удален' });
} catch (err) {
res.status(500).json({ message: 'Ошибка сервера' });
}
};

module.exports = { getProducts, getProductById, addProduct, updateProduct, deleteProduct };