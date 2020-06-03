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

var _polyeditor = require('../polyeditor');

var _polyeditor2 = _interopRequireDefault(_polyeditor);

var _common = require('../utils/common');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Component = _react2.default.Component;

var configurableProps = ['path', 'extData', 'draggable',

/* 扩展属性*/
'visible', 'style'];

var allProps = configurableProps.concat(['zIndex', 'bubble', 'showDir']);

var Polyline = function (_Component) {
  _inherits(Polyline, _Component);

  function Polyline(props) {
    _classCallCheck(this, Polyline);

    var _this = _possibleConstructorReturn(this, (Polyline.__proto__ || Object.getPrototypeOf(Polyline)).call(this, props));

    if (typeof window !== 'undefined') {
      if (!props.__map__) {
        _log2.default.warning('MAP_INSTANCE_REQUIRED');
      } else {
        var self = _this;
        _this.setterMap = {
          visible: function visible(val) {
            if (val) {
              self.polyline && self.polyline.show();
            } else {
              self.polyline && self.polyline.hide();
            }
          },
          style: function style(val) {
            self.polyline.setOptions(val);
          }
        };
        _this.converterMap = {
          path: function path(val) {
            return self.buildPathValue(val);
          }
        };
        _this.state = {
          loaded: false
        };
        _this.map = props.__map__;
        _this.element = _this.map.getContainer();
        setTimeout(function () {
          _this.createMapPolyline(props);
        }, 13);
      }
    }
    return _this;
  }

  _createClass(Polyline, [{
    key: 'createMapPolyline',
    value: function createMapPolyline(props) {
      var options = this.buildCreateOptions(props);
      options.map = this.map;
      this.polyline = new window.AMap.Polyline(options);
      this.setState({
        loaded: true
      });
      this.props.onInstanceCreated && this.props.onInstanceCreated();
    }
  }, {
    key: 'buildCreateOptions',
    value: function buildCreateOptions(props) {
      var _this2 = this;

      var options = {};
      allProps.forEach(function (key) {
        if (key in props) {
          if (key === 'style' && props.style) {
            var styleItem = Object.keys(props.style);
            styleItem.forEach(function (item) {
              // $FlowFixMe
              options[item] = props.style[item];
            });
            // visible 做特殊处理
          } else if (key !== 'visible') {
            options[key] = _this2.getSetterValue(key, props[key]);
          }
        }
      });
      return options;
    }
  }, {
    key: 'detectPropChanged',
    value: function detectPropChanged(key, nextProps) {
      return this.props[key] !== nextProps[key];
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
    key: 'buildPathValue',
    value: function buildPathValue(path) {
      if (path.length) {
        if ('getLng' in path[0]) {
          return path;
        }
        return path.map(function (p) {
          return (0, _common.toLnglat)(p);
        });
      }
      return path;
    }
  }, {
    key: 'renderEditor',
    value: function renderEditor(children) {
      if (!children) {
        return null;
      }
      if (_react2.default.Children.count(children) !== 1) {
        return null;
      }
      var child = _react2.default.Children.only(children);
      if (child.type === _polyeditor2.default) {
        return _react2.default.cloneElement(child, {
          __poly__: this.polyline,
          __map__: this.map
        });
      }
      return null;
    }
  }, {
    key: 'render',
    value: function render() {
      return this.state.loaded ? this.renderEditor(this.props.children) : null;
    }
  }, {
    key: 'instance',
    get: function get() {
      return this.polyline;
    }
  }]);

  return Polyline;
}(Component);

exports.default = (0, _withPropsReactive2.default)(Polyline);