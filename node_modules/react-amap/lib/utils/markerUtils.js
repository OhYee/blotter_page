'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderMarkerComponent = exports.getPropValue = exports.MarkerAllProps = exports.MarkerConfigurableProps = undefined;

var _common = require('./common');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _isFun = require('./isFun');

var _isFun2 = _interopRequireDefault(_isFun);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MarkerConfigurableProps = exports.MarkerConfigurableProps = ['position', 'offset', 'icon', 'content', 'draggable', 'visible', 'zIndex', 'angle', 'animation', 'shadow', 'title', 'clickable', 'extData', 'label'];

var MarkerAllProps = exports.MarkerAllProps = MarkerConfigurableProps.concat(['topWhenClick', 'bubble', 'raiseOnDrag', 'cursor', 'autoRotation', 'shape']);

var getPropValue = exports.getPropValue = function getPropValue(key, value) {
  if (MarkerAllProps.indexOf(key) === -1) {
    return null;
  }
  if (key === 'position') {
    return (0, _common.toLnglat)(value);
  } else if (key === 'offset') {
    return (0, _common.toPixel)(value);
  }
  return value;
};

var renderMarkerComponent = exports.renderMarkerComponent = function renderMarkerComponent(component, marker) {
  var child = component;
  if ((0, _isFun2.default)(component)) {
    var extData = marker.getExtData();
    child = component(extData);
  }
  if (child) {
    (0, _reactDom.render)(_react2.default.createElement(
      'div',
      null,
      child
    ), marker.getContent());
  }
};