import './tableBody.css';
import { settingButtons } from '../../type';
import more from '../../assets/svg/more.svg'
import { inactivityTimeout } from '../../helpers/constants';
import React, { useContext, useRef, useState } from 'react';
import { MyContext } from '../../context/MyContext';
import ModalWindow from '../modalWindow/ModalWindow';


const TableBody: React.FC = () => {
   const inactivityTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
   const context = useContext(MyContext);
   const { isOpenModal, dataModal, currentAction, rows } = context;
   const [openIndex, setOpenIndex] = useState<number | null>(null);
   const toggleViewMore = (index: number) => {
      if (inactivityTimer.current) {
         clearTimeout(inactivityTimer.current);
      }

      setOpenIndex(openIndex === index ? null : index);

      inactivityTimer.current = setTimeout(() => {
         setOpenIndex(null);
      }, inactivityTimeout);
   };

   const onSetting = (action: settingButtons) => {
      currentAction.set(action);
      setOpenIndex(null);
      switch (action.flag) {
         case "add":
            dataModal.set({ title: `Добавить новый строку под строкой "${action.value}"?`, input: false });
            break;
         case "edit":
            dataModal.set({ title: `Изменить имя строки "${action.value}"?`, input: true });
            break;
         case "del":
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
               <tr className='table__row' key={index}>
                  <td className='table__cell table__cell-title'>
                     <section className='table__tooltip-section'>
                        <p className='table__tooltip-title'>
                           {el.title}
                        </p>
                        <button onClick={() => toggleViewMore(index)} className='table__btn-more' type="button">
                           <img src={more} alt="" />
                        </button>

                        <div style={{ display: openIndex === index ? 'flex' : 'none' }} className='table__tooltip-content'>
                           <button type='button' className='table__tooltip-btn table__tooltip-btn--add' onClick={() => onSetting({ flag: "add", id: index, value: el.title })}>add</button>
                           <button type='button' className='table__tooltip-btn table__tooltip-btn--edit' onClick={() => onSetting({ flag: "edit", id: index, value: el.title })}>edit</button>
                           <button type='button' className='table__tooltip-btn table__tooltip-btn--del' onClick={() => onSetting({ flag: "del", id: index, value: el.title })}>del</button>
                        </div>
                     </section>
                  </td>
                  {el.row.map((item, idx) => (
                     <td key={idx} className={`table__cell ${item ? 'table__cell--red' : 'table__cell--green'}`}></td>
                  ))}
               </tr>
            ))}
         </tbody>
         {isOpenModal.get && <ModalWindow />}
      </React.Fragment>

   );
}



export default TableBody;
