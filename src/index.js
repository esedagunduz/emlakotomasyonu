import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import HomePage from './HomePage'; // HomePage bileşenini ekleyin
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <HomePage /> {/* HomePage bileşenini çağırın */}
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();


