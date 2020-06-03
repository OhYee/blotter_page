'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _isFun = require('../utils/isFun');

var _isFun2 = _interopRequireDefault(_isFun);

var _log = require('../utils/log');

var _log2 = _interopRequireDefault(_log);

var _markerUtils = require('../utils/markerUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

if (typeof window !== 'undefined') {
  var styleText = '.amap_markers_pop_window{\n    padding: 10px;\n    border: 1px solid #ddd;\n    border-radius: 8px;\n    background: #fff;\n    position: relative;\n    display: flex;\n    flex-wrap: wrap;\n    justify-content: flex-start;\n}\n.amap_markers_pop_window::before{\n    content: \' \';\n    display: block;\n    position: absolute;\n    bottom: -12px;\n    left: 50%;\n    margin-left: -7px;\n    width: 0;\n    height: 0;\n    border-top: 12px solid #ddd;\n    border-left: 7px solid transparent;\n    border-right: 7px solid transparent;\n}\n.amap_markers_pop_window::after{\n    content: \' \';\n    display: block;\n    position: absolute;\n    bottom: -11px;\n    left: 50%;\n    margin-left: -6px;\n    width: 0;\n    height: 0;\n    border-top: 11px solid #fff;\n    border-left: 6px solid transparent;\n    border-right: 6px solid transparent;\n}\n.amap_markers_pop_window_item{\n    cursor:pointer;\n    width: 40px;\n    height: 50px;\n    display: flex;\n    align-items: flex-end;\n    justify-content: center;\n}\n.amap_markers_pop_window_item span{\n    pointer-events: none;\n}\n.amap_markers_window_overflow_warning{\n    text-align: center;\n    width: 100%;\n    margin: 5px 0;\n    color: #666;\n}';
  var headEl = document.head || document.getElementsByTagName('head')[0];
  var styleEl = document.createElement('style');
  styleEl.type = 'text/css';
  styleEl.textContent = styleText;
  headEl.appendChild(styleEl);
}

var Component = _react2.default.Component;

var SCALE = 0.8;
var SIZE_WIDTH = 32 * SCALE;
var SIZE_HEIGHT = 46 * SCALE - 2;
var SIZE_HOVER_WIDTH = 46 * SCALE;
var SIZE_HOVER_HEIGHT = 66 * SCALE - 2;
var MAX_INFO_MARKERS = 42;

var defaultOpts = {
  useCluster: false,
  markersCache: [],
  markerIDCache: []
};

var ClusterProps = ['gridSize', 'minClusterSize', 'maxZoom', 'averageCenter', 'styles', 'zoomOnClick', 'renderCluserMarker'];

var IdKey = '__react_amap__';

/*
 * props
 * {
 *  useCluster(boolean)是否使用聚合点
 *  markers(array<>)坐标列表
 *  __map__ 父级组件传过来的地图实例
 *  __ele__ 父级组件传过来的地图容器
 * }
 */

var Markers = function (_Component) {
  _inherits(Markers, _Component);

  function Markers(props) {
    _classCallCheck(this, Markers);

    var _this = _possibleConstructorReturn(this, (Markers.__proto__ || Object.getPrototypeOf(Markers)).call(this, props));

    if (typeof window !== 'undefined') {
      if (!props.__map__) {
        _log2.default.warning('MAP_INSTANCE_REQUIRED');
      } else {
        _this.map = props.__map__;
        _this.element = _this.map.getContainer();
        _this.markersCache = defaultOpts.markersCache;
        _this.useCluster = null;
        _this.markerIDCache = defaultOpts.markerIDCache;
        _this.resetOffset = new window.AMap.Pixel(-SIZE_WIDTH / 2, -SIZE_HEIGHT);
        _this.hoverOffset = new window.AMap.Pixel(-SIZE_HOVER_WIDTH / 2, -SIZE_HOVER_HEIGHT);
        _this.createMarkers(props);
      }
    }
    return _this;
  }

  _createClass(Markers, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      return false;
    }
  }, {
    key: 'createMarkers',
    value: function createMarkers(props) {
      var _this2 = this;

      var markers = props.markers || [];

      var mapMarkers = [];
      var markerReactChildDOM = {};
      markers.length && markers.forEach(function (raw, idx) {
        var options = _this2.buildCreateOptions(props, raw, idx);
        options.map = _this2.map;

        var markerContent = null;
        if ((0, _isFun2.default)(props.render)) {
          // $FlowFixMe
          var markerChild = props.render(raw);
          if (markerChild !== false) {
            var div = document.createElement('div');
            div.setAttribute(IdKey, '1');
            markerContent = div;
            markerReactChildDOM[idx] = markerChild;
          }
        }

        if (!markerContent) {
          markerContent = document.createElement('div');
          var img = document.createElement('img');
          img.src = '//webapi.amap.com/theme/v1.3/markers/n/mark_bs.png';
          markerContent.appendChild(img);
        }
        options.content = markerContent;

        var marker = new window.AMap.Marker(options);
        marker.on('click', function (e) {
          _this2.onMarkerClick(e);
        });
        marker.on('mouseover', function (e) {
          _this2.onMarkerHover(e);
        });
        marker.on('mouseout', function (e) {
          _this2.onMarkerHoverOut(e);
        });

        marker.render = function (marker) {
          return function (component) {
            return (0, _markerUtils.renderMarkerComponent)(component, marker);
          };
        }(marker);

        _this2.bindMarkerEvents(marker);
        mapMarkers.push(marker);
      });
      this.markersCache = mapMarkers;
      this.markerReactChildDOM = markerReactChildDOM;
      this.exposeMarkerInstance();

      this.checkClusterSettings(props);
    }
  }, {
    key: 'checkClusterSettings',
    value: function checkClusterSettings(props) {
      var _this3 = this;

      if (props.useCluster) {
        this.loadClusterPlugin(props.useCluster).then(function (cluster) {
          cluster.setMarkers(_this3.markersCache);
        });
      } else {
        if (this.mapCluster) {
          var markers = this.mapCluster.getMarkers();
          this.mapCluster.clearMarkers();
          markers.forEach(function (marker) {
            marker.setMap(_this3.map);
          });
        }
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.map) {
        this.setMarkerChild();
      }
    }
  }, {
    key: 'setMarkerChild',
    value: function setMarkerChild() {
      var _this4 = this;

      Object.keys(this.markerReactChildDOM).forEach(function (idx) {
        var dom = _this4.markersCache[idx].getContent();
        var child = _this4.markerReactChildDOM[idx];
        _this4.renderMarkerChild(dom, child);
      });
    }
  }, {
    key: 'renderMarkerChild',
    value: function renderMarkerChild(dom, child) {
      (0, _reactDom.render)(_react2.default.createElement(
        'div',
        null,
        child
      ), dom);
    }
  }, {
    key: 'buildCreateOptions',
    value: function buildCreateOptions(props, raw, idx) {
      var result = {};
      // 强制用户通过 render 函数来定义外观
      // const disabledKeys = ['label', 'icon', 'content'];
      // 还是不强制好，通过覆盖的方式来(如果有 render，覆盖 content/icon);
      var disabledKeys = ['extData'];
      _markerUtils.MarkerAllProps.forEach(function (key) {
        if (key in raw && disabledKeys.indexOf(key) === -1) {
          result[key] = (0, _markerUtils.getPropValue)(key, raw[key]);
        } else if (key in props) {
          if ((0, _isFun2.default)(props[key])) {
            var tmpValue = props[key].call(null, raw, idx);
            result[key] = (0, _markerUtils.getPropValue)(key, tmpValue);
          } else {
            result[key] = (0, _markerUtils.getPropValue)(key, props[key]);
          }
        }
      });
      result.extData = raw;
      return result;
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.map) {
        this.refreshMarkersLayout(nextProps);
      }
    }
  }, {
    key: 'refreshMarkersLayout',
    value: function refreshMarkersLayout(nextProps) {
      var markerChanged = nextProps.markers !== this.props.markers;
      var clusterChanged = !!this.props.useCluster !== !!nextProps.useCluster;
      if (markerChanged) {
        this.markersCache.length && this.markersCache.forEach(function (marker) {
          if (marker) {
            marker.setMap(null);
            marker = null;
          }
        });
        this.markersCache = defaultOpts.markersCache;
        this.createMarkers(nextProps);
        this.setMarkerChild();
      }
      if (markerChanged || clusterChanged) {
        if (this.markersWindow) {
          this.markersWindow.close();
        }
      }
      if (clusterChanged) {
        this.checkClusterSettings(nextProps);
      }
    }
  }, {
    key: 'loadClusterPlugin',
    value: function loadClusterPlugin(clusterConfig) {
      var _this5 = this;

      if (this.mapCluster) {
        return Promise.resolve(this.mapCluster);
      }
      var config = typeof clusterConfig === 'boolean' ? {} : clusterConfig;
      return new Promise(function (resolve) {
        _this5.map.plugin(['AMap.MarkerClusterer'], function () {
          resolve(_this5.createClusterPlugin(config));
        });
      });
    }
  }, {
    key: 'createClusterPlugin',
    value: function createClusterPlugin(config) {
      var options = {};
      // const style = {
      //   url: clusterIcon,
      //   size: new window.AMap.Size(56, 56),
      //   offset: new window.AMap.Pixel(-28, -28)
      // };
      var defalutOptions = {
        minClusterSize: 2,
        zoomOnClick: false,
        maxZoom: 18,
        gridSize: 60,
        // styles: [style, style, style],
        averageCenter: true
      };

      ClusterProps.forEach(function (key) {
        if (key in config) {
          options[key] = config[key];
        } else {
          options[key] = defalutOptions[key];
        }
      });

      this.mapCluster = new window.AMap.MarkerClusterer(this.map, [], options);
      var events = {};
      if ('events' in config) {
        events = config.events;
        if ('created' in events) {
          events.created(this.mapCluster);
        }
      }
      this.initClusterMarkerWindow();
      this.bindClusterEvent(events);
      return this.mapCluster;
    }
  }, {
    key: 'onMarkerClick',
    value: function onMarkerClick(e) {
      var marker = e.target;
      this.triggerMarkerClick(e, marker);
    }
  }, {
    key: 'onMarkerHover',
    value: function onMarkerHover(e) {
      e.target.setTop(true);
      this.setMarkerHovered(e, e.target);
    }
  }, {
    key: 'onMarkerHoverOut',
    value: function onMarkerHoverOut(e) {
      e.target.setTop(false);
      this.setMarkerHoverOut(e, e.target);
    }
  }, {
    key: 'onWindowMarkerClick',
    value: function onWindowMarkerClick(element) {
      var marker = element.markerRef;
      this.triggerMarkerClick(null, marker);
    }
  }, {
    key: 'onWindowMarkerHover',
    value: function onWindowMarkerHover(element) {
      var marker = element.markerRef;
      this.setMarkerHovered(null, marker);
    }
  }, {
    key: 'onWindowMarkerHoverOut',
    value: function onWindowMarkerHoverOut(element) {
      var marker = element.markerRef;
      this.setMarkerHoverOut(null, marker);
    }
  }, {
    key: 'setMarkerHovered',
    value: function setMarkerHovered(e, marker) {
      this.triggerMarkerHover(e, marker);
    }
  }, {
    key: 'setMarkerHoverOut',
    value: function setMarkerHoverOut(e, marker) {
      this.triggerMarkerHoverOut(e, marker);
    }
  }, {
    key: 'triggerMarkerClick',
    value: function triggerMarkerClick(e, marker) {
      // const raw = marker.getExtData();
      var events = this.props.events || {};
      if ((0, _isFun2.default)(events.click)) {
        events.click(e, marker);
      }
    }
  }, {
    key: 'triggerMarkerHover',
    value: function triggerMarkerHover(e, marker) {
      // const raw = marker.getExtData();
      var events = this.props.events || {};
      if ((0, _isFun2.default)(events.mouseover)) {
        events.mouseover(e, marker);
      }
    }
  }, {
    key: 'triggerMarkerHoverOut',
    value: function triggerMarkerHoverOut(e, marker) {
      // const raw = marker.getExtData();
      var events = this.props.events || {};
      if ((0, _isFun2.default)(events.mouseout)) {
        events.mouseout(e, marker);
      }
    }
  }, {
    key: 'initClusterMarkerWindow',
    value: function initClusterMarkerWindow() {
      this.markersWindow = new window.AMap.InfoWindow({
        isCustom: true,
        autoMove: true,
        closeWhenClickMap: true,
        content: '<span>loading...</span>',
        showShadow: false,
        offset: new window.AMap.Pixel(0, -20)
      });
      this.markersDOM = document.createElement('div');
      this.markersDOM.className = 'amap_markers_pop_window';
      this.markersWindow.setContent(this.markersDOM);
    }
  }, {
    key: 'bindClusterEvent',
    value: function bindClusterEvent(events) {
      var _this6 = this;

      this.mapCluster.on('click', function (e) {
        if (_this6.props.useCluster && _this6.props.useCluster.zoomOnClick) {
          //
        } else {
          var returnValue = true;
          if ((0, _isFun2.default)(events.click)) {
            returnValue = events.click(e);
          }
          if (returnValue !== false) {
            _this6.showMarkersInfoWindow(e);
          }
        }
      });
    }
  }, {
    key: 'showMarkersInfoWindow',
    value: function showMarkersInfoWindow(e) {
      var _this7 = this;

      var pos = e.lnglat;
      var markers = e.markers;
      this.markersDOM.innerHTML = '';
      if (markers && markers.length) {
        var length = markers.length;
        if (length > MAX_INFO_MARKERS) {
          markers = markers.slice(0, MAX_INFO_MARKERS);
        }
        markers.forEach(function (m) {
          var contentDOM = m.getContent();
          var itemDOM = document.createElement('div');
          itemDOM.className = 'window_marker_item';
          itemDOM.appendChild(contentDOM);
          itemDOM.markerRef = m;
          itemDOM.addEventListener('click', _this7.onWindowMarkerClick.bind(_this7, itemDOM), true);
          itemDOM.addEventListener('mouseover', _this7.onWindowMarkerHover.bind(_this7, itemDOM), true);
          itemDOM.addEventListener('mouseout', _this7.onWindowMarkerHoverOut.bind(_this7, itemDOM), true);

          _this7.markersDOM.appendChild(itemDOM);
        });
        if (length > MAX_INFO_MARKERS) {
          var warning = document.createElement('div');
          warning.className = 'amap_markers_window_overflow_warning';
          warning.innerText = '更多坐标请放大地图查看';
          this.markersDOM.appendChild(warning);
        }
      }
      this.markersWindow.open(this.map, pos);
    }
  }, {
    key: 'exposeMarkerInstance',
    value: function exposeMarkerInstance() {
      if ('events' in this.props) {
        var events = this.props.events || {};
        if ((0, _isFun2.default)(events.created)) {
          events.created(this.markersCache);
        }
      }
    }
  }, {
    key: 'bindMarkerEvents',
    value: function bindMarkerEvents(marker) {
      var events = this.props.events || {};
      var list = Object.keys(events);
      var preserveEv = ['click', 'mouseover', 'mouseout', 'created'];
      list.length && list.forEach(function (evName) {
        if (preserveEv.indexOf(evName) === -1) {
          marker.on(evName, events[evName]);
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }]);

  return Markers;
}(Component);

exports.default = Markers;