import React from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import styled from 'styled-components';
import { Routes, BrowserRouter as Router, Route } from 'react-router-dom';
import Review from './review/Review';

function App() {
  return (
    <AppContainer>
      <Header />
      <Router>
        <Navigation />
        <Routes>
          {/* element로 컴포넌트 연결 필요 */}
          {/* 확인 위해 map 대신 review로 연결 */}
          <Route path="/review" element={<Review placeId={0} />} />
          <Route path="/board" />
          <Route path="/chat" />
          <Route path="/my" />
        </Routes>
      </Router>
    </AppContainer>
  );
}

export default App;

const AppContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  max-width: 425px;
  overflow: hidden;
  background-color: #fff;
`;
