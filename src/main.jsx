import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Router from './Router.jsx'
import { MenuProvider } from './context/MenuContext.jsx'
import './styles/index.css';

const rootElement = document.getElementById('root');
// Cambiar fondo a blanco por defecto para evitar fondo negro
document.body.style.backgroundColor = '#fff';

createRoot(rootElement).render(
  <StrictMode>
    <MenuProvider>
      <Router />
    </MenuProvider>
  </StrictMode>,
)
