import React, { Component } from 'react';
import SearchBar from './productSuggestion';
import './StoreLayoutPage.scss';



//haetun tuotteen infolaatikko 
function ProductInfo(props) {
  if (props) {
    let productInfo = props.productInfo;
    let listItems = [];
    listItems.push(<li>{'Name: ' + productInfo.name}</li>);
    listItems.push(<li>{'Brand: ' + productInfo.brand}</li>);
    listItems.push(<li>{'Description: ' + productInfo.description}</li>);

    return (
      <ul>{listItems}</ul>
    );
  }
}




//kauppakartta
export default class StoreLayoutPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locatedProduct: undefined,
      storeData: undefined,
      locatedProductInfoVisible: true,
      //TODO: token/login muuta kautta
      token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyLCJ1c2VybmFtZSI6InRlc3QiLCJleHAiOjE1NDI1OTIyOTQsImVtYWlsIjoidGVzdEB0ZXN0LmZpIn0.nCC8y9W4qWO5MPfMQ_2WKI0eryFF-oBC10e9h7162zY'
    };
  }
  // temp solution for getting store data to StoreLayoutPage component -- TODO some redux magic or somethiing.
  componentDidMount() {

    //get storeData
    const { id } = this.props.match.params;
    fetch('https://productlocator.herokuapp.com/stores/' + id)
      .then(response => response.json())
      .then(data =>  {
        this.setState({
          storeData: data
        });
      });

    //get shopping list data
    this.getShoppingLists();

    

    
  }

  getBoarders() {
    //generate svg for floor
    let svg = [];
   
    let i;
    let j;

    //assuming has just one floor for now    
    let points = [];
    if (this.state.storeData != null) {
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
    //push to this.state.locatedProducts all product info 
    this.setState({
      locatedProduct: productData['suggestion']
    });

  }

  //shopping-list
  getShoppingLists() {
    let url = 'https://productlocator.herokuapp.com/shopping-lists/me'
    let AuthHeader = 'Bearer ' + this.state.token;
    return fetch(url, {
      headers: {
        'Authorization': AuthHeader
      }
    })
      .then(response => response.json())
      .then(data => {
        let listItems = [];
        Object.keys(data).forEach( key => {
          listItems.push(<li onClick={()=> this.handleShoppingListClick(key)}>{data[key].name}</li>);
        });
        this.setState({
          shoppingLists: <ul>{listItems}</ul>
        });
      });
  
  
  }

  handleShoppingListClick(key) {
    console.log(key);

    //Whenever a shopping list is chosen: 1. fetch product info 2. draw their locations 3. ? 4. ?
  }


  render() {
    
    //toimii nyt, mutta oikeesti renderöi kahdesti, vaikka ComponentWillMount kanssa ei mun mielestä pitäisi..
    //reunat (boarders) ja hyllyt (shelves) tulee nyt vammasesti eri paikoista, ihan hyvin vois olla molemmat vaikka täällä.
    let shelves = [];
    if (this.state.storeData != null) {
      shelves = this.state.storeData['floors'][0]['shelves'];
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
      let i = 0;
      for (i = 0; i < shelves.length; i++) {
        if (shelves[i].id == locatedProduct.shelf) {
          return i;
        }
      }
    }; 
    const getLocatedProductLocation = (axis) => {
      let i = locatedProductShelfPosition();
      if (axis == 'x') {
        let cx = shelves[i].x_location;
        cx += shelves[i].width*0.5;
        return cx;
      }
      if (axis == 'y') {
        let cy = shelves[i].y_location;
        cy += shelves[i].height*0.5;
        return cy;
      }

    };  
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
                // cx={shelves[locatedProductShelfPosition()].x_location}
                // cy={shelves[locatedProductShelfPosition()].y_location}
                cx = {getLocatedProductLocation('x')}
                cy = {getLocatedProductLocation('y')}
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
          {this.state.locatedProduct && this.state.locatedProductInfoVisible &&
          <div className="located-product-info">
            <b>ProudctInfo</b>
            <ProductInfo productInfo={this.state.locatedProduct.product_info} />
          </div>
          }

          {
            <div className='shopping-lists'>
              <b>ShoppingLists</b>
              {this.state.shoppingLists}
            </div>
          }
          
        </div>
      </div>
    );
  }
}
