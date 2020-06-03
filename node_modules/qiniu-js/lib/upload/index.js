"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime-corejs2/helpers/interopRequireWildcard");

var _Object$keys = require("@babel/runtime-corejs2/core-js/object/keys");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

var _exportNames = {};
exports["default"] = createUploadManager;

var _resume = _interopRequireWildcard(require("./resume"));

_Object$keys(_resume).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;

  _Object$defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _resume[key];
    }
  });
});

var _direct = _interopRequireDefault(require("./direct"));

var _utils = require("../utils");

var _base = require("./base");

_Object$keys(_base).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;

  _Object$defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _base[key];
    }
  });
});

function createUploadManager(options, handlers, statisticsLogger) {
  if (options.config && options.config.forceDirect) {
    return new _direct["default"](options, handlers, statisticsLogger);
  }

  return options.file.size > 4 * _utils.MB ? new _resume["default"](options, handlers, statisticsLogger) : new _direct["default"](options, handlers, statisticsLogger);
}