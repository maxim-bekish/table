import { useContext } from 'react';
import './tableHead.css';
import { MyContext } from '../../context/MyContext';

const TableHead: React.FC = () => {
   const context = useContext(MyContext);
   const { columns } = context;
   return (
      <thead>
         <tr>
            {columns.get.length > 0 && (
               <>
                  <th></th>
                  {columns.get.map((item) => (
                     <th key={item.id}>
                        {item.title}
                     </th>
                  ))}
               </>
            )}
         </tr>
      </thead>
   );
}



export default TableHead;
