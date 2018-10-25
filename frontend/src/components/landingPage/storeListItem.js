/** @jsx React.createElement */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './storeListItem.scss';

class StoreListItem extends PureComponent {

  handleClick = (e) => {
    e.preventDefault();

    const onClick = this.props.onClick || (() => {});
    onClick(this.props.id);
  };

  render() {
    const {
      title, distance,
    } = this.props;

    return (
      <div
        className="landing-page__storeSearch-list-item"
        onClick={this.handleClick}
      >
        <div>
          <p className="landing-page__storeSearch-list-item-title">
            {title}
          </p>
          <p className="landing-page__storeSearch-list-item-distance">
            {distance}
          </p>
        </div>
      </div>
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
