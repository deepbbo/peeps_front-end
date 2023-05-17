import Header from './components/Header';
import Navigation from './components/Navigation';
import styled from 'styled-components';

function App() {
  return (
    <AppContainer>
      <Header />
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
