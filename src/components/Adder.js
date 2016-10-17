import {Component} from 'react';

import AdderItem from './AdderItem.js';

import {List, ListItem} from 'material-ui/List';



export default class Adder extends Component {

  constructor(props,children) {
    super(props);
  }

  render() {
    return (
      <List>
        <AdderItem />
        <AdderItem />
      </List>
    )
  }
}
