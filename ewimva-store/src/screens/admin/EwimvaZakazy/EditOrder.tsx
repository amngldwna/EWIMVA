// Импорт необходимых библиотек и компонентов
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import {
Select,
SelectContent,
SelectItem,
SelectTrigger,
SelectValue,
} from '../../../components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';

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

// Компонент для редактирования заказа
export default function EditOrder(): JSX.Element {
// Получение индекса заказа из URL
const { id } = useParams<{ id: string }>();
const navigate = useNavigate();
// Состояние для данных заказа и полей формы
const [order, setOrder] = useState<Order | null>(null);
const [customer, setCustomer] = useState('');
const [email, setEmail] = useState('');
const [date, setDate] = useState('');
const [status, setStatus] = useState('');
const [items, setItems] = useState('0');
const [amount, setAmount] = useState('');

// Загрузка данных заказа из localStorage
useEffect(() => {
const savedOrders = localStorage.getItem('purchases');
if (savedOrders) {
    const orders: Order[] = JSON.parse(savedOrders);
    const foundOrder = orders[parseInt(id || '0')];
    if (foundOrder) {
    setOrder(foundOrder);
    setCustomer(foundOrder.customer);
    setEmail(foundOrder.email);
    setDate(foundOrder.date);
    setStatus(foundOrder.status);
    setItems(foundOrder.items.toString());
    setAmount(foundOrder.amount);
    }
}
}, [id]);

// Обработчик отправки формы
const handleSubmit = (e: React.FormEvent) => {
e.preventDefault();
if (!order) return;

// Создание обновленного заказа
const updatedOrder: Order = {
    ...order,
    customer,
    email,
    date,
    status,
    items: parseInt(items),
    amount,
};

// Обновление заказа в localStorage
const savedOrders = JSON.parse(localStorage.getItem('purchases') || '[]');
savedOrders[parseInt(id || '0')] = updatedOrder;
localStorage.setItem('purchases', JSON.stringify(savedOrders));

alert('Заказ обновлён!');
navigate('/orders');
};

// Если заказ не найден, отображаем сообщение
if (!order) {
return <div>Заказ не найден</div>;
}

return (
<main className="flex-1 p-8">
    {/* Карточка с формой редактирования */}
    <Card className="border border-solid border-[#00000040] rounded-[10px]">
    <CardHeader>
        <CardTitle className="font-['Inter'] font-semibold text-[#131313] text-[40px] mb-12">
        Редактировать заказ #{order.id}
        </CardTitle>
    </CardHeader>
    <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
        <div>
            <label className="font-['Inter'] font-normal text-[#131313] text-sm mb-2 block">
            Клиент
            </label>
            <Input
            type="text"
            value={customer}
            onChange={(e) => setCustomer(e.target.value)}
            className="w-full border-[#00000040] rounded-md focus:border-[#131313] focus:ring-1 focus:ring-[#131313] p-2"
            />
        </div>
        <div>
            <label className="font-['Inter'] font-normal text-[#131313] text-sm mb-2 block">
            Email
            </label>
            <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border-[#00000040] rounded-md focus:border-[#131313] focus:ring-1 focus:ring-[#131313] p-2"
            />
        </div>
        <div>
            <label className="font-['Inter'] font-normal text-[#131313] text-sm mb-2 block">
            Дата
            </label>
            <Input
            type="text"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border-[#00000040] rounded-md focus:border-[#131313] focus:ring-1 focus:ring-[#131313] p-2"
            />
        </div>
        <div>
            <label className="font-['Inter'] font-normal text-[#131313] text-sm mb-2 block">
            Статус
            </label>
            <Select onValueChange={setStatus} value={status}>
            <SelectTrigger className="w-full border-[#00000040] rounded-md focus:border-[#131313] focus:ring-1 focus:ring-[#131313] p-2">
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="processing">Обработка</SelectItem>
                <SelectItem value="sent">Отправлен</SelectItem>
                <SelectItem value="completed">Выполнен</SelectItem>
                <SelectItem value="cancelled">Отменён</SelectItem>
            </SelectContent>
            </Select>
        </div>
        <div>
            <label className="font-['Inter'] font-normal text-[#131313] text-sm mb-2 block">
            Кол-во товаров
            </label>
            <Input
            type="number"
            value={items}
            onChange={(e) => setItems(e.target.value)}
            className="w-full border-[#00000040] rounded-md focus:border-[#131313] focus:ring-1 focus:ring-[#131313] p-2"
            />
        </div>
        <div>
            <label className="font-['Inter'] font-normal text-[#131313] text-sm mb-2 block">
            Сумма
            </label>
            <Input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border-[#00000040] rounded-md focus:border-[#131313] focus:ring-1 focus:ring-[#131313] p-2"
            />
        </div>
        <div className="flex gap-4">
            <Button type="submit" className="bg-black text-white rounded-md px-6 py-2">
            Сохранить
            </Button>
            <Link to="/orders" className="text-blue-500 underline mt-2">
            Назад к заказам
            </Link>
        </div>
        </form>
    </CardContent>
    </Card>
</main>
);
}