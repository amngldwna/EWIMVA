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
import { Label } from '../../../components/ui/label';
import { addProduct } from '../../../data/productsData';
import { categories } from '../../../data/categories';

// Интерфейс для ошибок формы
interface FormErrors {
name?: string;
category?: string;
color?: string;
stock?: string;
price?: string;
image?: string;
gender?: string;
}

// Компонент для добавления нового товара
export default function AddProduct(): JSX.Element {
// Состояние для полей формы и ошибок
const [name, setName] = useState('');
const [category, setCategory] = useState(categories[0].name);
const [color, setColor] = useState('');
const [status, setStatus] = useState<'available' | 'low' | 'unavailable'>('available');
const [stock, setStock] = useState('');
const [price, setPrice] = useState('');
const [image, setImage] = useState('');
const [gender, setGender] = useState<'male' | 'female' | 'unisex'>('female');
const [errors, setErrors] = useState<FormErrors>({});
const navigate = useNavigate();

// Форматирование цены для отображения
const formatPrice = (value: string): string => {
const cleanValue = value.replace(/[^\d]/g, '');
if (!cleanValue) return '';
const number = parseInt(cleanValue, 10);
const formatted = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
return `KGS ${formatted}`;
};

// Валидация формы
const validateForm = (): FormErrors => {
const newErrors: FormErrors = {};
if (!name.trim()) {
    newErrors.name = 'Название обязательно';
}
if (!category) {
    newErrors.category = 'Категория обязательна';
}
if (!color.trim()) {
    newErrors.color = 'Цвет обязателен';
}
if (!stock || isNaN(Number(stock)) || Number(stock) < 0) {
    newErrors.stock = 'Остаток должен быть числом больше или равным 0';
}
if (!price || !/^KGS\s*\d{1,3}(?:\s*\d{3})*$/.test(price.trim())) {
    newErrors.price = 'Цена должна быть в формате "KGS число" (например, "KGS 6 990")';
}
if (!image.trim()) {
    newErrors.image = 'Путь к изображению обязателен';
}
if (!gender) {
    newErrors.gender = 'Пол обязателен';
}
return newErrors;
};

// Обработчик изменения цены
const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
const value = e.target.value;
const cleanValue = value.replace(/[^\d]/g, '');
setPrice(cleanValue ? formatPrice(cleanValue) : '');
};

// Обработчик отправки формы
const handleSubmit = async (e: React.FormEvent) => {
e.preventDefault();
const validationErrors = validateForm();
if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
}

try {
    await addProduct({
    name,
    category,
    color,
    status,
    stock: Number(stock),
    price,
    image,
    gender,
    });

    setErrors({});
    alert('Товар успешно добавлен!');
    navigate('/products');
} catch (error) {
    setErrors({ image: 'Ошибка при добавлении товара. Попробуйте позже.' });
}
};

return (
<main className="flex-1 p-8">
    {/* Карточка с формой добавления */}
    <Card className="border border-solid border-[#00000040] rounded-[10px]">
    <CardHeader>
        <CardTitle className="font-['Inter'] font-semibold text-[#131313] text-[40px] mb-12">
        Добавить новый товар
        </CardTitle>
    </CardHeader>
    <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
        <div>
            <Label
            className="font-['Inter'] font-normal text-[#131313] text-sm mb-2 block"
            htmlFor="name"
            >
            Название
            </Label>
            <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Введите название товара"
            className={`w-full border-[#00000040] rounded-md focus:border-[#131313] focus:ring-1 focus:ring-[#131313] p-2 ${errors.name ? 'border-red-500' : ''}`}
            />
            {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
        </div>
        <div>
            <Label
            className="font-['Inter'] font-normal text-[#131313] text-sm mb-2 block"
            htmlFor="category"
            >
            Категория
            </Label>
            <Select onValueChange={(value: string) => setCategory(value)} defaultValue={category}>
            <SelectTrigger
                id="category"
                className={`w-full border-[#00000040] rounded-md focus:border-[#131313] focus:ring-1 focus:ring-[#131313] p-2 ${errors.category ? 'border-red-500' : ''}`}
            >
                <SelectValue placeholder="Выберите категорию" />
            </SelectTrigger>
            <SelectContent>
                {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.name}>
                    {cat.name}
                </SelectItem>
                ))}
            </SelectContent>
            </Select>
            {errors.category && (
            <p className="text-red-500 text-xs mt-1">{errors.category}</p>
            )}
        </div>
        <div>
            <Label
            className="font-['Inter'] font-normal text-[#131313] text-sm mb-2 block"
            htmlFor="gender"
            >
            Пол
            </Label>
            <Select onValueChange={(value: 'male' | 'female' | 'unisex') => setGender(value)} defaultValue={gender}>
            <SelectTrigger
                id="gender"
                className={`w-full border-[#00000040] rounded-md focus:border-[#131313] focus:ring-1 focus:ring-[#131313] p-2 ${errors.gender ? 'border-red-500' : ''}`}
            >
                <SelectValue placeholder="Выберите пол" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="female">Женский</SelectItem>
                <SelectItem value="male">Мужской</SelectItem>
                <SelectItem value="unisex">Унисекс</SelectItem>
            </SelectContent>
            </Select>
            {errors.gender && (
            <p className="text-red-500 text-xs mt-1">{errors.gender}</p>
            )}
        </div>
        <div>
            <Label
            className="font-['Inter'] font-normal text-[#131313] text-sm mb-2 block"
            htmlFor="color"
            >
            Цвет
            </Label>
            <Input
            id="color"
            type="text"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            placeholder="Введите цвет (например, Чёрный)"
            className={`w-full border-[#00000040] rounded-md focus:border-[#131313] focus:ring-1 focus:ring-[#131313] p-2 ${errors.color ? 'border-red-500' : ''}`}
            />
            {errors.color && (
            <p className="text-red-500 text-xs mt-1">{errors.color}</p>
            )}
        </div>
        <div>
            <Label
            className="font-['Inter'] font-normal text-[#131313] text-sm mb-2 block"
            htmlFor="status"
            >
            Статус
            </Label>
            <Select onValueChange={(value: 'available' | 'low' | 'unavailable') => setStatus(value)} defaultValue={status}>
            <SelectTrigger
                id="status"
                className="w-full border-[#00000040] rounded-md focus:border-[#131313] focus:ring-1 focus:ring-[#131313] p-2"
            >
                <SelectValue placeholder="Выберите статус" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="available">В наличии</SelectItem>
                <SelectItem value="low">Мало</SelectItem>
                <SelectItem value="unavailable">Нет в наличии</SelectItem>
            </SelectContent>
            </Select>
        </div>
        <div>
            <Label
            className="font-['Inter'] font-normal text-[#131313] text-sm mb-2 block"
            htmlFor="stock"
            >
            Остаток
            </Label>
            <Input
            id="stock"
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            placeholder="Введите количество на складе"
            className={`w-full border-[#00000040] rounded-md focus:border-[#131313] focus:ring-1 focus:ring-[#131313] p-2 ${errors.stock ? 'border-red-500' : ''}`}
            />
            {errors.stock && (
            <p className="text-red-500 text-xs mt-1">{errors.stock}</p>
            )}
        </div>
        <div>
            <Label
            className="font-['Inter'] font-normal text-[#131313] text-sm mb-2 block"
            htmlFor="price"
            >
            Цена
            </Label>
            <Input
            id="price"
            type="text"
            value={price}
            onChange={handlePriceChange}
            placeholder="Введите цену (например, KGS 6 990)"
            className={`w-full border-[#00000040] rounded-md focus:border-[#131313] focus:ring-1 focus:ring-[#131313] p-2 ${errors.price ? 'border-red-500' : ''}`}
            />
            {errors.price && (
            <p className="text-red-500 text-xs mt-1">{errors.price}</p>
            )}
        </div>
        <div>
            <Label
            className="font-['Inter'] font-normal text-[#131313] text-sm mb-2 block"
            htmlFor="image"
            >
            Изображение
            </Label>
            <Input
            id="image"
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Введите путь к изображению (например, /images/jacket.png)"
            className={`w-full border-[#00000040] rounded-md focus:border-[#00000040] focus:ring-1 focus:ring-[#131313] p-2 ${errors.image ? 'border-red-500' : ''}`}
            />
            {errors.image && (
            <p className="text-red-500 text-xs mt-1">{errors.image}</p>
            )}
        </div>
        <div className="flex gap-4">
            <Button
            type="submit"
            className="bg-black text-white rounded-md px-6 py-2"
            >
            Сохранить
            </Button>
            <Link to="/products" className="text-blue-500 underline mt-2">
            Назад к товарам
            </Link>
        </div>
        </form>
    </CardContent>
    </Card>
</main>
);
}