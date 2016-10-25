import  React,{Component} from 'react';


import Adder from './Adder.js';
import View from './View.js';


import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';


export default class Dday extends Component {

  constructor(props) {
    super(props);

    this.state = {
      login: true,
      id: '',
      password: '',
      ddayList: {}
    };

    this.database = firebase.database();

    this.loginChk();


    /*
    firebase.auth().createUserWithEmailAndPassword("superlucky84@gmail.com", "jinw1121").catch(function(error) {
      console.log(error);

      if (error.code == 'auth/email-already-in-use') {
        // 에러처리
      }
      else {
        this.setState({login: true});
      }

      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
    });
    */

    /*
    firebase.auth().signInWithEmailAndPassword("superlucky84@gmail.com", "jinw1121").catch(function(error) {
      console.log('error');
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
});
*/


    /*
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
    }, function(error) {
      // An error happened.
    });
    */


  }

  loginChk() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user == null) {
        this.setState({login: false});
      }
      else {
        console.log('loadlist');
        this.setState({login: true, id: user.email});
        this.loadList();
      }
    })
  }

  componentDidMount() {
  }

  loadList() {
    this.database.ref(`users/${this.state.id.replace(/\./g,'|')}/dday`).on('value', (snapshot) => {
      console.log(snapshot.val());
      if (snapshot.val()) {
        this.setState({ddayList: snapshot.val()});
      }
    });
  }

  handelDdayDel(deleteKey) {
    console.log(this.database,deleteKey);
    this.database.ref(`users/${this.state.id.replace(/\./g,'|')}/dday/`+deleteKey).set(null);
  }
  handelDdaySave(saveObj) {
    this.database.ref(`users/${this.state.id.replace(/\./g,'|')}/dday`).push(saveObj);
  }

  handleLogin() {
    console.log('HANDLELOGINB');
    firebase.auth().signInWithEmailAndPassword(this.state.id, this.state.password).catch((error) => {
      console.log(error);
      this.setState({login: false});
    });
      //this.loginChk();
  }

  handleWriteId(event) {
    this.setState({id: event.target.value});
  }

  handleWritePassword(event) {
    this.setState({password: event.target.value});
  }


  render() {

    let DDAY = null;
    if (this.state.login === false) {
      DDAY = <div style={{padding: "70px", textAlign: 'center'}}>
              <TextField
                style={{width: '100%'}}
                hintText="Hint Text"
                floatingLabelText="LOGIN ID"
                onChange={this.handleWriteId.bind(this)}

              /><br />
              <TextField
                style={{width: '100%'}}
                hintText="Password Field"
                floatingLabelText="PASSWORD"
                type="password"
                onChange={this.handleWritePassword.bind(this)}
                />
                <br />
                <br />

              <RaisedButton 
                label="SIGN UP" primary={true} 
              />
              &nbsp;&nbsp;
              <RaisedButton 
                label="SIGN IN" secondary={true}  
                onClick={this.handleLogin.bind(this)}
              />

            </div>;
    }
    else if (windowType=='view') {
      DDAY = <View 
        className="view"
        ddayList={this.state.ddayList}
      />
    }
    else {
      DDAY = <Adder 
        ddayList={this.state.ddayList}
        onDelete={this.handelDdayDel.bind(this)}
        onSave={this.handelDdaySave.bind(this)}
      />
    }



    return (
      <div>
        {DDAY}
      </div>
    );
  }
}
