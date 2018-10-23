import React, { Component } from 'react';
import LandingPage from './components/landingPage/landingPage'
import MapPage from './components/MapPage/MapPage'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <LandingPage /> */}
        <MapPage />
      </div>
    );
  }
}

export default App;
