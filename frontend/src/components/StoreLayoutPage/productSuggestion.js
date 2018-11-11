
import React, { Component, PureComponent } from 'react';
import ReactAutosuggest from 'react-autosuggest';
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


const addToCart = (event) => {
  console.log(event);
};
// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.name;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
  <div className="product-search-suggestion">
    <div className="product-search-suggestion-name">
      {suggestion.name}
    </div>
    <button className="product-search-suggestion-add-to-cart" onClick={addToCart}>
      +
    </button>
  </div>
);

export default class SearchBar extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      suggestions: [],
    };
  }
  onChange = (event, { newValue }) => {
    console.log('here');
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
      <ReactAutosuggest
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
