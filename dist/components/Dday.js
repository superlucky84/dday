'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Adder = require('./Adder.js');

var _Adder2 = _interopRequireDefault(_Adder);

var _View = require('./View.js');

var _View2 = _interopRequireDefault(_View);

var _TextField = require('material-ui/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _RaisedButton = require('material-ui/RaisedButton');

var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

var _Dialog = require('material-ui/Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

var _FlatButton = require('material-ui/FlatButton');

var _FlatButton2 = _interopRequireDefault(_FlatButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Dday = function (_Component) {
  _inherits(Dday, _Component);

  function Dday(props) {
    _classCallCheck(this, Dday);

    var _this = _possibleConstructorReturn(this, (Dday.__proto__ || Object.getPrototypeOf(Dday)).call(this, props));

    _this.state = {
      windowType: 'add',
      login: true,
      id: '',
      password: '',
      idError: false,
      passwordError: false,
      alertMessage: false,
      ddayList: { 'notload': { title: '', type: '' } }
    };

    _this.database = firebase.database();
    _this.loginChk();

    return _this;
  }

  _createClass(Dday, [{
    key: 'loginChk',
    value: function loginChk() {
      var _this2 = this;

      firebase.auth().onAuthStateChanged(function (user) {
        if (user == null) {
          _this2.setState({ login: false });
        } else if (user.emailVerified == false) {
          firebase.auth().currentUser.sendEmailVerification().then(function () {
            _this2.setState({
              idError: false,
              passwordError: false,
              alertMessage: '가입 확인메일을 보냈습니다.'
            });
            firebase.auth().signOut();
          });
        } else {
          _this2.setState({ login: true, id: user.email });
          _this2.loadList();
        }
      });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {}
  }, {
    key: 'loadList',
    value: function loadList() {
      var _this3 = this;

      this.database.ref('users/' + this.state.id.replace(/\./g, '|') + '/dday').on('value', function (snapshot) {
        if (snapshot.val()) {
          _this3.setState({ ddayList: snapshot.val() });
        } else {
          _this3.setState({ ddayList: { 'empty': { title: '', type: '' } } });
        }
      });
    }
  }, {
    key: 'handelDdayDel',
    value: function handelDdayDel(deleteKey) {
      this.database.ref('users/' + this.state.id.replace(/\./g, '|') + '/dday/' + deleteKey).set(null);
    }
  }, {
    key: 'handelDdaySave',
    value: function handelDdaySave(saveObj) {
      this.database.ref('users/' + this.state.id.replace(/\./g, '|') + '/dday').push(saveObj);
    }
  }, {
    key: 'handleLogin',
    value: function handleLogin() {
      var _this4 = this;

      firebase.auth().signInWithEmailAndPassword(this.state.id, this.state.password).catch(function (error) {
        if (error.code.match(/email|user/)) {
          _this4.setState({ login: false, idError: error.message });
          _this4.errortext = "kkk";
        } else if (error.code.match(/password/)) {
          _this4.setState({ login: false, passwordError: error.message });
        }
      });
    }
  }, {
    key: 'handleJoin',
    value: function handleJoin() {
      var _this5 = this;

      firebase.auth().createUserWithEmailAndPassword(this.state.id, this.state.password).catch(function (error) {
        if (error.code.match(/email|user/)) {
          _this5.setState({ login: false, idError: error.message });
        } else if (error.code.match(/password/)) {
          _this5.setState({ login: false, passwordError: error.message });
        }
      });
    }
  }, {
    key: 'handleWriteId',
    value: function handleWriteId(event) {
      this.setState({ id: event.target.value });
    }
  }, {
    key: 'handleWritePassword',
    value: function handleWritePassword(event) {
      this.setState({ password: event.target.value });
    }
  }, {
    key: 'handleIdFocus',
    value: function handleIdFocus() {
      this.setState({ idError: false });
    }
  }, {
    key: 'handlePasswordFocus',
    value: function handlePasswordFocus() {
      this.setState({ passwordError: false });
    }
  }, {
    key: 'handleAlertClose',
    value: function handleAlertClose() {
      this.setState({ alertMessage: false });
    }
  }, {
    key: 'handleResetState',
    value: function handleResetState() {
      this.setState({
        login: true,
        id: '',
        password: '',
        idError: false,
        passwordError: false,
        alertMessage: false,
        ddayList: { 'notload': { title: '', type: '' } }
      });
    }
  }, {
    key: 'handleWindowChange',
    value: function handleWindowChange() {

      var windowType = 'view';
      if (this.state.windowType == 'view') {
        windowType = 'add';
      }

      this.setState({ windowType: windowType });

      ipcRenderer.send('changeWindow', windowType);
    }
  }, {
    key: 'handleWindowClose',
    value: function handleWindowClose() {
      ipcRenderer.send('closeApp', {});
    }
  }, {
    key: 'render',
    value: function render() {

      var alertActionOk = [_react2.default.createElement(_FlatButton2.default, {
        label: 'Ok',
        primary: true,
        onTouchTap: this.handleAlertClose.bind(this)
      })];

      var DDAY = null;
      if (this.state.login === false) {
        DDAY = _react2.default.createElement(
          'div',
          { id: 'login' },
          _react2.default.createElement(_TextField2.default, {
            style: { width: '100%' },
            hintText: '\uC774\uBA54\uC77C \uC785\uB825',
            floatingLabelText: 'LOGIN ID',
            errorText: this.state.idError,
            onFocus: this.handleIdFocus.bind(this),
            onChange: this.handleWriteId.bind(this) }),
          _react2.default.createElement('br', null),
          _react2.default.createElement(_TextField2.default, {
            style: { width: '100%' },
            hintText: '\uD328\uC2A4\uC6CC\uB4DC\uB97C \uC785\uB825',
            floatingLabelText: 'PASSWORD',
            errorText: this.state.passwordError,
            type: 'password',
            onFocus: this.handlePasswordFocus.bind(this),
            onChange: this.handleWritePassword.bind(this)
          }),
          _react2.default.createElement('br', null),
          _react2.default.createElement('br', null),
          _react2.default.createElement(_RaisedButton2.default, {
            label: '\uD68C\uC6D0\uAC00\uC785', primary: true,
            onClick: this.handleJoin.bind(this)
          }),
          '\xA0\xA0',
          _react2.default.createElement(_RaisedButton2.default, {
            label: '\uB85C\uADF8\uC778', secondary: true,
            onClick: this.handleLogin.bind(this)
          })
        );
      }
      //else if (windowType=='view') {
      else if (this.state.windowType == 'view') {
          DDAY = _react2.default.createElement(_View2.default, {
            className: 'view',
            ddayList: this.state.ddayList,
            onWindowChange: this.handleWindowChange.bind(this)
          });
        } else {
          DDAY = _react2.default.createElement(_Adder2.default, {
            ddayList: this.state.ddayList,
            onDelete: this.handelDdayDel.bind(this),
            onResetState: this.handleResetState.bind(this),
            onSave: this.handelDdaySave.bind(this),
            onWindowChange: this.handleWindowChange.bind(this)
          });
        }

      return _react2.default.createElement(
        'div',
        null,
        this.state.windowType != 'view' ? _react2.default.createElement(
          'div',
          { className: 'header' },
          _react2.default.createElement(
            'span',
            { className: 'title' },
            'JW-DDAY'
          ),
          _react2.default.createElement(
            'span',
            {
              className: 'close',
              onClick: this.handleWindowClose.bind(this)
            },
            'X'
          )
        ) : null,
        DDAY,
        _react2.default.createElement(
          _Dialog2.default,
          {
            actions: alertActionOk,
            modal: false,
            open: this.state.alertMessage ? true : false,
            onRequestClose: this.handleAlertClose.bind(this)
          },
          this.state.alertMessage
        )
      );
    }
  }]);

  return Dday;
}(_react.Component);

exports.default = Dday;