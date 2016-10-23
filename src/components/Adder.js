import React,{Component} from 'react';

import {List, ListItem} from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Dialog from 'material-ui/Dialog';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

const addStyle = {
  position: 'absolute',
  bottom: '0px',
  margin: '27px',
  right: '50px'
};

export default class Adder extends Component {

  constructor(props,children) {

    super(props);
    this.state = {
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

  componentDidMount() {
  }

  handleAddClick() {
    this.setState({open: true});
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
      this.setState({ writeTitleRequire: true });
      save = false;
    }
    if (!this.state.writeDate) {
      this.setState({ writeDateRequire: true });
      save = false;
    }
    if (!this.state.writeTime) {
      this.setState({ writeTimeRequire: true });
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
    console.log("key",key);
    this.deleteKey = key;
    this.setState({alertOpen: true});
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
      <List>
      {
        Object.keys(this.props.ddayList).map((key,idx) => (
          <ListItem 
            key={key}
            style={{borderBottom: "1px solid #cdcdcd"}}
            primaryText={this.props.ddayList[key].title}
            secondaryText={this.props.ddayList[key].date+' '+this.props.ddayList[key].time}
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
      }
      </List>

      <FloatingActionButton mini={true} style={addStyle}
        onClick={this.handleAddClick.bind(this)}
      >
        <ContentAdd />
      </FloatingActionButton>


      <Dialog
          title="ADD DDAY"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose.bind(this)}
      >
        DDAY를 입력하시오<br />

        {
         (this.state.writeTitleRequire == false)?
         <TextField
          hintText="지구 멸망까지"
          onChange={this.handleWriteTitle.bind(this)}
         />
         :
         <TextField
          hintText="지구 멸망까지"
          errorText="puhaha"
          onFocus={this.handleTitleFocus.bind(this)}
         />
        }
        {
         (this.state.writeDateRequire == false)?
          <DatePicker 
            hintText="멸망날짜" 
            onChange={this.handleWriteDate.bind(this)}
          />
          :
          <DatePicker 
            hintText="멸망날짜" 
            errorText="puhaha"
            onFocus={this.handleDateFocus.bind(this)}
          />
        }
        {
         (this.state.writeTimeRequire == false)?
          <TimePicker
            format="24hr"
            hintText="명말시간"
            onChange={this.handleWriteTime.bind(this)}
          />
          :
          <TimePicker
            format="24hr"
            hintText="명말시간"
            errorText="puhaha"
            onFocus={this.handleTimeFocus.bind(this)}
          />
        }

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
            label="회년 계산"
            style={{marginBottom: 16, float: 'left', width: '40%'}}
          />
        </RadioButtonGroup>

      </Dialog>

      <Dialog
        actions={alertActions}
        modal={false}
        open={this.state.alertOpen}
        onRequestClose={this.handleAlertClose.bind(this)}
      >
        DELETE OK?
      </Dialog>
      </div>
    )
  }
}
