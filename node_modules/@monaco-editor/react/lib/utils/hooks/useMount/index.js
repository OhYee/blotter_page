"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var useMount = function useMount(effect) {
  return (0, _react.useEffect)(effect, []);
};

var _default = useMount;
exports.default = _default;