'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _log = require('../utils/log');

var _log2 = _interopRequireDefault(_log);

var _withPropsReactive = require('../utils/withPropsReactive');

var _withPropsReactive2 = _interopRequireDefault(_withPropsReactive);

var _markerUtils = require('../utils/markerUtils');

var _common = require('../utils/common');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Marker = function (_React$Component) {
  _inherits(Marker, _React$Component);

  function Marker(props) {
    _classCallCheck(this, Marker);

    var _this = _possibleConstructorReturn(this, (Marker.__proto__ || Object.getPrototypeOf(Marker)).call(this, props));

    if (typeof window !== 'undefined') {
      if (!props.__map__) {
        _log2.default.warning('MAP_INSTANCE_REQUIRED');
      } else {
        var self = _this;
        _this.setterMap = {
          visible: function visible(val) {
            if (val) {
              self.marker && self.marker.show();
            } else {
              self.marker && self.marker.hide();
            }
          },
          zIndex: function zIndex(val) {
            self.marker && self.marker.setzIndex(val);
          }
        };
        _this.converterMap = {
          position: _common.toLnglat,
          offset: _common.toPixel
        };
        _this.map = props.__map__;
        _this.element = _this.map.getContainer();
        setTimeout(function () {
          _this.createMarker(props);
        }, 13);
      }
    }
    return _this;
  }

  _createClass(Marker, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      return false;
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.map) {
        this.refreshMarkerLayout(nextProps);
      }
    }
  }, {
    key: 'createMarker',
    value: function createMarker(props) {
      var options = this.buildCreateOptions(props);
      this.marker = new window.AMap.Marker(options);

      this.marker.render = function (marker) {
        return function (component) {
          (0, _markerUtils.renderMarkerComponent)(component, marker);
        };
      }(this.marker);
      this.props.onInstanceCreated && this.props.onInstanceCreated();
      this.setMarkerLayout(props);
      this.setChildComponent(props);
    }

    // 在创建实例时根据传入配置，设置初始化选项

  }, {
    key: 'buildCreateOptions',
    value: function buildCreateOptions(props) {
      var _this2 = this;

      var opts = {};
      _markerUtils.MarkerAllProps.forEach(function (key) {
        if (key in props) {
          opts[key] = _this2.getSetterParam(key, props[key]);
        }
      });
      opts.map = this.map;
      return opts;
    }

    // 初始化标记的外观

  }, {
    key: 'setMarkerLayout',
    value: function setMarkerLayout(props) {
      if ('render' in props || 'children' in props && props.children) {
        this.createContentWrapper();
        if ('className' in props && props.className) {
          // https://github.com/ElemeFE/react-amap/issues/40
          this.contentWrapper.className = props.className;
        }
      }
    }
  }, {
    key: 'createContentWrapper',
    value: function createContentWrapper() {
      this.contentWrapper = document.createElement('div');
      this.marker.setContent(this.contentWrapper);
    }
  }, {
    key: 'setChildComponent',
    value: function setChildComponent(props) {
      if (this.contentWrapper) {
        if ('className' in props && props.className) {
          // https://github.com/ElemeFE/react-amap/issues/40
          this.contentWrapper.className = props.className;
        }
        if ('render' in props) {
          (0, _markerUtils.renderMarkerComponent)(props.render, this.marker);
        } else if ('children' in props) {
          var child = props.children;
          var childType = typeof child === 'undefined' ? 'undefined' : _typeof(child);
          if (childType !== 'undefined' && this.contentWrapper) {
            (0, _reactDom.render)(_react2.default.createElement(
              'div',
              null,
              child
            ), this.contentWrapper);
          }
        }
      }
    }
  }, {
    key: 'refreshMarkerLayout',
    value: function refreshMarkerLayout(nextProps) {
      this.setChildComponent(nextProps);
    }
  }, {
    key: 'getSetterParam',
    value: function getSetterParam(key, val) {
      if (key in this.converterMap) {
        return this.converterMap[key](val);
      }
      return val;
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }, {
    key: 'instance',
    get: function get() {
      return this.marker;
    }
  }]);

  return Marker;
}(_react2.default.Component);

exports.default = (0, _withPropsReactive2.default)(Marker);