"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.upload = upload;

_Object$defineProperty(exports, "compressImage", {
  enumerable: true,
  get: function get() {
    return _compress["default"];
  }
});

_Object$defineProperty(exports, "getHeadersForMkFile", {
  enumerable: true,
  get: function get() {
    return _utils.getHeadersForMkFile;
  }
});

_Object$defineProperty(exports, "getHeadersForChunkUpload", {
  enumerable: true,
  get: function get() {
    return _utils.getHeadersForChunkUpload;
  }
});

_Object$defineProperty(exports, "urlSafeBase64Encode", {
  enumerable: true,
  get: function get() {
    return _base.urlSafeBase64Encode;
  }
});

_Object$defineProperty(exports, "urlSafeBase64Decode", {
  enumerable: true,
  get: function get() {
    return _base.urlSafeBase64Decode;
  }
});

_Object$defineProperty(exports, "deleteUploadedChunks", {
  enumerable: true,
  get: function get() {
    return _api.deleteUploadedChunks;
  }
});

_Object$defineProperty(exports, "getUploadUrl", {
  enumerable: true,
  get: function get() {
    return _api.getUploadUrl;
  }
});

_Object$defineProperty(exports, "imageMogr2", {
  enumerable: true,
  get: function get() {
    return _image.imageMogr2;
  }
});

_Object$defineProperty(exports, "watermark", {
  enumerable: true,
  get: function get() {
    return _image.watermark;
  }
});

_Object$defineProperty(exports, "imageInfo", {
  enumerable: true,
  get: function get() {
    return _image.imageInfo;
  }
});

_Object$defineProperty(exports, "exif", {
  enumerable: true,
  get: function get() {
    return _image.exif;
  }
});

_Object$defineProperty(exports, "pipeline", {
  enumerable: true,
  get: function get() {
    return _image.pipeline;
  }
});

_Object$defineProperty(exports, "region", {
  enumerable: true,
  get: function get() {
    return _config.region;
  }
});

var _statisticsLog = _interopRequireDefault(require("./statisticsLog"));

var _upload = _interopRequireDefault(require("./upload"));

var _observable = require("./observable");

var _compress = _interopRequireDefault(require("./compress"));

var _utils = require("./utils");

var _base = require("./base64");

var _api = require("./api");

var _image = require("./image");

var _config = require("./config");

var statisticsLogger = new _statisticsLog["default"]();
/**
 * @param file 上传文件
 * @param key 目标文件名
 * @param token 上传凭证
 * @param putExtra 上传文件的相关资源信息配置
 * @param config 上传任务的配置
 * @returns 返回用于上传任务的可观察对象
 */

function upload(file, key, token, putExtra, config) {
  var options = {
    file: file,
    key: key,
    token: token,
    putExtra: putExtra,
    config: config
  };
  return new _observable.Observable(function (observer) {
    var manager = (0, _upload["default"])(options, {
      onData: function onData(data) {
        return observer.next(data);
      },
      onError: function onError(err) {
        return observer.error(err);
      },
      onComplete: function onComplete(res) {
        return observer.complete(res);
      }
    }, statisticsLogger);
    manager.putFile();
    return manager.stop.bind(manager);
  });
}