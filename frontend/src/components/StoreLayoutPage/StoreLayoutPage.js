import React, { Component } from 'react';
import './StoreLayoutPage.scss';
import Autosuggest from 'react-autosuggest';

// Imagine you have a list of languages that you'd like to autosuggest.
const languages = [
  {
    name: 'C',
    year: 1972
  },
  {
    name: 'Elm',
    year: 2012
  },
  
];

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : languages.filter(lang =>
    lang.name.toLowerCase().slice(0, inputLength) === inputValue
  );
};



// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.name;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
  <div>
    {suggestion.name}
  </div>
);

export class SearchBar extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      suggestions: []
    };
  }
  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

   // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above (???), so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    console.log("onSuggestionsFetchRequested");
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const {value, suggestions} = this.state;

    const inputProps = {
      placeholder: 'Type a product',
      value,
      onChange: this.onChange
    };

    return(
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    );

  }

}


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

    //generate svg for floor
    var svg = '';
   
    var i;
    var j;
    var points = floorsShelvesJson['floors'][0]['points'];
    for (i = 0; i < points.length ; i++) {
      if (i+1 < points.length) {
        j = i + 1;
      }
      else {
        j = 0;
      }
      svg += '<line ';
      svg += 'x1="' + points[i][0].toString() + '" ';
      svg += 'y1="' + points[i][1].toString() + '" ';
      svg += 'x2="' + points[j][0].toString() + '" ';
      svg += 'y2="' + points[j][1].toString() + '" ';
      svg += 'style="stroke:rgb(0,0,0);" />\n';
    }

    //svg shelves

    var shelves = floorsShelvesJson['shelves'];

    for (i = 0; i < shelves.length; i++) {
      svg += '<rect ';
      svg += ' x = "' + shelves[i]['x_location'] + '"';
      svg += ' y = "' + shelves[i]['y_location'] + '"';
      svg += ' width = "' + shelves[i]['width'] + '"';
      svg += ' height = "' + shelves[i]['height'] + '"';
      svg += ' fill=blue />\n';
    }
    

    
    
    console.log(svg);
    return <svg width="20" height="20" viewBox="0 0 20 20" dangerouslySetInnerHTML={{__html: svg}} />;





  }


  render() {
    return (
      <div className="store-layout-page">
        <div className="product-search-bar">
        <SearchBar/>
        </div>
        <div className="store-layout">
          {this.getSvg()}
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


