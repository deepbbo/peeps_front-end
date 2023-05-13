import React from 'react';
import GlobalStyle from './GlobalStyle';
import Map from './map/map';
import './App.css';

function App() {
  return (
    <div className="App-container">
      <GlobalStyle />
      <div className="home-left-area">Peeps</div>
      <div className="App">{/* <Map /> */}</div>
    </div>
  );
}

export default App;
