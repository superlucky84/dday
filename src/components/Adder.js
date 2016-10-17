import React,{Component} from 'react';

//import AdderItem from './AdderItem.js';

import {List, ListItem} from 'material-ui/List';


import IconButton from 'material-ui/IconButton';




export default class Adder extends Component {

  constructor(props,children) {
    super(props);
  }

  render() {
    return (
      <List>
        <ListItem 
          style={{borderBottom: "1px solid #cdcdcd"}}
          primaryText="지구 명말까지"
          secondaryText="Change your Google+ profile photo"
          rightIconButton={<IconButton tooltip="bottom-left" tooltipPosition="bottom-right" ><i className="material-icons">mode_edit</i></IconButton>}
        />

        <ListItem 
          style={{borderBottom: "1px solid #cdcdcd"}}
          primaryText="내 생일까지"
          secondaryText={
            <p>
              <span style={{color: 'black'}}>Brendan Lim</span> --
              I&apos;ll be in your neighborhood doing errands this weekend. Do you want to grab brunch?
            </p>
          }
          rightIconButton={<IconButton tooltip="bottom-left" tooltipPosition="bottom-right" ><i className="material-icons">mode_edit</i></IconButton>}
        />


        <ListItem 
          style={{borderBottom: "1px solid #cdcdcd"}}
          primaryText="누나 생일까지"
          secondaryText={
            <p>
              <span style={{color: 'black'}}>Brendan Lim</span> --
              I&apos;ll be in your neighborhood doing errands this weekend. Do you want to grab brunch?
            </p>
          }
          rightIconButton={<IconButton tooltip="bottom-left" tooltipPosition="bottom-right" ><i className="material-icons">mode_edit</i></IconButton>}
        />
      </List>
    )
  }
}
