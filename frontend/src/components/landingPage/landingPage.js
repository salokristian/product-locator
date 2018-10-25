import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setAccount, fetchNearbyStores } from '../../store/actions/index';
import StoreListItem from './storeListItem';
import './landingPage.scss';

class LandingPage extends Component {

  constructor(...args) {
    super(...args);

    this.state = {
      store: null,
      nearby: true,
      favourites: false,
      history: false,
      adminTools: false,
    };
  }

  componentDidMount() {
    this.props.fetchNearbyStores('location');
  }


  loginClick = () => {
    const { setAccount, account } = this.props;
    if (!account) {
      setAccount({
        name: 'test user',
        role: 'Admin',
      });
    }
  }

  selectStore = (id) => {
    const foundStore = this.props.stores.find(store => store.id === id);
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
    const { store, nearby, favourites, history, adminTools } = this.state;
    const { account, stores } = this.props;

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
              {!account ? 'Log In' : 'Settings'}
            </p>
          </div>
        </div>
        {account && <p className="landing-page-user-info"> {`You are logged in as ${account.name}, role ${account.role}`}</p>}
        <div className="landing-page-filters">
          <div 
            className="landing-page-filter-names"
            style={nearby ? clickedFilterBorder : nonClickedFilterBorder}
            onClick={this.nearbyClick}
          >
            <p> Nearby </p>
          </div>
          { account &&
          <div 
            className="landing-page-filter-names"
            style={favourites ? clickedFilterBorder : nonClickedFilterBorder}
            onClick={this.favouritesClick}
          >
            <p> Favourites </p>
          </div>
          }
          { account &&
          <div 
            className="landing-page-filter-names"
            style={history ? clickedFilterBorder : nonClickedFilterBorder}
            onClick={this.historyClick}
          >
            <p> History </p>
          </div>
          }
          { account && account.role === 'Admin' &&
          <div 
            className="landing-page-filter-names"
            style={adminTools ? clickedFilterBorder : nonClickedFilterBorder}
            onClick={this.adminToolsClick}
          >
            <p> Admin tools </p>
          </div>
          }
        </div>
        <div className="landing-page-filter-titles">
          <p className="landing-page-title-store-name"> Store name </p>
          <p className="landing-page-title-distance"> Distance </p>
        </div>
        <div className="landing-page-store-list-container">
          { stores && stores.map((store) => (
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

const mapDispatchToProps = dispatch => (
  {
    setAccount: (json) => { dispatch(setAccount(json)); },
    fetchNearbyStores: (location) => { dispatch(fetchNearbyStores(location)); },
  }
);

const mapStateToProps = state => (
  {
    account: state.productLocator.account,
    stores: state.productLocator.stores,
  }
);

LandingPage.propTypes = {
  stores: PropTypes.array.isRequired,
  account: PropTypes.shape({
    name: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired
  }),
  setAccount: PropTypes.func.isRequired,
  fetchNearbyStores: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LandingPage);
