import React, { Component } from 'react';
import getList from './mockdata';
import StoreListItem from './storeListItem';
import './landingPage.scss';

export default class LandingPage extends Component {

  constructor(...args) {
    super(...args);

    this.state = {
      loggedIn: false,
      store: null,
    };
    this.testList = getList();
  }


  loginClick = () => {
    this.setState({
      loggedIn: !this.state.loggedIn,
    });
  }

  selectStore = (id) => {
    const foundStore = this.testList.find(store => store.id === id);
    this.setState({store: foundStore});
  };

  render() {
    const { loggedIn = false, store } = this.state;
    return (
      <div>
        <div className="landing-page-header-container">
          <div className="landing-page-title">
            <h2> Product Locator </h2>
          </div>
          <div 
            className="landing-page-login"
            onClick={this.loginClick}
          >
            <p> 
            Log In
            </p>
          </div>
        </div>
        <div className="landing-page-filters">
          <div className="landing-page-filter-names">
            <p> Nearby </p>
          </div>
          { loggedIn &&
          <div className="landing-page-filter-names">
            <p> Favourites </p>
          </div>
          }
          { loggedIn &&
          <div className="landing-page-filter-names">
            <p> History </p>
          </div>
          }
          { loggedIn &&
          <div className="landing-page-filter-names">
            <p> Admin tools </p>
          </div>
          }
        </div>
        <div className="landing-page-store-list-container">
          { this.testList && this.testList.map((store) => (
            <StoreListItem
              id={store.id}
              title={store.name}
              distance={store.distance}
              key={store.id}
              onClick={this.selectStore}
            />
          ))
          }
        </div>
        <p> {store && `You have selected: ${store.name} which is ${store.distance} meters away`} </p>
      </div>
    );
  }
}
