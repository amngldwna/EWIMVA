// Импорт необходимых библиотек и компонентов
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";

// Компонент главной страницы для мужской одежды
export const EwimvaMenHome = (): JSX.Element => {
  const navigate = useNavigate();

  // Данные о категориях товаров для мужчин
  const categoryData = [
    {
      id: 1,
      name: "РУБАШКИ",
      image: "photo2.png",
      path: "/men/shirts",
    },
    {
      id: 2,
      name: "КОСТЮМЫ",
      image: "/phh3.png",
      path: "/men/suit",
    },
    {
      id: 3,
      name: "БРЮКИ",
      image: "/photo3.png",
      path: "/men/pants",
    },
    {
      id: 4,
      name: "КУРТКИ",
      image: "/complect.png",
      path: "/men/jackets-outerwear",
    },
  ];

  return (
    // Основной контейнер страницы
    <div
      className="bg-white flex flex-col items-center w-full"
      data-model-id="1:273"
    >
      {/* Навигационное меню */}
      {/* <nav className="bg-gray-800 p-20 w-full">
        <ul className="flex flex-wrap justify-center space-x-4 text-white">
          <li><Link to="/">Женская</Link></li>
          <li><Link to="/men">Мужская</Link></li>
          <li><Link to="/login">Войти</Link></li>
          <li><Link to="/register">Регистрация</Link></li>
          <li><Link to="/favourites">Фавориты</Link></li>
          <li><Link to="/search">Поиск</Link></li>
          <li><Link to="/men/new">Новинки</Link></li>
          <li><Link to="/product/301">Товар</Link></li>
          <li><Link to="/account">Мой аккаунт</Link></li>
          <li><Link to="/details">Детали</Link></li>
          <li><Link to="/recovery">Сброс пароля</Link></li>
          <li><Link to="/help">Помощь</Link></li>
          <li><Link to="/users">Пользователи</Link></li>
          <li><Link to="/products">Товары</Link></li>
          <li><Link to="/orders">Заказы</Link></li>
          <li><Link to="/dashboard">Дашборд</Link></li>
          <li><Link to="/purchases">Покупка</Link></li>
          <li><Link to="/orders/0/edit">Редактировать заказы</Link></li>
          <li><Link to="/orders/0/details">Просмотр деталей заказы</Link></li>
          <li><Link to="/dashboard">Просмотр деталей товары</Link></li>
          <li><Link to="/products/1/edit">Редактировать товары</Link></li>
          <li><Link to="/products/add">Добавить товар</Link></li>
          <li><Link to="/users/USR-1001/edit">Редактировать пользователей</Link></li>
          <li><Link to="/users/add">Добавить пользователя</Link></li>
        </ul>
      </nav> */}

      <div className="bg-white w-full max-w-[1920px] relative">
        {/* Секция с баннером новинок */}
        <section className="relative w-full h-[1144px]" onClick={() => navigate('/men/new')}>
          <div className="w-full h-full bg-[url(/ph2.png)] bg-cover bg-center flex flex-col items-center justify-center cursor-pointer">
            <h2 className="[text-shadow:0px_0px_10px_#1313131a] font-['Inter',Helvetica] font-bold text-white text-[54.5px] text-center tracking-[0] leading-[68px] underline">
              NEW NOW
            </h2>
            <span className="mt-8 [text-shadow:0px_0px_10px_#1313131a] font-['Inter',Helvetica] font-bold text-white text-[6.5px] text-center tracking-[0] leading-[18px] underline">
              УЗНАТЬ БОЛЬШЕ
            </span>
          </div>
        </section>

        {/* Секция с категориями товаров */}
        <div className="w-full mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {categoryData.map((category) => (
              <Card key={category.id} className="rounded-none border-0">
                <CardContent className="p-0">
                  <div
                    className="relative w-full h-[960px] bg-cover bg-center cursor-pointer"
                    style={{ backgroundImage: `url(${category.image})` }}
                    onClick={() => navigate(category.path)}
                  >
                    <div className="absolute bottom-[50px] left-8 font-bold text-white text-[13px] underline font-['Inter',Helvetica] tracking-[0] leading-[18px] whitespace-nowrap">
                      {category.name}
                    </div>
                    <div className="absolute bottom-[50px] right-[155px] font-bold text-white text-[12.8px] text-center underline font-['Inter',Helvetica] tracking-[0] leading-[18px] whitespace-nowrap">
                      ПОСМОТРЕТЬ ВСЕ
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Секция с баннером о костюмах */}
        <section className="relative w-full h-[1144px]" onClick={() => navigate('/men/suit')}>
          <div className="w-full h-full bg-[url(/ph6.png)] bg-cover bg-center flex flex-col items-center justify-center cursor-pointer">
            <div className="flex flex-col items-center gap-6">
              <h2 className="text-white text-[54.5px] font-bold font-['Inter',Helvetica] tracking-[0] leading-[68px] underline text-center [text-shadow:0px_0px_10px_#1313131a]">
                THE SUIT GUIDE
              </h2>
              <Button
                variant="link"
                className="text-white text-[6.5px] font-bold font-['Inter',Helvetica] tracking-[0] leading-[18px] underline [text-shadow:0px_0px_10px_#1313131a] p-0 h-auto"
              >
                УЗНАТЬ БОЛЬШЕ
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default EwimvaMenHome;