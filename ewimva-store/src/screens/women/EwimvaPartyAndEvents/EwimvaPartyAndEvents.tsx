import React, { useState, useEffect } from 'react';
import { ProductSection } from "../../../components/ProductSection";
import { ChevronDownIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { categories } from '../../../data/categories';

interface ColorVariant {
color: string;
image: string;
}

interface Product {
id: number;
name: string;
category: string;
price: string;
image: string;
colorVariants: ColorVariant[];
gender?: 'male' | 'female' | 'unisex';
}

export default function EwimvaPartyAndEvents(): JSX.Element {
const [isCategoryOpen, setIsCategoryOpen] = useState(false);
const [products, setProducts] = useState<Product[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);
const navigate = useNavigate();

useEffect(() => {
const fetchProducts = async () => {
    try {
    const response = await fetch('http://localhost:3001/products?category=Вечерние&gender=female');
    if (!response.ok) {
        throw new Error('Ошибка загрузки вечерних платьев');
    }
    const data = await response.json();
    const formattedData: Product[] = data.map((item: any) => ({
        id: Number(item.id),
        name: item.name,
        category: item.category,
        price: item.price,
        image: item.image,
        colorVariants: item.colorVariants || [],
        gender: item.gender,
    }));
    setProducts(formattedData);
    } catch (err) {
    setError('Не удалось загрузить вечерние платья. Попробуйте позже.');
    } finally {
    setLoading(false);
    }
};

fetchProducts();
}, []);

if (loading) {
return <div className="p-8 text-center font-['Montserrat'] text-[24px] text-[#131313]">Загрузка...</div>;
}

if (error) {
return <div className="p-8 text-center font-['Montserrat'] text-[24px] text-red-500">{error}</div>;
}

return (
<>
    <style>
    {`
        @media (max-width: 767px) {
        .new-now-container div[class*="grid-cols-4"],
        .new-now-container div.grid-cols-4 {
            display: grid !important;
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 0px !important;
            background-color: rgb(255, 255, 255) !important;
        }
        .new-now-container .product-card,
        .new-now-container .item-card,
        .new-now-container div[class*="product-card"],
        .new-now-container div[class*="item-card"] {
            font-size: 12px !important;
            background-color: rgb(255, 255, 255) !important;
        }
        .new-now-container .product-card p,
        .new-now-container .product-card span,
        .new-now-container .product-card div,
        .new-now-container .item-card p,
        .new-now-container .item-card span,
        .new-now-container .item-card div {
            font-size: 12px !important;
        }
        .new-now-container h1,
        .new-now-container h2 {
            font-size: 12px !important;
            margin-left: 0 !important;
            background-color: rgb(255, 255, 255) !important;
        }
        .new-now-container button[class*="text-[14px]"] {
            font-size: 12px !important;
            margin-left: 0 !important;
            background-color: rgb(255, 255, 255) !important;
        }
        .new-now-container .max-w-7xl {
            padding-left: 8px !important;
            padding-right: 8px !important;
        }
        .new-now-container {
            transform: none !important;
            zoom: 1 !important;
            scale: 1 !important;
        }
        }
    `}
    </style>
    <div className="new-now-container flex flex-col min-h-screen">
    <main className="flex-1">
        <div className="max-w-7xl mx-auto px-2 py-4">
        <h1 className="font-['Montserrat'] font-medium text-[24px] text-[#131313] leading-[28px]">
            Вечерние
        </h1>
        </div>
        <div className="max-w-7xl mx-auto px-4">
        <div className="mb-6">
            <h2 className="font-bold text-[24px] text-[#131313] leading-[28px] ml-[-250px]">
            Вечерние
            </h2>
            <div className="relative mt-2">
            <button
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className="flex items-center gap-1 font-normal text-[14px] text-[#131313] hover:underline ml-[-250px]"
            >
                Категория
                <ChevronDownIcon className={`w-4 h-4 transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`} />
            </button>
            {isCategoryOpen && (
                <div className="absolute z-50 mt-2 ml-[-250px] w-[250px] bg-white shadow-lg rounded-md py-2 max-h-[400px] overflow-y-auto">
                {categories.filter(cat => cat.type === 'women').map((category) => (
                    <button
                    key={category.id}
                    onClick={() => {
                        navigate(category.path);
                        setIsCategoryOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-[14px] font-['Montserrat'] font-normal text-[#131313] hover:bg-gray-100"
                    >
                    {category.name}
                    </button>
                ))}
                </div>
            )}
            </div>
        </div>
        </div>
        {products.length > 0 ? (
        <>
            <ProductSection products={products.slice(0, 4)} />
            {products.length > 4 && <ProductSection products={products.slice(4, 8)} />}
            {products.length > 8 && <ProductSection products={products.slice(8, 12)} />}
            {products.length > 12 && <ProductSection products={products.slice(12, 16)} />}
            {products.length > 16 && <ProductSection products={products.slice(16, 20)} />}
            {products.length > 20 && <ProductSection products={products.slice(20, 24)} />}
            {products.length > 24 && <ProductSection products={products.slice(24, 28)} />}
        </>
        ) : (
        <div className="p-8 text-center font-['Montserrat'] text-[24px] text-[#131313]">
            Вечерние платья не найдены
        </div>
        )}
    </main>
    </div>
</>
);
}