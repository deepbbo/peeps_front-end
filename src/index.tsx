import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ResetStyle from './ResetStyle';
import reportWebVitals from './reportWebVitals';
import logo from './images/peeps-logo.png';
import feature1 from './images/icon-map.png';
import feature2 from './images/icon-star.png';
import feature3 from './images/icon-chat.png';
import feature4 from './images/icon-pawprint.png';
import store from './redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

export let persistor = persistStore(store);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ResetStyle />
    <div className="wrap">
      <div className="home-left-area">
        <div className="title">
          <img src={logo} alt="peeps logo" />
          <p>반려동물을 사랑하는 당신을 위해🐶😺</p>
        </div>
        <ul className="feature">
          <li>
            <img src={feature1} alt="feature" />
            <p>맵으로 주변 탐색</p>
          </li>
          <li>
            <img src={feature2} alt="feature" />
            <p>장소별 리뷰 조회</p>
          </li>
          <li>
            <img src={feature3} alt="feature" />
            <p>다양한 반려인들과 소통</p>
          </li>
          <li>
            <img src={feature4} alt="feature" />
            <p>펫 자랑하기</p>
          </li>
        </ul>
      </div>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </div>
  </React.StrictMode>
);

reportWebVitals();
