// Импорт React и компонентов UI
import React from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Separator } from "../components/ui/separator";
import { useNavigate } from 'react-router-dom';

// Компонент Footer отвечает за футер сайта
const Footer = (): JSX.Element => {
// Хук для навигации по маршрутам
const navigate = useNavigate();

// Массив ссылок для категорий футера
const footerLinks = [
{ category: "ПОМОЩЬ", links: [], path: "/help" },
{ category: "МОИ ПОКУПКИ", links: [], path: "/purchases" },
{ category: "NEW NOW", links: [], path: "/new" },
{ category: "ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ", links: [] },
];

// Массив ссылок на социальные сети
const socialLinks = [
{ name: "INSTAGRAM", url: "#" },
{ name: "FACEBOOK", url: "#" },
{ name: "TIKTOK", url: "#" },
{ name: "PINTEREST", url: "#" },
];

return (
// Основной контейнер футера
<footer className="w-full bg-white py-6 sm:py-8">
    {/* Контейнер для подписки на рассылку */}
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12">
    <div className="flex flex-col items-center justify-center">
        {/* Текст с призывом к подписке */}
        <p className="font-bold text-[11px] sm:text-[12.5px] text-center text-[#131313] mb-4 sm:mb-6">
        ПОЛУЧАЙТЕ ИНФОРМАЦИЮ ОБ ЭКСКЛЮЗИВНЫХ АКЦИЯХ, ЗАКРЫТЫХ РАСПРОДАЖАХ И
        НОВИНКАХ
        </p>

        {/* Форма подписки с полем ввода и кнопкой */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center">
        <Input
            placeholder="E-mail"
            className="w-[250px] sm:w-[295px] h-10 sm:h-11 border-[#b8b8b8] text-[12px] sm:text-[13px]"
        />
        <Button
            variant="outline"
            className="w-[110px] sm:w-[125px] h-10 sm:h-11 border-[#131313] font-bold text-[11px] sm:text-[12.7px] text-[#131313]"
        >
            Подписаться
        </Button>
        </div>

        {/* Уведомление о политике конфиденциальности */}
        <div className="mt-3 sm:mt-4 text-center">
        <p className="text-[10px] sm:text-[11.9px] text-[#131313] font-normal">
            Подписываясь, Вы подтверждаете, что ознакомились с
        </p>
        <p className="font-bold text-[11px] sm:text-[12.7px] text-[#131313]">
            Политикой конфиденциальности
        </p>
        </div>
    </div>
    </div>

    {/* Разделительная линия */}
    <Separator className="bg-gray-100" />

    {/* Основной контент футера */}
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
    {/* Название региона */}
    <div className="flex justify-center mb-8 sm:mb-16">
        <p className="font-bold text-[11px] sm:text-[12.7px] text-black">КЫРГЫЗСТАН</p>
    </div>

    {/* Ссылки на социальные сети */}
    <div className="flex flex-wrap justify-center gap-6 sm:gap-12 mb-8 sm:mb-16">
        {socialLinks.map((social, index) => (
        <a
            key={index}
            href={social.url}
            className="font-normal text-[12px] sm:text-[13px] text-[#131313]"
        >
            {social.name}
        </a>
        ))}
    </div>

    {/* Навигационные ссылки футера */}
    <div className="flex flex-wrap justify-center gap-4 sm:gap-8 mb-8 sm:mb-16">
        {footerLinks.map((category, index) => (
        category.path ? (
            <button
            key={index}
            onClick={() => navigate(category.path)}
            className={`text-black text-[11px] sm:text-[12.8px] ${
                index === 0 || index === 2 || index === 4
                ? "font-bold"
                : "font-semibold"
            }`}
            >
            {category.category}
            </button>
        ) : (
            <a
            key={index}
            href="#"
            className={`text-black text-[11px] sm:text-[12.8px] ${
                index === 0 || index === 2 || index === 4
                ? "font-bold"
                : "font-semibold"
            }`}
            >
            {category.category}
            </a>
        )
        ))}
    </div>

    {/* Информация об авторских правах */}
    <div className="text-center pb-3 sm:pb-4">
        <p className="font-normal text-[11px] sm:text-[12.3px] text-[#131313]">
        © 2025 EWIMVA Все права защищены
        </p>
    </div>
    </div>
</footer>
);
};

export default Footer;
