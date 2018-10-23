import React, { Component } from 'react';

export default class MapPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // TODO: mitä state-infoa tarvitsee? tallennanko ylimpään komponenttiin mahd.paljon?
      // Joo? Eli tähän? Siis ainakin jo etsityt tuotteet mistä pingi kartalla.
    };
  }
  render() {
    return (
      <div>
        <div>search bar</div>

        <div>kartta</div>
      </div>
    );
  }
}

// Muita (statless function()?) tai classeja? esim. MapPage ainoa missä state, lisäksi function StoreLayout ja function SearchBar ?
