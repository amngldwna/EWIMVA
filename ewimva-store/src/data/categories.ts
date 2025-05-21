// Интерфейс для описания категории товаров
export interface Category {
id: number; // Уникальный идентификатор категории
name: string; // Название категории
path: string; // Путь для навигации
type: 'women' | 'men'; // Тип категории (женская или мужская)
}

// Массив категорий товаров
export const categories: Category[] = [
// Женские категории
{ id: 1, name: 'Новинки', path: '/new', type: 'women' },
{ id: 2, name: 'Сумки', path: '/bags', type: 'women' },
{ id: 3, name: 'Пальто', path: '/coats', type: 'women' },
{ id: 4, name: 'Платья', path: '/dress', type: 'women' },
{ id: 5, name: 'Парфюмерия', path: '/fragrances', type: 'women' },
{ id: 6, name: 'Джемперы и кардиганы', path: '/jumpers-and-cardigans', type: 'women' },
{ id: 7, name: 'Брюки', path: '/pants', type: 'women' },
{ id: 8, name: 'Рубашки и блузки', path: '/shirts-and-blouses', type: 'women' },
{ id: 9, name: 'Обувь', path: '/shoes', type: 'women' },
{ id: 10, name: 'Вечеринки и мероприятия', path: '/party', type: 'women' },
// Мужские категории
{ id: 11, name: 'Новинки', path: '/men/new', type: 'men' },
{ id: 12, name: 'Куртки и верхняя одежда', path: '/men/jackets-outerwear', type: 'men' },
{ id: 13, name: 'Брюки', path: '/men/pants', type: 'men' },
{ id: 14, name: 'Рубашки', path: '/men/shirts', type: 'men' },
{ id: 15, name: 'Обувь', path: '/men/shoes', type: 'men' },
{ id: 16, name: 'Костюмы', path: '/men/suit', type: 'men' },
];
