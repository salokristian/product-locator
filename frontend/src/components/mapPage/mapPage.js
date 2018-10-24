import React, { Component } from 'react';
import backendApi from 'backendApi';

export default class StoreLayoutPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // TODO: mitä state-infoa tarvitsee? tallennanko ylimpään komponenttiin mahd.paljon?
      // Joo? Eli tähän? Siis ainakin jo etsityt tuotteet mistä pingi kartalla.
      storeId: 999999,
      locatedProducts: [],

    };
  }

  renderSvg() {
    var shelvesJson = backendApi.getFloorsAndShelves(this.state.storeId);
    return JSON.stringify(shelvesJson);

  }


  render() {
    return (
      <div className="store-layout-page">
        <div className="product-search-bar">search bar
          {this.renderSvg()}
        </div>
        <div className="store-layout">
          kartta
        </div>
      </div>
    );
  }
}



// ProductSearchBar
export class ProductSearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
}


// StoreLayout


// class StoreLayout extends Component {
//   renderSvg() {

//   }
//   render() {
//     return (
//       this.renderSvg()
//     );
//   }
// }


// Muita (statless function()?) tai classeja? esim. MapPage ainoa missä state, lisäksi function StoreLayout ja function SearchBar ?


