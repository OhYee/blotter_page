"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = void 0;

var _values = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/values"));

var _utils = require("./utils");

var StatisticsLogger =
/** @class */
function () {
  function StatisticsLogger() {}

  StatisticsLogger.prototype.log = function (info, token) {
    var logString = (0, _values["default"])(info).join(',');
    this.send(logString, token, 0);
  };

  StatisticsLogger.prototype.send = function (logString, token, retryCount) {
    var _this = this;

    var xhr = (0, _utils.createXHR)();
    xhr.open('POST', 'https://uplog.qbox.me/log/3');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Authorization', 'UpToken ' + token);

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status !== 200 && ++retryCount <= 3) {
        _this.send(logString, token, retryCount);
      }
    };

    xhr.send(logString);
  };

  return StatisticsLogger;
}();

var _default = StatisticsLogger;
exports["default"] = _default;