'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _withPropsReactive = require('../utils/withPropsReactive');

var _withPropsReactive2 = _interopRequireDefault(_withPropsReactive);

var _log = require('../utils/log');

var _log2 = _interopRequireDefault(_log);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MouseTool = function (_React$Component) {
  _inherits(MouseTool, _React$Component);

  function MouseTool(props) {
    _classCallCheck(this, MouseTool);

    var _this = _possibleConstructorReturn(this, (MouseTool.__proto__ || Object.getPrototypeOf(MouseTool)).call(this, props));

    if (typeof window !== 'undefined') {
      if (!props.__map__) {
        _log2.default.warning('MAP_INSTANCE_REQUIRED');
      } else {
        _this.map = props.__map__;
        _this.loadToolInstance().then(function () {
          _this.props.onInstanceCreated && _this.props.onInstanceCreated();
        });
      }
    }
    return _this;
  }

  _createClass(MouseTool, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      return false;
    }
  }, {
    key: 'loadToolInstance',
    value: function loadToolInstance() {
      var _this2 = this;

      return new Promise(function (resolve) {
        _this2.map.plugin(['AMap.MouseTool'], function () {
          _this2.tool = new window.AMap.MouseTool(_this2.map);
          resolve();
        });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }, {
    key: 'instance',
    get: function get() {
      return this.tool;
    }
  }]);

  return MouseTool;
}(_react2.default.Component);

exports.default = (0, _withPropsReactive2.default)(MouseTool);