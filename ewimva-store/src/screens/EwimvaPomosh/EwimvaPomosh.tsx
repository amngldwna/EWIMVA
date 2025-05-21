// Импорт необходимых библиотек и компонентов
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

// Компонент для отображения инструкций по уходу за одеждой
const CareInstructions = (): JSX.Element => {
  // Данные об инструкциях по уходу
  const careInstructionsData = [
    {
      category: "Стирка",
      items: [
        {
          icon: "/b-svg.svg",
          description:
            "Машинная стирка. Значения 30° C, 40° C, 60° C, 95° C указывают максимальную температуру стирки.",
        },
        {
          icon: "/e-svg-1.svg",
          description:
            "Машинная стирка с обычной программой и коротким отжимом. Значения 30º C, 40º C, 60º C, 95º C указывают максимальную температуру стирки.",
        },
        {
          icon: "/c-svg-1.svg",
          description:
            "Ручная стирка при максимальной температуре 30º C. Не трите и не выжимайте.",
        },
        {
          icon: "/d-svg-1.svg",
          description: "Не стирать.",
        },
      ],
    },
    {
      category: "Использование отбеливателя",
      items: [
        {
          icon: "/g-svg.svg",
          description: "Можно использовать отбеливатель.",
        },
        {
          icon: "/h-svg.svg",
          description: "Не отбеливать.",
        },
      ],
    },
    {
      category: "Глажка",
      items: [
        {
          icon: "/f-svg.svg",
          description:
            "Гладить при высокой температуре: максимум 200º C. Хлопок, лен и вискоза.",
        },
        {
          icon: "/e-svg.svg",
          description:
            "Гладить при средней температуре: максимум 150º C. Смесь шерсти и полиэстера.",
        },
        {
          icon: "/d-svg.svg",
          description:
            "Гладить при низкой температуре: максимум 110º C. Смесь шерсти и полиэстера. Натуральный шелк, вискоза, ацетат и акрил.",
        },
        {
          icon: "/c-svg.svg",
          description: "Не гладить.",
        },
      ],
    },
    {
      category: "Только сухая чистка.",
      items: [
        {
          icon: "/j-svg.svg",
          description:
            "Буквы A, F, P в кружках указывают на тип продукта, подходящего для каждой одежды (полезная информация для специалистов химчистки).",
        },
        {
          icon: "/k-svg.svg",
          description: "Не подвергать сухой чистке.",
        },
      ],
    },
    {
      category: "Сушка",
      items: [
        {
          icon: "/t-svg.svg",
          description: "Можно сушить в сушильной машине.",
        },
        {
          icon: "/u-svg.svg",
          description: "Не сушить в сушильной машине.",
        },
        {
          icon: "/v-svg.svg",
          description: "Сушить при низкой температуре.",
        },
        {
          icon: "/w-svg.svg",
          description: "Сушить в сушильной машине при нормальной температуре.",
        },
      ],
    },
  ];

  return (
    <section className="w-full max-w-[708px] mx-auto py-8">
      <style>
        {`
          @media (max-width: 640px) {
            .care-section { max-width: 90%; padding: 10px 4px; }
            .care-section h2 { font-size: 11px; margin-bottom: 6px; }
            .care-section h3 { font-size: 10px; }
            .care-section p { font-size: 10px; }
            .care-section img { width: 30px; height: auto; }
          }
          @media (min-width: 641px) and (max-width: 1024px) {
            .care-section { max-width: 700px; padding: 20px 6px; }
            .care-section h2 { font-size: 11.5px; margin-bottom: 7px; }
            .care-section h3 { font-size: 11px; }
            .care-section p { font-size: 11px; }
            .care-section img { width: 35px; height: auto; }
          }
          @media (min-width: 1025px) {
            .care-section { max-width: 708px; padding: 8px; }
          }
        `}
      </style>
      <h2 className="text-[12px] leading-5 font-bold text-[#131313] mb-8">
        КАК УХАЖИВАТЬ ЗА ОДЕЖДОЙ?
      </h2>

      <div className="space-y-10">
        {careInstructionsData.map((category, categoryIndex) => (
          <div key={categoryIndex} className="space-y-4">
            <h3 className="text-[12px] leading-[18px] font-bold text-[#131313]">
              {category.category}
            </h3>

            <div className="space-y-6">
              {category.items.map((item, itemIndex) => (
                <div key={itemIndex} className="flex items-start">
                  <div className="w-[42px] h-6 relative flex-shrink-0">
                    <div className="relative h-6">
                      <img
                        className="absolute h-6 top-0 left-1/2 transform -translate-x-1/2"
                        alt={`Care symbol ${categoryIndex}-${itemIndex}`}
                        src={item.icon}
                      />
                    </div>
                  </div>
                  <p className="text-[12px] leading-[18px] font-normal text-[#131313] ml-4">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// Компонент для отображения таблицы размеров
const SizeChartTable = (): JSX.Element => {
  const headers = ["РАЗМЕР", "ГРУДЬ", "ТАЛИЯ", "БЕДРА"];
  const sizeData = [
    { size: "XXS", chest: "78", waist: "59", hips: "86" },
    { size: "XS", chest: "82", waist: "62", hips: "90" },
    { size: "S", chest: "86", waist: "66", hips: "94" },
    { size: "M", chest: "92", waist: "72", hips: "100" },
    { size: "L", chest: "98", waist: "78", hips: "106" },
    { size: "XL", chest: "104", waist: "85", hips: "112" },
    { size: "XXL", chest: "110", waist: "92", hips: "118" },
    { size: "1XL", chest: "116", waist: "99", hips: "124" },
    { size: "2XL", chest: "124", waist: "108", hips: "132" },
    { size: "3XL", chest: "132", waist: "117", hips: "140" },
    { size: "4XL", chest: "140", waist: "126", hips: "148" },
  ];

  return (
    <section className="w-full max-w-[1000px] mx-auto my-16">
      <style>
        {`
          @media (max-width: 640px) {
            .size-chart-section { max-width: 90%; margin: 10px auto; padding: 0 4px; }
            .size-chart-section h2 { font-size: 11px; margin-bottom: 3px; }
            .size-chart-section table { font-size: 11px; }
            .size-chart-section th, .size-chart-section td { height: 30px; }
          }
          @media (min-width: 641px) and (max-width: 1024px) {
            .size-chart-section { max-width: 900px; margin: 12px auto; padding: 0 6px; }
            .size-chart-section h2 { font-size: 11.5px; margin-bottom: 3px; }
            .size-chart-section table { font-size: 11.5px; }
            .size-chart-section th, .size-chart-section td { height: 40px; }
          }
          @media (min-width: 1025px) {
            .size-chart-section { max-width: 1000px; padding: 0 8px; }
          }
        `}
      </style>
      <h2 className="font-bold text-[#131313] text-[12px] mb-4 [font-family:'Inter',Helvetica] tracking-[0] leading-[18px]">
        ТАБЛИЦА РАЗМЕРОВ
      </h2>

      <div className="border border-solid border-[#d7d7d8]">
        <Table>
          <TableHeader>
            <TableRow>
              {headers.map((header, index) => (
                <TableHead
                  key={index}
                  className="h-[46px] border border-solid border-[#d7d7d8] text-center"
                >
                  <div className="font-bold text-[#131313] text-[12px] [font-family:'Inter',Helvetica] tracking-[0] leading-[18px]">
                    {header}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {sizeData.map((row, index) => (
              <TableRow key={index}>
                <TableCell className="h-[46px] border border-solid border-[#d7d7d8] text-center">
                  <div className="[font-family:'Inter',Helvetica] font-normal text-[#131313] text-[12px] tracking-[0] leading-[18px]">
                    {row.size}
                  </div>
                </TableCell>
                <TableCell className="h-[46px] border border-solid border-[#d7d7d8] text-center">
                  <div className="[font-family:'Inter',Helvetica] font-normal text-[#131313] text-[12px] tracking-[0] leading-[18px]">
                    {row.chest}
                  </div>
                </TableCell>
                <TableCell className="h-[46px] border border-solid border-[#d7d7d8] text-center">
                  <div className="[font-family:'Inter',Helvetica] font-normal text-[#131313] text-[12px] tracking-[0] leading-[18px]">
                    {row.waist}
                  </div>
                </TableCell>
                <TableCell className="h-[46px] border border-solid border-[#d7d7d8] text-center">
                  <div className="[font-family:'Inter',Helvetica] font-normal text-[#131313] text-[12px] tracking-[0] leading-[18px]">
                    {row.hips}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

// Компонент для отображения таблицы соответствия международных размеров
const SizeConversionTable = (): JSX.Element => {
  const headers = ["CN", "DE", "EUR", "FR", "GB", "IT", "KR", "MEX", "US"];
  const sizeData = [
    {
      cn: "XS-155/78A",
      de: "XXS",
      eur: "XXS",
      fr: "XXS",
      gb: "4",
      it: "XXS",
      kr: "44",
      mex: "EECH",
      us: "0",
    },
    {
      cn: "S-155/80A",
      de: "XS",
      eur: "XS",
      fr: "XS",
      gb: "6",
      it: "XS",
      kr: "44,5",
      mex: "ECH",
      us: "2",
    },
    {
      cn: "M-160/84A",
      de: "S",
      eur: "S",
      fr: "S",
      gb: "8",
      it: "S",
      kr: "55",
      mex: "CH",
      us: "4",
    },
    {
      cn: "L-165/88A",
      de: "M",
      eur: "M",
      fr: "M",
      gb: "10",
      it: "M",
      kr: "55,5",
      mex: "M",
      us: "6",
    },
    {
      cn: "XL-170/92A",
      de: "L",
      eur: "L",
      fr: "L",
      gb: "12",
      it: "L",
      kr: "66",
      mex: "G",
      us: "8",
    },
    {
      cn: "XXL-175/96A",
      de: "XL",
      eur: "XL",
      fr: "XL",
      gb: "14",
      it: "XL",
      kr: "77",
      mex: "EG",
      us: "10",
    },
    {
      cn: "3XL-175/100A",
      de: "XXL",
      eur: "XXL",
      fr: "XXL",
      gb: "16",
      it: "XXL",
      kr: "88",
      mex: "EEG",
      us: "12",
    },
    {
      cn: "",
      de: "1XL",
      eur: "1XL",
      fr: "1XL",
      gb: "20",
      it: "1XL",
      kr: "",
      mex: "1EG",
      us: "14",
    },
    {
      cn: "",
      de: "2XL",
      eur: "2XL",
      fr: "2XL",
      gb: "22",
      it: "2XL",
      kr: "",
      mex: "2EG",
      us: "16",
    },
    {
      cn: "",
      de: "3XL",
      eur: "3XL",
      fr: "3XL",
      gb: "24",
      it: "3XL",
      kr: "",
      mex: "3EG",
      us: "18",
    },
    {
      cn: "",
      de: "4XL",
      eur: "4XL",
      fr: "4XL",
      gb: "26",
      it: "4XL",
      kr: "",
      mex: "4EG",
      us: "20",
    },
  ];

  return (
    <section className="w-full max-w-[1002px] mx-auto my-8">
      <style>
        {`
          @media (max-width: 640px) {
            .conversion-section { max-width: 90%; margin: 10px auto; padding: 0 4px; }
            .conversion-section h2 { font-size: 11px; margin-bottom: 3px; }
            .conversion-section table { font-size: 11px; }
            .conversion-section th, .conversion-section td { height: 30px; }
          }
          @media (min-width: 641px) and (max-width: 1024px) {
            .conversion-section { max-width: 900px; margin: 12px auto; padding: 0 6px; }
            .conversion-section h2 { font-size: 11.5px; margin-bottom: 3px; }
            .conversion-section table { font-size: 11.5px; }
            .conversion-section th, .conversion-section td { height: 40px; }
          }
          @media (min-width: 1025px) {
            .conversion-section { max-width: 1002px; padding: 0 8px; }
          }
        `}
      </style>
      <h2 className="text-[12px] leading-[18px] font-bold text-[#131313] tracking-[0] whitespace-nowrap mb-4 font-sans">
        СООТВЕТСТВИЕ МЕЖДУНАРОДНЫХ РАЗМЕРОВ
      </h2>

      <div className="w-full border border-solid border-[#d7d7d8]">
        <Table>
          <TableHeader>
            <TableRow>
              {headers.map((header, index) => (
                <TableHead
                  key={index}
                  className="h-10 border border-solid border-[#d7d7d8] text-center p-0"
                >
                  <div className="flex items-center justify-center h-full">
                    <span className="font-normal text-[#131313] text-[12px] tracking-[0] leading-[18px] whitespace-nowrap">
                      {header}
                    </span>
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {sizeData.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                <TableCell className="h-10 border border-solid border-[#d7d7d8] text-center p-0">
                  <div className="flex items-center justify-center h-full">
                    <span className="font-normal text-[#131313] text-[12px] tracking-[0] leading-[18px] whitespace-nowrap">
                      {row.cn}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="h-10 border border-solid border-[#d7d7d8] text-center p-0">
                  <div className="flex items-center justify-center h-full">
                    <span className="font-normal text-[#131313] text-[12px] tracking-[0] leading-[18px] whitespace-nowrap">
                      {row.de}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="h-10 border border-solid border-[#d7d7d8] text-center p-0">
                  <div className="flex items-center justify-center h-full">
                    <span className="font-normal text-[#131313] text-[12px] tracking-[0] leading-[18px] whitespace-nowrap">
                      {row.eur}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="h-10 border border-solid border-[#d7d7d8] text-center p-0">
                  <div className="flex items-center justify-center h-full">
                    <span className="font-normal text-[#131313] text-[12px] tracking-[0] leading-[18px] whitespace-nowrap">
                      {row.fr}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="h-10 border border-solid border-[#d7d7d8] text-center p-0">
                  <div className="flex items-center justify-center h-full">
                    <span className="font-normal text-[#131313] text-[12px] tracking-[0] leading-[18px] whitespace-nowrap">
                      {row.gb}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="h-10 border border-solid border-[#d7d7d8] text-center p-0">
                  <div className="flex items-center justify-center h-full">
                    <span className="font-normal text-[#131313] text-[12px] tracking-[0] leading-[18px] whitespace-nowrap">
                      {row.it}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="h-10 border border-solid border-[#d7d7d8] text-center p-0">
                  <div className="flex items-center justify-center h-full">
                    <span className="font-normal text-[#131313] text-[12px] tracking-[0] leading-[18px] whitespace-nowrap">
                      {row.kr}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="h-10 border border-solid border-[#d7d7d8] text-center p-0">
                  <div className="flex items-center justify-center h-full">
                    <span className="font-normal text-[#131313] text-[12px] tracking-[0] leading-[18px] whitespace-nowrap">
                      {row.mex}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="h-10 border border-solid border-[#d7d7d8] text-center p-0">
                  <div className="flex items-center justify-center h-full">
                    <span className="font-normal text-[#131313] text-[12px] tracking-[0] leading-[18px] whitespace-nowrap">
                      {row.us}
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

// Основной компонент страницы помощи
export const EwimvaPomosh = (): JSX.Element => {
  return (
    // Основной контейнер страницы
    <div
      className="bg-white flex flex-col items-center w-full"
      data-model-id="1:8"
    >
      <div className="bg-white w-full max-w-[1920px] flex flex-col">
        <CareInstructions />
        <SizeChartTable />
        <SizeConversionTable />
      </div>
    </div>
  );
};

export default EwimvaPomosh;
