import React from 'react';
import ReactDOM from 'react-dom';
import './modalWindow.css';

import { useContext } from 'react';
import { MyContext } from '../../context/MyContext';


const ModalWindow: React.FC = () => {

   const context = useContext(MyContext);
   const { dataModal, isModalResult, isOpenModal, newName } = context;

   const actionModal = (bool: boolean) => () => {
      isOpenModal.set(false)
      isModalResult.set(bool)
   }

   if (dataModal.get !== null) {
      const portalRoot = document.getElementById('portal-root');
      return portalRoot ? ReactDOM.createPortal(
         <section className='modal'>
            <div className='modal__content'>
               <h2 className='modal__title'>{dataModal.get.title}</h2>
               {dataModal.get.input && <input onChange={({ target }) => { newName.set(target.value) }} className='modal__input' type="text" placeholder='New name' />}
               <div className='modal__actions'>
                  <button onClick={actionModal(true)} type='button'>True</button>
                  <button onClick={actionModal(false)} type='button'>False</button>
               </div>
            </div>
         </section>,
         portalRoot
      ) : null;
   }
};

export default ModalWindow;
