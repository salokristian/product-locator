import React, { Component } from 'react';
import LandingPage from './components/landingPage/landingPage';
import StoreLayoutPage from './components/StoreLayoutPage/StoreLayoutPage';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <LandingPage /> */}
        <StoreLayoutPage />
      </div>
    );
  }
}

export default App;
