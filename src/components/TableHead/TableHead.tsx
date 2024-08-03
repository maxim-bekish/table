import React, { useContext } from 'react';
import './tableHead.css';
import { MyContext } from '../../context/MyContext';


export const TableHead: React.FC = () => {
   const context = useContext(MyContext);
   const { columns } = context;

   return (
      <thead>
         <tr>
            {columns.get.length > 0 && (
               <React.Fragment>
                  <th></th>
                  {columns.get.map((item) => (
                     <th key={item.id}>
                        <p className='th-item'>
                           {item.title}
                        </p>
                     </th>
                  ))}
               </React.Fragment>
            )}
         </tr>
      </thead>
   );
}