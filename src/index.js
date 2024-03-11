import React from 'react';
import { createRoot } from 'react-dom/client'; // 수정된 부분
import './index.css';
import reportWebVitals from './reportWebVitals';
import Main from './page/Main';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);

reportWebVitals();
