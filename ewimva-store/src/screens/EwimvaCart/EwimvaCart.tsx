// Импорт необходимых библиотек и компонентов
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { MinusIcon, PlusIcon, XIcon } from 'lucide-react';
import { useNavigate, NavLink } from 'react-router-dom';

// Интерфейс для элемента корзины
interface CartItem {
id: number;
name: string;
price: string;
image: string;
quantity: number;
colorVariants: { color: string; image: string }[];
}

// Компонент корзины покупок
const EwimvaCart = (): JSX.Element => {
const navigate = useNavigate();
// Состояние для элементов корзины, загружаемых из localStorage
const [cartItems, setCartItems] = useState<CartItem[]>(() => {
const savedCart = localStorage.getItem('cartItems');
return savedCart ? JSON.parse(savedCart) : [];
});

// Сохранение корзины в localStorage при изменении
useEffect(() => {
localStorage.setItem('cartItems', JSON.stringify(cartItems));
}, [cartItems]);

// Функция для изменения количества товара
const handleQuantityChange = (id: number, delta: number) => {
setCartItems((prev) =>
    prev.map((item) =>
    item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    )
);
};

// Функция для удаления товара из корзины
const handleRemoveItem = (id: number) => {
setCartItems((prev) => prev.filter((item) => item.id !== id));
};

// Расчет общей суммы корзины
const totalAmount = cartItems.reduce(
(sum, item) => {
    const price = parseFloat(item.price.replace(' KGS', '').replace(' ', '')) || 0;
    return sum + price * item.quantity;
},
0
);

// Переход к странице оформления заказа
const handleCheckout = () => {
navigate('/checkout');
};

return (
<div className="flex flex-col min-h-screen">
    <main className="flex-1">
    {cartItems.length > 0 ? (
        <div className="max-w-[1920px] mx-auto px-4 py-8">
        {/* Заголовок и ссылка на избранное */}
        <div className="flex items-center justify-between mb-9 mt-10">
            <h1 className="font-medium text-[24px] text-[#131313] leading-[28px]">
            Корзина
            </h1>
            <NavLink
            to="/favourites"
            className="font-['Inter',Helvetica] font-bold text-[#131313] text-[15.8px] tracking-[0] leading-[18px] whitespace-nowrap underline"
            >
            ПЕРЕЙТИ В ФАВОРИТЫ
            </NavLink>
        </div>
        {/* Сетка с товарами в корзине */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cartItems.map((item) => (
            <Card key={item.id} className="w-full max-w-[479px] h-auto border-none">
                <CardContent className="p-0 relative">
                <div
                    className="w-full h-[671px] bg-cover bg-center"
                    style={{ backgroundImage: `url(${item.image})` }}
                />
                <div className="p-2 space-y-2">
                    <h3 className="font-normal text-[11.8px] text-[#131313] font-['Inter',Helvetica] leading-[18px]">
                    {item.name}
                    </h3>
                    <p className="font-normal text-[12.8px] text-[#131313] font-['Inter',Helvetica] leading-[18px]">
                    {item.price}
                    </p>
                    {/* Варианты цветов товара */}
                    <div className="flex items-center gap-3 mt-2">
                    {item.colorVariants.map((color, index) => (
                        <div
                        key={index}
                        className="w-3.5 h-3.5 rounded-[7px] bg-cover bg-center"
                        style={{ backgroundImage: `url(${color.image})` }}
                        />
                    ))}
                    </div>
                    {/* Управление количеством товара */}
                    <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="icon"
                        className="w-5 h-5 rounded-[5px] border-[#00000040] p-0"
                        onClick={() => handleQuantityChange(item.id, -1)}
                    >
                        <MinusIcon className="h-3 w-3" />
                    </Button>
                    <span className="mx-2 font-normal text-black text-[15px] leading-[18px] font-['Inter',Helvetica]">
                        {item.quantity}
                    </span>
                    <Button
                        variant="outline"
                        size="icon"
                        className="w-5 h-5 rounded-[5px] border-[#00000040] p-0"
                        onClick={() => handleQuantityChange(item.id, 1)}
                    >
                        <PlusIcon className="h-3 w-3" />
                    </Button>
                    </div>
                </div>
                {/* Кнопка удаления товара */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 p-0 h-auto w-auto"
                    onClick={() => handleRemoveItem(item.id)}
                >
                    <XIcon className="h-3.5 w-3.5" />
                </Button>
                </CardContent>
            </Card>
            ))}
        </div>
        {/* Итоговая сумма и кнопка оформления */}
        <div className="mt-8 text-right">
            <p className="text-[15.8px] font-['Inter',Helvetica] font-bold text-[#131313]">
            Общая сумма: {totalAmount.toLocaleString()} KGS
            </p>
            <Button
            className="mt-4 bg-[#131313] text-white hover:bg-[#333] text-[12.8px] font-['Inter',Helvetica]"
            onClick={handleCheckout}
            >
            Перейти к оформлению
            </Button>
        </div>
        </div>
    ) : (
        // Отображение пустой корзины
        <div className="bg-white flex flex-row justify-center w-full">
        <div className="bg-white overflow-hidden w-[1920px] h-[1200px] relative">
            <div className="absolute top-[294px] w-full flex justify-center">
            <div className="text-center">
                <div className="[font-family:'Inter',Helvetica] font-bold text-[#131313] text-[15.8px] tracking-[0] leading-5 whitespace-nowrap">
                Корзина пуста
                </div>
                <div className="w-[336px] mt-5 [font-family:'Inter',Helvetica] font-normal text-[#131313] text-xs tracking-[0] leading-[18px]">
                Вдохновляйтесь нашими коллекциями и приобретайте новинки для своего гардероба
                </div>
                <div className="flex flex-col items-center">
                <Button
                    className="w-[350px] h-11 mt-6 bg-[#131313] rounded-none hover:bg-[#333333]"
                    onClick={() => navigate('/new')}
                >
                    <span className="text-white text-[13px] text-center [font-family:'Inter',Helvetica] font-bold tracking-[0] leading-[18px] whitespace-nowrap">
                    Посмотреть новинки
                    </span>
                </Button>
                <Button
                    className="w-[350px] h-11 mt-2 bg-white text-[#131313] border border-[#131313] rounded-none hover:bg-gray-100"
                    onClick={() => navigate('/favourites')}
                >
                    <span className="text-[13px] text-center [font-family:'Inter',Helvetica] font-bold tracking-[0] leading-[18px] whitespace-nowrap">
                    Фавориты
                    </span>
                </Button>
                </div>
            </div>
            </div>
        </div>
        </div>
    )}
    </main>
</div>
);
};

export default EwimvaCart;