// Импорт необходимых библиотек и компонентов
import React, { useState, useEffect } from 'react';
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
import { getProducts, Product } from '../../../data/productsData';
import { categories } from '../../../data/categories';

// Компонент для отображения списка товаров
export default function EwimvaTovary(): JSX.Element {
  // Состояние для списка товаров, строки поиска, фильтров и сортировки
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [genderFilter, setGenderFilter] = useState('all');
  const [sortOption, setSortOption] = useState('newest');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Форматирование цены для отображения
  const formatPrice = (price: string): string => {
    const cleanPrice = price.replace(/[^\d]/g, '');
    if (!cleanPrice) return price;
    const number = parseInt(cleanPrice, 10);
    const formatted = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return `KGS ${formatted}`;
  };

  // Загрузка списка товаров при монтировании компонента
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getProducts();
        setProductsList(products);
        setLoading(false);
      } catch (err) {
        setError('Не удалось загрузить товары');
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Фильтрация товаров по поиску, категории и полу
  const filteredProducts = productsList.filter((product) =>
    searchQuery
      ? product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.status?.toLowerCase().includes(searchQuery.toLowerCase())
      : true
  ).filter((product) =>
    categoryFilter === 'all' ? true : product.category === categoryFilter
  ).filter((product) =>
    genderFilter === 'all' ? true : product.gender === genderFilter
  );

  // Сортировка товаров по выбранной опции
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === 'price-asc') {
      const priceA = parseFloat(a.price.replace(/[^\d]/g, ''));
      const priceB = parseFloat(b.price.replace(/[^\d]/g, ''));
      return priceA - priceB;
    } else if (sortOption === 'price-desc') {
      const priceA = parseFloat(a.price.replace(/[^\d]/g, ''));
      const priceB = parseFloat(b.price.replace(/[^\d]/g, ''));
      return priceB - priceA;
    } else if (sortOption === 'name-asc') {
      return a.name.localeCompare(b.name);
    }
    return 0;
  });

  // Функция для удаления товара с подтверждением
  const handleDelete = async (id: string) => {
    if (window.confirm('Вы уверены, что хотите удалить этот товар?')) {
      try {
        const response = await fetch(`http://localhost:3001/products/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Ошибка при удалении товара');
        }
        setProductsList(productsList.filter((product) => product.id !== id));
      } catch (err) {
        alert('Не удалось удалить товар');
      }
    }
  };

  // Отображение загрузки или ошибки
  if (loading) {
    return <div className="flex-1 p-8">Загрузка...</div>;
  }

  if (error) {
    return <div className="flex-1 p-8 text-red-500">{error}</div>;
  }

  return (
    <>
      {/* Стили для адаптивности на мобильных устройствах */}
      <style>
        {`
          @media (max-width: 767px) {
            main[class*="p-8"] {
              padding: 8px !important;
            }
            div[class*="flex items-center justify-between mb-10"] {
              margin-top: 50px !important;
              margin-bottom: 8px !important;
            }
            h1[class*="text-[40px]"] {
              font-size: 40px !important;
            }
            button[class*="h-[30px]"] {
              height: 24px !important;
              padding: 0 10px !important;
              font-size: 12px !important;
            }
            div[class*="flex items-center gap-4 mb-8"] {
              gap: 8px !important;
              margin-bottom: 8px !important;
              padding-bottom: 6px !important;
            }
            input[class*="w-[300px]"] {
              width: auto !important;
              padding: 4px !important;
              font-size: 12px !important;
            }
            div[class*="text-[13px]"] {
              font-size: 12px !important;
            }
            div[class*="text-[14px]"] {
              font-size: 12px !important;
            }
            svg[class*="w-4 h-4"] {
              width: 12px !important;
              height: 12px !important;
            }
            div[class*="border border-solid border-[#00000040] rounded-[10px]"] {
              width: 100% !important;
            }
            table {
              font-size: 12px !important;
              display: block !important;
              overflow-x: auto !important;
            }
            tbody td {
              font-size: 10px !important;
            }
            th, td {
              padding: 4px !important;
            }
            div[class*="w-12 pl-10"],
            td[class*="pl-10"] {
              padding-left: 4px !important;
              width: 10px !important;
            }
            div[class*="rounded-[5px]"] {
              width: 10px !important;
              height: 10px !important;
            }
            div[class*="rounded-full"] {
              padding: 1px 15px !important;
              font-size: 9px !important;
            }
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
        {/* Заголовок и кнопка добавления нового товара */}
        <div className="flex items-center justify-between mb-10">
          <h1 className="font-['Inter'] font-semibold text-[#131313] text-[40px]">
            Товары
          </h1>
          <Button
            className="bg-black text-white rounded-full h-[30px] px-6"
            onClick={() => navigate('/products/add')}
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
            <Input
              type="text"
              placeholder="Поиск по названию, категории или статусу..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-[300px] border-[#00000040] rounded-md focus:border-[#131313] focus:ring-1 focus:ring-[#131313] p-2 text-[12px]"
            />
          </div>
          <div className="flex-1"></div>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 font-['Inter'] font-normal text-[14px] text-[#131313] hover:underline focus:outline-none">
                {categoryFilter === 'all' ? 'Все категории' : categoryFilter}
                <ChevronDownIcon className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white shadow-lg rounded-md border border-gray-200">
                <DropdownMenuItem onClick={() => setCategoryFilter('all')}>
                  Все категории
                </DropdownMenuItem>
                {categories.map((cat) => (
                  <DropdownMenuItem key={cat.id} onClick={() => setCategoryFilter(cat.name)}>
                    {cat.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 font-['Inter'] font-normal text-[14px] text-[#131313] hover:underline focus:outline-none">
                {genderFilter === 'all' ? 'Все товары' :
                 genderFilter === 'female' ? 'Женские' :
                 genderFilter === 'male' ? 'Мужские' : 'Унисекс'}
                <ChevronDownIcon className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white shadow-lg rounded-md border border-gray-200">
                <DropdownMenuItem onClick={() => setGenderFilter('all')}>
                  Все товары
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setGenderFilter('female')}>
                  Женские
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setGenderFilter('male')}>
                  Мужские
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setGenderFilter('unisex')}>
                  Унисекс
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 font-['Inter'] font-normal text-[14px] text-[#131313] hover:underline focus:outline-none">
                {sortOption === 'newest' ? 'Новые' :
                sortOption === 'price-asc' ? 'Цены по возрастанию' :
                sortOption === 'price-desc' ? 'Цены по убыванию' :
                'Название А-Я'}
                <ChevronDownIcon className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white shadow-lg rounded-md border border-gray-200">
                <DropdownMenuItem onClick={() => setSortOption('newest')}>
                  Новые
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortOption('price-asc')}>
                  Цены по возрастанию
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortOption('price-desc')}>
                  Цены по убыванию
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortOption('name-asc')}>
                  Название А-Я
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Таблица товаров */}
        <Card className="border border-solid border-[#00000040] rounded-[10px]">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-solid border-[#00000040]">
                  <TableHead className="w-12 pl-10">
                    <Checkbox className="rounded-[5px] border-[#00000040]" />
                  </TableHead>
                  <TableHead className="font-['Inter'] font-normal text-[#131313] text-sm">
                    Название
                  </TableHead>
                  <TableHead className="font-['Inter'] font-normal text-[#131313] text-sm">
                    Категория
                  </TableHead>
                  <TableHead className="font-['Inter'] font-normal text-[#131313] text-sm">
                    Пол
                  </TableHead>
                  <TableHead className="font-['Inter'] font-normal text-[#131313] text-sm">
                    Статус
                  </TableHead>
                  <TableHead className="font-['Inter'] font-normal text-[#131313] text-sm">
                    Остаток
                  </TableHead>
                  <TableHead className="font-['Inter'] font-normal text-[#131313] text-sm">
                    Цена
                  </TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedProducts.map((product) => (
                  <TableRow
                    key={product.id}
                    className="border-b border-solid border-[#00000040]"
                  >
                    <TableCell className="pl-10">
                      <Checkbox className="rounded-[5px] border-[#00000040]" />
                    </TableCell>
                    <TableCell className="font-['Inter'] font-semibold text-[#131313] text-sm">
                      {product.name}
                    </TableCell>
                    <TableCell className="font-['Inter'] font-semibold text-[#131313] text-sm">
                      {product.category}
                    </TableCell>
                    <TableCell className="font-['Inter'] font-semibold text-[#131313] text-sm">
                      {product.gender === 'female' ? 'Женский' :
                       product.gender === 'male' ? 'Мужской' :
                       product.gender === 'unisex' ? 'Унисекс' : 'Не указано'}
                    </TableCell>
                    <TableCell>
                      {product.status === 'available' && (
                        <Badge
                          variant="outline"
                          className="rounded-full border-emerald-500 text-emerald-500 font-semibold bg-white"
                        >
                          В наличии
                        </Badge>
                      )}
                      {product.status === 'low' && (
                        <Badge
                          variant="outline"
                          className="rounded-full border-amber-500 text-amber-500 font-semibold bg-white"
                        >
                          Мало
                        </Badge>
                      )}
                      {product.status === 'unavailable' && (
                        <Badge
                          variant="outline"
                          className="rounded-full border-[#ae1414] text-[#ae1414] font-semibold bg-white"
                        >
                          Нет в наличии
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="font-['Inter'] font-semibold text-[#131313] text-sm">
                      {product.stock}
                    </TableCell>
                    <TableCell className="font-['Inter'] font-semibold text-[#131313] text-sm">
                      {formatPrice(product.price)}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger className="font-['Inter'] font-semibold text-[#131313] text-sm">
                          •••
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-white shadow-lg rounded-md border border-gray-200">
                          <DropdownMenuItem onClick={() => navigate(`/products/${product.id}/edit`)}>
                            Редактировать
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDelete(product.id)}>
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