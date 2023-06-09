import { Routes, BrowserRouter as Router, Route } from 'react-router-dom';
import styled from 'styled-components';
import MapContainer from './components/map/MapContainer';
import Header from './components/Header';
import Navigation from './components/Navigation';
import ReviewList from './components/review/ReviewList';
import ReviewWrite from './components/review/ReviewWrite';
import ReviewDetail from './components/review/ReviewDetail';

const App = () => {
  return (
    <AppContainer>
      <Header />
      <Router>
        <Routes>
          <Route path="/api/v1/map" element={<MapContainer />}></Route>
          <Route
            path="/api/v1/review/location/:location_id"
            element={<ReviewList />}
          />
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
