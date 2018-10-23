import React, { Component } from 'react';
import './landingPage.scss';

export default class LandingPage extends Component {

  loginClick = () => {
    console.log('Log in clicked');
  }
  render() {
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
        
      </div>
    );
  }
}
