import React, { Component } from 'react';
import SearchBar from './productSuggestion';
import './StoreLayoutPage.scss';

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
    const floorsShelvesJson = {
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

    //generate svg for floor
    let svg = [];
   
    let i;
    let j;
    const points = floorsShelvesJson['floors'][0]['points'];
    for (i = 0; i < points.length ; i++) {
      if (i+1 < points.length) {
        j = i + 1;
      }
      else {
        j = 0;
      }
      svg.push({
        x1: points[i][0].toString(),
        y1: points[i][1].toString(),
        x2: points[j][0].toString(),
        y2: points[j][1].toString(),
      });
    }
    return svg;





  }


  render() {
    const fetched =  {
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
    const shelvesStyle = {
      fill: 'blue',
    };

    const borderStyle = {
      stroke: 'rgb(0,0,0)',
    };

    const borders = this.getSvg();

    return (
      <div className="store-layout-page">
        <div className="2nd-svg">
          <svg width="20" height="20" viewBox="0 0 20 20">
            {borders && borders.length > 0 && borders.map((border) => (
              <line
                x1={border.x1}
                y1={border.y1}
                x2={border.x2}
                y2={border.y2}
                style={borderStyle}
              />
            ))}
            {fetched.shelves && fetched.shelves.map((shelf) => (
              <rect
                x={shelf.x_location}
                y={shelf.y_location}
                width={shelf.width}
                height={shelf.height}
                style={shelvesStyle}
              />
            ))}
          </svg>
          <div className="product-search-bar">
            <SearchBar/>
          </div>
        </div>
      </div>
    );
  }
}



// // ProductSearchBar
// export class ProductSearchBar extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//     };
//   }
// }


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


