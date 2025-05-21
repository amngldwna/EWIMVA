// Импорт необходимых библиотек и компонентов
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';

// Интерфейс для структуры заказа
interface Order {
id: string;
customer: string;
email: string;
date: string;
status: string;
items: number;
amount: string;
products: { name: string; quantity: number; price: string }[];
}

// Объект с данными о статусах и их цветами
const statusTypes = {
processing: { label: 'Обработка', color: 'bg-amber-500' },
sent: { label: 'Отправлен', color: 'bg-[#2f88ff]' },
completed: { label: 'Выполнен', color: 'bg-emerald-500' },
cancelled: { label: 'Отменён', color: 'bg-[#ae1414]' },
};

// Компонент для отображения деталей заказа
export default function OrderDetails(): JSX.Element {
// Получение индекса заказа из URL
const { id } = useParams<{ id: string }>();
// Состояние для данных заказа
const [order, setOrder] = useState<Order | null>(null);

// Загрузка данных заказа из localStorage
useEffect(() => {
const savedOrders = localStorage.getItem('purchases');
if (savedOrders) {
    const orders: Order[] = JSON.parse(savedOrders);
    const foundOrder = orders[parseInt(id || '0')];
    if (foundOrder) {
    setOrder(foundOrder);
    }
}
}, [id]);

// Если заказ не найден, отображаем сообщение
if (!order) {
return <div>Заказ не найден</div>;
}

return (
<main className="flex-1 p-8">
    {/* Карточка с информацией о заказе */}
    <Card className="border border-solid border-[#00000040] rounded-[10px]">
    <CardHeader>
        <CardTitle className="font-['Inter'] font-semibold text-[#131313] text-[40px] mb-12">
        Детали заказа #{order.id}
        </CardTitle>
    </CardHeader>
    <CardContent>
        <div className="space-y-6">
        <div>
            <h2 className="font-['Inter'] font-semibold text-[#131313] text-xl">Информация о заказе</h2>
            <p className="font-['Inter'] font-normal text-[#131313] text-sm">Клиент: {order.customer}</p>
            <p className="font-['Inter'] font-normal text-[#131313] text-sm">Email: {order.email}</p>
            <p className="font-['Inter'] font-normal text-[#131313] text-sm">Дата: {order.date}</p>
            <p className="font-['Inter'] font-normal text-[#131313] text-sm">
            Статус: <Badge className={`${statusTypes[order.status as keyof typeof statusTypes].color} text-white font-semibold rounded-[50px] px-3 py-1.5`}>{statusTypes[order.status as keyof typeof statusTypes].label}</Badge>
            </p>
            <p className="font-['Inter'] font-normal text-[#131313] text-sm">Количество товаров: {order.items}</p>
            <p className="font-['Inter'] font-normal text-[#131313] text-sm">Итого: {order.amount}</p>
        </div>
        <div>
            <h2 className="font-['Inter'] font-semibold text-[#131313] text-xl">Товары</h2>
            {/* Список товаров в заказе */}
            {order.products.map((product, index) => (
            <div key={index} className="flex justify-between border-b border-[#00000040] py-2">
                <span className="font-['Inter'] font-normal text-[#131313] text-sm">{product.name} (x{product.quantity})</span>
                <span className="font-['Inter'] font-normal text-[#131313] text-sm">{product.price}</span>
            </div>
            ))}
        </div>
        {/* Ссылка для возврата к списку заказов */}
        <Link to="/orders" className="text-blue-500 underline mt-4 inline-block">
            Назад к заказам
        </Link>
        </div>
    </CardContent>
    </Card>
</main>
);
}