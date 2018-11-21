import React, { Component } from 'react';
import SearchBar from '../StoreLayoutPage/productSuggestion';
import ShoppingListListItem from './shoppingListListItem';

import './shoppingList.scss';

export default class ShoppingList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      selectedProduct: null,
      name: '',
      description: '',
      error: false,
      storeName: ''
    };
    this.token = window.localStorage.getItem('token') || null;
    this.storeId = props.match.params.id || null;
  }

  componentDidMount() {
    fetch('https://productlocator.herokuapp.com/api/stores/' + this.storeId, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    }).then(res => {
      if (res.status > 199 && res.status < 301 ) {
        res.json().then(data => {
          this.setState({ storeName: data.name });
        });
      }
    });
  }

  handleNameChange = (event) => {
    const target = event.target;
    const value = target.value;
    this.setState({ name: value });
  }

  handleDescriptionChange = (event) => {
    const target = event.target;
    const value = target.value;
    this.setState({ description: value });
  }

  handleProductAdd = (product) => {
    const current = this.state.products;
    current.push(product.suggestion);
    this.setState({ products: current });
  }

  handleProductClick = (id) => {
    const selectedProduct = this.state.products.find(product => product.id === id);
    this.setState({selectedProduct});
  }

  handleExitPreview = () => {
    this.setState({ selectedProduct: null });
  }

  handleRemoveItem = () => {
    const filteredProducts = this.state.products.filter(product => product.id !== this.state.selectedProduct.id);
    this.setState({
      products: filteredProducts,
      selectedProduct: null,
    });
  }

  handleSubmitClick = () => {
    const { products, name, description } = this.state;
    if (name.length < 1 || description.length < 1) {
      this.setState({ error: true });
    } else {
      const productIds = products.map((product) => product.id);
      const postBody = {
        name,
        description,
        products: productIds,
      };


      const AuthHeader = 'Bearer ' + this.token;
      fetch('https://productlocator.herokuapp.com/api/shopping-lists/me', {
        method: 'POST',
        body: JSON.stringify(postBody),
        headers: {
          'Authorization': AuthHeader,
          'Content-Type': 'application/json; charset=utf-8',
        },
      }).then(res => {
        if (res.status > 199 && res.status < 301 ) {
          res.json().then(data => {
            this.props.history.push(`/stores/${this.storeId}`);
          });
        } else {
          console.log('error');
        }
      });
    }
    
  }

  /*
  POST /shopping-lists/me, body: {
 "name": "asd",
 "description": "foo"
 "products": [1, 4, 5] //kaikkien ID:n oltava samasta kaupasta
} saa luotua uuden ostoslistan
*/

  render() {
    const { products, selectedProduct, error, storeName } = this.state;

    return (
      <div className="shopping-list-root">
        { this.token && this.storeId ?
          <div>
            <div className="shopping-list-page">
              <h2 className="shopping-list-page-header"> {'Create a new shopping list' + (storeName.length > 0 ? (' for ' + storeName) : '')}</h2>
            </div>
            <div className="shopping-list-page">
              <div className="shopping-list-page-to-fill-container">
                <label>
                  Shopping list name
                </label>
                <input type="text" value={this.state.name} placholder="Shopping list name" onChange={this.handleNameChange}/>
                <label>
                  Description
                </label>
                <input type="text" value={this.state.description} placholder="Description" onChange={this.handleDescriptionChange}/>
              </div>
            </div>
            <div className="shopping-list-page">
              <SearchBar 
                storeId={this.storeId}
                handleSuggestionClick={this.handleProductAdd}
              />
            </div>
            <div className="shopping-list-page-list-container">
              { products && products.map((product) => (
                <ShoppingListListItem
                  id={product.id}
                  name={product.product_info.name}
                  price={product.price}
                  key={product.id}
                  onClick={this.handleProductClick}
                />
              ))
              }
            </div>
            { selectedProduct &&
              <div className="shopping-list-page">
                <div className="shopping-list-page-info-container">
                  <div className="shopping-list-page-info-exit-container">
                    <div className="shopping-list-page-info-exit" onClick={this.handleExitPreview}>Exit preview </div>
                  </div>
                  <h3>{selectedProduct.product_info.name}</h3>
                  {selectedProduct.product_info.image ? <img src={selectedProduct.product_info.image} alt="infopic"/> : ''}
                  <p>{selectedProduct.product_info.brand}</p>
                  <p>{selectedProduct.product_info.description}</p>
                  <p>{selectedProduct.price}</p>
                  <div className="shopping-list-page-info-remove-container">
                    <div className="shopping-list-page-info-remove" onClick={this.handleRemoveItem}>Remove item </div>
                  </div>
                </div>
              </div>
            }
            { products.length > 0 &&
            <div className="shopping-list-page">
              <div className="shopping-list-page-submit" onClick={this.handleSubmitClick}>
                Submit
              </div>
            </div>
            } { error && <p className="shopping-list-page-error"> Remember to have name and description for your shopping list and at least one product</p>}
          </div>
          : <p> You are not logged in or store is not selected</p> }
      </div>
    );
  }
}
