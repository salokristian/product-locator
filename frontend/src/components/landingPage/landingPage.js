import React, { Component } from 'react';
import getList from './mockdata';
import './landingPage.scss';

export default class LandingPage extends Component {

  constructor(...args) {
    super(...args);

    this.state = {
      loggedIn: false,
    };
    this.testList = getList();
  }


  loginClick = () => {
    this.setState({
      loggedIn: !this.state.loggedIn,
    });
  }
  render() {
    const { loggedIn = false } = this.state;
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
        </div>
      </div>
    );
  }
}
