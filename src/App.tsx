import React from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import styled from 'styled-components';
import { Routes, BrowserRouter as Router, Route } from 'react-router-dom';
import ReviewList from './review/ReviewList';
import ReviewWrite from './review/ReviewWrite';
import ReviewDetail from './review/ReviewDetail';

function App() {
  return (
    <AppContainer>
      <Header />
      <Router>
        <Routes>
          {/* element로 컴포넌트 연결 필요 */}
          <Route path="/api/v1/review/:location_id" element={<ReviewList />} />
          <Route path="/api/v1/review" element={<ReviewWrite />} />
          <Route path="/api/v1/review/:review_id" element={<ReviewDetail />} />
          <Route path="/board" />
          <Route path="/chat" />
          <Route path="/my" />
        </Routes>
        <Navigation />
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
