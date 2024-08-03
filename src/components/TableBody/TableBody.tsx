import './tableBody.css';
import { settingButtons } from '../../type';
import more from '../../assets/svg/more.svg'
import { inactivityTimeout, userActions } from '../../helpers/constants';
import React, { useContext, useRef, useState } from 'react';
import { MyContext } from '../../context/MyContext';
import { ModalWindow } from '../ModalWindow/ModalWindow';


export const TableBody: React.FC = () => {
   const inactivityTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
   const context = useContext(MyContext);
   const { isOpenModal, dataModal, currentAction, rows } = context;
   const [openIndex, setOpenIndex] = useState<string | null>(null);

   // Функция для коректного открытия/закрытия меню(more: add, edit, del)
   const toggleViewMore = (index: string) => () => {
      if (inactivityTimer.current) {
         clearTimeout(inactivityTimer.current);
      }
      setOpenIndex(openIndex === index ? null : index);
      inactivityTimer.current = setTimeout(() => {
         setOpenIndex(null);
      }, inactivityTimeout);
   };

   const onSetting = (action: settingButtons) => () => {
      currentAction.set(action);
      setOpenIndex(null);
      switch (action.flag) {
         case userActions.add.key:
            dataModal.set({ title: `Добавить новую строку под строкой "${action.value}"?`, input: false });
            break;
         case userActions.edit.key:
            dataModal.set({ title: `Изменить имя строки "${action.value}"?`, input: true });
            break;
         case userActions.delete.key:
            dataModal.set({ title: `Удалить строку "${action.value}"?`, input: false });
            break;
         default:
            return;
      }
      isOpenModal.set(true);
   };
   
   return (
      <React.Fragment>
         <tbody>
            {rows.get.map((el, index) => (
               <tr className='table__row' key={el.id}>
                  <td className='table__cell table__cell-title'>
                     <section className='table__tooltip-section'>
                        <p className='table__tooltip-title'>
                           {el.title}
                        </p>
                        <button onClick={toggleViewMore(el.id)} className='table__btn-more' type="button">
                           <img src={more} alt="" />
                        </button>
                        <div style={{ display: openIndex === el.id ? 'flex' : 'none' }} className='table__tooltip-content'>
                           <button type='button' className='table__tooltip-btn table__tooltip-btn--add' onClick={onSetting({ flag: userActions.add.key, index: index, value: el.title })}>{userActions.add.displayName}</button>
                           <button type='button' className='table__tooltip-btn table__tooltip-btn--edit' onClick={onSetting({ flag: userActions.edit.key, index: index, value: el.title })}>{userActions.edit.displayName}</button>
                           <button type='button' className='table__tooltip-btn table__tooltip-btn--del' onClick={onSetting({ flag: userActions.delete.key, index: index, value: el.title })}>{userActions.delete.displayName}</button>
                        </div>
                     </section>
                  </td>
                  {el.row.map((item) => (
                     <td key={item.id} className={`table__cell ${item.value ? 'table__cell--red' : 'table__cell--green'}`}></td>
                  ))}
               </tr>
            ))}
         </tbody>
         {isOpenModal.get && <ModalWindow />}
      </React.Fragment>
   );
}
