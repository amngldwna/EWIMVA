// Импорт библиотек для работы с классами CSS
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Функция для объединения CSS-классов с использованием clsx и tailwind-merge
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs)); // Объединяет классы, устраняя конфликты
}
