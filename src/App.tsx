import CommonHeader from './components/Header/Header';
import Navigation from './components/Navigation/Navigation';
import styled from 'styled-components';

function App() {
  return (
    <AppContainer>
      <CommonHeader />
      <Navigation />
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
