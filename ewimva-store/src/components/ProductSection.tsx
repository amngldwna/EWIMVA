// Импорт React, хуков и компонентов UI
import React, { useState, useEffect } from 'react';
import { HeartIcon } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { useNavigate, useLocation } from 'react-router-dom';

// Интерфейс для цветовых вариантов товара
interface ColorVariant {
color: string;
image: string;
}

// Интерфейс для данных о товаре
interface Product {
id: number;
name: string;
category: string;
price: string;
image: string;
colorVariants: ColorVariant[];
}

// Интерфейс для пропсов компонента ProductSection
interface ProductSectionProps {
title?: string; // Заголовок секции
subtitle?: string; // Подзаголовок секции
products: Product[]; // Список товаров
}

// Компонент ProductSection отображает секцию с товарами
export const ProductSection = ({ title, subtitle, products }: ProductSectionProps): JSX.Element => {
// Состояние для хранения списка избранных товаров
const [favorites, setFavorites] = useState<number[]>(() => {
const savedFavorites = localStorage.getItem('favorites');
return savedFavorites ? JSON.parse(savedFavorites) : [];
});

// Сохранение избранных товаров в localStorage при их изменении
useEffect(() => {
localStorage.setItem('favorites', JSON.stringify(favorites));
}, [favorites]);

// Функция для добавления/удаления товара из избранного
const handleFavoriteToggle = (productId: number) => {
setFavorites((prev) =>
    prev.includes(productId)
    ? prev.filter((id) => id !== productId)
    : [...prev, productId]
);
};

// Хуки для навигации и получения текущего маршрута
const navigate = useNavigate();
const location = useLocation();

// Функция для определения категории на основе текущего пути
const getCategoryPath = () => {
const path = location.pathname;
if (path.startsWith('/men/')) {
    return path.replace('/men/', '');
}
return path.replace('/', '');
};

const category = getCategoryPath();

return (
<>
    {/* Стили для адаптивного отображения карточек товаров на мобильных устройствах */}
    <style>
    {`
        @media (max-width: 767px) {
        /* Контейнер текста карточки */
        .product-card-container {
            position: relative;
            display: flex;
            flex-direction: column;
            gap: 4px;
            padding: 4px !important;
        }

        /* Кнопка лайк */
        .product-card-container .favorite-button {
            position: absolute;
            bottom: 4px !important;
            right: 4px !important;
            display: flex;
            align-items: center;
            justify-content: center;
            background: transparent;
            border: none;
            cursor: pointer;
            z-index: 10;
        }

        /* Цена */
        .product-card-container .product-price {
            margin-right: 24px !important; /* Отступ для кнопки лайк */
        }

        /* Название и категория */
        .product-card-container .product-name,
        .product-card-container .product-category {
            z-index: 1;
        }
        }
    `}
    </style>
    {/* Основной контейнер секции товаров */}
    <section className="w-full py-0">
    {/* Отображение заголовка и подзаголовка, если они переданы */}
    {(title || subtitle) && (
        <div className="max-w-7xl mx-auto px-4 mb-6">
        {title && (
            <h2 className="font-['Montserrat'] font-medium text-[24px] text-[#131313] leading-[28px]">
            {title}
            </h2>
        )}
        {subtitle && (
            <p className="font-['Montserrat'] font-normal text-[14px] text-[#131313] leading-[18px] mt-2">
            {subtitle}
            </p>
        )}
        </div>
    )}
    {/* Сетка для отображения карточек товаров */}
    <div className="w-full py-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
        {products.map((product) => (
            <Card
            key={product.id}
            className="rounded-none border-0 relative cursor-pointer"
            onClick={() => {
                const basePath = location.pathname.startsWith('/men/') ? `/men/${category}` : `/${category}`;
                navigate(`${basePath}/product/${product.id}`);
            }}
            >
            <CardContent className="p-0">
                {/* Изображение товара */}
                <div className="relative">
                <img
                    className="w-full h-auto object-cover"
                    alt={product.name}
                    src={product.image}
                />
                </div>
                {/* Контейнер с информацией о товаре */}
                <div className="product-card-container p-2">
                {/* Кнопка для добавления в избранное */}
                <button
                    className="favorite-button absolute bottom-[35px] right-[12px] bg-transparent border-none cursor-pointer"
                    aria-label="Add to favorites"
                    onClick={(e) => {
                    e.stopPropagation();
                    handleFavoriteToggle(product.id);
                    }}
                >
                    <HeartIcon
                    className={`w-[17px] h-[15px] ${
                        favorites.includes(product.id) ? 'fill-black' : 'fill-none'
                    }`}
                    />
                </button>
                {/* Категория товара */}
                <div className="product-category font-['Montserrat'] text-[10px] font-normal text-[#131313] leading-[12px] whitespace-nowrap">
                    {product.category}
                </div>
                {/* Название товара */}
                <div className="product-name font-['Montserrat'] text-[14px] font-normal text-[#131313] leading-[16px] mt-1">
                    {product.name}
                </div>
                {/* Цена товара */}
                <div className="product-price font-['Montserrat'] text-[14px] font-semibold text-[#131313] leading-[16px] mt-1">
                    {product.price}
                </div>
                {/* Отображение цветовых вариантов, если они есть */}
                {product.colorVariants.length > 0 && (
                    <div className="flex gap-2 mt-2">
                    {product.colorVariants.map((variant, index) => (
                        <div
                        key={index}
                        className="w-3 h-3 rounded-none bg-cover bg-[50%_50%]"
                        style={{ backgroundImage: `url(${variant.image})` }}
                        />
                    ))}
                    </div>
                )}
                </div>
            </CardContent>
            </Card>
        ))}
        </div>
    </div>
    </section>
</>
);
};
