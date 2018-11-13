import React, { Component } from "react";
import ReactAutosuggest from "react-autosuggest";



const addToCart = (suggestion) => {
  // console.log("add to cart") // miksi tämä triggeraa ennen clickia mouseoverilla

};
// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion['product_info']['name'];



export default class SearchBar extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      suggestions: [],
      storeId: 999
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
    let fetchUrl = "http://localhost:8000/stores/1/products?search=" + value;

    fetch(fetchUrl)
      .then(response => response.json())
      .then(data => {
        // console.log(data);
        let productArray = [];

        for (let key in data) {
          if (data.hasOwnProperty(key)) {
            productArray.push(data[key]);
          }
        }

        this.setState({
          suggestions: productArray
        });
      });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  // Use your imagination to render suggestions.
  renderSuggestion = suggestion => (
    <div className="product-search-suggestion" onClick={() => this.props.handleSuggestionClick({suggestion})}>
      <div className="product-search-suggestion-name">{suggestion['product_info']['name']}</div>
      <button
        className="product-search-suggestion-add-to-cart"
        onClick={() => addToCart({suggestion})}
      >
        Add to cart
      </button>
    </div>
  );

  render() {
    const { value, suggestions } = this.state;

    const inputProps = {
      placeholder: "Type a product",
      value,
      onChange: this.onChange
    };

    return (
      <ReactAutosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        inputProps={inputProps}
      />
    );
  }
}
