// Импорт React и NavLink для создания навигационных ссылок
import React from "react";
import { NavLink } from 'react-router-dom';

// Компонент AdminSidebar отвечает за боковую панель навигации в административной панели
export default function AdminSidebar(): JSX.Element {
// Массив элементов навигации с их названиями, иконками и маршрутами
const navItems = [
{ name: 'ДАШБОРД', icon: '/group.png', to: '/dashboard' },
{ name: 'ТОВАРЫ', icon: '/---icon--ad-product--1.png', to: '/products' },
{ name: 'ЗАКАЗЫ', icon: '/---icon--buy-.png', to: '/orders' },
{ name: 'ПОЛЬЗОВАТЕЛИ', icon: '/vector-4.svg', to: '/users' },
];

return (
<>
    {/* Стили для адаптивного отображения боковой панели на мобильных устройствах */}
    <style>
    {`
        @media (max-width: 767px) {
        /* Боковая панель: уменьшение ширины */
        aside[class*="w-[250px]"] {
            width: 60px !important;
        }

        /* Контейнер навигации: уменьшение отступа сверху */
        nav[class*="mt-[200px]"] {
            margin-top: 32px !important;
        }

        /* Ссылки навигации: центрирование содержимого */
        a[class*="flex items-center py-2 px-8"] {
            justify-content: center !important;
            padding: 8px !important;
        }

        /* Текст навигации: скрытие текста на мобильных устройствах */
        span[class*="text-[12.7px]"] {
            display: none !important;
        }

        /* Иконки: удаление отступа справа */
        img[class*="w-5 h-5 mr-4"],
        div[class*="w-[19px] h-[19px] mr-4"] {
            margin-right: 0 !important;
        }
        }
    `}
    </style>
    {/* Боковая панель с фиксированной шириной и границей */}
    <aside className="w-[250px] h-[calc(150vh-3.5rem)] bg-white border-r border-[#00000040] flex flex-col">
    {/* Навигационное меню */}
    <nav className="mt-[100px] flex flex-col">
        {/* Перебор элементов навигации для создания ссылок */}
        {navItems.map((item, index) => (
        <NavLink
            key={index}
            to={item.to}
            className={({ isActive }) =>
            `flex items-center py-2 px-8 font-bold ${isActive ? 'text-[#131313] border-l-4 border-[#131313] bg-[#f7f7f7]' : 'text-[#131313]'}` // Стили для активной и неактивной ссылки
            }
        >
            {/* Условное отображение иконки: для 'ДАШБОРД' используется div, для остальных img */}
            {item.icon === '/group.png' ? (
            <div className="w-[19px] h-[19px] mr-4 bg-[url(/group.png)] bg-[100%_100%]" />
            ) : (
            <img
                className={`w-5 h-5 mr-4`}
                alt={item.name}
                src={item.icon}
            />
            )}
            {/* Текст ссылки */}
            <span className="font-['Inter'] text-[12.7px]">
            {item.name}
            </span>
        </NavLink>
        ))}
    </nav>
    </aside>
</>
);
}
