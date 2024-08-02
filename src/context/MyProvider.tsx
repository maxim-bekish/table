import React, { useState, ReactNode } from 'react';
import { MyContext, defaultValue, } from './MyContext';
import { Column, ContextValue, DataModal, Row, settingButtons } from '../type';



const MyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
   const [isOpenModal, setIsOpenModal] = useState<boolean>(defaultValue.isOpenModal.get);
   const [dataModal, setDataModal] = useState<DataModal | null>(defaultValue.dataModal.get);
   const [isModalResult, setIsModalResult] = useState<boolean>(defaultValue.isModalResult.get);
   const [currentAction, setCurrentAction] = useState<settingButtons | null>(defaultValue.currentAction.get);
   const [newName, setNewName] = useState<string>(defaultValue.newName.get);
   const [columns, setColumns] = useState<Column[]>(defaultValue.columns.get);
   const [rows, setRows] = useState<Row[]>(defaultValue.rows.get);

   const value: ContextValue = {
      isOpenModal: {
         get: isOpenModal,
         set: setIsOpenModal,
      },
      dataModal: {
         get: dataModal,
         set: setDataModal,
      },
      isModalResult: {
         get: isModalResult,
         set: setIsModalResult,
      },
      currentAction: {
         get: currentAction,
         set: setCurrentAction,
      },
      newName: {
         get: newName,
         set: setNewName,
      },
      columns: {
         get: columns,
         set: setColumns,
      },
      rows: {
         get: rows,
         set: setRows,
      },

   };

   return (
      <MyContext.Provider value={value}>
         {children}
      </MyContext.Provider>
   );
};

export default MyProvider;
