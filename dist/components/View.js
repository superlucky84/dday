'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _bindKeyboard = require('react-swipeable-views/lib/bindKeyboard');

var _bindKeyboard2 = _interopRequireDefault(_bindKeyboard);

var _virtualize = require('react-swipeable-views/lib/virtualize');

var _virtualize2 = _interopRequireDefault(_virtualize);

var _autoPlay = require('react-swipeable-views/lib/autoPlay');

var _autoPlay2 = _interopRequireDefault(_autoPlay);

var _reactSwipeableViews = require('react-swipeable-views');

var _reactSwipeableViews2 = _interopRequireDefault(_reactSwipeableViews);

var _ViewItem = require('./ViewItem.js');

var _ViewItem2 = _interopRequireDefault(_ViewItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//import {Motion, spring, TransitionMotion} from 'react-motion';

var BindKeyboardSwipeableViews = (0, _bindKeyboard2.default)(_reactSwipeableViews2.default);
var AutoPlaySwipeableViews = (0, _autoPlay2.default)(_reactSwipeableViews2.default);

function _bindingPointer(event) {

  var page = this.state.page;

  if (this.totalDdayCount <= 1) {
    return false;
  }

  if (event.keyCode == 37) {
    page--;
    if (page < 0) {
      page = this.totalDdayCount - 1;
    }
    this.setState({ page: page });
  } else if (event.keyCode == 39) {
    page++;
    if (page + 1 > this.totalDdayCount) {
      page = 0;
    }
    this.setState({ page: page });
  }
}

var styles = {
  slide: {
    padding: 15,
    minHeight: 100,
    color: '#fff'
  },
  slide1: {
    background: '#FEA900'
  },
  slide2: {
    background: '#B3DC4A'
  },
  slide3: {
    background: '#6AC0FF'
  }
};

var View = function (_Component) {
  _inherits(View, _Component);

  function View(props, children) {
    _classCallCheck(this, View);

    var _this = _possibleConstructorReturn(this, (View.__proto__ || Object.getPrototypeOf(View)).call(this, props));

    _this.state = {
      page: 0,
      ontop: false,
      focus: false,
      init: false
    };
    _this.textInput = {};
    _this.bindObj = null;
    return _this;
  }

  _createClass(View, [{
    key: 'changePage',
    value: function changePage(idx) {
      this.setState({ page: idx });
    }
  }, {
    key: 'closeApp',
    value: function closeApp() {
      ipcRenderer.send('closeApp', {});
    }
  }, {
    key: 'handlePowerClick',
    value: function handlePowerClick() {
      this.setState({ page: 0, ontop: false });
      ipcRenderer.send('onTop', false);
      this.props.onWindowChange();
    }
  }, {
    key: 'handleOnTop',
    value: function handleOnTop() {
      var ontop = true;
      if (this.state.ontop) {
        ontop = false;
      }
      ipcRenderer.send('onTop', ontop);
      this.setState({ ontop: ontop });
    }
  }, {
    key: 'handleToggleMenu',
    value: function handleToggleMenu() {
      var focus = true;
      if (this.state.focus) {
        focus = false;
      }
      this.setState({ focus: focus });
    }
  }, {
    key: 'resizeWidth',
    value: function resizeWidth() {
      var width = _reactDom2.default.findDOMNode(this.textInput[this.state.page]).clientWidth + 70;
      ipcRenderer.send('resizeWidth', width);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(props, state) {
      if (Object.keys(props.ddayList).length != Object.keys(this.props.ddayList).length) {
        this.totalDdayCount = Object.keys(this.props.ddayList).length;
      }
      if (!this.props.ddayList['notload']) {
        this.resizeWidth();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      document.body.removeEventListener('keydown', this.bindObj);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {

      this.bindObj = _bindingPointer.bind(this);
      document.body.addEventListener('keydown', this.bindObj);
      this.totalDdayCount = Object.keys(this.props.ddayList).length;
      this.resizeWidth();
    }
  }, {
    key: 'keyEvent',
    value: function keyEvent(event) {}
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          AutoPlaySwipeableViews,
          {
            autoplay: false,
            index: this.state.page,
            className: 'slider'
          },
          Object.keys(this.props.ddayList).map(function (key, idx) {
            return _react2.default.createElement(_ViewItem2.default, {
              key: key,
              ref: function ref(input) {
                return _this2.textInput[idx] = input;
              },
              title: _this2.props.ddayList[key].title,
              date: _this2.props.ddayList[key].date,
              time: _this2.props.ddayList[key].time,
              type: _this2.props.ddayList[key].type
            });
          })
        ),
        _react2.default.createElement('div', { className: 'dragarea' }),
        _react2.default.createElement(
          'div',
          {
            className: 'footer-toggle'
          },
          _react2.default.createElement(
            'button',
            {
              style: { border: this.state.focus ? "1px solid #fff" : "0px" },
              onClick: this.handleToggleMenu.bind(this)
            },
            this.state.focus ? "-" : ">"
          )
        ),
        _react2.default.createElement(
          'div',
          {
            className: 'footer',
            style: { display: this.state.focus ? 'block' : 'none' }
          },
          Object.keys(this.props.ddayList).map(function (key, idx) {
            return _react2.default.createElement(
              'button',
              {
                key: key,
                style: { backgroundColor: idx == _this2.state.page ? 'red' : '#8989ff' },
                onClick: _this2.changePage.bind(_this2, idx) },
              idx
            );
          }),
          '\xA0',
          _react2.default.createElement(
            'button',
            {
              style: { backgroundColor: this.state.ontop ? 'red' : '#8989ff' },
              onClick: this.handleOnTop.bind(this)
            },
            'f'
          ),
          _react2.default.createElement(
            'button',
            {
              onClick: this.handlePowerClick.bind(this)
            },
            'a'
          ),
          _react2.default.createElement(
            'button',
            {
              onClick: this.closeApp.bind(this)
            },
            'x'
          )
        )
      );
    }
  }]);

  return View;
}(_react.Component);

exports.default = View;