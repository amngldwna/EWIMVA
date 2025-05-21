// Импорт React, хуков и компонентов UI
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';

// Пример данных пользователя
const users = [
{
id: 'USR-1001',
name: 'Анна Смирнова',
email: 'anna.smirnova@example.com',
role: 'customer',
status: 'active',
lastActivity: '25.04.2025',
orders: 5,
},
{
id: 'USR-1002',
name: 'Михаил Иванов',
email: 'mikhail.ivanov@example.com',
role: 'customer',
status: 'inactive',
lastActivity: '20.04.2025',
orders: 2,
},
{
id: 'USR-1003',
name: 'Елена Сидорова',
email: 'elena.sidorova@example.com',
role: 'admin',
status: 'active',
lastActivity: '28.04.2025',
orders: 0,
},
{
id: 'USR-1004',
name: 'Дмитрий Козлов',
email: 'dmitry.kozlov@example.com',
role: 'customer',
status: 'active',
lastActivity: '22.04.2025',
orders: 3,
},
{
id: 'USR-1005',
name: 'Ольга Новикова',
email: 'olga.novikova@example.com',
role: 'customer',
status: 'inactive',
lastActivity: '15.04.2025',
orders: 1,
},
];

// Компонент UserDetails отображает страницу с детальной информацией о пользователе
export default function UserDetails(): JSX.Element {
// Получение ID пользователя из параметров URL
const { id } = useParams();
// Поиск пользователя по ID
const user = users.find((u) => u.id === id);

// Проверка на существование пользователя
if (!user) {
return <div>Пользователь не найден</div>;
}

return (
// Основной контейнер страницы
<main className="flex-1 p-8">
    <Card className="border border-solid border-[#00000040] rounded-[10px]">
    <CardHeader>
        {/* Заголовок с ID пользователя */}
        <CardTitle className="font-['Inter'] font-semibold text-[#131313] text-[40px] mb-12">
        Детали пользователя #{user.id}
        </CardTitle>
    </CardHeader>
    <CardContent>
        {/* Информация о пользователе */}
        <div className="space-y-6">
        <div>
            <h2 className="font-['Inter'] font-semibold text-[#131313] text-xl">Информация о пользователе</h2>
            <p className="font-['Inter'] font-normal text-[#131313] text-sm">Имя: {user.name}</p>
            <p className="font-['Inter'] font-normal text-[#131313] text-sm">Email: {user.email}</p>
            <p className="font-['Inter'] font-normal text-[#131313] text-sm">
            Роль: {user.role === 'admin' ? 'Администратор' : 'Клиент'}
            </p>
            <p className="font-['Inter'] font-normal text-[#131313] text-sm">
            Статус: 
            <Badge
                className={`ml-2 ${
                user.status === 'active' ? 'bg-emerald-500' : 'bg-[#ae1414]'
                } text-white font-semibold rounded-[50px] px-3 py-1.5`}
            >
                {user.status === 'active' ? 'Активен' : 'Неактивен'}
            </Badge>
            </p>
            <p className="font-['Inter'] font-normal text-[#131313] text-sm">
            Последняя активность: {user.lastActivity}
            </p>
            <p className="font-['Inter'] font-normal text-[#131313] text-sm">
            Количество заказов: {user.orders}
            </p>
        </div>
        {/* Ссылка для редактирования пользователя */}
        <div>
            <Link
            to={`/users/${user.id}/edit`}
            className="font-['Inter'] font-semibold text-[#131313] text-sm underline"
            >
            Редактировать пользователя
            </Link>
        </div>
        </div>
    </CardContent>
    </Card>
</main>
);
}
