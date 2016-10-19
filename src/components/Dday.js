import  React,{Component} from 'react';

import Adder from './Adder.js';
import View from './View.js';

export default class Dday extends Component {

  constructor(props) {
    super(props);
    /*
     - APP
       - Adder
         - AdderItem
         - AdderWriter 
       - View
    */


    this.state = {
      power: true,
    };

  }

  handlePowerClick() {
    console.log("ONPOWER");

    this.setState({power: true});
  }

  render() {
    return (
      <div>
        {
          (this.state.power)?
          <View />
          :
          <Adder 
            onPower={this.handlePowerClick.bind(this)}
          />
        }
      </div>
    );
  }
}
