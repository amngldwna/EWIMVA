// Интерфейс для описания данных о товаре
export interface Product {
id: string; // Уникальный идентификатор товара
name: string; // Название товара
category: string; // Категория товара
price: string; // Цена товара
image: string; // Путь к изображению товара
color: string; // Цвет товара
colorVariants: any[]; // Варианты цвета товара
composition: string; // Состав материала
origin: string; // Страна происхождения
care: string; // Инструкции по уходу
photosLarge: { src: string; alt: string }[]; // Массив больших изображений
photosSmall: { src: string; alt: string }[]; // Массив маленьких изображений
description: string; // Описание товара
stock?: number; // Количество на складе
status?: 'available' | 'low' | 'unavailable'; // Статус наличия
gender?: 'male' | 'female' | 'unisex'; // Половая принадлежность товара
}

// Функция для добавления нового товара через API
export const addProduct = async (product: Omit<Product, 'id' | 'colorVariants' | 'composition' | 'origin' | 'care' | 'photosLarge' | 'photosSmall' | 'description'>): Promise<void> => {
try {
// Отправка POST-запроса на сервер для добавления товара
const response = await fetch('http://localhost:3001/products', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    },
    body: JSON.stringify({
    ...product,
    colorVariants: [], // Пустой массив для цветовых вариантов
    composition: 'Не указано', // Значение по умолчанию
    origin: 'Не указано', // Значение по умолчанию
    care: 'Не указано', // Значение по умолчанию
    photosLarge: [], // Пустой массив для больших изображений
    photosSmall: [], // Пустой массив для маленьких изображений
    description: 'Описание отсутствует', // Значение по умолчанию
    color: product.color || 'Не указано', // Цвет или значение по умолчанию
    }),
});

// Проверка успешности запроса
if (!response.ok) {
    throw new Error('Ошибка при добавлении товара');
}
} catch (error) {
// Обработка ошибок
console.error('Error adding product:', error);
throw error;
}
};

// Функция для получения списка товаров через API
export const getProducts = async (): Promise<Product[]> => {
try {
// Отправка GET-запроса на сервер для получения товаров
const response = await fetch('http://localhost:3001/products');
if (!response.ok) {
    throw new Error('Ошибка при получении товаров');
}
const products = await response.json();
console.log('Fetched products:', products);
return products;
} catch (error) {
// Обработка ошибок
console.error('Error fetching products:', error);
throw error;
}
};

// Функция для обновления товара через API
export const updateProduct = async (product: Product): Promise<void> => {
try {
// Отправка PUT-запроса на сервер для обновления товара
const response = await fetch(`http://localhost:3001/products/${product.id}`, {
    method: 'PUT',
    headers: {
    'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
});
if (!response.ok) {
    throw new Error('Ошибка при обновлении товара');
}
} catch (error) {
// Обработка ошибок
console.error('Error updating product:', error);
throw error;
}
};
