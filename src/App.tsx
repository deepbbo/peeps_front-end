import { Routes, BrowserRouter as Router, Route } from 'react-router-dom';
import styled from 'styled-components';
import MapContainer from './components/map/MapContainer';
import Header from './components/Header';
import Navigation from './components/Navigation';
import PostPage from './components/posts/PostPage';
import PostForm from './components/posts/PostForm';

const App = () => {
  return (
    <AppContainer>
      <Header />
      <Router>
        <Routes>
          <Route path="/api/v1/map" element={<MapContainer />}></Route>
          <Route path="/api/v1/review/location/:location_id" />
          <Route path="/api/v1/review" />
          <Route path="/api/v1/review/:review_id" />
          <Route path="/board" />
          <Route path="/chat" />
          <Route path="/my" />
          <Route path="/posts/form" element={<PostForm />} />
          <Route path="/posts" element={<PostPage />} />
        </Routes>
        <Navigation />
      </Router>
    </AppContainer>
  );
};

export default App;

const AppContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  max-width: 425px;
  overflow: hidden;
  background-color: #fff;
`;
