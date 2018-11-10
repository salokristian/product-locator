import React, { Component } from 'react';
// import LandingitgPage from './components/landingPage/landingPage';
import StoreLayoutPage from './components/StoreLayoutPage/StoreLayoutPage';
import './App.css';


class App extends Component {  
  render() {
    return (
      <div className="App">
        {/* <LandingPage /> */}
        <StoreLayoutPage storeData />
      </div>
    );
  }
}

export default App;
