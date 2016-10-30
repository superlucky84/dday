
import React,{Component} from 'react';

//import {Motion, spring, TransitionMotion} from 'react-motion';

import ReactDOM from 'react-dom';

import bindKeyboard from 'react-swipeable-views/lib/bindKeyboard';
import virtualize from 'react-swipeable-views/lib/virtualize';
import autoPlay from 'react-swipeable-views/lib/autoPlay';

import SwipeableViews from 'react-swipeable-views';


const BindKeyboardSwipeableViews = bindKeyboard(SwipeableViews);
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

import ViewItem from './ViewItem.js';



const styles = {
  slide: {
    padding: 15,
    minHeight: 100,
    color: '#fff',
  },
  slide1: {
    background: '#FEA900',
  },
  slide2: {
    background: '#B3DC4A',
  },
  slide3: {
    background: '#6AC0FF',
  },
};


export default class View extends Component {

  constructor(props,children) {
    super(props);
    this.state = {
      page: 0,
      ontop: false,
      focus: false,
      init: false
    };
    this.textInput= {};
  }

  changePage(idx) {
    this.setState({page: idx});
  }
  closeApp() {
    ipcRenderer.send('closeApp',{});
  }
  handlePowerClick() {
    this.setState({page: 0});
    ipcRenderer.send('changeWindow','adder');
  }
  handleOnTop() {
    ipcRenderer.send('onTop','top');
    let ontop = true;
    if (this.state.ontop) {
      ontop = false;
    }
    this.setState({ontop});
  }

  handleToggleMenu() {
    let focus = true;
    if (this.state.focus) {
      focus = false;
    }
    this.setState({focus});
  }

  resizeWidth() {
    let width = ReactDOM.findDOMNode(this.textInput[this.state.page]).clientWidth+70;
    ipcRenderer.send('resizeWidth', width);
  }


  componentDidUpdate(props,state) {
    if (Object.keys(props.ddayList).length != Object.keys(this.props.ddayList).length) {
      this.totalDdayCount = Object.keys(this.props.ddayList).length;
    }
    if (!this.props.ddayList['notload']) {
      this.resizeWidth();
    }
  }

  componentDidMount() {

    let page = this.state.page;
    document.body.addEventListener('keydown',function(event) {
      if (event.keyCode == 37) {
        page--;
        if (page < 0) {
          page = this.totalDdayCount - 1;
        }
        this.setState({page});
      }
      else if (event.keyCode == 39) {
        page++;
        if (page+1 > this.totalDdayCount) {
          page = 0;
        }
        this.setState({page});
      }
    }.bind(this));

  }


  render() {

    return (
      <div>
        <AutoPlaySwipeableViews 
          autoplay={false} 
          index={this.state.page} 
          className="slider"
        >
          {
            Object.keys(this.props.ddayList).map((key,idx) => (
              <ViewItem
                key={key}
                ref={(input) => this.textInput[idx] = input}
                title={this.props.ddayList[key].title}
                date={this.props.ddayList[key].date}
                time={this.props.ddayList[key].time}
                type={this.props.ddayList[key].type}
              />
            ))
          }
        </AutoPlaySwipeableViews>
        <div className="dragarea">
        </div>

        <div 
          className="footer-toggle"
        >
          <button
            style={{border: (this.state.focus)?"1px solid #fff":"0px"}}
            onClick={this.handleToggleMenu.bind(this)}
          >{(this.state.focus)?"-":">"}</button>

        </div>

        <div 
          className="footer"
          style={{display: (this.state.focus)?'block':'none'}}
        >
          {
            Object.keys(this.props.ddayList).map((key,idx) => (
              <button 
                key={key} 
                style={{backgroundColor: (idx == this.state.page)?'red':'#8989ff'}}
                onClick={this.changePage.bind(this,idx)}>{idx}
              </button>
            ))
          }
          &nbsp;
          <button
            style={{backgroundColor: (this.state.ontop)?'red':'#8989ff'}}
            onClick={this.handleOnTop.bind(this)}
          >f</button>
          <button
            onClick={this.handlePowerClick.bind(this)}
          >o</button>
          <button
            onClick={this.closeApp.bind(this)}
          >x</button>
        </div>

      </div>
    )
  }
}
