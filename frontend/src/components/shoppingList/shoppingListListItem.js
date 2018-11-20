/** @jsx React.createElement */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './shoppingListListItem.scss';

class ShoppingListListItem extends PureComponent {

  handleClick = (e) => {
    e.preventDefault();

    const onClick = this.props.onClick || (() => {});
    onClick(this.props.id);
  };

  render() {
    const {
      name, price,
    } = this.props;

    return (
      <div
        className="shopping-page-list-item"
        onClick={this.handleClick}
      >
        <div>
          <p className="shopping-page-list-item-title">
            {name}
          </p>
          <p className="shopping-page-list-item-price">
            {`${price}e`}
          </p>
        </div>
        { /*
        <div className="shopping-page-list-item-remove-container">
          <p className="shopping-page-list-item-remove">
            x
          </p>
        </div>
        */ }
      </div>
    );
  }
}

ShoppingListListItem.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ShoppingListListItem;
