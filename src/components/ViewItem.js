
import React,{Component} from 'react';

//import {Motion, spring, TransitionMotion} from 'react-motion';

import ReactDOM from 'react-dom';



export default class ViewItem extends Component {

  constructor(props,children) {
    super(props);
    this.state = {
      color: "#000",
      leftString : '',
      recycle: ''
    };

    this.timeout = null;
    ipcRenderer.send('optionChange', 'puhaha');
  }


  componentWillUnmount() {
    console.log('unmount');

    clearTimeout(this.timeout);
  }

  componentWillMount() {

    const COLORS = ['#FEA900', '#B3DC4A', '#6AC0FF','#FEA900', '#B3DC4A', '#6AC0FF','#FEA900', '#B3DC4A', '#6AC0FF','#FEA900'];

    let random = Math.floor(Math.random() * 10);
    this.setState({
      color: COLORS[random]
    });

    let targetTime = new Date(`${this.props.date} ${this.props.time}`);

    if (this.props.type == 'primary') {
      this.remain(targetTime);
    }
    else if (this.props.type == 'recycle') {
      this.recycleRemain(targetTime);
    }
  }


  recycleRemain(target) {

    let now = new Date();
    let targetTime = target.getTime();
    let nowTime = now.getTime();

    let remainTime = 0;
    let recycle = 0;
    if (targetTime < nowTime){
      for ( ; targetTime < nowTime ; ) {
        let year = target.getFullYear();
        target.setFullYear(year+1);
        targetTime = target.getTime();
        recycle++;
      }
    }

    this.setState({
      recycle : `${recycle} 주년 까지`
    });

    this.remain(target);
  }

  remain(target) {

    let now = new Date();
    let targetTime = target.getTime();
    let nowTime = now.getTime()

    let remainTime = 0;
    let predicate = "남았습니다.";
    if (targetTime > nowTime){
      remainTime = targetTime - nowTime;
    }
    else {
      remainTime = nowTime - targetTime;
      predicate = "지났습니다.";
    }

    var gap = Math.round((remainTime) / 1000);
    var D = Math.floor(gap / 86400);
    var H = Math.floor((gap - D * 86400) / 3600 % 3600);
    var M = Math.floor((gap - H * 3600) / 60 % 60);
    var S = Math.floor((gap - M * 60) % 60);
    D = (D)?D+'일 ':'';
    H = (H)?H+'시간 ':'';
    M = (M)?M+'분 ':'';
    S = (S)?S+'초 ':'';

    var lefttime =  D+H+M+S+predicate;

    this.setState({
      leftString: lefttime
    });

    this.timeout = setTimeout(() => {
      this.remain(target);
    },1000);
  }



  render() {
    return (
      <div 
        style={{
          color: this.state.color,
          padding: "0 15px 0 15px",
          minHeight: "100px",
          fontSize: "2.8em",
          backgroundColor: "transparent"
        }}
      >

        {this.props.title}&nbsp;
        {this.state.recycle}!
        <br/>
        {this.state.leftString}
      </div>
    )
  }
}
