import  React,{Component} from 'react';


import Adder from './Adder.js';
import View from './View.js';


import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';


export default class Dday extends Component {

  constructor(props) {
    super(props);

    this.state = {
      windowType: 'add',
      login: true,
      id: '',
      password: '',
      idError: false,
      passwordError: false,
      alertMessage: false,
      ddayList: {'notload': {title:'',type:''}}
    };

    this.database = firebase.database();
    this.loginChk();

  }

  loginChk() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user == null) {
        this.setState({login: false});
      }

      else if (user.emailVerified == false) {
        firebase.auth().currentUser.sendEmailVerification().then(() => {
          this.setState({
            idError: false,
            passwordError: false,
            alertMessage: '가입 확인메일을 보냈습니다.'
          });
          firebase.auth().signOut();
        });
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
      else {
        this.setState({ddayList: {'empty': {title:'',type:''}}});
      }
    });
  }

  handelDdayDel(deleteKey) {
    this.database.ref(`users/${this.state.id.replace(/\./g,'|')}/dday/`+deleteKey).set(null);
  }
  handelDdaySave(saveObj) {
    this.database.ref(`users/${this.state.id.replace(/\./g,'|')}/dday`).push(saveObj);
  }

  handleLogin() {


    firebase.auth().signInWithEmailAndPassword(this.state.id, this.state.password).
      catch((error) => {
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
  handleAlertClose() {
    this.setState({alertMessage: false});
  };
  handleResetState() {
    this.setState({
      login: true,
      id: '',
      password: '',
      idError: false,
      passwordError: false,
      alertMessage: false,
      ddayList: {'notload': {title:'',type:''}}
    });
  }
  handleWindowChange() {

    let windowType = 'view';
    if (this.state.windowType == 'view') {
      windowType = 'add';
    }
    
    this.setState({windowType});

    ipcRenderer.send('changeWindow',windowType);
  }

  handleWindowClose() {
    ipcRenderer.send('closeApp',{});
  }


  render() {

    const alertActionOk = [
      <FlatButton
        label="Ok"
        primary={true}
        onTouchTap={this.handleAlertClose.bind(this)}
      />
    ];


    let DDAY = null;
    if (this.state.login === false) {
      DDAY = <div id="login">
                <TextField
                  style={{width: '100%'}}
                  hintText="이메일 입력"
                  floatingLabelText="LOGIN ID"
                  errorText={this.state.idError}
                  onFocus={this.handleIdFocus.bind(this)}
                  onChange={this.handleWriteId.bind(this)} />

                <br />
                <TextField
                  style={{width: '100%'}}
                  hintText="패스워드를 입력"
                  floatingLabelText="PASSWORD"
                  errorText={this.state.passwordError}
                  type="password"
                  onFocus={this.handlePasswordFocus.bind(this)}
                  onChange={this.handleWritePassword.bind(this)}
                  />
                <br />
                <br />

                <RaisedButton 
                  label="회원가입" primary={true} 
                  onClick={this.handleJoin.bind(this)}
                />
                &nbsp;&nbsp;
                <RaisedButton 
                  label="로그인" secondary={true}  
                  onClick={this.handleLogin.bind(this)}
                />

              </div>;
    }
    //else if (windowType=='view') {
    else if (this.state.windowType=='view') {
      DDAY = <View 
        className="view"
        ddayList={this.state.ddayList}
        onWindowChange={this.handleWindowChange.bind(this)}
      />
    }
    else {
      DDAY = <Adder 
        ddayList={this.state.ddayList}
        onDelete={this.handelDdayDel.bind(this)}
        onResetState={this.handleResetState.bind(this)}
        onSave={this.handelDdaySave.bind(this)}
        onWindowChange={this.handleWindowChange.bind(this)}
      />
    }



    return (
      <div>

        {
        (this.state.windowType!='view')?
          <div className="header">
            <span className="title">JW-DDAY</span>
            <span 
              className="close"
              onClick={this.handleWindowClose.bind(this)}
            >X</span>
          </div>: null
        }

        {DDAY}

        <Dialog
          actions={alertActionOk}
          modal={false}
          open={(this.state.alertMessage)?true:false}
          onRequestClose={this.handleAlertClose.bind(this)}
        >
          {this.state.alertMessage}
        </Dialog>

      </div>


    );
  }
}
