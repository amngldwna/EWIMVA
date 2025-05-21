// Импорт необходимых библиотек и компонентов
import { EyeIcon, EyeOffIcon } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Checkbox } from "../../components/ui/checkbox";
import { Input } from "../../components/ui/input";
import { useNavigate } from 'react-router-dom';
import api from '../../lib/api';

// Компонент страницы входа
export const EwimvaLogin = (): JSX.Element => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false); // Состояние для показа/скрытия пароля
  const [email, setEmail] = useState(""); // Состояние для email
  const [password, setPassword] = useState(""); // Состояние для пароля
  const [error, setError] = useState(""); // Состояние для отображения ошибок

  // Проверка наличия токена при загрузке компонента
  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/account'); // Перенаправление на страницу аккаунта, если пользователь уже авторизован
    }
  }, [navigate]);

  // Обработчик входа
  const handleLogin = async () => {
    try {
      const response = await api.post('/auth/login', { email, password });
      // Сохранение данных пользователя в localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('userRole', response.data.user.role);
      console.log("Login successful:", response.data.user);
      navigate('/account'); // Перенаправление на страницу аккаунта
    } catch (err: any) {
      console.error("Login failed:", err.response?.data);
      setError(err.response?.data?.message || "Неправильный email или пароль");
    }
  };

  return (
    <div
      className="bg-white flex flex-row justify-center w-full"
      data-model-id="1:8"
    >
      <div className="bg-white overflow-hidden w-[1920px] h-[1300px] relative">
        <div className="absolute top-[234px] w-full flex justify-center">
          <Card className="w-[364px] h-[359px] border-none shadow-none">
            <CardContent className="p-0">
              {/* Заголовок */}
              <div className="w-[57px] [font-family:'Inter',Helvetica] font-bold text-[#131313] text-[15.8px] tracking-[0] leading-5 whitespace-nowrap mb-11">
                ВОЙТИ
              </div>
              {/* Отображение ошибки */}
              {error && (
                <div className="text-red-500 text-[12px] mb-4 text-center">
                  {error}
                </div>
              )}
              {/* Поле ввода email */}
              <div className="relative w-[350px] h-11 mb-6">
                <Input
                  className="absolute w-[350px] h-11 border border-solid border-[#b8b8b8] rounded-none"
                  placeholder="E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value.trim())}
                />
              </div>
              {/* Поле ввода пароля с переключателем видимости */}
              <div className="relative w-[350px] h-11 mb-7">
                <Input
                  className="absolute w-[350px] h-11 border border-solid border-[#b8b8b8] rounded-none pr-10"
                  type={showPassword ? "text" : "password"}
                  placeholder="Пароль"
                  value={password}
                  onChange={(e) => setPassword(e.target.value.trim())}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute w-[30px] h-[11px] top-3 right-3 cursor-pointer"
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
              {/* Чекбокс "Запомнить меня" */}
              <div className="flex items-center mb-7">
                <Checkbox
                  id="remember"
                  className="w-4 h-4 rounded-none border-[#131313]"
                />
                <label
                  htmlFor="remember"
                  className="ml-3 font-normal text-[#131313] text-[12.1px] [font-family:'Inter',Helvetica] tracking-[0] leading-[18px] whitespace-nowrap"
                >
                  Запомнить меня
                </label>
              </div>
              {/* Кнопка входа */}
              <Button
                className="w-[350px] h-11 bg-[#131313] rounded-none hover:bg-[#333333] mb-6"
                onClick={handleLogin}
              >
                <span className="font-bold text-white text-[13px] text-center [font-family:'Inter',Helvetica] tracking-[0] leading-[18px] whitespace-nowrap">
                  Войти
                </span>
              </Button>
              {/* Кнопка создания аккаунта */}
              <Button
                variant="outline"
                className="w-[350px] h-11 border border-solid border-[#131313] rounded-none mb-6"
                onClick={() => navigate('/register')}
              >
                <span className="font-bold text-[#131313] text-[12.3px] [font-family:'Inter',Helvetica] tracking-[0] leading-[18px] whitespace-nowrap">
                  Создать аккаунт
                </span>
              </Button>
              {/* Ссылка для восстановления пароля */}
              <div className="w-full text-center">
                <button
                  onClick={() => navigate('/recovery')}
                  className="[font-family:'Inter',Helvetica] font-bold text-[#131313] text-[12.8px] text-center tracking-[0] leading-[18px] underline whitespace-nowrap"
                >
                  Забыли пароль?
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EwimvaLogin;
