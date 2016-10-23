
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
      page: 0
    };
  }

  componentDidMount() {
  }

  changePage(idx) {

    this.setState({page: idx});

  }

  componentDidMount() {
  }



  render() {

    return (
      <div>

        <AutoPlaySwipeableViews autoplay={false} index={this.state.page} >
          {
            Object.keys(this.props.ddayList).map((key,idx) => (
              <ViewItem
                key={key}
                title={this.props.ddayList[key].title}
                date={this.props.ddayList[key].date}
                time={this.props.ddayList[key].time}
                type={this.props.ddayList[key].type}
              />
            ))
          }
        </AutoPlaySwipeableViews>

        {
          Object.keys(this.props.ddayList).map((key,idx) => (
            <button key={key} onClick={this.changePage.bind(this,idx)}>{idx}</button>
          ))
        }

      </div>
    )
  }
}
