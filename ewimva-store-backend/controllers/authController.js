// Подключение необходимых библиотек и моделей
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { authMiddleware } = require('../middleware/authMiddleware');

// Функция регистрации нового пользователя
const register = async (req, res) => {
const { name, email, password, address, phone, birthDate, gender } = req.body;
try {
// Проверка, существует ли пользователь с таким email
let user = await User.findOne({ email });
if (user) {
    return res.status(400).json({ message: 'Пользователь уже существует' });
}

// Создание нового пользователя с хешированным паролем
user = new User({
    name,
    email,
    password: await bcrypt.hash(password, 10),
    address,
    phone,
    birthDate,
    gender,
});

// Сохранение пользователя в базе данных
await user.save();

// Генерация JWT-токена
const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '1h',
});

// Ответ с токеном и данными пользователя
res.json({ token, user: { id: user._id, name, email, role: user.role, address, phone, birthDate, gender } });
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Ошибка сервера' });
}
};

// Функция входа пользователя
const login = async (req, res) => {
const { email, password } = req.body;
try {
// Поиск пользователя по email
const user = await User.findOne({ email });
if (!user) {
    return res.status(400).json({ message: 'Неверные данные' });
}

// Проверка пароля
const isMatch = await bcrypt.compare(password, user.password);
if (!isMatch) {
    return res.status(400).json({ message: 'Неверные данные' });
}

// Генерация JWT-токена
const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '1h',
});

// Ответ с токеном и данными пользователя
res.json({ 
    token, 
    user: { 
    id: user._id, 
    name: user.name, 
    email, 
    role: user.role, 
    address: user.address,
    phone: user.phone,
    birthDate: user.birthDate,
    gender: user.gender
    } 
});
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Ошибка сервера' });
}
};

// Функция получения профиля пользователя (требуется авторизация)
const getProfile = [authMiddleware, async (req, res) => {
try {
// Поиск пользователя по ID без возврата пароля
const user = await User.findById(req.user.id).select('-password');
res.json(user);
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Ошибка сервера' });
}
}];

module.exports = { register, login, getProfile };
