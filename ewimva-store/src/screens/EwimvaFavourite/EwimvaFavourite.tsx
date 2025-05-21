// Импорт необходимых библиотек и компонентов
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { HeartIcon } from "lucide-react";

// Статический массив продуктов
const products = [
  {
    id: 1,
    name: 'Lyocell V-neck midi dress',
    category: 'CAPSULE',
    price: '5 990 KGS',
    image: '/87028650-tc.png',
    colorVariants: [],
  },
  {
    id: 2,
    name: 'Embroidered shirt dress with belt',
    category: 'NEW NOW - SELECTION',
    price: '7 990 KGS',
    image: '/87029065-01-99999999-01.png',
    colorVariants: [],
  },
  {
    id: 3,
    name: 'Полупрозрачное комбинированное платье',
    category: 'CAPSULE',
    price: '9 990 KGS',
    image: '/87007199-05-d9.png',
    colorVariants: [
      { color: '03', image: '/03-2.png' },
      { color: '32', image: '/32-2.png' },
    ],
  },
  {
    id: 4,
    name: 'Прямой комбинезон с короткими рукавами и поясом',
    category: 'NEW NOW - SELECTION',
    price: '6 990 KGS',
    image: '/87077907-05-d7.png',
    colorVariants: [],
  },
  {
    id: 5,
    name: 'Платье из смесового льна с оборкой',
    category: 'CAPSULE',
    price: '9 990 KGS',
    image: '/87087899-99-d6.png',
    colorVariants: [],
  },
  {
    id: 6,
    name: 'Джемпер букле с круглой горловиной',
    category: 'NEW NOW - SELECTION',
    price: '6 990 KGS',
    image: '/87060612-05-99999999-01.png',
    colorVariants: [],
  },
  {
    id: 7,
    name: 'Вязаный жакет с нарядными пуговицами',
    category: 'NEW NOW',
    price: '9 990 KGS',
    image: '/87014094-99-d2.png',
    colorVariants: [],
  },
  {
    id: 8,
    name: 'Вязаный кардиган с пуговицами-стразами',
    category: 'NEW NOW - SELECTION',
    price: '6 990 KGS',
    image: '/87090451-05.png',
    colorVariants: [],
  },
  {
    id: 9,
    name: 'Хлопковая футболка с контрастными окантовками',
    category: 'NEW NOW - SELECTION',
    price: '7 990 KGS',
    image: '/87099211-01-d2.png',
    colorVariants: [],
  },
  {
    id: 10,
    name: 'Футболка из смесового хлопка',
    category: 'NEW NOW - SELECTION',
    price: '5 990 KGS',
    image: '/77073266-ta-d1.png',
    colorVariants: [],
  },
  {
    id: 11,
    name: 'Драпированное платье с цветочным принтом',
    category: 'NEW NOW',
    price: '9 990 KGS',
    image: '/87038267-05-d2-1.png',
    colorVariants: [],
  },
  {
    id: 12,
    name: 'Вязаный жилет с нарядными пуговицами',
    category: 'NEW NOW - SELECTION',
    price: '5 990 KGS',
    image: '/87079065-56-d2.png',
    colorVariants: [],
  },
  {
    id: 13,
    name: 'Толстовка с высоким воротником и молнией',
    category: 'CAPSULE',
    price: '4 990 KGS',
    image: '/77097691-35.png',
    colorVariants: [],
  },
  {
    id: 14,
    name: 'Асимметричное платье с воротником-бантом',
    category: 'CAPSULE',
    price: '5 990 KGS',
    image: '/87038267-05-d2-4.png',
    colorVariants: [],
  },
  {
    id: 15,
    name: 'Меланжевый кардиган с косами',
    category: 'NEW NOW',
    price: '8 990 KGS',
    image: '/87050367-92.png',
    colorVariants: [],
  },
  {
    id: 16,
    name: 'Футболка с асимметричной горловиной и сборками',
    category: 'NEW NOW - SELECTION',
    price: '12 990 KGS',
    image: '/87085755-07.png',
    colorVariants: [],
  },
  {
    id: 17,
    name: 'Тренч оверсайз с ремнем',
    category: 'NEW NOW - SELECTION',
    price: '12 990 KGS',
    image: '/87093294-05-99999999-01.png',
    colorVariants: [],
  },
  {
    id: 18,
    name: 'Парка оверсайз на молнии',
    category: 'NEW NOW - SELECTION',
    price: '12 990 KGS',
    image: '/87038267-05-d2-5.png',
    colorVariants: [],
  },
  {
    id: 19,
    name: 'Платье А-силуэта из кружева',
    category: 'NEW NOW',
    price: '12 990 KGS',
    image: '/87035749-30-d6.png',
    colorVariants: [],
  },
  {
    id: 20,
    name: 'Длинный тренч с двубортной застежкой',
    category: 'NEW NOW - SELECTION',
    price: '12 990 KGS',
    image: '/87075142-37-99999999-01.png',
    colorVariants: [],
  },
  {
    id: 21,
    name: 'Костюмные брюки изо льна',
    category: 'CAPSULE',
    price: '12 990 KGS',
    image: '/87067706-06-d2--1-.png',
    colorVariants: [],
  },
  {
    id: 22,
    name: 'Lyocell palazzo pants',
    category: 'NEW NOW - SELECTION',
    price: '12 990 KGS',
    image: '/87028650-tc-99999999-01.png',
    colorVariants: [],
  },
  {
    id: 23,
    name: 'Прямые костюмные брюки из смесового льна',
    category: 'NEW NOW',
    price: '12 990 KGS',
    image: '/87038267-05-d2.png',
    colorVariants: [],
  },
  {
    id: 24,
    name: 'Прямые костюмные брюки из смесового льна',
    category: 'NEW NOW - SELECTION',
    price: '12 990 KGS',
    image: '/87068640-05-d1.png',
    colorVariants: [],
  },
  {
    id: 25,
    name: 'Прямое платье с драпировкой',
    category: 'CAPSULE',
    price: '12 990 KGS',
    image: '/87038267-05-d2-2.png',
    colorVariants: [],
  },
  {
    id: 26,
    name: 'Короткий тренч из денима с поясом',
    category: 'NEW NOW - SELECTION',
    price: '12 990 KGS',
    image: '/87075741-ts-02-d7.png',
    colorVariants: [],
  },
  {
    id: 27,
    name: 'Объемный тренч из хлопка',
    category: 'NEW NOW',
    price: '12 990 KGS',
    image: '/87038267-05-d2-3.png',
    colorVariants: [],
  },
  {
    id: 28,
    name: 'Куртка-бомбер со сборками',
    category: 'NEW NOW - SELECTION',
    price: '12 990 KGS',
    image: '/87063290-92-d7.png',
    colorVariants: [],
  },
];

// Компонент страницы избранных товаров
export default function EwimvaFavourite(): JSX.Element {
  // Состояние для списка избранных товаров, загружаемых из localStorage
  const [favorites, setFavorites] = useState<number[]>(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  // Сохранение избранных товаров в localStorage при изменении
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Функция добавления товара в корзину
  const handleAddToCart = (product: any) => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    const existingItem = cartItems.find((item: any) => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cartItems.push({ ...product, quantity: 1, colorVariants: product.colorVariants || [] });
    }
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    alert(`${product.name} добавлен в корзину!`);
  };

  // Функция переключения статуса избранного для товара
  const handleFavoriteToggle = (productId: number) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  // Фильтрация продуктов, которые находятся в избранном
  const favoriteProducts = products.filter((product) => favorites.includes(product.id));

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 mt-10">
        <div className="max-w-[1920px] mx-auto px-8 py-8">
          {/* Заголовок страницы */}
          <h1 className="font-medium text-[24px] text-[#131313] leading-[28px] mb-6">
            Мои фавориты
          </h1>
          {favoriteProducts.length > 0 ? (
            // Сетка с избранными товарами
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[1px]">
              {favoriteProducts.map((product) => (
                <Card key={product.id} className="w-full max-w-[479px] h-[800px] relative border-none">
                  <CardContent className="p-0 h-full flex flex-col">
                    <div
                      className="w-full h-[671px] bg-cover bg-center"
                      style={{ backgroundImage: `url(${product.image})` }}
                    />
                    <div className="p-2 flex flex-col flex-grow space-y-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-normal text-[11.7px] text-[#131313] font-['Inter',Helvetica] leading-[18px]">
                          {product.name}
                        </h3>
                        {/* Кнопка для переключения избранного */}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="p-0 h-auto w-auto"
                          onClick={() => handleFavoriteToggle(product.id)}
                        >
                          <HeartIcon
                            className={`w-4 h-[15px] ${favorites.includes(product.id) ? 'text-black' : 'text-white'}`}
                            fill={favorites.includes(product.id) ? '#000000' : 'none'}
                          />
                        </Button>
                      </div>
                      <p className="text-[12.6px] font-normal text-[#131313] font-['Inter',Helvetica] leading-[18px]">
                        {product.price}
                      </p>
                      {/* Варианты цветов товара */}
                      <div className="flex items-center gap-3 mt-2">
                        {product.colorVariants.map((color, index) => (
                          <div
                            key={index}
                            className="w-3.5 h-3.5 rounded-[7px] bg-cover bg-center"
                            style={{ backgroundImage: `url(${color.image})` }}
                          />
                        ))}
                      </div>
                      {/* Кнопка добавления в корзину */}
                      <Button
                        className="w-full h-11 bg-white text-[#131313] border border-[#131313] rounded-none hover:bg-gray-100 mt-auto"
                        onClick={() => handleAddToCart(product)}
                      >
                        <span className="font-bold text-[12.8px]">
                          ДОБАВИТЬ
                        </span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            // Сообщение, если избранное пусто
            <div className="max-w-7xl mx-auto px-4 py-8 text-center">
              <p className="font-['Montserrat'] text-[18px] text-[#131313]">
                No items in favorites yet.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
