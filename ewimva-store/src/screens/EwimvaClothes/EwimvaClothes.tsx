import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
Accordion,
AccordionContent,
AccordionItem,
AccordionTrigger,
} from "../../components/ui/accordion";
import { Card, CardContent } from "../../components/ui/card";
import { HeartIcon } from "lucide-react";
import { Button } from "../../components/ui/button";

interface Product {
id: number;
image: string;
title: string;
alt: string;
name: string;
category: string;
price: string;
composition: string;
origin: string;
care: string;
photosLarge: { src: string; alt: string }[];
photosSmall: { src: string; alt: string }[];
color: string;
description: string;
}

export const EwimvaClothes = (): JSX.Element => {
const { id } = useParams<{ id: string }>();
const productId = id ? parseInt(id, 10) : 1;
const navigate = useNavigate();

const [favorites, setFavorites] = useState<number[]>(() => {
const savedFavorites = localStorage.getItem("favorites");
return savedFavorites ? JSON.parse(savedFavorites) : [];
});

useEffect(() => {
localStorage.setItem("favorites", JSON.stringify(favorites));
}, [favorites]);

const handleFavoriteToggle = (productId: number) => {
setFavorites((prev) =>
    prev.includes(productId)
    ? prev.filter((id) => id !== productId)
    : [...prev, productId]
);
};

const handlePurchase = (product: Product) => {
const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
const existingItem = cartItems.find((item: any) => item.id === product.id);
if (existingItem) {
    existingItem.quantity += 1;
} else {
    cartItems.push({
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.image,
    quantity: 1,
    colorVariants: [],
    });
}
localStorage.setItem('cartItems', JSON.stringify(cartItems));
alert(`${product.name} добавлен в корзину!`);
};

const products: Product[] = [
{
    id: 1,
    image: "/87028650-tc.png",
    title: "Топ на бретелях с квадратным декольте",
    alt: "Element",
    name: "RIBBED HALTER-NECK TOP",
    category: "TOPS",
    price: "KGS 3 490,00",
    composition: "63% viscose, 37% polyamide",
    origin: "Разработано в Барселоне, Производство: Китай",
    care: "Ручная стирка при 30 °С, Отбеливать запрещено, Гладить при 110 °С, Химчистка запрещена, Запрещено сушить в сушилке",
    photosLarge: [
    { src: "/87028650-tc.png", alt: "Pervayz" },
    { src: "/87028650-tc.png", alt: "Element r" },
    ],
    photosSmall: [
    { src: "/87098645-05-01-d1.png", alt: "Element" },
    { src: "/87098645-05-01-d8.png", alt: "Element" },
    { src: "/87098645-05-01-b.png", alt: "Element b" },
    { src: "/87098645-05-01-d0.png", alt: "Element" },
    ],
    color: "Экрю",
    description: "Трикотажная ткань в рубчик. Приталенный дизайн. Воротник-халтер. Без рукавов. Без застежки.",
},
{
    id: 2,
    image: "/87037183-2.png",
    title: "Топ из тонкого трикотажа с декольте",
    alt: "Element",
    name: "THIN KNIT TOP WITH DECOLLETE",
    category: "TOPS",
    price: "KGS 3 490,00",
    composition: "65% cotton, 35% polyester",
    origin: "Разработано в Париже, Производство: Вьетнам",
    care: "Машинная стирка при 40 °С, Отбеливать запрещено, Гладить при 150 °С, Химчистка разрешена, Сушка в сушилке разрешена",
    photosLarge: [
    { src: "/new-large-1.png", alt: "New Large 1" },
    { src: "/new-large-2.png", alt: "New Large 2" },
    ],
    photosSmall: [
    { src: "/new-small-1.png", alt: "New Small 1" },
    { src: "/new-small-2.png", alt: "New Small 2" },
    { src: "/new-small-3.png", alt: "New Small 3" },
    { src: "/new-small-4.png", alt: "New Small 4" },
    ],
    color: "Черный",
    description: "Легкая трикотажная ткань. Глубокое декольте. Идеально для повседневного образа.",
},
{
    id: 3,
    image: "/87077180-3.png",
    title: "Трикотажный топ с воротником поло",
    alt: "Element",
    name: "KNIT TOP WITH POLO COLLAR",
    category: "TOPS",
    price: "KGS 3 490,00",
    composition: "70% cotton, 30% elastane",
    origin: "Разработано в Милане, Производство: Турция",
    care: "Ручная стирка при 30 °С, Отбеливать запрещено, Гладить при 110 °С, Химчистка запрещена, Запрещено сушить в сушилке",
    photosLarge: [
    { src: "/polo-large-1.png", alt: "Polo Large 1" },
    { src: "/polo-large-2.png", alt: "Polo Large 2" },
    ],
    photosSmall: [
    { src: "/polo-small-1.png", alt: "Polo Small 1" },
    { src: "/polo-small-2.png", alt: "Polo Small 2" },
    { src: "/polo-small-3.png", alt: "Polo Small 3" },
    { src: "/polo-small-4.png", alt: "Polo Small 4" },
    ],
    color: "Белый",
    description: "Удобный топ с воротником поло. Подходит для спорта и отдыха.",
},
{
    id: 4,
    image: "/87026337-4.png",
    title: "Укороченный хлопковый топ хлопок без рук…",
    alt: "Element",
    name: "CROPPED COTTON TOP",
    category: "TOPS",
    price: "KGS 3 490,00",
    composition: "100% cotton",
    origin: "Разработано в Лондоне, Производство: Индия",
    care: "Машинная стирка при 40 °С, Отбеливать запрещено, Гладить при 150 °С, Химчистка разрешена, Сушка в сушилке разрешена",
    photosLarge: [
    { src: "/cotton-large-1.png", alt: "Cotton Large 1" },
    { src: "/cotton-large-2.png", alt: "Cotton Large 2" },
    ],
    photosSmall: [
    { src: "/cotton-small-1.png", alt: "Cotton Small 1" },
    { src: "/cotton-small-2.png", alt: "Cotton Small 2" },
    { src: "/cotton-small-3.png", alt: "Cotton Small 3" },
    { src: "/cotton-small-4.png", alt: "Cotton Small 4" },
    ],
    color: "Синий",
    description: "Укороченный топ из мягкого хлопка. Без рукавов. Отличный выбор для лета.",
},
{
    id: 5,
    image: "/87037184-05.png",
    title: "Вязаный топ с V-образной горловиной",
    alt: "Element",
    name: "KNITTED TOP WITH V-NECK",
    category: "TOPS",
    price: "KGS 3 490,00",
    composition: "60% wool, 40% acrylic",
    origin: "Разработано в Нью-Йорке, Производство: Китай",
    care: "Ручная стирка при 30 °С, Отбеливать запрещено, Гладить при 110 °С, Химчистка запрещена, Запрещено сушить в сушилке",
    photosLarge: [
    { src: "/vneck-large-1.png", alt: "V-Neck Large 1" },
    { src: "/vneck-large-2.png", alt: "V-Neck Large 2" },
    ],
    photosSmall: [
    { src: "/vneck-small-1.png", alt: "V-Neck Small 1" },
    { src: "/vneck-small-2.png", alt: "V-Neck Small 2" },
    { src: "/vneck-small-3.png", alt: "V-Neck Small 3" },
    { src: "/vneck-small-4.png", alt: "V-Neck Small 4" },
    ],
    color: "Зеленый",
    description: "Теплый вязаный топ с V-образным вырезом. Подходит для прохладной погоды.",
},
];

const selectedProduct = products.find((p) => p.id === productId) || products[0];

// Size options data
const sizes = ["XXS", "XS", "S", "M", "L", "XL"];

return (
<div className="bg-white flex flex-row justify-center w-full" data-model-id="1:8" style={{ marginTop: '56px' }}>
    <div className="bg-white w-full max-w-[1920px] relative">
    <div className="flex">
        <div className="flex-1 min-w-[1150px]">
        <div className="grid grid-cols-2">
            {selectedProduct.photosLarge.map((photo, index) => (
            <img
                key={index}
                className="w-full h-[802px] object-cover"
                alt={photo.alt}
                src={photo.src}
            />
            ))}
        </div>
        <div className="grid grid-cols-4">
            {selectedProduct.photosSmall.map((photo, index) => (
            <img
                key={index}
                className="w-full h-[401px] object-cover"
                alt={photo.alt}
                src={photo.src}
            />
            ))}
        </div>
        </div>

        <div className="w-[770px] bg-white px-8">
        <Card className="border-none shadow-none">
            <CardContent className="p-0">
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="composition" className="border-none">
                <AccordionTrigger className="py-2">
                    <span className="font-bold text-[#131313] text-[12.4px] text-center whitespace-nowrap [font-family:'Inter',Helvetica] tracking-[0] leading-[18px]">
                    Состав, происхождение и уход
                    </span>
                </AccordionTrigger>
                <AccordionContent>
                    <div className="[font-family:'Inter',Helvetica] font-normal text-[#131313] text-[12.4px] tracking-[0] leading-[18px]">
                    <span className="font-bold">
                        Состав
                        <br />
                    </span>
                    <span className="font-medium">
                        Composition: {selectedProduct.composition}
                        <br />
                    </span>
                    <span className="font-bold">
                        <br />
                        Происхождение
                        <br />
                    </span>
                    <span className="font-medium">
                        {selectedProduct.origin}
                        <br />
                    </span>
                    <span className="font-bold">
                        <br />
                        Уход
                        <br />
                    </span>
                    <span className="font-medium">
                        {selectedProduct.care.split(", ").map((line, index) => (
                        <React.Fragment key={index}>
                            {line}
                            <br />
                        </React.Fragment>
                        ))}
                    </span>
                    </div>
                </AccordionContent>
                </AccordionItem>
            </Accordion>
            <div className="w-full max-w-[592px] py-6">
                <div className="mb-2 font-normal text-[13px] text-[#131313] leading-[18px]">
                {selectedProduct.name}
                </div>

                <div className="mb-6 font-normal text-[12.7px] text-[#131313] leading-[18px]">
                {selectedProduct.price}
                </div>

                <div className="flex items-center mb-6">
                <div className="w-[34px] h-[34px] relative">
                    <div className="relative w-[18px] h-[18px] top-2 left-2">
                    <div className="bg-[url(/----------------------.png)] absolute w-[18px] h-[18px] top-0 left-0 opacity-50 bg-cover bg-[50%_50%]" />
                    <div className="absolute w-6 h-px top-2 left-[-3px] bg-[#131313] -rotate-45" />
                    </div>
                </div>

                <div className="w-[34px] h-[34px] relative">
                    <div className="absolute w-[18px] h-px top-[29px] left-2 bg-[#131313]" />
                    <div className="absolute w-[18px] h-[18px] top-2 left-2">
                    <div className="bg-[url(/--------------------.png)] absolute w-[18px] h-[18px] top-0 left-0 opacity-50 bg-cover bg-[50%_50%]" />
                    <div className="absolute w-6 h-px top-2 left-[-3px] bg-[#131313] -rotate-45" />
                    </div>
                </div>

                <div className="ml-auto font-normal text-[12.2px] text-[#131313] text-right">
                    {selectedProduct.color}
                </div>
                </div>

                <Card className="border-0 shadow-none">
                <CardContent className="p-0">
                    <div className="border-t border-b border-[#d7d7d8]">
                    {sizes.map((size, index) => (
                        <div
                        key={size}
                        className={`h-9 flex items-center ${index !== sizes.length - 1 ? "border-b border-[#d7d7d8]" : ""}`}
                        >
                        <div className="ml-4 font-normal text-[13px] text-[#131313]">
                            {size}
                        </div>
                        </div>
                    ))}
                    </div>
                </CardContent>
                </Card>

                <div className="mt-3 mb-6">
                <button
                    className="font-bold text-[12.6px] text-[#131313] underline"
                    onClick={() => navigate("/help")}
                >
                    Таблица размеров
                </button>
                </div>

                <div className="flex flex-col gap-3">
                <Button
                    className="w-full h-11 bg-[#131313] text-white rounded-none hover:bg-[#2a2a2a]"
                    onClick={() => handleFavoriteToggle(selectedProduct.id)}
                >
                    <img
                    className="w-[19px] h-[18px] mr-1.5"
                    alt="Heart icon"
                    src="/vector-5.svg"
                    />
                    <span className="font-bold text-[12.8px]">
                    {favorites.includes(selectedProduct.id)
                        ? "Убрать из Фаворитов"
                        : "Добавить в Фавориты"}
                    </span>
                </Button>
                <Button
                    className="w-full h-11 bg-white text-[#131313] border border-[#131313] rounded-none hover:bg-gray-100"
                    onClick={() => handlePurchase(selectedProduct)}
                >
                    <span className="font-bold text-[12.8px]">
                    Приобрести
                    </span>
                </Button>
                </div>
            </div>
            </CardContent>
        </Card>
        </div>
    </div>

    <div className="px-[196px] py-8">
        <div className="font-bold text-[#131313] text-[12.7px] tracking-[0] leading-[18px] [font-family:'Inter',Helvetica]">
        ОПИСАНИЕ
        </div>
        <div className="font-normal text-[#131313] text-[11.9px] [font-family:'Inter',Helvetica] tracking-[0] leading-[18px] mt-2">
        {selectedProduct.description}
        </div>
    </div>

    <section className="w-full py-8 px-8">
        <h2 className="font-bold text-[12.4px] text-[#131313] mb-[68px] font-['Inter',Helvetica] leading-[18px]">
        В ТОМ ЖЕ СТИЛЕ
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-[1px]">
        {products.map((product) => (
            <Card
            key={product.id}
            className="w-full max-w-[308px] h-[471px] bg-white border-none rounded-none"
            >
            <CardContent className="p-0">
                <div className="relative h-full">
                <img
                    className="w-full h-[432px] object-cover"
                    alt={product.alt}
                    src={product.image}
                />
                <div className="flex justify-between items-center px-2 mt-3">
                    <p className="font-normal text-[11.9px] text-[#131313] leading-[18px] font-['Inter',Helvetica] truncate max-w-[238px]">
                    {product.title}
                    </p>
                    <HeartIcon className="w-4 h-[15px]" />
                </div>
                </div>
            </CardContent>
            </Card>
        ))}
        </div>
    </section>
    </div>
</div>
);
};

export default EwimvaClothes;