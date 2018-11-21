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
    const { store, searchText, account } = this.state;
    const { stores } = this.props;
  
    return (
      <div className="landing-page">
        <div className="landing-page-header-container">
          <h2 className="landing-page-title">
            Product Locator
          </h2>
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
        <p className="marketing-quote">Find products with ease and create your own shopping lists!</p>
        {account && <button id="logout" onClick={this.logOut}> Log out </button>}
        <input id="stores-search" type="text" value={searchText} onChange={this.handleStoreSearch} placeholder="Search stores by name"/>
        <div className="landing-page-store-list-container">
          { stores && stores.map((store) => (
            <StoreListItem
              id={store.id}
              title={store.name}         
              phone={store.phone}
              key={store.id}
              onClick={this.selectStore}
            />
          ))
          }
          {
            stores.length === 0 &&
            <p>No matching stores found</p>
          }
        </div>
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
