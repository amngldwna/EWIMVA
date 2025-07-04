Онлайн-магазин одежды EWIMVA

О проекте
EWIMVA — это веб-приложение, созданное в рамках дипломной работы. Оно представляет собой онлайн-магазин одежды, где пользователи могут просматривать товары, добавлять их в корзину и избранное, регистрироваться, входить в аккаунт и управлять своими данными. Администраторы имеют доступ к панели управления для работы с заказами, товарами и пользователями.

Автор:
Студент: Тоокебаева Эльмира Амангелдиевна
Группа: ПИ-4-22
Учебное заведение: COMTEHNO
Описание: Проект разработан в рамках дипломной работы для демонстрации навыков фронтенд- и бэкенд-разработки.

Стек технологий:
Frontend:
React + TypeScript
HTML5, CSS3
Tailwind CSS
Vite (как инструмент сборки)
LocalStorage (для хранения данных на стороне клиента)

Backend:
Node.js + Express
MongoDB Atlas (база данных)
JSON Web Tokens (JWT) для аутентификации

Дополнительно:
Mongoose (для работы с MongoDB)
CORS (для обработки кросс-доменных запросов)
dotenv (для управления переменными окружения)

Возможности:
Регистрация и вход в аккаунт
Восстановление пароля
Просмотр каталога товаров с фильтрацией по категориям (мужская/женская одежда, новинки и т.д.)
Добавление товаров в избранное
Добавление товаров в корзину
Оформление заказа
Админ-панель:
Управление товарами (добавление, редактирование, удаление)
Управление заказами (просмотр, изменение статуса)
Управление пользователями (добавление, редактирование, удаление)
Поиск товаров
Адаптивный дизайн для мобильных устройств

Структура проекта:
Проект разделен на две основные части: клиентская (ewimva-store) и серверная (ewimva-store-backend).

Клиентская часть (ewimva-store)
src/components: Компоненты React (Header, Footer, ProductSection, UI-компоненты и т.д.)
src/screens: Экраны приложения (домашняя страница, каталог, корзина, админ-панель и т.д.)
src/data: Данные о категориях и продуктах
src/lib: Утилиты и API-функции
Конфигурация: Vite, Tailwind CSS, TypeScript, ESLint

Серверная часть (ewimva-store-backend)
controllers: Логика обработки запросов (аутентификация, заказы, товары)
models: Схемы Mongoose для пользователей, продуктов и заказов
routes: Маршруты API
middleware: Промежуточное ПО для аутентификации и проверки прав администратора
Конфигурация: MongoDB Atlas, Express, JWT

Как запустить проект
Предварительные требования

Установленный Node.js (рекомендуемая версия: 18.x или выше)
Установленный npm
Доступ к MongoDB Atlas (настройте строку подключения в .env)

Установка

Клонируйте репозиторий:git clone <URL_репозитория>
cd EWIMVA

Установите зависимости для клиентской части:cd ewimva-store
npm install

Установите зависимости для серверной части:cd ../ewimva-store-backend
npm install

Создайте файл .env в директории ewimva-store-backend и добавьте следующие переменные:PORT=5000
MONGO_URI=<ваша_строка_подключения_к_MongoDB_Atlas>
JWT_SECRET=<ваш_секретный_ключ_для_JWT>

Запуск проекта:
Запустите серверную часть:
cd ewimva-store-backend
npm start

Или используйте:
node index.js

Сервер запустится на http://localhost:5000.

Запустите клиентскую часть в режиме разработки:
cd ../ewimva-store
npm run dev

Клиентская часть будет доступна на http://localhost:5173 (или другом порту, указанном Vite).

Для запуска серверной части в режиме разработки:
cd ewimva-store
npm run server

Доступ к приложению:
Откройте браузер и перейдите по адресу http://localhost:5173.
Для доступа к админ-панели используйте учетную запись с ролью admin.

Примечания:
Убедитесь, что MongoDB Atlas доступен и строка подключения в .env корректна.
Для тестирования функции сброса пароля используется имитация (без отправки реальных писем).
Логирование ошибок сервера осуществляется через console.error.
Убедитесь, что файл .env добавлен в .gitignore, чтобы избежать утечки конфиденциальных данных.

Лицензия:
Проект создан в образовательных целях и не имеет лицензии для коммерческого использования.
