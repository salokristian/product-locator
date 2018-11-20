import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setAccount, fetchNearbyStores, fetchByStoreName } from '../../store/actions/index';
import StoreListItem from './storeListItem';
import { Link } from 'react-router-dom';
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
      searchText: '',
      account: window.localStorage.getItem('account_name') || null,
    };
  }

  componentDidMount() {
    this.props.fetchNearbyStores('location');
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

  handleStoreSearch = (event) => {
    const target = event.target;
    const value = target.value;
    this.props.fetchByStoreName(value);
    this.setState({ searchText: value });
  };

  logOut = () => {
    this.props.setAccount(null);
    window.localStorage.clear();
    this.setState({ account: null });
  }

  render() {
    const { store, nearby, favourites, history, adminTools, searchText, account } = this.state;
    const { stores } = this.props;

    const clickedFilterBorder = {
      border: '3px solid black',
    };
    const nonClickedFilterBorder = {
      border: '1px solid black',
    };
  
    return (
      <div className="landing-page">
        <div className="landing-page-header-container">
          <div className="landing-page-title">
            <h2> Product Locator </h2>
          </div>
          { account ?
            <div 
              className="landing-page-login"
            >
              <p> 
                {account}
              </p>
            </div> :
            <Link to="/login">
              <div 
                className="landing-page-login"
              >
                <p> 
                  Log In
                </p>
              </div>
            </Link>
          }
        </div>
        {account && <p className="landing-page-user-info" onClick={this.logOut}> Log out </p>}
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
        <input type="text" value={searchText} onChange={this.handleStoreSearch} placeholder="Search stores by name"/>
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
    fetchByStoreName: (text) => { dispatch(fetchByStoreName(text)); },
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
    username: PropTypes.string,
    role: PropTypes.string,
    id: PropTypes.number,
  }),
  setAccount: PropTypes.func.isRequired,
  fetchNearbyStores: PropTypes.func.isRequired,
  fetchByStoreName: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LandingPage);
