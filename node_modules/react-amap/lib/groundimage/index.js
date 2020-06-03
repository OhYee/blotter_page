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

/*
 * props
 * {
 *  __map__ 父级组件传过来的地图实例
 * }
 */
var defaultOpts = {
  clickable: false,
  opacity: 1,
  visible: true
};

var GroundImage = function (_React$Component) {
  _inherits(GroundImage, _React$Component);

  function GroundImage(props) {
    _classCallCheck(this, GroundImage);

    var _this = _possibleConstructorReturn(this, (GroundImage.__proto__ || Object.getPrototypeOf(GroundImage)).call(this, props));

    if (typeof window !== 'undefined') {
      if (!props.__map__) {
        _log2.default.warning('MAP_INSTANCE_REQUIRED');
      } else {
        var self = _this;
        _this.setterMap = {
          visible: function visible(val) {
            if (val) {
              self.image && self.image.show();
            } else {
              self.image && self.image.hide();
            }
          },
          src: function src(val) {
            self.image.setImageUrl(val);
          }
        };
        _this.converterMap = {
          bounds: function bounds(val) {
            return self.buildBounds(val);
          }
        };
        _this.map = props.__map__;
        _this.element = _this.map.getContainer();
        setTimeout(function () {
          _this.createGroundImage(props);
        }, 13);
      }
    }
    return _this;
  }

  _createClass(GroundImage, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      return false;
    }
  }, {
    key: 'checkPropsChanged',
    value: function checkPropsChanged(nextProps, key) {
      return this.props[key] !== nextProps[key];
    }
  }, {
    key: 'createGroundImage',
    value: function createGroundImage(props) {
      var src = void 0,
          bounds = void 0,
          opacity = void 0,
          clickable = void 0;
      if ('src' in props) {
        src = props.src;
      } else {
        _log2.default.warning('SRC_REQUIRED', true);
      }
      if ('bounds' in props) {
        bounds = this.buildBounds(props.bounds);
      } else {
        _log2.default.warning('BOUNDS_REQUIRED', true);
      }

      if ('clickable' in props) {
        clickable = props.clickable;
      } else {
        clickable = defaultOpts.clickable;
      }
      if ('opacity' in props) {
        opacity = props.opacity;
      } else {
        opacity = defaultOpts.opacity;
      }
      this.image = new window.AMap.GroundImage(src, bounds, {
        map: this.map,
        clickable: clickable,
        opacity: opacity
      });
      this.props.onInstanceCreated && this.props.onInstanceCreated();
    }
  }, {
    key: 'buildBounds',
    value: function buildBounds(rawBounds) {
      if (!rawBounds) {
        return rawBounds;
      }
      if ('getSouthWest' in rawBounds) {
        return rawBounds;
      }
      var bounds = new window.AMap.Bounds(new window.AMap.LngLat(rawBounds.sw.longitude, rawBounds.sw.latitude), new window.AMap.LngLat(rawBounds.ne.longitude, rawBounds.ne.latitude));
      return bounds;
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }, {
    key: 'instance',
    get: function get() {
      return this.image;
    }
  }]);

  return GroundImage;
}(_react2.default.Component);

exports.default = (0, _withPropsReactive2.default)(GroundImage);