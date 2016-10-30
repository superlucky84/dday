import React,{Component} from 'react';

import {List, ListItem} from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentPower from 'material-ui/svg-icons/action/power-settings-new';
import Visibility from 'material-ui/svg-icons/action/visibility';


import {darkBlack} from 'material-ui/styles/colors';
import Dialog from 'material-ui/Dialog';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import CircularProgress from 'material-ui/CircularProgress';

const logoutStyle = {
  position: 'fixed',
  bottom: '0px',
  margin: '27px',
  right: '0px'
}

export default class Adder extends Component {

  constructor(props,children) {

    super(props);
    this.state = {
      loading: true,
      open: false,
      alertOpen: false,
      writeTitle: '',
      writeDate: '',
      writeTime: '',
      writeTitleRequire: false,
      writeDateRequire: false,
      writeTimeRequire: false,
      writeType: 'primary'
    };
    this.deleteKey = 0;
  }

  componentWillUnmount() {
  }

  componentDidMount() {
  }
  handleLogout() {
    this.props.onResetState();
    firebase.auth().signOut();
  }

  handleAddClick() {


    if (Object.keys(this.props.ddayList).length >= 20) {
      this.setState({alertOpen: "Maxed 20 Items"});
      return;
    }

    this.setState({ 
      open: true,
      writeTitle: '',
      writeDate: '',
      writeTime: '',
      writeTitleRequire: false,
      writeDateRequire: false,
      writeTimeRequire: false,
      writeType: 'primary'
    });
  }
  handleClose() {
    this.setState({open: false});
  };
  handleAlertClose() {
    this.setState({alertOpen: false});
  };

  delDday() {
    this.props.onDelete(this.deleteKey);
    this.handleAlertClose();
  }

  saveDday() {

    let save = true;

    if (!this.state.writeTitle) {
      this.setState({ writeTitleRequire: 'Required' });
      save = false;
    }
    else if (this.state.writeTitle.length > 20) {
      this.setState({ writeTitleRequire: 'Maxed String Langth' });
      save = false;
    }

    if (!this.state.writeDate) {
      this.setState({ writeDateRequire: 'Please Enter A Date' });
      save = false;
    }
    if (!this.state.writeTime) {
      this.setState({ writeTimeRequire: 'Please Enter A Time' });
      save = false;
    }

    // 저장 시키자
    if (save) {
      this.props.onSave({
        title: this.state.writeTitle,
        date: this.state.writeDate,
        time: this.state.writeTime,
        type: this.state.writeType,
      });
      this.handleClose();
    }
  }

  handleWriteTitle(event) {
    this.setState({writeTitle: event.target.value});
  }

  handleWriteDate(event, date) {
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let day = date.getDate();
    let fullName = `${year}-${month}-${day}`;
    this.setState({writeDate: fullName});
  }
  handleWriteTime(event, date) {
    let fullName = `${date.getHours()}:${date.getMinutes()}`;
    this.setState({writeTime: fullName});
  }
  handleTitleFocus() {
    this.setState({ writeTitleRequire: false });
  }
  handleDateFocus() {
    this.setState({ writeDateRequire: false });
  }
  handleTimeFocus() {
    this.setState({ writeTimeRequire: false });
  }
  handleChangeType(event) {
    this.setState({writeType: event.target.value});
  }
  handleDelete(key) {
    this.deleteKey = key;
    this.setState({alertOpen: "DELETE OK?"});
  }

  handlePowerClick() {
    ipcRenderer.send('changeWindow','view');
  }

  componentDidUpdate(props) {
    console.log(!this.props.ddayList['notload'],props.ddayList['notload']);
    if (!this.props.ddayList['notload'] && props.ddayList['notload']) {
      this.setState({loading: false});
    }
  }

  render() {

   const actions = [
      <FlatButton
        label="Ok"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.saveDday.bind(this)}
      />,
    ];

    const alertActionOk = [
      <FlatButton
        label="Ok"
        primary={true}
        onTouchTap={this.handleAlertClose.bind(this)}
      />
    ];

    const alertActions = [
      <FlatButton
        label="Ok"
        primary={true}
        onTouchTap={this.delDday.bind(this)}
      />,
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleAlertClose.bind(this)}
      />,
    ];




    return (
      <div className="adder">

      {
        (this.state.loading)?
          <div style={{margin: 'auto', width: '65px', marginTop: "40%"}}>
          <CircularProgress size={60} thickness={7} />
          </div>
        :
        null
      }

      <List>
      {
        (!(this.props.ddayList['empty'] || this.props.ddayList['notload'])) ?
          Object.keys(this.props.ddayList).map((key,idx) => (
            <ListItem 
              key={key}
              style={{borderBottom: "1px solid #cdcdcd"}}
              primaryText={this.props.ddayList[key].title}
              secondaryText={
                <p>
                  <span style={{color: darkBlack}}>
                  {this.props.ddayList[key].date} {this.props.ddayList[key].time}
                  </span>
                  &nbsp;- {this.props.ddayList[key].type.toUpperCase()}
                </p>
              }
              rightIconButton={
                <IconButton 
                  tooltip="bottom-left" 
                  tooltipPosition="bottom-left" 
                  onClick={this.handleDelete.bind(this, key)}
                >
                  <i className="material-icons">delete</i>
                </IconButton>
              }
            />
          ))
        : null
      }

      {
      (this.props.ddayList['empty']) ?
        <div style={{textAlign: 'center', marginTop: '40%', fontSize:'70px'}}>
         ADD DDAY
        </div>
        : null
      }
      </List>

      <div style={logoutStyle}>
        <FloatingActionButton mini={true} style={{marginLeft: '7px'}}
          backgroundColor="red"
          onClick={this.handleLogout.bind(this)}
        >
          <ContentPower />
        </FloatingActionButton>

        <FloatingActionButton mini={true} style={{marginLeft: '7px'}} 
          backgroundColor="black"
          onClick={this.handleAddClick.bind(this)}
        >
          <ContentAdd />
        </FloatingActionButton>

        {
          (!(this.props.ddayList['empty'] || this.props.ddayList['notload'])) ?
            <FloatingActionButton mini={true} style={{marginLeft: '7px'}}  
              backgroundColor="green"
              onClick={this.handlePowerClick.bind(this)}
            >
              <Visibility />
            </FloatingActionButton> : null
        }
      </div>


      <Dialog
          title="ADD DDAY"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose.bind(this)}
      >
        Please enter the dday<br />

         <TextField
          hintText="JW BIRTHDAY"
          errorText={this.state.writeTitleRequire}
          onFocus={this.handleTitleFocus.bind(this)}
          onChange={this.handleWriteTitle.bind(this)}
         />
         <DatePicker 
           hintText="1984-05-10" 
           errorText={this.state.writeDateRequire}
           onFocus={this.handleDateFocus.bind(this)}
           onChange={this.handleWriteDate.bind(this)}
         />
         <TimePicker
           hintText="10:10 am"
           errorText={this.state.writeTimeRequire}
           onFocus={this.handleTimeFocus.bind(this)}
           onChange={this.handleWriteTime.bind(this)}
         />

        <RadioButtonGroup 
          name="shipSpeed" 
          defaultSelected="primary" 
          onChange={this.handleChangeType.bind(this)}
          style={{float: 'left', width: '100%'}}
        >
          <RadioButton
            value="primary"
            label="기본"
            style={{marginBottom: 16, float: 'left', width: '40%'}}
          />
          <RadioButton
            value="recycle"
            label="회년계산"
            style={{marginBottom: 16, float: 'left', width: '40%'}}
          />
        </RadioButtonGroup>

      </Dialog>

      <Dialog
        actions={(this.state.alertOpen=='DELETE OK?')?alertActions:alertActionOk}
        modal={false}
        open={(this.state.alertOpen)?true:false}
        onRequestClose={this.handleAlertClose.bind(this)}
      >
        {this.state.alertOpen}
      </Dialog>
      </div>
    )
  }
}
