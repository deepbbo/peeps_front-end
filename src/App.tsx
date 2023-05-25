import React from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import styled from 'styled-components';
import { Routes, BrowserRouter as Router, Route } from 'react-router-dom';
import PostPage from './components/posts/PostPage';
import PostForm from './components/posts/PostForm';

function App() {
  return (
    <AppContainer>
      <Header />
      <Router>
        <Navigation />
        <Routes>
          {/* element로 컴포넌트 연결 필요 */}
          <Route path="/map" />
          <Route path="/board" />
          <Route path="/chat" />
          <Route path="/my" />
          <Route path="/posts/form" element={<PostForm />} />
          <Route path="/posts" element={<PostPage />} />
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
