import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Layout from './Components/LayoutArea/Layout/Layout';
import './index.css';

import reportWebVitals from './reportWebVitals';
import { interceptors } from './Services/TokenInterceptor';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

interceptors.createInterceptors();

root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Layout />
    </BrowserRouter>
  </React.StrictMode>
);


reportWebVitals();
