import './table.css';
import React, { useEffect, useContext, useCallback } from 'react';
import { Row, ActionMap } from '../../type';
import { createColumnsAsync, createRowsAsync } from '../../helpers/function';
import { userActions } from '../../helpers/constants';
import { MyContext } from '../../context/MyContext';
import { TableHead } from '../../components/TableHead/TableHead';
import { TableBody } from '../../components/TableBody/TableBody';
import { v4 as uuidv4 } from 'uuid';


let newRowIncrement = 1;

export const Table: React.FC = () => {
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

   const handleAction = useCallback(() => {
      if (isModalResult.get && currentAction.get) {
         const actionMap: ActionMap = {
            [userActions.add.key]: handleAddRow,
            [userActions.edit.key]: handleEditRow,
            [userActions.delete.key]: handleDeleteRow,
         };
         const action = actionMap[currentAction.get.flag];
         if (action) action();
         isModalResult.set(false);
      }
   }, [isModalResult.get, currentAction.get]);

   useEffect(() => {
      handleAction();
   }, [handleAction]);

   const handleAddRow = () => {
      if (currentAction.get === null) return;
      const newName = rows.get.find((item) => item.title === `newRow ${newRowIncrement}`);
      const newRow: Row = {
         title: `newRow ${newName ? ++newRowIncrement : newRowIncrement}`,
         row: Array.from({ length: columns.get.length }, () => ({ value: Math.random() < 0.5, id: uuidv4() })),
         id: uuidv4(),
      };
      rows.set([...rows.get.slice(0, currentAction.get.index + 1), newRow, ...rows.get.slice(currentAction.get.index + 1)]);
   }

   const handleEditRow = () => {
      if (currentAction.get === null) return;
      const updatedRows = [...rows.get];
      updatedRows[currentAction.get.index] = {
         ...rows.get[currentAction.get.index],
         title: newName.get,
      };
      rows.set(updatedRows);
      newName.set('')
   }

   const handleDeleteRow = () => {
      rows.set(rows.get.filter((_, i) => currentAction.get && i !== currentAction.get.index));
   }

   return (
      <table>
         <TableHead />
         <TableBody />
      </table>
   );
}
