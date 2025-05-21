// Импорт необходимых библиотек и компонентов
import React, { useState } from 'react';
import { ProductSection } from '../../components/ProductSection';
import { Card, CardContent } from "../../components/ui/card";
import { HeartIcon } from "lucide-react";

// Список товаров, доступных для поиска
const products = [
  {
    id: 1,
    name: 'Lyocell V-neck midi dress',
    category: 'CAPSULE',
    price: 'KGS 12 990,00',
    image: '/87028650-tc.png',
    colorVariants: [],
  },
  {
    id: 2,
    name: 'Embroidered shirt dress with belt',
    category: 'NEW NOW - SELECTION',
    price: 'KGS 12 990,00',
    image: '/87029065-01-99999999-01.png',
    colorVariants: [],
  },
  {
    id: 3,
    name: 'Полупрозрачное комбинированное платье',
    category: 'CAPSULE',
    price: 'KGS 12 990,00',
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
    price: 'KGS 12 990,00',
    image: '/87077907-05-d7.png',
    colorVariants: [],
  },
  {
    id: 5,
    name: 'Платье из смесового льна с оборкой',
    category: 'CAPSULE',
    price: 'KGS 12 990,00',
    image: '/87087899-99-d6.png',
    colorVariants: [],
  },
  {
    id: 6,
    name: 'Джемпер букле с круглой горловиной',
    category: 'NEW NOW - SELECTION',
    price: 'KGS 12 990,00',
    image: '/87060612-05-99999999-01.png',
    colorVariants: [],
  },
  {
    id: 7,
    name: 'Вязаный жакет с нарядными пуговицами',
    category: 'NEW NOW',
    price: 'KGS 12 990,00',
    image: '/87014094-99-d2.png',
    colorVariants: [
      { color: '03', image: '/03-2.png' },
      { color: '32', image: '/32-2.png' },
    ],
  },
  {
    id: 8,
    name: 'Вязаный кардиган с пуговицами-стразами',
    category: 'NEW NOW - SELECTION',
    price: 'KGS 12 990,00',
    image: '/87090451-05.png',
    colorVariants: [],
  },
  {
    id: 9,
    name: 'Хлопковая футболка с контрастными окантовками',
    category: 'NEW NOW - SELECTION',
    price: 'KGS 12 990,00',
    image: '/87099211-01-d2.png',
    colorVariants: [],
  },
  {
    id: 10,
    name: 'Футболка из смесового хлопка',
    category: 'NEW NOW - SELECTION',
    price: 'KGS 12 990,00',
    image: '/77073266-ta-d1.png',
    colorVariants: [],
  },
  {
    id: 11,
    name: 'Драпированное платье с цветочным принтом',
    category: 'NEW NOW',
    price: 'KGS 12 990,00',
    image: '/87038267-05-d2-1.png',
    colorVariants: [
      { color: '03', image: '/03-2.png' },
      { color: '32', image: '/32-2.png' },
    ],
  },
  {
    id: 12,
    name: 'Вязаный жилет с нарядными пуговицами',
    category: 'NEW NOW - SELECTION',
    price: 'KGS 12 990,00',
    image: '/87079065-56-d2.png',
    colorVariants: [],
  },
  {
    id: 13,
    name: 'Толстовка с высоким воротником и молнией',
    category: 'CAPSULE',
    price: 'KGS 12 990,00',
    image: '/77097691-35.png',
    colorVariants: [],
  },
  {
    id: 14,
    name: 'Асимметричное платье с воротником-бантом',
    category: 'CAPSULE',
    price: 'KGS 12 990,00',
    image: '/87038267-05-d2-4.png',
    colorVariants: [],
  },
  {
    id: 15,
    name: 'Меланжевый кардиган с косами',
    category: 'NEW NOW',
    price: 'KGS 12 990,00',
    image: '/87050367-92.png',
    colorVariants: [
      { color: '03', image: '/03-2.png' },
      { color: '32', image: '/32-2.png' },
    ],
  },
  {
    id: 16,
    name: 'Футболка с асимметричной горловиной и сборками',
    category: 'NEW NOW - SELECTION',
    price: 'KGS 12 990,00',
    image: '/87085755-07.png',
    colorVariants: [],
  },
  {
    id: 17,
    name: 'Тренч оверсайз с ремнем',
    category: 'NEW NOW - SELECTION',
    price: 'KGS 12 990,00',
    image: '/87093294-05-99999999-01.png',
    colorVariants: [],
  },
  {
    id: 18,
    name: 'Парка оверсайз на молнии',
    category: 'NEW NOW - SELECTION',
    price: 'KGS 12 990,00',
    image: '/87038267-05-d2-5.png',
    colorVariants: [],
  },
  {
    id: 19,
    name: 'Платье А-силуэта из кружева',
    category: 'NEW NOW',
    price: 'KGS 12 990,00',
    image: '/87035749-30-d6.png',
    colorVariants: [
      { color: '03', image: '/03-2.png' },
      { color: '32', image: '/32-2.png' },
    ],
  },
  {
    id: 20,
    name: 'Длинный тренч с двубортной застежкой',
    category: 'NEW NOW - SELECTION',
    price: 'KGS 12 990,00',
    image: '/87075142-37-99999999-01.png',
    colorVariants: [],
  },
  {
    id: 21,
    name: 'Костюмные брюки изо льна',
    category: 'CAPSULE',
    price: 'KGS 12 990,00',
    image: '/87067706-06-d2--1-.png',
    colorVariants: [],
  },
  {
    id: 22,
    name: 'Lyocell palazzo pants',
    category: 'NEW NOW - SELECTION',
    price: 'KGS 12 990,00',
    image: '/87028650-tc-99999999-01.png',
    colorVariants: [],
  },
  {
    id: 23,
    name: 'Прямые костюмные брюки из смесового льна',
    category: 'NEW NOW',
    price: 'KGS 12 990 TSP,00',
    image: '/87038267-05-d2.png',
    colorVariants: [
      { color: '03', image: '/03-2.png' },
      { color: '32', image: '/32-2.png' },
    ],
  },
  {
    id: 24,
    name: 'Прямые костюмные брюки из смесового льна',
    category: 'NEW NOW - SELECTION',
    price: 'KGS 12 990,00',
    image: '/87068640-05-d1.png',
    colorVariants: [],
  },
  {
    id: 25,
    name: 'Прямое платье с драпировкой',
    category: 'CAPSULE',
    price: 'KGS 12 990,00',
    image: '/87038267-05-d2-2.png',
    colorVariants: [],
  },
  {
    id: 26,
    name: 'Короткий тренч из денима с поясом',
    category: 'NEW NOW - SELECTION',
    price: 'KGS 12 990,00',
    image: '/87075741-ts-02-d7.png',
    colorVariants: [],
  },
  {
    id: 27,
    name: 'Объемный тренч из хлопка',
    category: 'NEW NOW',
    price: 'KGS 12 990,00',
    image: '/87038267-05-d2-3.png',
    colorVariants: [
      { color: '03', image: '/03-2.png' },
      { color: '32', image: '/32-2.png' },
    ],
  },
  {
    id: 28,
    name: 'Куртка-бомбер со сборками',
    category: 'NEW NOW - SELECTION',
    price: 'KGS 12 990,00',
    image: '/87063290-92-d7.png',
    colorVariants: [],
  },
];

// Компонент для отображения карточки товара с цветами и кнопкой избранного
const ItemWrapper = (): JSX.Element => {
  const product = {
    name: "Прямой костюмный пиджак",
    price: "KGS 8 990,00",
    image: "/-------------------------------------------------.png",
    colors: [
      { id: 1, image: "/52.png" },
      { id: 2, image: "/05.png", selected: true },
    ],
  };

  return (
    <Card className="w-full max-w-[479px] mx-auto">
      <div className="relative">
        {/* Изображение товара */}
        <div
          className="w-full h-[671px] bg-cover bg-center"
          style={{ backgroundImage: `url(${product.image})` }}
        />
        {/* Кнопка для добавления в избранное */}
        <button className="absolute top-6 right-6">
          <HeartIcon className="w-4 h-[15px]" />
        </button>
      </div>

      <CardContent className="pt-3 pb-6">
        {/* Название товара */}
        <h3 className="font-normal text-[#131313] text-[11.8px] leading-[18px] font-['Inter',Helvetica] mb-0">
          {product.name}
        </h3>
        {/* Цена товара */}
        <p className="text-[12.8px] font-['Inter',Helvetica] font-normal text-[#131313] leading-[18px] mt-0">
          {product.price}
        </p>
        {/* Варианты цветов товара */}
        <div className="flex gap-3 mt-3">
          {product.colors.map((color) => (
            <div key={color.id} className="relative">
              <div
                className={`w-3.5 h-3.5 rounded-[7px] bg-cover bg-center`}
                style={{ backgroundImage: `url(${color.image})` }}
              />
              {color.selected && (
                <div className="w-[18px] h-[18px] absolute top-[-2px] left-[-3px] rounded-[9px] border border-solid border-[#131313]" />
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// Компонент для отображения простой карточки товара
const Item = (): JSX.Element => {
  return (
    <Card className="w-full max-w-[479px] rounded-none border-none">
      {/* Изображение товара */}
      <div className="bg-[url(/----------------------------------------.png)] w-full h-[671px] bg-cover bg-center" />
      <CardContent className="p-2 relative">
        {/* Название товара */}
        <div className="text-[11.7px] font-normal text-[#131313] leading-[18px] font-['Inter',Helvetica] tracking-[0]">
          Структурный пиджак с поясом
        </div>
        {/* Цена товара */}
        <div className="text-[12.6px] font-normal text-[#131313] tracking-[0] leading-[18px] font-['Inter',Helvetica]">
          KGS 12 990,00
        </div>
        {/* Кнопка для добавления в избранное */}
        <HeartIcon className="absolute right-2 bottom-2 w-4 h-[15px]" />
      </CardContent>
    </Card>
  );
};

// Компонент для отображения карточки товара с дополнительной информацией
const DivWrapper = (): JSX.Element => {
  return (
    <div className="w-full max-w-[479px] mx-auto">
      <Card className="border-none shadow-none">
        <CardContent className="p-0">
          <div className="flex flex-col">
            {/* Изображение товара */}
            <div className="bg-[url(/---------------------------------------------.png)] w-full h-[671px] bg-cover bg-center" />
            <div className="mt-3 px-2">
              {/* Название товара */}
              <h3 className="font-normal text-[#131313] text-[11.7px] leading-[18px] font-['Inter',Helvetica] tracking-[0]">
                Костюмный пиджак в узкую полоску
              </h3>
              <div className="flex justify-between items-center mt-1">
                {/* Цена товара */}
                <p className="text-[12.8px] font-['Inter',Helvetica] font-normal text-[#131313] tracking-[0] leading-[18px]">
                  KGS 9 990,00
                </p>
                {/* Кнопка для добавления в избранное */}
                <HeartIcon className="w-4 h-[15px] text-black" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Компонент для отображения карточки товара с цветами и геометрическим узором
const Div = (): JSX.Element => {
  const product = {
    name: "Трикотажный пиджак с геометрическим узором",
    price: "KGS 4 990,00",
    image: "/-------------------------------------------------------.png",
    colors: [
      { id: 1, image: "/43.png", selected: true },
      { id: 2, image: "/07.png", selected: false },
    ],
  };

  return (
    <Card className="w-full max-w-[479px] border-none">
      <CardContent className="p-0">
        {/* Изображение товара */}
        <div
          className="w-full h-[671px] bg-cover bg-center"
          style={{ backgroundImage: `url(${product.image})` }}
        />
        <div className="mt-3 px-2">
          {/* Название товара */}
          <h3 className="font-normal text-[11.7px] leading-[18px] text-[#131313] font-['Inter',Helvetica] tracking-[0]">
            {product.name}
          </h3>
          {/* Цена товара */}
          <p className="mt-1 font-normal text-[12.8px] leading-[18px] text-[#131313] font-['Inter',Helvetica] tracking-[0]">
            {product.price}
          </p>
          {/* Варианты цветов товара */}
          <div className="flex items-center mt-3 gap-3">
            {product.colors.map((color) => (
              <div key={color.id} className="relative">
                <div
                  className={`w-3.5 h-3.5 rounded-[7px] bg-cover bg-center`}
                  style={{ backgroundImage: `url(${color.image})` }}
                />
                {color.selected && (
                  <div className="absolute top-[-2px] left-[-2px] w-[18px] h-[18px] rounded-[9px] border border-solid border-[#131313]" />
                )}
              </div>
            ))}
          </div>
        </div>
        {/* Кнопка для добавления в избранное */}
        <button className="absolute top-[694px] right-7">
          <HeartIcon className="w-4 h-[15px]" />
        </button>
      </CardContent>
    </Card>
  );
};

// Основной компонент страницы поиска
export default function EwimvaSeorch(): JSX.Element {
  // Состояние для хранения поискового запроса
  const [searchQuery, setSearchQuery] = useState('');

  // Фильтрация товаров по поисковому запросу
  const filteredProducts = searchQuery
    ? products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    // Основной контейнер страницы
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 pt-16">
        <div className="max-w-7xl mx-auto px-4 py-4">
          {/* Поле ввода поискового запроса */}
          <div className="flex items-center gap-4 mb-4">
            <input
              type="text"
              placeholder="ИСКАТЬ"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-[500px] border-[#00000040] rounded-md focus:border-[#131313] focus:ring-1 focus:ring-[#131313] p-2"
            />
          </div>
          {searchQuery && (
            filteredProducts.length > 0 ? (
              // Отображение найденных товаров
              <ProductSection products={filteredProducts} />
            ) : (
              // Сообщение, если товары не найдены
              <div className="text-center py-8">
                <p className="font-['Montserrat'] text-[18px] text-[#131313]">
                  Товар не найден.
                </p>
              </div>
            )
          )}
        </div>
      </main>
    </div>
  );
}
