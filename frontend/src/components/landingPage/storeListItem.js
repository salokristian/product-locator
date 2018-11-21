/** @jsx React.createElement */
import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './storeListItem.scss';
import phoneLogo from './telephone-handle-silhouette.svg';

class StoreListItem extends PureComponent {

  handleClick = (e) => {
    e.preventDefault();

    const onClick = this.props.onClick || (() => {});
    onClick(this.props.id);
  };

  render() {
    const {
      title, phone, id,
    } = this.props;

    return (
      <Link to={`/stores/${id}`}>
        <div
          className="landing-page__storeSearch-list-item"
        >
          <div>
            <p className="landing-page__storeSearch-list-item-title">
              {title}
            </p>
            <p className="landing-page__storeSearch-list-item-distance">
              <img className="phone-logo" src={phoneLogo}/> {phone}
            </p>
          </div>
        </div>
      </Link>
    );
  }
}

StoreListItem.propTypes = {
  title: PropTypes.string.isRequired,
  distance: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default StoreListItem;
