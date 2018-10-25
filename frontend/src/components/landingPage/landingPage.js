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
      nearby: true,
      favourites: false,
      history: false,
      adminTools: false,
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

  nearbyClick = () => {
    this.setState({
      nearby: true,
      favourites: false,
      history: false,
      adminTools: false,
    });
  };

  favouritesClick = () => {
    this.setState({
      nearby: false,
      favourites: true,
      history: false,
      adminTools: false,
    });
  };

  historyClick = () => {
    this.setState({
      nearby: false,
      favourites: false,
      history: true,
      adminTools: false,
    });
  };

  adminToolsClick = () => {
    this.setState({
      nearby: false,
      favourites: false,
      history: false,
      adminTools: true,
    });
  };

  render() {
    const { loggedIn = false, store, nearby, favourites, history, adminTools } = this.state;

    const clickedFilterBorder = {
      border: '3px solid black',
    };
    const nonClickedFilterBorder = {
      border: '1px solid black',
    };
  
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
          <div 
            className="landing-page-filter-names"
            style={nearby ? clickedFilterBorder : nonClickedFilterBorder}
            onClick={this.nearbyClick}
          >
            <p> Nearby </p>
          </div>
          { loggedIn &&
          <div 
            className="landing-page-filter-names"
            style={favourites ? clickedFilterBorder : nonClickedFilterBorder}
            onClick={this.favouritesClick}
          >
            <p> Favourites </p>
          </div>
          }
          { loggedIn &&
          <div 
            className="landing-page-filter-names"
            style={history ? clickedFilterBorder : nonClickedFilterBorder}
            onClick={this.historyClick}
          >
            <p> History </p>
          </div>
          }
          { loggedIn &&
          <div 
            className="landing-page-filter-names"
            style={adminTools ? clickedFilterBorder : nonClickedFilterBorder}
            onClick={this.adminToolsClick}
          >
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
