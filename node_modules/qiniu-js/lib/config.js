"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.regionUphostMap = exports.region = void 0;

var _a;
/** 上传区域 */


var region = {
  z0: 'z0',
  z1: 'z1',
  z2: 'z2',
  na0: 'na0',
  as0: 'as0'
};
/** 上传区域对应的 host */

exports.region = region;
var regionUphostMap = (_a = {}, _a[region.z0] = {
  srcUphost: 'up.qiniup.com',
  cdnUphost: 'upload.qiniup.com'
}, _a[region.z1] = {
  srcUphost: 'up-z1.qiniup.com',
  cdnUphost: 'upload-z1.qiniup.com'
}, _a[region.z2] = {
  srcUphost: 'up-z2.qiniup.com',
  cdnUphost: 'upload-z2.qiniup.com'
}, _a[region.na0] = {
  srcUphost: 'up-na0.qiniup.com',
  cdnUphost: 'upload-na0.qiniup.com'
}, _a[region.as0] = {
  srcUphost: 'up-as0.qiniup.com',
  cdnUphost: 'upload-as0.qiniup.com'
}, _a);
exports.regionUphostMap = regionUphostMap;