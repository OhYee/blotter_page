'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _APILoader = require('../utils/APILoader');

var _APILoader2 = _interopRequireDefault(_APILoader);

var _isFun = require('../utils/isFun');

var _isFun2 = _interopRequireDefault(_isFun);

var _log = require('../utils/log');

var _log2 = _interopRequireDefault(_log);

var _common = require('../utils/common');

var _withPropsReactive = require('../utils/withPropsReactive');

var _withPropsReactive2 = _interopRequireDefault(_withPropsReactive);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Component = _react2.default.Component;
var Children = _react2.default.Children;
var containerStyle = {
  width: '100%',
  height: '100%'
};
var wrapperStyle = {
  width: '100%',
  height: '100%',
  position: 'relative'

  // Native supported dynamic props by Amap
};var NativeDynamicProps = ['layers', 'zoom', 'center', 'labelzIndex',

// 'lang', native error in JSSDK when 3D viewMode
'mapStyle', 'features', 'cursor', 'pitch'];

/*
 * Props below can set by 'setStatus' altogether
 */
var StatusDynamicProps = ['animateEnable', 'doubleClickZoom', 'dragEnable', 'isHotspot', 'jogEnable', 'keyboardEnable', 'resizeEnable', 'rotateEnable', 'scrollWheel', 'touchZoom', 'zoomEnable'];

var StaticProps = ['view', 'zooms', 'showIndoorMap', 'indoorMap', 'expandZoomRange', 'showBuildingBlock', 'viewMode', 'pitchEnable', 'buildingAnimation', 'skyColor'];

var CreateProps = NativeDynamicProps.concat(StatusDynamicProps, StaticProps);

// const reservedPropName = [
//   'amapkey',
//   'version',
//   'useAMapUI',
//   'onInstanceCreated',
//   'events',
//   'loading',
//   'plugins'
// ]

var defaultOpts = {
  MapType: {
    showRoad: false,
    showTraffic: false,
    defaultType: 0
  },
  ToolBar: {
    position: 'RB',
    noIpLocate: true,
    locate: true,
    liteStyle: true,
    autoPosition: false
  },
  OverView: {},
  ControlBar: {}
};

var BaseMap = function (_Component) {
  _inherits(BaseMap, _Component);

  function BaseMap(props) {
    _classCallCheck(this, BaseMap);

    var _this = _possibleConstructorReturn(this, (BaseMap.__proto__ || Object.getPrototypeOf(BaseMap)).call(this, props));

    _this.state = {
      mapLoaded: false
    };
    var self = _this;
    _this.setterMap = {
      zoom: function zoom(val) {
        self.map.setZoom(val);
      },
      cursor: function cursor(val) {
        self.map.setDefaultCursor(val);
      },
      labelzIndex: function labelzIndex(val) {
        self.map.setlabelzIndex(val);
      }
    };
    _this.converterMap = {
      center: _common.toLnglat
    };
    if (typeof window !== 'undefined') {
      _this.pluginMap = {};
      new _APILoader2.default({
        key: props.amapkey,
        useAMapUI: props.useAMapUI,
        version: props.version,
        protocol: props.protocol
      }).load().then(function () {
        _this.createInstance();
        if (!_this.state.mapLoaded) {
          _this.setState({
            mapLoaded: true
          });
        }
      });
    }
    return _this;
  }

  _createClass(BaseMap, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.state.mapLoaded) {
        this.updateMapProps(this.props, nextProps);
      }
    }
  }, {
    key: 'renderChildren',
    value: function renderChildren() {
      var _this2 = this;

      return Children.map(this.props.children, function (child) {
        if (child) {
          var cType = child.type;
          /* 针对下面两种组件不注入地图相关属性
           * 1. 明确声明不需要注入的
           * 2. DOM 元素
           */
          if (cType.preventAmap || typeof cType === 'string') {
            return child;
          }
          return _react2.default.cloneElement(child, {
            __map__: _this2.map
          });
        }
        return child;
      });
    }
  }, {
    key: 'createInstance',
    value: function createInstance() {
      if (!this.map) {
        var options = this.buildCreateOptions();
        this.map = new window.AMap.Map(this.mapWrapper, options);
        // install map plugins
        this.setPlugins(this.props);
        this.props.onInstanceCreated && this.props.onInstanceCreated();
      }
    }
  }, {
    key: 'buildCreateOptions',
    value: function buildCreateOptions() {
      var _this3 = this;

      var props = this.props;
      var options = {};
      CreateProps.forEach(function (key) {
        if (key in props) {
          options[key] = _this3.getSetterValue(key, props);
        }
      });
      return options;
    }
  }, {
    key: 'updateMapProps',
    value: function updateMapProps(prevProps, nextProps) {
      var _this4 = this;

      var nextMapStatus = {};
      var statusChangeFlag = false;
      var statusPropExist = false;
      StatusDynamicProps.forEach(function (key) {
        if (key in nextProps) {
          statusPropExist = true;
          if (_this4.detectPropChanged(key, prevProps, nextProps)) {
            statusChangeFlag = true;
            nextMapStatus[key] = nextProps[key];
          }
        }
      });
      statusChangeFlag && this.map.setStatus(nextMapStatus);
      if (statusPropExist && 'status' in nextProps) {
        _log2.default.warning('\u4EE5\u4E0B\u8FD9\u4E9B\u5C5E\u6027\u53EF\u4EE5\u5355\u72EC\u63D0\u4F9B\u8FDB\u884C\u914D\u7F6E\uFF0C\u4E5F\u53EF\u4EE5\u7EDF\u4E00\u4F5C\u4E3A\u2018status\u2019\u5C5E\u6027\u914D\u7F6E\uFF1B\u4F46\u662F\u8BF7\u4E0D\u8981\u540C\u65F6\u4F7F\u7528\u8FD9\u4E24\u79CD\u65B9\u5F0F\u3002\n\uFF08' + StatusDynamicProps.join(', ') + '\uFF09');
      }
      StaticProps.forEach(function (key) {
        if (key in nextProps) {
          if (_this4.detectPropChanged(key, prevProps, nextProps)) {
            _log2.default.warning('\'' + key + '\' \u662F\u4E00\u4E2A\u9759\u6001\u5C5E\u6027\uFF0C\u5730\u56FE\u5B9E\u4F8B\u521B\u5EFA\u6210\u529F\u540E\u65E0\u6CD5\u4FEE\u6539');
          }
        }
      });
      this.setPlugins(nextProps);
    }
  }, {
    key: 'getSetterValue',
    value: function getSetterValue(key, props) {
      if (key in this.converterMap) {
        return this.converterMap[key](props[key]);
      }
      return props[key];
    }
  }, {
    key: 'detectPropChanged',
    value: function detectPropChanged(key, prevProps, nextProps) {
      return prevProps[key] !== nextProps[key];
    }
  }, {
    key: 'setPlugins',
    value: function setPlugins(props) {
      var _this5 = this;

      var pluginList = ['Scale', 'ToolBar', 'MapType', 'OverView', 'ControlBar'];
      if ('plugins' in props) {
        var plugins = props.plugins;
        if (plugins && plugins.length) {
          plugins.forEach(function (p) {
            var name = void 0,
                config = void 0,
                visible = void 0;
            if (typeof p === 'string') {
              name = p;
              config = null;
              visible = true;
            } else {
              name = p.name;
              config = p.options || {};
              visible = 'visible' in config && typeof config.visible === 'boolean' ? config.visible : true;
              delete config.visible;
            }
            var idx = pluginList.indexOf(name);
            if (idx === -1) {
              _log2.default.warning('\u6CA1\u6709 \u2018' + name + '\u2019 \u8FD9\u4E2A\u63D2\u4EF6\uFF0C\u8BF7\u68C0\u67E5\u662F\u5426\u62FC\u5199\u9519\u8BEF');
            } else {
              if (visible) {
                pluginList.splice(idx, 1);
                _this5.installPlugin(name, config);
              }
            }
          });
        }
      }
      this.removeOrDisablePlugins(pluginList);
    }
  }, {
    key: 'removeOrDisablePlugins',
    value: function removeOrDisablePlugins(plugins) {
      var _this6 = this;

      if (plugins && plugins.length) {
        plugins.forEach(function (p) {
          if (p in _this6.pluginMap) {
            // ControlBar has no 'hide' method
            if (p === 'ControlBar') {
              _this6.map.removeControl(_this6.pluginMap[p]);
              delete _this6.pluginMap[p];
            } else {
              _this6.pluginMap[p].hide();
            }
          }
        });
      }
    }
  }, {
    key: 'installPlugin',
    value: function installPlugin(name, opts) {
      opts = opts || {};
      switch (name) {
        case 'Scale':
        case 'ToolBar':
        case 'OverView':
        case 'MapType':
          this.setMapPlugin(name, opts);
          break;
        case 'ControlBar':
          this.setControlBar(opts);
          break;
        default:
        // do nothing
      }
    }
  }, {
    key: 'setMapPlugin',
    value: function setMapPlugin(name, opts) {
      var _this7 = this;

      if (this.pluginMap[name]) {
        this.pluginMap[name].show();
      } else {
        var onCreated = opts.onCreated,
            restOpts = _objectWithoutProperties(opts, ['onCreated']);

        var initOpts = _extends({}, defaultOpts[name], restOpts);
        this.map.plugin(['AMap.' + name], function () {
          _this7.pluginMap[name] = new window.AMap[name](initOpts);
          _this7.map.addControl(_this7.pluginMap[name]);
          if ((0, _isFun2.default)(onCreated)) {
            onCreated(_this7.pluginMap[name]);
          }
        });
      }
    }
  }, {
    key: 'setControlBar',
    value: function setControlBar(opts) {
      var _this8 = this;

      if (this.pluginMap.ControlBar) {
        // do nothing
      } else {
        var onCreated = opts.onCreated,
            restOpts = _objectWithoutProperties(opts, ['onCreated']);

        var initOpts = _extends({}, defaultOpts.ControlBar, restOpts);
        this.map.plugin(['AMap.ControlBar'], function () {
          _this8.pluginMap.ControlBar = new window.AMap.ControlBar(initOpts);
          _this8.map.addControl(_this8.pluginMap.ControlBar);
          if ((0, _isFun2.default)(onCreated)) {
            onCreated(_this8.pluginMap.ControlBar);
          }
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this9 = this;

      return _react2.default.createElement(
        'div',
        { style: wrapperStyle },
        _react2.default.createElement(
          'div',
          { ref: function ref(div) {
              _this9.mapWrapper = div;
            }, style: containerStyle },
          this.state.mapLoaded ? null : this.props.loading || null
        ),
        _react2.default.createElement(
          'div',
          null,
          this.state.mapLoaded ? this.renderChildren() : null
        )
      );
    }
  }, {
    key: 'instance',
    get: function get() {
      return this.map;
    }
  }]);

  return BaseMap;
}(Component);

exports.default = (0, _withPropsReactive2.default)(BaseMap);