import { StrictMode }  from 'react';
import { createRoot }  from 'react-dom/client';
import './App.css';
import './index.css';
import App             from './App.jsx';

const root = document.getElementById('root');

if (!root) {
  throw new Error(
    '[Dashboard Fábrica] Elemento #root não encontrado no HTML. ' +
    'Verifique o arquivo index.html.'
  );
}

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>
);