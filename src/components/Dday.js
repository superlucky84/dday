import React, {Component} from 'react';

import Adder from './Adder.js';

export default class Dday extends Component {

  constructor(props,children) {
    super(props);
    /*
     - APP
       - Adder
         - AdderItem
         - AdderWriter 
       - View
    */
  }

  render() {
    return (
      <div>
        <Adder />
      </div>
    )
  }
}
