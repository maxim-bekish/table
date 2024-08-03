import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import MyProvider from './context/MyProvider.tsx';


ReactDOM.createRoot(document.getElementById('root')!).render(
   <MyProvider>
      <App />
   </MyProvider>
)
