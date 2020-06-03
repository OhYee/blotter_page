"use strict";

var _utils = require("../utils");

describe('api function test', function () {
  test('createLocalKey', function () {
    expect((0, _utils.createLocalKey)('test', null, 1024)).toMatch('qiniu_js_sdk_upload_file_name_test_size_1024');
    expect((0, _utils.createLocalKey)('test', 'demo', 1024)).toMatch('qiniu_js_sdk_upload_file_name_test_key_demo_size_1024');
  });
});