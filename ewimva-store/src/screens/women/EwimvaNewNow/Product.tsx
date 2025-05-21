import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
Accordion,
AccordionContent,
AccordionItem,
AccordionTrigger,
} from "../../../components/ui/accordion";
import { Card, CardContent } from "../../../components/ui/card";
import { HeartIcon } from "lucide-react";
import { Button } from "../../../components/ui/button";

interface Photo {
src: string;
alt: string;
}

interface Product {
id: number;
name: string;
category: string;
price: string;
image: string;
colorVariants: any[];
composition: string;
origin: string;
care: string;
photosLarge: Photo[];
photosSmall: Photo[];
color: string;
description: string;
}

export const Product = (): JSX.Element => {
const { id } = useParams<{ id: string }>();
const productId = id ? parseInt(id, 10) : 1;
const navigate = useNavigate();

const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
const [products, setProducts] = useState<Product[]>([]);
const [favorites, setFavorites] = useState<number[]>(() => {
const savedFavorites = localStorage.getItem("favorites");
return savedFavorites ? JSON.parse(savedFavorites) : [];
});
const [currentImageIndex, setCurrentImageIndex] = useState(0);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);

useEffect(() => {
const fetchData = async () => {
    try {
    // Загрузка выбранного товара
    const productResponse = await fetch(`http://localhost:3001/products/${productId}`);
    if (!productResponse.ok) {
        throw new Error('Товар не найден');
    }
    const productData: Product = await productResponse.json();
    setSelectedProduct(productData);

    // Загрузка всех товаров для секции "В том же стиле"
    const productsResponse = await fetch('http://localhost:3001/products');
    if (!productsResponse.ok) {
        throw new Error('Ошибка загрузки товаров');
    }
    const productsData: Product[] = await productsResponse.json();
    setProducts(productsData);
    } catch (err) {
    setError('Не удалось загрузить данные. Попробуйте позже.');
    } finally {
    setLoading(false);
    }
};

fetchData();
}, [productId]);

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

if (loading) {
return <div className="p-8 text-center font-['Inter'] text-[24px] text-[#131313]">Загрузка...</div>;
}

if (error || !selectedProduct) {
return <div className="p-8 text-center font-['Inter'] text-[24px] text-red-500">{error || 'Товар не найден'}</div>;
}

const allPhotos = [...selectedProduct.photosLarge, ...selectedProduct.photosSmall];

const nextImage = () => {
setCurrentImageIndex((prev) => (prev + 1) % allPhotos.length);
};

const prevImage = () => {
setCurrentImageIndex((prev) => (prev - 1 + allPhotos.length) % allPhotos.length);
};

const sizes = ["XXS", "XS", "S", "M", "L", "XL"];

return (
<div className="bg-white flex flex-row justify-center w-full" style={{ marginTop: '56px' }}>
    <div className="bg-white w-full max-w-[1920px] relative">
    <div className="flex flex-col md:flex-row">
        {/* Mobile Carousel */}
        <div className="md:hidden w-full relative">
        <div className="relative w-full h-[500px] overflow-hidden">
            <img
            className="w-full h-auto max-h-[500px] object-contain"
            src={allPhotos[currentImageIndex].src}
            alt={allPhotos[currentImageIndex].alt}
            />
            <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full z-10"
            >
            ←
            </button>
            <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full z-10"
            >
            →
            </button>
        </div>
        <div className="flex justify-center mt-4 space-x-2">
            {allPhotos.map((_, index) => (
            <button
                key={index}
                className={`w-2 h-2 rounded-full ${index === currentImageIndex ? 'bg-gray-800' : 'bg-gray-400'}`}
                onClick={() => setCurrentImageIndex(index)}
            />
            ))}
        </div>
        </div>

        {/* Desktop Photo Grid */}
        <div className="hidden md:block flex-1 min-w-[1150px]">
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

        {/* Product Details */}
        <div className="w-full md:w-[770px] bg-white px-8 md:px-8 py-4 md:py-0 relative z-10">
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
                <div className="mb-2 font-bold text-[13px] text-[#131313] leading-[18px]">
                {selectedProduct.name}
                </div>

                <div className="mb-6 font-normal text-[12.7px] text-[#131313] leading-[18px]">
                {selectedProduct.price}
                </div>

                <div className="flex items-center mb-6">
                <div className="ml-auto font-normal text-[12.2px] text-[#131313] text-right">
                    {selectedProduct.color}
                </div>
                </div>

                {/* Sizes (hidden on mobile, shown on desktop) */}
                <div className="hidden md:block">
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
                </div>

                <div className="mt-3 mb-2 md:mb-6">
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

    <div className="px-8 md:px-[196px] py-8 relative z-10">
        <div className="font-bold text-[#131313] text-[12.7px] tracking-[0] leading-[18px] [font-family:'Inter',Helvetica]">
        ОПИСАНИЕ
        </div>
        <div className="font-normal text-[#131313] text-[11.9px] [font-family:'Inter',Helvetica] tracking-[0] leading-[18px] mt-2">
        {selectedProduct.description}
        </div>
    </div>

    <section className="w-full py-8 px-0 relative z-10">
        <h2 className="font-bold text-[14px] text-[#131313] mb-[68px] font-['Inter',Helvetica] leading-[18px] px-8 md:px-9">
        В ТОМ ЖЕ СТИЛЕ
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
        {products.map((product) => (
            <Card
            key={product.id}
            className="w-full h-[550px] bg-white border-none rounded-none overflow-hidden"
            >
            <CardContent className="p-0">
                <div className="relative h-full">
                <img
                    className="w-full h-[511px] object-cover"
                    alt={product.name}
                    src={product.image}
                />
                <div className="flex justify-between items-center px-2 mt-3 relative z-10">
                    <p className="font-normal text-[11.9px] text-[#131313] leading-[18px] font-['Inter',Helvetica] truncate max-w-[80%]">
                    {product.name}
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

export default Product;