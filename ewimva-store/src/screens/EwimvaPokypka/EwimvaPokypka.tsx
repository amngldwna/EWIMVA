// Импорт необходимых библиотек и компонентов
import React, { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { useNavigate } from 'react-router-dom';
import { Trash2 } from 'lucide-react';

// Интерфейс для описания структуры элемента покупки
interface PurchaseItem {
  id: number;
  name: string;
  price: string;
  image: string;
  quantity: number;
  colorVariants: { color: string; image: string }[];
  orderDate: string;
  totalAmount: number;
  orderId: string;
}

// Компонент страницы "Мои покупки"
export const EwimvaPokypka = (): JSX.Element => {
  const navigate = useNavigate();

  // Состояние для хранения списка покупок
  const [purchases, setPurchases] = useState<PurchaseItem[]>([]);

  // Загрузка данных о покупках из localStorage при загрузке компонента
  useEffect(() => {
    try {
      const savedPurchases = localStorage.getItem('purchases');
      if (savedPurchases) {
        const orders = JSON.parse(savedPurchases);
        const normalizedPurchases: PurchaseItem[] = [];
        const shipping = 500; // Стоимость доставки

        // Нормализация данных заказов
        orders.forEach((order: any, orderIndex: number) => {
          const baseOrderDate = order.date || new Date().toISOString().split('T')[0];

          order.products.forEach((product: { name: string; quantity: number; price: string; image: string; colorVariants: { color: string; image: string }[] }, productIndex: number) => {
            const priceNum = parseFloat(product.price.replace(' KGS', '').replace(' ', '')) || 0;
            const quantity = product.quantity || 1;
            const totalAmount = priceNum * quantity + (productIndex === 0 ? shipping : 0);

            normalizedPurchases.push({
              id: orderIndex * 1000 + normalizedPurchases.length,
              name: product.name || 'Неизвестный товар',
              price: product.price || '0 KGS',
              image: product.image || '/placeholder-image.jpg',
              quantity: quantity,
              colorVariants: product.colorVariants || [],
              orderDate: baseOrderDate,
              totalAmount: totalAmount,
              orderId: order.id || `CRD-${orderIndex}`,
            });
          });
        });

        setPurchases(normalizedPurchases);
      }
    } catch (error) {
      console.error('Ошибка при загрузке покупок:', error);
      setPurchases([]);
    }
  }, []);

  // Обработчик очистки всех покупок
  const handleClearPurchases = () => {
    localStorage.removeItem('purchases'); // Удаление данных о покупках из localStorage
    setPurchases([]); // Очистка состояния
  };

  // Обработчик удаления отдельной покупки
  const handleRemovePurchase = (id: number) => {
    const updatedPurchases = purchases.filter((item) => item.id !== id);
    setPurchases(updatedPurchases);

    // Обновление данных в localStorage
    const updatedOrders = updatedPurchases.reduce((acc: any[], item) => {
      const order = acc.find((o) => o.id === item.orderId);
      if (order) {
        order.products.push({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          image: item.image,
          colorVariants: item.colorVariants,
        });
      } else {
        acc.push({
          id: item.orderId,
          customer: '',
          email: '',
          date: item.orderDate,
          status: 'processing',
          items: item.quantity,
          amount: `${updatedPurchases.filter(p => p.orderId === item.orderId).reduce((sum, p) => sum + p.totalAmount, 0).toLocaleString()} с`,
          products: [{
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            image: item.image,
            colorVariants: item.colorVariants,
          }],
        });
      }
      return acc;
    }, []);

    localStorage.setItem('purchases', JSON.stringify(updatedOrders));
  };

  return (
    // Основной контейнер страницы
    <div className="bg-white flex flex-row justify-center w-full">
      <div className="bg-white overflow-hidden w-[1920px] min-h-screen relative">
        <style>
          {`
            @media (max-width: 640px) {
              .purchase-container { padding: 10px; }
              .purchase-header { margin-bottom: 10px; margin-top: 50px; }
              .purchase-header h1 { font-size: 18px; }
              .purchase-header button { font-size: 12px; padding: 5px 10px; }
              .purchase-card { flex-direction: column; }
              .purchase-card .purchase-image { width: 100%; height: 200px; margin-bottom: 10px; }
              .purchase-card .purchase-details { width: 100%; }
              .purchase-card div { font-size: 12px; }
              .purchase-card button { font-size: 12px; }
            }
            @media (min-width: 641px) and (max-width: 1024px) {
              .purchase-container { padding: 20px; }
              .purchase-header { margin-bottom: 20px; margin-top: 80px; }
              .purchase-header h1 { font-size: 20px; }
              .purchase-header button { font-size: 13px; padding: 8px 15px; }
              .purchase-card { flex-direction: row; }
              .purchase-card .purchase-image { width: 250px; height: 350px; }
              .purchase-card .purchase-details { width: calc(100% - 260px); }
              .purchase-card div { font-size: 13px; }
              .purchase-card button { font-size: 13px; }
            }
            @media (min-width: 1025px) {
              .purchase-container { padding: 4px 8px; margin-top: 10px; }
            }
            .purchase-container { max-width: 1920px; margin: auto; }
            .purchase-header { display: flex; justify-content: space-between; align-items: center; }
            .purchase-card { display: flex; align-items: start; }
            .purchase-image { margin-right: 16px; }
            .purchase-details { flex: 1; }
          `}
        </style>
        {purchases.length > 0 ? (
          // Отображение списка покупок
          <div className="purchase-container max-w-[1920px] mx-auto px-4 py-8 pb-8">
            <div className="purchase-header flex justify-between items-center mb-6 mt-10">
              <h1 className="mt-5 [font-family:'Inter',Helvetica] font-bold text-[#131313] text-[24px] tracking-[0] leading-5 whitespace-nowrap">
                Мои покупки
              </h1>
              <Button
                className="mt-5 bg-[#131313] rounded-none hover:bg-[#333333] text-white text-[13px] [font-family:'Inter',Helvetica] font-bold tracking-[0] leading-[18px] whitespace-nowrap"
                onClick={handleClearPurchases}
              >
                Очистить
              </Button>
            </div>
            <div className="space-y-6">
              {purchases.map((item) => (
                <Card key={item.id} className="w-full border-none">
                  <CardContent className="p-0 flex items-start">
                    <div
                      className="purchase-image w-[326px] h-[453px] bg-cover bg-center mr-4"
                      style={{ backgroundImage: `url(${item.image})` }}
                    />
                    <div className="purchase-details flex-1 space-y-2">
                      <h3 className="font-normal text-[11.8px] text-[#131313] [font-family:'Inter',Helvetica] leading-[18px]">
                        {item.name}
                      </h3>
                      <p className="font-normal text-[12.8px] text-[#131313] [font-family:'Inter',Helvetica] leading-[18px]">
                        {item.price}
                      </p>
                      <div className="flex items-center gap-3 mt-2">
                        {item.colorVariants.map((color, index) => (
                          <div
                            key={index}
                            className="w-3.5 h-3.5 rounded-[7px] bg-cover bg-center"
                            style={{ backgroundImage: `url(${color.image || ''})` }}
                          />
                        ))}
                      </div>
                      <div className="font-normal text-[12.8px] text-[#131313] [font-family:'Inter',Helvetica] leading-[18px]">
                        Количество: {item.quantity}
                      </div>
                      <div className="font-normal text-[12.8px] text-[#131313] [font-family:'Inter',Helvetica] leading-[18px]">
                        Дата заказа: {item.orderDate}
                      </div>
                      <div className="font-normal text-[12.8px] text-[#131313] [font-family:'Inter',Helvetica] leading-[18px]">
                        Итоговая сумма: {item.totalAmount.toLocaleString()} KGS
                      </div>
                      <Button
                        variant="outline"
                        className="mt-2 bg-black text-white rounded-none hover:bg-black"
                        onClick={() => handleRemovePurchase(item.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" /> Удалить
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          // Отображение сообщения, если покупок нет
          <div className="absolute top-[294px] w-full flex justify-center">
            <div className="text-center">
              <div className="[font-family:'Inter',Helvetica] font-bold text-[#131313] text-[15.8px] tracking-[0] leading-5 whitespace-nowrap">
                У ВАС ПОКА НЕТ ПОКУПОК
              </div>
              <div className="w-[336px] mt-5 [font-family:'Inter',Helvetica] font-normal text-[#131313] text-xs tracking-[0] leading-[18px]">
                Вдохновляйтесь нашими коллекциями и приобретайте новинки для своего гардероба
              </div>
              <Button
                className="w-[350px] h-11 mt-6 bg-[#131313] rounded-none hover:bg-[#333333]"
                onClick={() => navigate('/new')}
              >
                <span className="text-white text-[13px] text-center [font-family:'Inter',Helvetica] font-bold tracking-[0] leading-[18px] whitespace-nowrap">
                  ПОСМОТРЕТЬ НОВИНКИ
                </span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
