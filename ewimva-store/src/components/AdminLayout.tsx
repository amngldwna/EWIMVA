// Импорт необходимых компонентов и зависимостей
import { Outlet } from 'react-router-dom';
import Header from './Header';
// import Footer from './Footer'; // Закомментирован импорт футера
import AdminSidebar from './AdminSidebar';

// Компонент AdminLayout отвечает за общую структуру административной панели
export default function AdminLayout(): JSX.Element {
return (
// Основной контейнер с гибкой колонкой, минимальной высотой экрана
<div className="flex flex-col min-h-screen">
    {/* Шапка административной панели */}
    <Header />
    {/* Основной контейнер для боковой панели и контента */}
    <div className="flex flex-1">
    {/* Боковая панель навигации */}
    <AdminSidebar />
    {/* Основной контент страницы, отступ слева для боковой панели */}
    <main className="flex-1 p-8 ml250px">
        {/* Outlet для рендеринга дочерних маршрутов */}
        <Outlet />
    </main>
    </div>
    {/* <Footer /> */} 
</div>
);
}
