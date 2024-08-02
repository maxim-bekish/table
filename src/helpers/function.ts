import { Column, Row } from '../type';
import { delayTime, validNumber } from "./constants";


// Функция для генерации случайного числа в диапазоне
export const getRandomInt = (min: number, max: number): number => {
   return Math.floor(Math.random() * (max - min + 1)) + min;
};


// Функция для создания столбцов
export const createColumnsAsync = async (): Promise<Column[]> => {
   return new Promise((resolve) => {
      setTimeout(() => {
         const numColumns = getRandomInt(validNumber.min, validNumber.max);
         const columns: Column[] = [];
         for (let i = 0; i < numColumns; i++) {
            columns.push(i + 1);
         }
         resolve(columns);
      }, delayTime);
   });
};

// Функция для создания строк
export const createRowsAsync = async (numColumns: number): Promise<Row[]> => {
   return new Promise((resolve) => {
      setTimeout(() => {
         const numRows = getRandomInt(validNumber.min, validNumber.max);
         const rows: Row[] = [];
         for (let i = 0; i < numRows; i++) {
            rows.push({
               title: `Заказ ${i + 1}`,
               row: Array.from({ length: numColumns }, () => Math.random() < 0.5),
            });
         }
         resolve(rows);
      }, delayTime);
   });
};
