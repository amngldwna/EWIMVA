// Импорт необходимых библиотек и компонентов
import React, { useState, useEffect } from 'react';
import { Badge } from '../../../components/ui/badge';
import { Card, CardContent } from '../../../components/ui/card';
import { Checkbox } from '../../../components/ui/checkbox';
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

// Объект с данными о статусах заказов и их цветами
const statusTypes = {
  processing: { label: 'Обработка', color: 'bg-amber-500' },
  sent: { label: 'Отправлен', color: 'bg-[#2f88ff]' },
  completed: { label: 'Выполнен', color: 'bg-emerald-500' },
  cancelled: { label: 'Отменён', color: 'bg-[#ae1414]' },
};

// Основной компонент для отображения списка заказов
export default function EwimvaZakazy(): JSX.Element {
  // Состояние для списка заказов, строки поиска, фильтра статуса и сортировки
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortOption, setSortOption] = useState('newest');
  const navigate = useNavigate();

  // Загрузка заказов из localStorage при монтировании компонента
  useEffect(() => {
    const savedOrders = localStorage.getItem('purchases');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  // Фильтрация заказов по поисковому запросу и статусу
  const filteredOrders = orders.filter((order) =>
    searchQuery
      ? order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.email.toLowerCase().includes(searchQuery.toLowerCase())
      : true
  ).filter((order) =>
    statusFilter === 'all' ? true : order.status === statusFilter
  );

  // Сортировка заказов по выбранной опции
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    if (sortOption === 'newest') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else if (sortOption === 'oldest') {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    } else if (sortOption === 'amount-desc') {
      return parseFloat(b.amount) - parseFloat(a.amount);
    } else if (sortOption === 'amount-asc') {
      return parseFloat(a.amount) - parseFloat(b.amount);
    }
    return 0;
  });

  // Функция для изменения статуса заказа
  const handleStatusChange = (index: number, newStatus: string) => {
    const updatedOrders = [...orders];
    updatedOrders[index].status = newStatus;
    setOrders(updatedOrders);
    // Сохранение обновленных заказов в localStorage
    localStorage.setItem('purchases', JSON.stringify(updatedOrders));
  };

  return (
    <>
      {/* Стили для адаптивности на мобильных устройствах */}
      <style>
        {`
          @media (max-width: 767px) {
            /* Основной контейнер */
            main[class*="p-8"] {
              padding: 8px !important;
            }

            /* Заголовок */
            h1[class*="text-[40px]"] {
              font-size: 40px !important;
              margin-top: 50px !important;
              margin-bottom: 8px !important;
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
              display: block !important;
              overflow-x: auto !important;
            }

            /* Таблица - данные */
            tbody td {
              font-size: 10px !important;
            }

            /* Email в колонке Клиент */
            div[class*="text-xs"] {
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
      <main className="flex-1 p-8">
        {/* Заголовок страницы */}
        <h1 className="font-['Inter'] font-semibold text-[#131313] text-[40px] mb-12">
          Заказы
        </h1>

        {/* Панель поиска и фильтров */}
        <div className="flex items-center gap-4 mb-8 border-b border-black pb-2">
          <div className="flex items-center gap-2">
            <div className="font-['Inter'] font-light text-black text-[13px] tracking-[0.80px]">
              SEARCH
            </div>
            <input
              type="text"
              placeholder="Поиск по ID, клиенту или email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-[300px] border-[#00000040] rounded-md focus:border-[#131313] focus:ring-1 focus:ring-[#131313] p-2 text-[12px]"
            />
          </div>
          <div className="flex-1"></div>
          <div className="flex items-center gap-2">
            {/* Фильтр по статусу заказа */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 font-['Inter'] font-normal text-[14px] text-[#131313] hover:underline focus:outline-none">
                {statusFilter === 'all' ? 'Все статусы' : statusTypes[statusFilter as keyof typeof statusTypes].label}
                <ChevronDownIcon className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white shadow-lg rounded-md border border-gray-200">
                <DropdownMenuItem onClick={() => setStatusFilter('all')}>
                  Все статусы
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('processing')}>
                  Обработка
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('sent')}>
                  Отправлен
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('completed')}>
                  Выполнен
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('cancelled')}>
                  Отменён
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex items-center gap-2">
            {/* Сортировка заказов */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 font-['Inter'] font-normal text-[14px] text-[#131313] hover:underline focus:outline-none">
                {sortOption === 'newest' ? 'Новые' :
                 sortOption === 'oldest' ? 'Старые' :
                 sortOption === 'amount-desc' ? 'Сумма по убыванию' :
                 'Сумма по возрастанию'}
                <ChevronDownIcon className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white shadow-lg rounded-md border border-gray-200">
                <DropdownMenuItem onClick={() => setSortOption('newest')}>
                  Новые
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortOption('oldest')}>
                  Старые
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortOption('amount-desc')}>
                  Сумма по убыванию
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortOption('amount-asc')}>
                  Сумма по возрастанию
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Таблица заказов */}
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
                    Клиент
                  </TableHead>
                  <TableHead className="font-['Inter'] font-normal text-[#131313] text-sm">
                    Дата
                  </TableHead>
                  <TableHead className="font-['Inter'] font-normal text-[#131313] text-sm">
                    Статус
                  </TableHead>
                  <TableHead className="font-['Inter'] font-normal text-[#131313] text-sm">
                    Товары
                  </TableHead>
                  <TableHead className="font-['Inter'] font-normal text-[#131313] text-sm">
                    Сумма
                  </TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedOrders.map((order, index) => (
                  <TableRow
                    key={order.id}
                    className="border-b border-solid border-[#00000040]"
                  >
                    <TableCell className="pl-10">
                      <Checkbox className="rounded-[5px] border-[#00000040]" />
                    </TableCell>
                    <TableCell className="font-['Inter'] font-semibold text-[#131313] text-sm">
                      {order.id}
                    </TableCell>
                    <TableCell>
                      <div className="font-['Inter'] font-semibold text-[#131313] text-sm">
                        {order.customer}
                      </div>
                      <div className="font-['Inter'] font-normal text-[#131313] text-xs">
                        {order.email}
                      </div>
                    </TableCell>
                    <TableCell className="font-['Inter'] font-semibold text-[#131313] text-sm">
                      {order.date}
                    </TableCell>
                    <TableCell>
                      {/* Выпадающее меню для изменения статуса */}
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <Badge
                            className={`${statusTypes[order.status as keyof typeof statusTypes].color} text-white font-semibold rounded rounded-[50px] px-3 py-1.5`}
                          >
                            {statusTypes[order.status as keyof typeof statusTypes].label}
                          </Badge>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-white shadow-lg rounded-md border border-gray-200">
                          <DropdownMenuItem onClick={() => handleStatusChange(index, 'processing')}>
                            Обработка
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleStatusChange(index, 'sent')}>
                            Отправлен
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleStatusChange(index, 'completed')}>
                            Выполнен
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleStatusChange(index, 'cancelled')}>
                            Отменён
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                    <TableCell className="font-['Inter'] font-semibold text-[#131313] text-sm">
                      {order.items}
                    </TableCell>
                    <TableCell className="font-['Inter'] font-semibold text-[#131313] text-sm">
                      {order.amount}
                    </TableCell>
                    <TableCell>
                      {/* Меню действий для заказа */}
                      <DropdownMenu>
                        <DropdownMenuTrigger className="font-['Inter'] font-semibold text-[#131313] text-sm">
                          •••
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-white shadow-lg rounded-md border border-gray-200">
                          <DropdownMenuItem onClick={() => navigate(`/orders/${index}/details`)}>
                            Просмотр деталей
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => navigate(`/orders/${index}/edit`)}>
                            Редактировать
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