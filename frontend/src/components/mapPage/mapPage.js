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

  getSvg() {
    var floorsShelvesJson = {
      'floors': [
        {
          'id': 1,
          'number': 1,
          'description': 'First and only floor.',
          'points': [[0, 0], [20, 0], [20, 20], [0, 20]],
          'store': 1
        }
      ],
      'shelves': [
        {
          'id': 1,
          'x_location': 3,
          'y_location': 4,
          'width': 5,
          'height': 1,
          'floor': 1,
          'type': 'shelf'
        },
        {
          'id': 2,
          'x_location': 10,
          'y_location': 10,
          'width': 2,
          'height': 7,
          'floor': 1,
          'type': 'shelf'
        }
      ]
    };

    console.log(floorsShelvesJson);

  }


  render() {
    return (
      <div className="store-layout-page">
        <div className="product-search-bar">search bar
          {this.getSvg()}
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


