// Импорт необходимых библиотек и компонентов
import React, { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../lib/api';
import { AxiosResponse } from 'axios';

// Компонент страницы сброса пароля
export const EwimvaResetPassword = (): JSX.Element => {
    const navigate = useNavigate();
    // Получение токена из URL
    const { token } = useParams<{ token: string }>();
    // Состояния для хранения данных формы
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    // Состояние для отображения ошибок
    const [error, setError] = useState("");
    // Состояние для отображения сообщения об успехе
    const [success, setSuccess] = useState("");

    // Функция валидации пароля
    const validatePassword = (pwd: string) => {
    const hasUpperCase = /[A-Z]/.test(pwd);
    const hasNumber = /\d/.test(pwd);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>_]/.test(pwd);
    const isLongEnough = pwd.length >= 8;
    return hasUpperCase && hasNumber && hasSpecialChar && isLongEnough;
    };

    // Обработчик сброса пароля
    const handleResetPassword = async () => {
    if (!validatePassword(password)) {
        setError("Пароль должен быть минимум 8 символов, содержать заглавную букву, цифру и спецсимвол");
        setSuccess("");
        return;
    }

    if (password !== confirmPassword) {
        setError("Пароли не совпадают");
        setSuccess("");
        return;
    }

    try {
        // Отправка запроса на сервер для сброса пароля
        const response: AxiosResponse = await api.post('/auth/reset-password', { token, password });
        setSuccess(response.data.message || "Пароль успешно изменён. Вы можете войти с новым паролем.");
        setError("");
        setPassword("");
        setConfirmPassword("");
        setTimeout(() => navigate('/login'), 3000); // Перенаправление на страницу входа через 3 секунды
    } catch (err: any) {
        console.error("Reset password failed:", err.response?.data);
        setError(err.response?.data?.message || "Ошибка при сбросе пароля");
        setSuccess("");
    }
    };

    return (
    // Основной контейнер страницы
    <div className="bg-white flex flex-row justify-center w-full">
        <div className="bg-white overflow-hidden w-[1920px] h-[1200px] relative">
        <div className="absolute top-[234px] w-full flex justify-center">
            <Card className="w-[364px] h-[400px] border-none shadow-none">
            <CardContent className="p-0">
                {/* Заголовок страницы */}
                <div className="w-[200px] [font-family:'Inter',Helvetica] font-bold text-[#131313] text-[15.8px] tracking-[0] leading-5 whitespace-nowrap mb-11">
                НОВЫЙ ПАРОЛЬ
                </div>
                {/* Отображение сообщения об ошибке */}
                {error && (
                <div className="text-red-500 text-[12px] mb-4 text-center">
                    {error}
                </div>
                )}
                {/* Отображение сообщения об успехе */}
                {success && (
                <div className="text-green-500 text-[12px] mb-4 text-center">
                    {success}
                </div>
                )}
                {/* Поле ввода нового пароля */}
                <div className="relative w-[350px] h-11 mb-6">
                <Input
                    className="absolute w-[350px] h-11 border border-solid border-[#b8b8b8] rounded-none pr-10"
                    type={showPassword ? "text" : "password"}
                    placeholder="Новый пароль"
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
                {/* Поле подтверждения пароля */}
                <div className="relative w-[350px] h-11 mb-6">
                <Input
                    className="absolute w-[350px] h-11 border border-solid border-[#b8b8b8] rounded-none pr-10"
                    type={showPassword ? "text" : "password"}
                    placeholder="Подтвердите пароль"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value.trim())}
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute w-[30px] h-[11px] top-3 right-3 cursor-pointer"
                >
                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
                </div>
                {/* Кнопка сохранения нового пароля */}
                <Button
                className="w-[350px] h-11 bg-[#131313] rounded-none hover:bg-[#333333] mb-6"
                onClick={handleResetPassword}
                >
                <div className="w-[150px] font-bold text-white text-[12.3px] text-center [font-family:'Inter',Helvetica] tracking-[0] leading-[18px] whitespace-nowrap">
                    Сохранить пароль
                </div>
                </Button>
                {/* Ссылка для возврата на страницу входа */}
                <div className="w-full flex justify-center mt-6">
                <div className="w-[185px] font-normal text-[#131313] text-xs text-center [font-family:'Inter',Helvetica] tracking-[0] leading-[18px] whitespace-nowrap">
                    <span className="[font-family:'Inter',Helvetica] font-normal text-[#131313] text-xs tracking-[0] leading-[18px]">
                    Вернуться к{" "}
                    </span>
                    <button shouting
                    onClick={() => navigate('/login')}
                    className="font-bold underline cursor-pointer"
                    >
                    Входу
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

export default EwimvaResetPassword;
