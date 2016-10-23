import  React,{Component} from 'react';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentPower from 'material-ui/svg-icons/action/power-settings-new';

import Adder from './Adder.js';
import View from './View.js';

const powerStyle = {
  position: 'absolute',
  bottom: '0px',
  margin: '27px',
  right: '0px'
};


export default class Dday extends Component {

  constructor(props) {
    super(props);

    this.state = {
      power: false,
      ddayList: {}
    };
    this.database = firebase.database();
  }

  componentDidMount() {
    this.loadList();

  }

  loadList() {
    this.database.ref('users/superlucky84/dday').on('value', (snapshot) => {
      console.log(snapshot.val());
      if (snapshot.val()) {
        this.setState({ddayList: snapshot.val()});
      }
    });
  }

  handelDdayDel(deleteKey) {
    console.log(this.database,deleteKey);
    this.database.ref('users/superlucky84/dday/'+deleteKey).set(null);
  }
  handelDdaySave(saveObj) {
    this.database.ref('users/superlucky84/dday').push(saveObj);
  }


  handlePowerClick() {

    let power = true;
    if (this.state.power) {
      power = false;
    }
    this.setState({power});
  }

  render() {


    return (
      <div>
        {
          (this.state.power)?
          <View 
            ddayList={this.state.ddayList}
          />
          :
          <Adder 
            ddayList={this.state.ddayList}
            onDelete={this.handelDdayDel.bind(this)}
            onSave={this.handelDdaySave.bind(this)}
          />
        }

        <FloatingActionButton mini={true} secondary={true} style={powerStyle}
          onClick={this.handlePowerClick.bind(this)}
        >
          <ContentPower />
        </FloatingActionButton>
      </div>
    );
  }
}
