
import React,{Component} from 'react';

//import {Motion, spring, TransitionMotion} from 'react-motion';

import ReactDOM from 'react-dom';

import bindKeyboard from 'react-swipeable-views/lib/bindKeyboard';
import virtualize from 'react-swipeable-views/lib/virtualize';
import autoPlay from 'react-swipeable-views/lib/autoPlay';

import SwipeableViews from 'react-swipeable-views';


const BindKeyboardSwipeableViews = bindKeyboard(SwipeableViews);
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);



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

  changePage() {

    this.setState({page: 1});

  }


  render() {

    return (
      <div>

        <AutoPlaySwipeableViews autoplay={false} index={this.state.page} >
          <div style={Object.assign({}, styles.slide, styles.slide1)}>
            slide n°1
          </div>
          <div style={Object.assign({}, styles.slide, styles.slide2)}>
            slide n°2
          </div>
          <div style={Object.assign({}, styles.slide, styles.slide3)}>
            slide n°3
          </div>
        </AutoPlaySwipeableViews>

        <button onClick={this.changePage.bind(this)}>aa</button>
      </div>
    )
  }
}
