import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/estilos.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import App from './App'
import './styles/fondo.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

