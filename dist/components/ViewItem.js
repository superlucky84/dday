'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//import {Motion, spring, TransitionMotion} from 'react-motion';

var ViewItem = function (_Component) {
  _inherits(ViewItem, _Component);

  function ViewItem(props, children) {
    _classCallCheck(this, ViewItem);

    var _this = _possibleConstructorReturn(this, (ViewItem.__proto__ || Object.getPrototypeOf(ViewItem)).call(this, props));

    _this.state = {
      color: "#000",
      leftString: '',
      recycle: ''
    };

    _this.timeout = null;
    ipcRenderer.send('optionChange', 'puhaha');
    return _this;
  }

  _createClass(ViewItem, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearTimeout(this.timeout);
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {

      var COLORS = ['#FEA900', '#B3DC4A', '#6AC0FF', '#FEA900', '#B3DC4A', '#6AC0FF', '#FEA900', '#B3DC4A', '#6AC0FF', '#FEA900'];

      var random = Math.floor(Math.random() * 10);
      this.setState({
        color: COLORS[random]
      });

      var targetTime = new Date(this.props.date + ' ' + this.props.time);

      if (this.props.type == 'primary') {
        this.remain(targetTime);
      } else if (this.props.type == 'recycle') {
        this.recycleRemain(targetTime);
      }
    }
  }, {
    key: 'recycleRemain',
    value: function recycleRemain(target) {

      var now = new Date();
      var targetTime = target.getTime();
      var nowTime = now.getTime();

      var remainTime = 0;
      var recycle = 0;
      if (targetTime < nowTime) {
        for (; targetTime < nowTime;) {
          var year = target.getFullYear();
          target.setFullYear(year + 1);
          targetTime = target.getTime();
          recycle++;
        }
      }

      this.setState({
        recycle: recycle + ' \uC8FC\uB144 \uAE4C\uC9C0! '
      });

      this.remain(target);
    }
  }, {
    key: 'remain',
    value: function remain(target) {
      var _this2 = this;

      var now = new Date();
      var targetTime = target.getTime();
      var nowTime = now.getTime();

      var remainTime = 0;
      var predicate = "남았습니다.";
      if (targetTime > nowTime) {
        remainTime = targetTime - nowTime;
      } else {
        remainTime = nowTime - targetTime;
        predicate = "지났습니다.";
      }

      var gap = Math.round(remainTime / 1000);
      var D = Math.floor(gap / 86400);
      var H = Math.floor((gap - D * 86400) / 3600 % 3600);
      var M = Math.floor((gap - H * 3600) / 60 % 60);
      var S = Math.floor((gap - M * 60) % 60);
      D = D ? D + '일 ' : '';
      H = H ? H + '시간 ' : '';
      M = M ? M + '분 ' : '';
      S = S ? S + '초 ' : '';

      var lefttime = D + H + M + S + predicate;

      this.setState({
        leftString: lefttime
      });

      this.timeout = setTimeout(function () {
        _this2.remain(target);
      }, 1000);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        {
          style: {
            color: this.state.color,
            padding: "15px 0 0 15px",
            minHeight: "50px",
            fontSize: "2.0em",
            backgroundColor: "transparent",
            overflow: "hidden",
            display: "inline-block",
            whiteSpace: "nowrap"
          }
        },
        this.props.title,
        '\xA0',
        this.state.recycle,
        this.state.leftString
      );
    }
  }]);

  return ViewItem;
}(_react.Component);

exports.default = ViewItem;