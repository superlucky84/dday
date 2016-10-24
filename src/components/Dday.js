import  React,{Component} from 'react';

import Adder from './Adder.js';
import View from './View.js';



export default class Dday extends Component {

  constructor(props) {
    super(props);

    this.state = {
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


  render() {


    return (
      <div>
        {
          (windowType=='view')?
          <View 
            className="view"
            ddayList={this.state.ddayList}
          />
          :
          <Adder 
            ddayList={this.state.ddayList}
            onDelete={this.handelDdayDel.bind(this)}
            onSave={this.handelDdaySave.bind(this)}
          />
        }

      </div>
    );
  }
}
