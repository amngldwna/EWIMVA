// Импорт необходимых библиотек и компонентов
import { EyeIcon, EyeOffIcon } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Checkbox } from "../../components/ui/checkbox";
import { Input } from "../../components/ui/input";
import { useNavigate } from 'react-router-dom';
import api from '../../lib/api';

// Компонент страницы регистрации
export const EwimvaRegistry = (): JSX.Element => {
  const navigate = useNavigate();
  // Состояние для отображения пароля
  const [showPassword, setShowPassword] = useState(false);
  // Состояния для хранения данных формы
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+996");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("");
  // Состояние для отображения ошибок
  const [error, setError] = useState("");

  // Функция валидации пароля
  const validatePassword = (pwd: string) => {
    const hasUpperCase = /[A-Z]/.test(pwd);
    const hasNumber = /\d/.test(pwd);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>_]/.test(pwd);
    const isLongEnough = pwd.length >= 8;
    return hasUpperCase && hasNumber && hasSpecialChar && isLongEnough;
  };

  // Функция форматирования номера телефона
  const formatPhoneNumber = (value: string) => {
    const digits = value.replace(/[^\d]/g, "").slice(3); 
    if (digits.length === 0) return "+996";
    if (digits.length <= 3) return `+996 (${digits})`;
    if (digits.length <= 6) return `+996 (${digits.slice(0, 3)}) ${digits.slice(3)}`;
    if (digits.length <= 9) return `+996 (${digits.slice(0, 3)}) ${digits.slice(3, 6)} ${digits.slice(6)}`;
    return `+996 (${digits.slice(0, 3)}) ${digits.slice(3, 6)} ${digits.slice(6, 9)}`;
  };

  // Обработчик изменения номера телефона
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!value.startsWith("+996")) {
      setPhone("+996");
      return;
    }
    
    const digits = value.replace(/[^\d]/g, "").slice(3);
    if (digits.length > 9) return;
    setPhone(formatPhoneNumber(value));
  };

  // Обработчик регистрации
  const handleRegister = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Введите корректный email");
      return;
    }

    if (!validatePassword(password)) {
      setError("Пароль должен быть минимум 8 символов, содержать заглавную букву, цифру и спецсимвол");
      return;
    }

    if (!name) {
      setError("Введите ваше имя");
      return;
    }

    const phoneDigits = phone.replace(/[^\d]/g, "").slice(3);
    if (phoneDigits.length !== 9) {
      setError("Введите корректный номер телефона (9 цифр после +996)");
      return;
    }

    if (!birthDate) {
      setError("Введите дату рождения");
      return;
    }

    if (!gender) {
      setError("Выберите пол");
      return;
    }

    try {
      // Отправка запроса на регистрацию
      const response = await api.post('/auth/register', { 
        email: email.toLowerCase(), 
        password, 
        name, 
        phone, 
        birthDate, 
        gender 
      });
      // Сохранение данных пользователя
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('userRole', response.data.user.role);
      console.log("Registered user:", response.data.user);
      navigate('/account'); // Перенаправление на страницу аккаунта
    } catch (err: any) {
      console.error("Registration failed:", err.response?.data);
      setError(err.response?.data?.message || "Ошибка регистрации");
    }
  };

  return (
    // Основной контейнер страницы
    <div className="bg-white flex flex-row justify-center w-full">
      <div className="bg-white overflow-hidden w-[1920px] h-[1200px] relative">
        <div className="absolute top-[170px] w-full flex justify-center">
          <Card className="w-[364px] h-[650px] border-none shadow-none">
            <CardContent className="p-0">
              {/* Заголовок страницы */}
              <div className="w-[165px] [font-family:'Inter',Helvetica] font-bold text-[#131313] text-[15.8px] tracking-[0] leading-5 whitespace-nowrap mb-11">
                СОЗДАЙТЕ АККАУНТ
              </div>
              {/* Отображение сообщения об ошибке */}
              {error && (
                <div className="text-red-500 text-[12px] mb-4 text-center">
                  {error}
                </div>
              )}
              {/* Поле ввода имени */}
              <div className="relative w-[350px] h-11 mb-6">
                <Input
                  className="absolute w-[350px] h-11 border border-solid border-[#b8b8b8] rounded-none"
                  placeholder="Имя"
                  value={name}
                  onChange={(e) => setName(e.target.value.trim())}
                />
              </div>
              {/* Поле ввода email */}
              <div className="relative w-[350px] h-11 mb-6">
                <Input
                  className="absolute w-[350px] h-11 border border-solid border-[#b8b8b8] rounded-none"
                  placeholder="E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value.trim())}
                />
              </div>
              {/* Поле ввода номера телефона */}
              <div className="relative w-[350px] h-11 mb-6">
                <Input
                  className="absolute w-[350px] h-11 border border-solid border-[#b8b8b8] rounded-none"
                  placeholder="+996 (555) 55 55 55"
                  value={phone}
                  onChange={handlePhoneChange}
                />
              </div>
              {/* Поле ввода даты рождения */}
              <div className="relative w-[350px] h-11 mb-6">
                <Input
                  className="absolute w-[350px] h-11 border border-solid border-[#b8b8b8] rounded-none"
                  type="date"
                  placeholder="Дата рождения"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                />
              </div>
              {/* Выбор пола */}
              <div className="relative w-[350px] h-11 mb-6">
                <select
                  className="w-[350px] h-11 border border-solid border-[#b8b8b8] rounded-none text-[#131313] text-[14px] [font-family:'Inter',Helvetica] bg-white"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="" disabled>Выберите пол</option>
                  <option value="женский">Женский</option>
                  <option value="мужской">Мужской</option>
                </select>
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
              {/* Кнопка создания аккаунта */}
              <Button
                className="w-[350px] h-11 bg-[#131313] rounded-none hover:bg-[#333333] mb-6"
                onClick={handleRegister}
              >
                <div className="w-[105px] font-bold text-white text-[12.3px] text-center [font-family:'Inter',Helvetica] tracking-[0] leading-[18px] whitespace-nowrap">
                  Создать аккаунт
                </div>
              </Button>
              {/* Ссылка для перехода на страницу входа */}
              <div className="w-full flex justify-center mt-6">
                <div className="w-[185px] font-normal text-[#131313] text-xs text-center [font-family:'Inter',Helvetica] tracking-[0] leading-[18px] whitespace-nowrap">
                  <span className="[font-family:'Inter',Helvetica] font-normal text-[#131313] text-xs tracking-[0] leading-[18px]">
                    У Вас уже есть аккаунт?{" "}
                  </span>
                  <button
                    onClick={() => navigate('/login')}
                    className="font-bold underline cursor-pointer"
                  >
                    Войти
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EwimvaRegistry;
