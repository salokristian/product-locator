import React, { Component } from 'react';
import SearchBar from './productSuggestion';
import './StoreLayoutPage.scss';



//haetun tuotteen infolaatikko 
function ProductInfo(props) {
  if (props) {
    let productInfo = props.product.product_info;
    let listItems = [];
    listItems.push(<li>{'Name: ' + productInfo.name}</li>);
    listItems.push(<li>{'Brand: ' + productInfo.brand}</li>);
    listItems.push(<li>{'Description: ' + productInfo.description}</li>);
    listItems.push(<li>{'Price: ' + props.product.price}</li>);

    return (
      <ul className>{listItems}</ul>
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
      showMultiplePalluras: true,
      locatedShoppingListProducts: undefined,

      //TODO: token/login muuta kautta
      token: ''
    };
  }
  componentDidMount() {

    let tokenBody = {
      "username": "test",
      "password": "testpwpw"
    };

    //TEMP get token
    fetch('https://productlocator.herokuapp.com/api/token', {
      method: 'POST',
      body: JSON.stringify(tokenBody),
      headers: {
        'Content-Type': 'application/json',
        // 'Accept': 'applicatiton/json',
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log(data.token);
        this.setState({
          token: data.token,
        });
        //get shopping list data
        this.getShoppingLists();
      });



    //get storeData
    const { id } = this.props.match.params;
    fetch('https://productlocator.herokuapp.com/api/stores/' + id)
      .then(response => response.json())
      .then(data =>  {
        this.setState({
          storeData: data
        });
      });



    

    
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
      locatedProduct: productData['suggestion'],
      showMultiplePalluras: false,
    });

  }

  //shopping-list
  getShoppingLists() {
    let url = 'https://productlocator.herokuapp.com/api/shopping-lists/me';
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
          listItems.push(<li className="shopping-lists-list-item" onClick={()=> this.handleShoppingListClick(key)}>{data[key].name}</li>);
        });
        this.setState({
          shoppingListsUlElements: <ul>{listItems}</ul>,
          shoppingListsData: data
        });
      });
  
  
  }

  handleShoppingListClick(key) {
    console.log(key);
    console.log(this.state.shoppingListsData[key]);

    //Whenever a shopping list is chosen: 1. fetch product info 2. draw their locations 3. ? 4. ?

    let id = this.state.shoppingListsData[key].id;
    let url = 'https://productlocator.herokuapp.com/api/shopping-lists/' + id;

    fetch(url, {
      headers: {
        'Authorization' : 'Bearer ' + this.state.token
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)

        this.setState({
          locatedShoppingListProducts: data.products,
          showMultiplePalluras: true,
        });
      }); 
  }

  handlePalluraClick = (data) => {
    console.log(data);
    this.setState({
      locatedProduct: data.productInfo
    });
  }

  getPalluraColor = (data) => {
    console.log("getPaluuraColor");
    console.log(data);
    console.log(this.state.locatedProduct);
    if (data.productInfo == this.state.locatedProduct) {
      return 'green';
    }
    else {
      return 'red';
    }
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

    //yksittäisen tuotteen paikantaminen

    const locatedProduct = this.state.locatedProduct;
    const locatedProductShelfIndex = (aProduct) => {
      let i = 0;
      for (i = 0; i < shelves.length; i++) {
        if (shelves[i].id == aProduct.shelf) {
          return i;
        }
      }
    }; 
    const getLocatedProductLocation = (axis, aProduct) => {
      console.log(aProduct);
      let i = locatedProductShelfIndex(aProduct);
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

    //shopping list tuotteiden paikannus
    
    console.log(this.state.locatedShoppingListProducts);
    
    const getShoppingListPallurat = () => {

      let results = [];

      if (this.state.locatedShoppingListProducts) {
        let products = this.state.locatedShoppingListProducts;
        Object.keys(products).forEach( key => {
          //for each product, draw a circle in the right shelf
          let x = getLocatedProductLocation('x', products[key]);
          let y = getLocatedProductLocation('y', products[key]);
          results.push({
            'x': x,
            'y': y,
            'productInfo': products[key],
          });

        });
        // console.log(results);
        return results;
      }
      else {
        return [];
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
            {locatedProduct && shelves[locatedProductShelfIndex(locatedProduct)] && !this.state.showMultiplePalluras &&
              <circle
                // cx={shelves[locatedProductShelfPosition()].x_location}
                // cy={shelves[locatedProductShelfPosition()].y_location}
                cx = {getLocatedProductLocation('x', locatedProduct)}
                cy = {getLocatedProductLocation('y', locatedProduct)}
                fill="green"
                r="25"
              />
            }
            {this.state.showMultiplePalluras && getShoppingListPallurat().map(data => (
              <circle className='pallura' onClick={() => this.handlePalluraClick(data)}
                cx = {data.x}
                cy = {data.y}
                fill = {this.getPalluraColor(data)}
                r="25"
              />
            ))}
          </svg>
          {this.state.storeData && this.state.storeData.id &&
          <div className="product-search-bar">
            <SearchBar 
              storeId={this.state.storeData.id}
              handleSuggestionClick={this.handleSuggestionClick} />
          </div>
          }
          {this.state.locatedProduct &&
          <div className="located-product-info">
            <b>ProudctInfo</b>
            <ProductInfo product={this.state.locatedProduct} />
          </div>
          }

          {
            <div className='shopping-lists'>
              <b>ShoppingLists</b>
              {this.state.shoppingListsUlElements}
            </div>
          }
          
        </div>
      </div>
    );
  }
}
