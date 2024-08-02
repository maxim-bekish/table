import './table.css';

import React, { useEffect, useContext } from 'react';
import { Row } from '../../type';
import { createColumnsAsync, createRowsAsync } from '../../helpers/function';
import { MyContext } from '../../context/MyContext';
import TableHead from '../../components/TableHead/TableHead';
import TableBody from '../../components/TableBody/TableBody';

let newRowIncrement = 1;
const Table: React.FC = () => {
   const context = useContext(MyContext);
   const { isModalResult, currentAction, newName, columns, rows } = context;

   useEffect(() => {
      const generateTable = async () => {
         try {
            const cols = await createColumnsAsync();
            columns.set(cols);
            const row = await createRowsAsync(cols.length);
            rows.set(row);
         } catch (error) {
            console.error('Ошибка при генерации таблицы:', error);
         }
      };
      generateTable();
   }, []);

   useEffect(() => {
      if (isModalResult.get && currentAction.get) {
         handleAction();
         isModalResult.set(false);
      }
   }, [isModalResult.get, currentAction.get]);




   const handleAction = () => {
      if (currentAction.get === null) return;
      switch (currentAction.get.flag) {
         case "add": {
            const x = rows.get.find((item) => item.title === `newRow ${newRowIncrement}`);
            const newRow: Row = {
               title: `newRow ${x ? ++newRowIncrement : newRowIncrement}`,
               row: Array.from({ length: columns.get.length }, () => Math.random() < 0.5),
            };
            rows.set([...rows.get.slice(0, currentAction.get.id + 1), newRow, ...rows.get.slice(currentAction.get.id + 1)]);
         }
            break;

         case "edit": {
            const updatedRows = [...rows.get];
            updatedRows[currentAction.get.id] = {
               ...rows.get[currentAction.get.id],
               title: newName.get,
            };
            rows.set(updatedRows);
         }
            break;
         case "del": {
            rows.set(rows.get.filter((_, i) => currentAction.get !== null && i !== currentAction.get.id));
         }
            break;
         default:
            return;
      }
   };
   return (
      <table>
         <TableHead />
         <TableBody />
      </table>
   );
}



export default Table;
