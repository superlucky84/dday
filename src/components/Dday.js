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
      idError: false,
      passwordError: false,
      ddayList: {'empty': {title:'',type:''}}
    };

    this.database = firebase.database();
    this.loginChk();

  }

  loginChk() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user == null) {
        this.setState({login: false});
      }
      else {
        this.setState({login: true, id: user.email});
        this.loadList();
      }
    })
  }

  componentDidMount() {
  }

  loadList() {
    this.database.ref(`users/${this.state.id.replace(/\./g,'|')}/dday`).on('value', (snapshot) => {
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

    firebase.auth().signInWithEmailAndPassword(this.state.id, this.state.password).
      catch((error) => {
        console.log(error);
        if (error.code.match(/email|user/)) {
          this.setState({login: false, idError: error.message});
          this.errortext = "kkk";
        }
        else if (error.code.match(/password/)) {
          this.setState({login: false, passwordError: error.message});
        }

    });
  }

  handleJoin() {


    firebase.auth().createUserWithEmailAndPassword(this.state.id, this.state.password)
      .catch((error) => {
        if (error.code.match(/email|user/)) {
          this.setState({login: false, idError: error.message});
        }
        else if (error.code.match(/password/)) {
          this.setState({login: false, passwordError: error.message});
        }

    });


    /*
    firebase.auth().currentUser.sendEmailVerification().then(function() {
      // Email Verification sent!
      // [START_EXCLUDE]
      alert('Email Verification Sent!');
      // [END_EXCLUDE]
    });
    */

  }

  handleWriteId(event) {
    this.setState({id: event.target.value});
  }

  handleWritePassword(event) {
    this.setState({password: event.target.value});
  }
  handleIdFocus() {
    this.setState({idError: false});
  }
  handlePasswordFocus() {
    this.setState({passwordError: false});
  }


  render() {

    let DDAY = null;
    if (this.state.login === false) {
      DDAY = <div style={{padding: "70px", textAlign: 'center'}}>
              {
                (this.state.idError === false)?
                  <TextField
                    style={{width: '100%'}}
                    hintText="Hint Text"
                    floatingLabelText="LOGIN ID"
                    onChange={this.handleWriteId.bind(this)} />
                  :
                  <TextField
                    style={{width: '100%'}}
                    hintText="Hint Text"
                    floatingLabelText="LOGIN ID"
                    errorText={this.state.idError}
                    onFocus={this.handleIdFocus.bind(this)}
                    onChange={this.handleWriteId.bind(this)} />
              }

              <br />
              {
                (this.state.passwordError === false)?
                  <TextField
                    style={{width: '100%'}}
                    hintText="Password Field"
                    floatingLabelText="PASSWORD"
                    type="password"
                    onChange={this.handleWritePassword.bind(this)}
                    />
                  :
                  <TextField
                    style={{width: '100%'}}
                    hintText="Password Field"
                    floatingLabelText="PASSWORD"
                    errorText={this.state.passwordError}
                    type="password"
                    onFocus={this.handlePasswordFocus.bind(this)}
                    onChange={this.handleWritePassword.bind(this)}
                    />
              }
                <br />
                <br />

              <RaisedButton 
                label="SIGN UP" primary={true} 
                onClick={this.handleJoin.bind(this)}
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
