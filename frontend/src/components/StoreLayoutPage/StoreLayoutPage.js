import React, { Component } from 'react';
import SearchBar from './productSuggestion';
import './StoreLayoutPage.scss';

export default class StoreLayoutPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locatedProduct: undefined,
      storeData: undefined,

    };
  }
  // temp solution for getting store data to StoreLayoutPage component -- TODO some redux magic or somethiing.
  componentDidMount() {
    const { id } = this.props.match.params;
    console.log(id);
    fetch('https://productlocator.herokuapp.com/api/stores/' + id)
      .then(response => response.json())
      .then(data =>  {
        console.log(data);
        this.setState({
          storeData: data
        });
      });
  }

  getBoarders() {
    // const floorsShelvesJson = {
    //   'floors': [
    //     {
    //       'id': 1,
    //       'number': 1,
    //       'description': 'First and only floor.',
    //       'points': [[0, 0], [20, 0], [20, 20], [0, 20]],
    //       'store': 1
    //     }
    //   ],
    //   'shelves': [
    //     {
    //       'id': 1,
    //       'x_location': 3,
    //       'y_location': 4,
    //       'width': 5,
    //       'height': 1,
    //       'floor': 1,
    //       'type': 'shelf'
    //     },
    //     {
    //       'id': 2,
    //       'x_location': 10,
    //       'y_location': 10,
    //       'width': 2,
    //       'height': 7,
    //       'floor': 1,
    //       'type': 'shelf'
    //     }
    //   ]
    // };

    //generate svg for floor
    let svg = [];
   
    let i;
    let j;

    //assuming has just one floor for now    
    let points = [];
    if (this.state.storeData != null) {
      console.log('getsvg: ' + this.state.storeData['name']);
      points = this.state.storeData['floors'][0]['points'];
    }
    
    
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


  handleSuggestionClick = (productData) => {
    console.log('onSuggestionClick storeLayoutPage.js');
    console.log(this.state.locatedProduct);

    //push to this.state.locatedProducts all product info 
    this.setState({
      locatedProduct: productData['suggestion']
    });

  }

  render() {
    
    //toimii nyt, mutta oikeesti renderöi kahdesti, vaikka ComponentWillMount kanssa ei mun mielestä pitäisi..
    //reunat (boarders) ja hyllyt (shelves) tulee nyt vammasesti eri paikoista, ihan hyvin vois olla molemmat vaikka täällä.
    let shelves = [];
    if (this.state.storeData != null) {
      shelves = this.state.storeData['floors'][0]['shelves'];
      console.log(shelves);
    }

    const shelvesStyle = {
      fill: 'blue',
    };

    const borderStyle = {
      stroke: 'rgb(0,0,0)',
    };


    const borders = this.getBoarders();
    const locatedProduct = this.state.locatedProduct;

    const locatedProductShelfPosition = () => {
      let x = 0;
      // console.log("derp");
      for (var i = 0; i < shelves.length; i++) {
        // console.log("shelf" + shelves[i]);
        // console.log("locatedprodshelf" + locatedProduct.shelf);
        if (shelves[i].id == locatedProduct.shelf) {
          // console.log("returned :" + x)
          return x;
        }
        x++;
        // console.log("x: ", x);
      }
    };
    // const locatedProductShelfPosition = 1;
    
    
    console.log('locatedProduct render() storelayoutpage.js : ' + locatedProduct);
    
    if (this.state.storeData) {
      console.log('storeId @storelayoutpage: ' + this.state.storeData.id);

    }

    return (
      <div className="store-layout-page">
        <div className="2nd-svg">
          <svg width="2000" height="2000" viewBox="0 0 2000 2000">
            {borders && borders.length > 0 && borders.map((border) => (
              <line
                x1={border.x1}
                y1={border.y1}
                x2={border.x2}
                y2={border.y2}
                style={borderStyle}
              />
            ))}
            {shelves && shelves.map((shelf) => (
              <rect
                x={shelf.x_location}
                y={shelf.y_location}
                width={shelf.width}
                height={shelf.height}
                style={shelvesStyle}
              />
            ))}
            {locatedProduct && shelves[locatedProductShelfPosition()] &&
              <circle
                cx={shelves[locatedProductShelfPosition()].x_location}
                cy={shelves[locatedProductShelfPosition()].y_location}
                fill="red"
                r="25"
              />
            }
          </svg>
          {this.state.storeData && this.state.storeData.id &&
          <div className="product-search-bar">
            <SearchBar 
              storeId={this.state.storeData.id}
              handleSuggestionClick={this.handleSuggestionClick} />
          </div>
          }
          
        </div>
      </div>
    );
  }
}
