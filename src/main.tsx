import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/inicio2.css';
import './styles/estilos.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import './App.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
