import React, { Component } from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import LandingPage from './components/landingPage/landingPage';
import StoreLayoutPage from './components/StoreLayoutPage/StoreLayoutPage';
import LogIn from './components/LogIn/login';
import ShoppingList from './components/shoppingList/shoppingList';
import './App.css';


class App extends Component {  
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route path="/stores/:id" component={StoreLayoutPage} />
            <Route path="/login" component={LogIn} />
            <Route path="/newshoppinglist/:id" component={ShoppingList} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
