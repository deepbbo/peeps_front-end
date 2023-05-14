import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ResetStyle from './ResetStyle';
import reportWebVitals from './reportWebVitals';

// eslint-disable-next-line prettier/prettier
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ResetStyle />
    <div className="wrap">
      <div className="home-left-area">Peeps</div>
      <App />
    </div>
  </React.StrictMode>
);

reportWebVitals();
