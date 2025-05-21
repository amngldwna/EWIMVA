// Импорт библиотеки axios для работы с HTTP-запросами
import axios from 'axios';

// Создание экземпляра axios с базовыми настройками
const api = axios.create({
baseURL: 'http://localhost:5000/api', // Базовый URL для API
headers: {
'Content-Type': 'application/json', // Установка заголовка для JSON
},
});

// Интерцептор для добавления токена авторизации в запросы
api.interceptors.request.use((config) => {
const token = localStorage.getItem('token'); // Получение токена из localStorage
if (token) {
config.headers.Authorization = `Bearer ${token}`; // Добавление токена в заголовки
}
return config;
});

// Экспорт настроенного экземпляра axios
export default api;
