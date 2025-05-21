// Импорт React, хуков и компонентов UI
import React, { useState } from 'react';
import { Badge } from '../../../components/ui/badge';
import { Button } from '../../../components/ui/button';
import { Card, CardContent } from '../../../components/ui/card';
import { Checkbox } from '../../../components/ui/checkbox';
import { Input } from '../../../components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../../components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../components/ui/table';
import { ChevronDownIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Данные о пользователях
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

// Компонент EwimvaPolzovateli отображает страницу управления пользователями
export default function EwimvaPolzovateli(): JSX.Element {
  // Состояние для списка пользователей, поискового запроса, фильтра по ролям и сортировки
  const [usersList, setUsersList] = useState(users);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [sortOption, setSortOption] = useState('newest');
  const navigate = useNavigate();

  // Фильтрация пользователей по поисковому запросу
  const filteredUsers = usersList.filter((user) =>
    searchQuery
      ? user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.status.toLowerCase().includes(searchQuery.toLowerCase())
      : true
  ).filter((user) =>
    roleFilter === 'all' ? true : user.role === roleFilter
  );

  // Сортировка пользователей
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (sortOption === 'name-asc') {
      return a.name.localeCompare(b.name);
    } else if (sortOption === 'name-desc') {
      return b.name.localeCompare(a.name);
    }
    return 0;
  });

  // Функция для удаления пользователя
  const handleDelete = (id: string) => {
    if (window.confirm('Вы уверены, что хотите удалить этого пользователя?')) {
      setUsersList(usersList.filter((user) => user.id !== id));
    }
  };

  return (
    <>
      {/* Стили для адаптивного отображения на мобильных устройствах */}
      <style>
        {`
          @media (max-width: 767px) {
            /* Основной контейнер */
            main[class*="p-8"] {
              padding: 8px !important;
            }

            /* Контейнер заголовка */
            div[class*="flex items-center justify-between mb-10"] {
              margin-top: 50px !important;
              margin-bottom: 8px !important;
            }

            /* Заголовок */
            h1[class*="text-[40px]"] {
              font-size: 40px !important;
            }

            /* Кнопка Добавить */
            button[class*="h-[30px]"] {
              height: 24px !important;
              padding: 0 10px !important;
              font-size: 12px !important;
            }

            /* Панель поиска и фильтров */
            div[class*="flex items-center gap-4 mb-8"] {
              gap: 8px !important;
              margin-bottom: 8px !important;
              padding-bottom: 6px !important;
            }

            /* Поле поиска */
            input[class*="w-[300px]"] {
              width: auto !important;
              padding: 4px !important;
              font-size: 12px !important;
            }

            /* Текст SEARCH */
            div[class*="text-[13px]"] {
              font-size: 12px !important;
            }

            /* Фильтры и сортировка */
            div[class*="text-[14px]"] {
              font-size: 12px !important;
            }

            /* Иконка ChevronDown */
            svg[class*="w-4 h-4"] {
              width: 12px !important;
              height: 12px !important;
            }

            /* Карточка таблицы */
            div[class*="border border-solid border-[#00000040] rounded-[10px]"] {
              width: 100% !important;
            }

            /* Таблица - заголовки */
            table {
              font-size: 12px !important;
            }

            /* Таблица - данные */
            tbody td {
              font-size: 10px !important;
            }

            /* Ячейки */
            th, td {
              padding: 4px !important;
            }

            /* Чекбокс */
            div[class*="w-12 pl-10"],
            td[class*="pl-10"] {
              padding-left: 4px !important;
              width: 24px !important;
            }
            div[class*="rounded-[5px]"] {
              width: 12px !important;
              height: 12px !important;
            }

            /* Бейдж статуса */
            div[class*="px-3 py-1.5"] {
              padding: 3px 6px !important;
              font-size: 12px !important;
            }

            /* Действия (три точки) */
            div[class*="w-12"] {
              width: 24px !important;
            }
            div[class*="text-sm"] {
              font-size: 12px !important;
            }
          }
        `}
      </style>
      {/* Основной контейнер страницы пользователей */}
      <main className="flex-1 p-8">
        {/* Заголовок и кнопка добавления пользователя */}
        <div className="flex items-center justify-between mb-10">
          <h1 className="font-['Inter'] font-semibold text-[#131313] text-[40px]">
            Пользователи
          </h1>
          <Button
            className="bg-black text-white rounded-full h-[30px] px-6"
            onClick={() => navigate('/users/add')}
          >
            <span className="mr-1">+</span> Добавить
          </Button>
        </div>

        {/* Панель поиска и фильтров */}
        <div className="flex items-center gap-4 mb-8 border-b border-black pb-2">
          <div className="flex items-center gap-2">
            <div className="font-['Inter'] font-light text-black text-[13px] tracking-[0.80px]">
              SEARCH
            </div>
            <input
              type="text"
              placeholder="Поиск по имени, email, роли или статусу..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-[300px] border-[#00000040] rounded-md focus:border-[#131313] focus:ring-1 focus:ring-[#131313] p-2 text-[12px]"
            />
          </div>
          <div className="flex-1"></div>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 font-['Inter'] font-normal text-[14px] text-[#131313] hover:underline focus:outline-none">
                {roleFilter === 'all' ? 'Все роли' : roleFilter === 'admin' ? 'Администратор' : 'Клиент'}
                <ChevronDownIcon className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white shadow-lg rounded-md border border-gray-200">
                <DropdownMenuItem onClick={() => setRoleFilter('all')}>
                  Все роли
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setRoleFilter('admin')}>
                  Администратор
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setRoleFilter('customer')}>
                  Клиент
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 font-['Inter'] font-normal text-[14px] text-[#131313] hover:underline focus:outline-none">
                {sortOption === 'newest' ? 'Новые' :
                sortOption === 'name-asc' ? 'Имя А-Я' :
                'Имя Я-А'}
                <ChevronDownIcon className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white shadow-lg rounded-md border border-gray-200">
                <DropdownMenuItem onClick={() => setSortOption('newest')}>
                  Новые
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortOption('name-asc')}>
                  Имя А-Я
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortOption('name-desc')}>
                  Имя Я-А
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Таблица пользователей */}
        <Card className="border border-solid border-[#00000040] rounded-[10px]">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-solid border-[#00000040]">
                  <TableHead className="w-12 pl-10">
                    <Checkbox className="rounded-[5px] border-[#00000040]" />
                  </TableHead>
                  <TableHead className="font-['Inter'] font-normal text-[#131313] text-sm">
                    ID
                  </TableHead>
                  <TableHead className="font-['Inter'] font-normal text-[#131313] text-sm">
                    Имя
                  </TableHead>
                  <TableHead className="font-['Inter'] font-normal text-[#131313] text-sm">
                    Email
                  </TableHead>
                  <TableHead className="font-['Inter'] font-normal text-[#131313] text-sm">
                    Роль
                  </TableHead>
                  <TableHead className="font-['Inter'] font-normal text-[#131313] text-sm">
                    Статус
                  </TableHead>
                  <TableHead className="font-['Inter'] font-normal text-[#131313] text-sm">
                    Последняя активность
                  </TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedUsers.map((user) => (
                  <TableRow
                    key={user.id}
                    className="border-b border-solid border-[#00000040]"
                  >
                    <TableCell className="pl-10">
                      <Checkbox className="rounded-[5px] border-[#00000040]" />
                    </TableCell>
                    <TableCell className="font-['Inter'] font-semibold text-[#131313] text-sm">
                      {user.id}
                    </TableCell>
                    <TableCell className="font-['Inter'] font-semibold text-[#131313] text-sm">
                      {user.name}
                    </TableCell>
                    <TableCell className="font-['Inter'] font-semibold text-[#131313] text-sm">
                      {user.email}
                    </TableCell>
                    <TableCell className="font-['Inter'] font-semibold text-[#131313] text-sm">
                      {user.role === 'admin' ? 'Админ' : 'Клиент'}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`${
                          user.status === 'active' ? 'bg-emerald-500' : 'bg-[#ae1414]'
                        } text-white font-semibold rounded-[50px] px-3 py-1.5`}
                      >
                        {user.status === 'active' ? 'Активен' : 'Неактивен'}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-['Inter'] font-semibold text-[#131313] text-sm">
                      {user.lastActivity}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger className="font-['Inter'] font-semibold text-[#131313] text-sm">
                          •••
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-white shadow-lg rounded-md border border-gray-200">
                          <DropdownMenuItem onClick={() => navigate(`/users/${user.id}/details`)}>
                            Просмотр деталей
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => navigate(`/users/${user.id}/edit`)}>
                            Редактировать
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDelete(user.id)}>
                            Удалить
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
