import React, { Component } from 'react';

// en oo varma tarviiko ereillistä backendapi komponenttia edes

export default class backendApi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      backendAddress: 'www.zzyyww.org'

    };
  }


  getFloorsAndShelves(storeId) {


    let data = {
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

    return data;
  }
}
