'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _List = require('material-ui/List');

var _IconButton = require('material-ui/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _FloatingActionButton = require('material-ui/FloatingActionButton');

var _FloatingActionButton2 = _interopRequireDefault(_FloatingActionButton);

var _add = require('material-ui/svg-icons/content/add');

var _add2 = _interopRequireDefault(_add);

var _powerSettingsNew = require('material-ui/svg-icons/action/power-settings-new');

var _powerSettingsNew2 = _interopRequireDefault(_powerSettingsNew);

var _visibility = require('material-ui/svg-icons/action/visibility');

var _visibility2 = _interopRequireDefault(_visibility);

var _colors = require('material-ui/styles/colors');

var _Dialog = require('material-ui/Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

var _DatePicker = require('material-ui/DatePicker');

var _DatePicker2 = _interopRequireDefault(_DatePicker);

var _TimePicker = require('material-ui/TimePicker');

var _TimePicker2 = _interopRequireDefault(_TimePicker);

var _FlatButton = require('material-ui/FlatButton');

var _FlatButton2 = _interopRequireDefault(_FlatButton);

var _TextField = require('material-ui/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _RadioButton = require('material-ui/RadioButton');

var _CircularProgress = require('material-ui/CircularProgress');

var _CircularProgress2 = _interopRequireDefault(_CircularProgress);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var logoutStyle = {
  position: 'fixed',
  bottom: '0px',
  margin: '27px',
  right: '0px'
};

var Adder = function (_Component) {
  _inherits(Adder, _Component);

  function Adder(props, children) {
    _classCallCheck(this, Adder);

    var _this = _possibleConstructorReturn(this, (Adder.__proto__ || Object.getPrototypeOf(Adder)).call(this, props));

    var loading = false;
    if (_this.props.ddayList['notload']) {
      loading = true;
    }

    _this.state = {
      loading: loading,
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
    _this.deleteKey = 0;
    return _this;
  }

  _createClass(Adder, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {}
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {}
  }, {
    key: 'handleLogout',
    value: function handleLogout() {
      this.props.onResetState();
      firebase.auth().signOut();
    }
  }, {
    key: 'handleAddClick',
    value: function handleAddClick(self, target) {

      if (Object.keys(this.props.ddayList).length >= 20) {
        this.setState({ alertOpen: "Maxed 20 Items" });
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

      setTimeout(function () {
        document.getElementById("emailField").focus();
      }, 100);
    }
  }, {
    key: 'handleClose',
    value: function handleClose() {
      this.setState({ open: false });
    }
  }, {
    key: 'handleAlertClose',
    value: function handleAlertClose() {
      this.setState({ alertOpen: false });
    }
  }, {
    key: 'delDday',
    value: function delDday() {
      this.props.onDelete(this.deleteKey);
      this.handleAlertClose();
    }
  }, {
    key: 'saveDday',
    value: function saveDday() {

      var save = true;

      if (!this.state.writeTitle) {
        this.setState({ writeTitleRequire: 'Required' });
        save = false;
      } else if (this.state.writeTitle.length > 20) {
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
          type: this.state.writeType
        });
        this.handleClose();
      }
    }
  }, {
    key: 'handleWriteTitle',
    value: function handleWriteTitle(event) {
      this.setState({ writeTitle: event.target.value });
    }
  }, {
    key: 'handleWriteDate',
    value: function handleWriteDate(event, date) {
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      var fullName = year + '-' + month + '-' + day;
      this.setState({ writeDate: fullName });
    }
  }, {
    key: 'handleWriteTime',
    value: function handleWriteTime(event, date) {
      var fullName = date.getHours() + ':' + date.getMinutes();
      this.setState({ writeTime: fullName });
    }
  }, {
    key: 'handleTitleFocus',
    value: function handleTitleFocus() {
      this.setState({ writeTitleRequire: false });
    }
  }, {
    key: 'handleDateFocus',
    value: function handleDateFocus() {
      this.setState({ writeDateRequire: false });
    }
  }, {
    key: 'handleTimeFocus',
    value: function handleTimeFocus() {
      this.setState({ writeTimeRequire: false });
    }
  }, {
    key: 'handleChangeType',
    value: function handleChangeType(event) {
      this.setState({ writeType: event.target.value });
    }
  }, {
    key: 'handleDelete',
    value: function handleDelete(key) {
      this.deleteKey = key;
      this.setState({ alertOpen: "DELETE OK?" });
    }
  }, {
    key: 'handlePowerClick',
    value: function handlePowerClick() {
      //ipcRenderer.send('changeWindow','view');
      this.props.onWindowChange();
    }
  }, {
    key: 'handleWindowClose',
    value: function handleWindowClose() {
      ipcRenderer.send('closeApp', {});
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(props) {
      if (!this.props.ddayList['notload'] && props.ddayList['notload']) {
        //if (!this.props.ddayList['notload']) {
        this.setState({ loading: false });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var actions = [_react2.default.createElement(_FlatButton2.default, {
        label: 'Ok',
        primary: true,
        keyboardFocused: true,
        onTouchTap: this.saveDday.bind(this)
      })];

      var alertActionOk = [_react2.default.createElement(_FlatButton2.default, {
        label: 'Ok',
        primary: true,
        onTouchTap: this.handleAlertClose.bind(this)
      })];

      var alertActions = [_react2.default.createElement(_FlatButton2.default, {
        label: 'Ok',
        primary: true,
        onTouchTap: this.delDday.bind(this)
      }), _react2.default.createElement(_FlatButton2.default, {
        label: 'Cancel',
        primary: true,
        onTouchTap: this.handleAlertClose.bind(this)
      })];

      return _react2.default.createElement(
        'div',
        { className: 'adder' },
        _react2.default.createElement(
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
        ),
        this.state.loading ? _react2.default.createElement(
          'div',
          { style: { margin: 'auto', width: '65px', marginTop: "40%" } },
          _react2.default.createElement(_CircularProgress2.default, { size: 60, thickness: 7 })
        ) : null,
        _react2.default.createElement(
          _List.List,
          {
            style: { padding: '0' }
          },
          !(this.props.ddayList['empty'] || this.props.ddayList['notload']) ? Object.keys(this.props.ddayList).map(function (key, idx) {
            return _react2.default.createElement(_List.ListItem, {
              key: key,
              style: { borderBottom: "1px solid #cdcdcd" },
              primaryText: _this2.props.ddayList[key].title,
              secondaryText: _react2.default.createElement(
                'p',
                null,
                _react2.default.createElement(
                  'span',
                  { style: { color: _colors.darkBlack } },
                  _this2.props.ddayList[key].date,
                  ' ',
                  _this2.props.ddayList[key].time
                ),
                '\xA0- ',
                _this2.props.ddayList[key].type.toUpperCase()
              ),
              rightIconButton: _react2.default.createElement(
                _IconButton2.default,
                {
                  tooltip: 'bottom-left',
                  tooltipPosition: 'bottom-left',
                  onClick: _this2.handleDelete.bind(_this2, key)
                },
                _react2.default.createElement(
                  'i',
                  { className: 'material-icons' },
                  'delete'
                )
              )
            });
          }) : null,
          this.props.ddayList['empty'] ? _react2.default.createElement(
            'div',
            { style: { textAlign: 'center', marginTop: '40%', fontSize: '70px' } },
            'ADD DDAY'
          ) : null
        ),
        !this.state.open ? _react2.default.createElement(
          'div',
          { style: logoutStyle },
          _react2.default.createElement(
            _FloatingActionButton2.default,
            { mini: true, style: { marginLeft: '7px' },
              backgroundColor: 'red',
              onClick: this.handleLogout.bind(this)
            },
            _react2.default.createElement(_powerSettingsNew2.default, null)
          ),
          _react2.default.createElement(
            _FloatingActionButton2.default,
            { mini: true, style: { marginLeft: '7px' },
              backgroundColor: 'black',
              onClick: this.handleAddClick.bind(this, event)
            },
            _react2.default.createElement(_add2.default, null)
          ),
          !(this.props.ddayList['empty'] || this.props.ddayList['notload']) ? _react2.default.createElement(
            _FloatingActionButton2.default,
            { mini: true, style: { marginLeft: '7px' },
              backgroundColor: 'green',
              onClick: this.handlePowerClick.bind(this)
            },
            _react2.default.createElement(_visibility2.default, null)
          ) : null
        ) : null,
        _react2.default.createElement(
          _Dialog2.default,
          {
            title: 'ADD DDAY',
            actions: actions,
            modal: false,
            open: this.state.open,
            onRequestClose: this.handleClose.bind(this)
          },
          'Please enter the dday',
          _react2.default.createElement('br', null),
          _react2.default.createElement(_TextField2.default, {
            id: 'emailField',
            hintText: 'JW BIRTHDAY',
            errorText: this.state.writeTitleRequire,
            onFocus: this.handleTitleFocus.bind(this),
            onChange: this.handleWriteTitle.bind(this)
          }),
          _react2.default.createElement(_DatePicker2.default, {
            hintText: '1984-05-10',
            errorText: this.state.writeDateRequire,
            onFocus: this.handleDateFocus.bind(this),
            onChange: this.handleWriteDate.bind(this)
          }),
          _react2.default.createElement(_TimePicker2.default, {
            hintText: '10:10 am',
            errorText: this.state.writeTimeRequire,
            onFocus: this.handleTimeFocus.bind(this),
            onChange: this.handleWriteTime.bind(this)
          }),
          _react2.default.createElement(
            _RadioButton.RadioButtonGroup,
            {
              name: 'shipSpeed',
              defaultSelected: 'primary',
              onChange: this.handleChangeType.bind(this),
              style: { float: 'left', width: '100%' }
            },
            _react2.default.createElement(_RadioButton.RadioButton, {
              value: 'primary',
              label: '\uAE30\uBCF8',
              style: { marginBottom: 16, float: 'left', width: '40%' }
            }),
            _react2.default.createElement(_RadioButton.RadioButton, {
              value: 'recycle',
              label: '\uD68C\uB144\uACC4\uC0B0',
              style: { marginBottom: 16, float: 'left', width: '40%' }
            })
          )
        ),
        _react2.default.createElement(
          _Dialog2.default,
          {
            actions: this.state.alertOpen == 'DELETE OK?' ? alertActions : alertActionOk,
            modal: false,
            open: this.state.alertOpen ? true : false,
            onRequestClose: this.handleAlertClose.bind(this)
          },
          this.state.alertOpen
        )
      );
    }
  }]);

  return Adder;
}(_react.Component);

exports.default = Adder;