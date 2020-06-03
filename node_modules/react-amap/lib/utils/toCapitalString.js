"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var toCapitalString = function toCapitalString(str) {
  return str[0].toUpperCase() + str.slice(1, str.length);
};
exports.default = toCapitalString;