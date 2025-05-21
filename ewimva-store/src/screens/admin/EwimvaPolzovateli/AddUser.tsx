// Импорт необходимых библиотек и компонентов
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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

// Компонент для добавления нового пользователя
export default function AddUser(): JSX.Element {
// Состояние для полей формы
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [role, setRole] = useState('customer');
const [status, setStatus] = useState('active');
const navigate = useNavigate();

// Обработчик отправки формы
const handleSubmit = (e: React.FormEvent) => {
e.preventDefault();
// Здесь можно добавить логику сохранения пользователя (например, API-запрос)
console.log({ name, email, role, status });
alert('Пользователь добавлен! (Это имитация)');
navigate('/users');
};

return (
<main className="flex-1 p-8">
    {/* Карточка с формой добавления */}
    <Card className="border border-solid border-[#00000040] rounded-[10px]">
    <CardHeader>
        <CardTitle className="font-['Inter'] font-semibold text-[#131313] text-[40px] mb-12">
        Добавить нового пользователя
        </CardTitle>
    </CardHeader>
    <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
        <div>
            <label className="font-['Inter'] font-normal text-[#131313] text-sm mb-2 block">
            Имя
            </label>
            <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Введите имя"
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
            placeholder="Введите email"
            className="w-full border-[#00000040] rounded-md focus:border-[#131313] focus:ring-1 focus:ring-[#131313] p-2"
            />
        </div>
        <div>
            <label className="font-['Inter'] font-normal text-[#131313] text-sm mb-2 block">
            Роль
            </label>
            <Select onValueChange={setRole} defaultValue={role}>
            <SelectTrigger className="w-full border-[#00000040] rounded-md focus:border-[#131313] focus:ring-1 focus:ring-[#131313] p-2">
                <SelectValue placeholder="Выберите роль" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="admin">Администратор</SelectItem>
                <SelectItem value="customer">Клиент</SelectItem>
            </SelectContent>
            </Select>
        </div>
        <div>
            <label className="font-['Inter'] font-normal text-[#131313] text-sm mb-2 block">
            Статус
            </label>
            <Select onValueChange={setStatus} defaultValue={status}>
            <SelectTrigger className="w-full border-[#00000040] rounded-md focus:border-[#131313] focus:ring-1 focus:ring-[#131313] p-2">
                <SelectValue placeholder="Выберите статус" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="active">Активен</SelectItem>
                <SelectItem value="inactive">Неактивен</SelectItem>
            </SelectContent>
            </Select>
        </div>
        <div className="flex gap-4">
            <Button
            type="submit"
            className="bg-black text-white rounded-md px-6 py-2"
            >
            Сохранить
            </Button>
            <Link to="/users" className="text-blue-500 underline mt-2">
            Назад к пользователям
            </Link>
        </div>
        </form>
    </CardContent>
    </Card>
</main>
);
}