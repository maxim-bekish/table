import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './modalWindow.css';
import { useContext } from 'react';
import { MyContext } from '../../context/MyContext';


export const ModalWindow: React.FC = () => {
   const context = useContext(MyContext);
   const { dataModal, isModalResult, isOpenModal, newName } = context;
   const [error, setError] = useState<boolean>(true);

   // подтверждения действия
   const actionModal = () => () => {
      if (!error) {
         isOpenModal.set(false)
         isModalResult.set(true)
      }
   }
   
   // проверка на пустую строку
   const validString = (val: string) => {
      if (val.trim() !== "") {
         setError(false)
         newName.set(val)
      } else {
         setError(true)
      }
   }

   if (dataModal.get) {
      const portalRoot = document.getElementById('portal-root');

      return portalRoot ? ReactDOM.createPortal(
         <section className='modal'>
            <div className='modal__content'>
               <h2 className='modal__title'>{dataModal.get.title}</h2>
               {dataModal.get.input && <input required onChange={({ target }) => { validString(target.value) }} className={`modal__input ${error ? "modal__input--error" : ""}`} type="text" placeholder='New name' />}
               {error && <span>Поле не может быть пустым</span>}
               <div className='modal__actions'>
                  <button onClick={actionModal()} type='button'>True</button>
                  <button onClick={() => isOpenModal.set(false)} type='button'>False</button>
               </div>
            </div>
         </section>,
         portalRoot
      ) : null;
   }
};
