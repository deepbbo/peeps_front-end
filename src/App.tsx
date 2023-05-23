import { Routes, BrowserRouter as Router, Route } from 'react-router-dom';
import styled from 'styled-components';
import MapContainer from './components/map/MapContainer';
import Header from './components/Header';
import Navigation from './components/Navigation';

const App = () => {
  return (
    <AppContainer>
      <Header />
      <MapContainer />
      <Router>
        <Navigation />
        <Routes>
          {/* element로 컴포넌트 연결 필요 */}
          <Route path="/map" />
          <Route path="/board" />
          <Route path="/chat" />
          <Route path="/my" />
        </Routes>
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
