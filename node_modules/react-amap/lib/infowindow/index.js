'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _withPropsReactive = require('../utils/withPropsReactive');

var _withPropsReactive2 = _interopRequireDefault(_withPropsReactive);

var _log = require('../utils/log');

var _log2 = _interopRequireDefault(_log);

var _common = require('../utils/common');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
 * props
 * {
 *  __map__ 父级组件传过来的地图实例
 * }
 */

var Component = _react2.default.Component;

var configurableProps = ['content', 'position', 'size',
/* 以下属性是本插件的扩展 */
'visible',

/* 这个 setOffset  方法高德并没有明确在文档中列出来，不确定会不会撤销 */
'offset'];

var allProps = configurableProps.concat(['isCustom', 'autoMove', 'closeWhenClickMap', 'showShadow']);

var InfoWindow = function (_Component) {
  _inherits(InfoWindow, _Component);

  function InfoWindow(props) {
    _classCallCheck(this, InfoWindow);

    var _this = _possibleConstructorReturn(this, (InfoWindow.__proto__ || Object.getPrototypeOf(InfoWindow)).call(this, props));

    if (typeof window !== 'undefined') {
      if (!props.__map__) {
        _log2.default.warning('MAP_INSTANCE_REQUIRED');
      } else {
        var self = _this;
        _this.setterMap = {
          visible: function visible(val) {
            if (val) {
              self.showWindow();
              self.setClassName(self.props);
              self.setChild(self.props);
            } else {
              self.closeWindow();
            }
          }
        };
        _this.converterMap = {
          size: _common.toSize,
          offset: _common.toPixel,
          position: _common.toLnglat
        };
        _this.map = props.__map__;
        _this.isCustom = true;
        setTimeout(function () {
          _this.createInfoWindow(props);
        }, 13);
      }
    }
    return _this;
  }

  _createClass(InfoWindow, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      return false;
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.map) {
        this.refreshWindowLayout(nextProps);
      }
    }
  }, {
    key: 'createInfoWindow',
    value: function createInfoWindow(props) {
      var options = this.buildCreateOptions(props);
      this.infoWindow = new window.AMap.InfoWindow(options);
      this.props.onInstanceCreated && this.props.onInstanceCreated();
    }
  }, {
    key: 'refreshWindowLayout',
    value: function refreshWindowLayout(nextProps) {
      this.setChild(nextProps);
      this.setClassName(nextProps);
    }
  }, {
    key: 'checkPropChanged',
    value: function checkPropChanged(key, nextProps) {
      return this.props[key] !== nextProps[key];
    }
  }, {
    key: 'showWindow',
    value: function showWindow() {
      this.infoWindow.open(this.map, this.infoWindow.getPosition());
    }
  }, {
    key: 'closeWindow',
    value: function closeWindow() {
      this.infoWindow.close();
    }
  }, {
    key: 'buildCreateOptions',
    value: function buildCreateOptions(props) {
      var _this2 = this;

      var options = {};

      // 如果开发者没有设置 isCustom 属性，默认设置为 false
      if ('isCustom' in props) {
        options.isCustom = !!props.isCustom;
      } else {
        options.isCustom = false;
      }

      if ('content' in props) {
        options.content = props.content;
      } else {
        this.infoDOM = document.createElement('div');
        options.content = this.infoDOM;
      }

      allProps.forEach(function (key) {
        if (key in props) {
          if (['visible', 'isCustom', 'content'].indexOf(key) === -1) {
            options[key] = _this2.getSetterValue(key, props[key]);
          }
        }
      });
      return options;
    }
  }, {
    key: 'getSetterValue',
    value: function getSetterValue(key, value) {
      if (key in this.converterMap) {
        return this.converterMap[key](value);
      }
      return value;
    }
  }, {
    key: 'setChild',
    value: function setChild(props) {
      var child = props.children;
      if (this.infoDOM && child) {
        (0, _reactDom.render)(_react2.default.createElement(
          'div',
          null,
          child
        ), this.infoDOM);
      } else {
        if (props.children) {
          console.warn('因为你设置 isCustom 为 true，InfoWindow 的 Children 被忽略');
        }
      }
    }
  }, {
    key: 'setClassName',
    value: function setClassName(props) {
      if (this.infoDOM) {
        var baseClsValue = '';
        // 刷新 className
        if ('className' in props && props.className) {
          baseClsValue += props.className;
        } else if (props.isCustom === true) {
          baseClsValue += 'amap_markers_pop_window';
        }
        this.infoDOM.className = baseClsValue;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }, {
    key: 'instance',
    get: function get() {
      return this.infoWindow;
    }
  }]);

  return InfoWindow;
}(Component);

exports.default = (0, _withPropsReactive2.default)(InfoWindow);