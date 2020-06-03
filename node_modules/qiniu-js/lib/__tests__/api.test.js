"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _iterator = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/symbol/iterator"));

var _symbol = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/symbol"));

var _promise = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/promise"));

var _api = require("../api");

var _base = require("../upload/base");

var _config = require("../config");

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = _promise["default"]))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = void 0 && (void 0).__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof _symbol["default"] === "function" && (g[_iterator["default"]] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

jest.mock('../utils', function () {
  return {
    request: function request() {
      return _promise["default"].resolve({
        data: {
          up: {
            acc: {
              main: ['mock.qiniu.com']
            }
          }
        }
      });
    },
    getPutPolicy: function getPutPolicy() {
      return {
        ak: 'ak',
        bucket: 'bucket'
      };
    }
  };
});
describe('api function test', function () {
  test('getUploadUrl', function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var config, url, token;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            config = {
              useCdnDomain: true,
              disableStatisticsReport: false,
              retryCount: 3,
              checkByMD5: false,
              uphost: '',
              upprotocol: 'https:',
              forceDirect: false,
              chunkSize: _base.DEFAULT_CHUNK_SIZE,
              concurrentRequestLimit: 3
            };
            token = 'token';
            return [4
            /*yield*/
            , (0, _api.getUploadUrl)(config, token)];

          case 1:
            url = _a.sent();
            expect(url).toBe('https://mock.qiniu.com');
            config.region = _config.region.z0;
            return [4
            /*yield*/
            , (0, _api.getUploadUrl)(config, token)];

          case 2:
            url = _a.sent();
            expect(url).toBe('https://upload.qiniup.com');
            config.upprotocol = 'https:';
            return [4
            /*yield*/
            , (0, _api.getUploadUrl)(config, token)];

          case 3:
            url = _a.sent();
            expect(url).toBe('https://upload.qiniup.com');
            config.upprotocol = 'http:';
            return [4
            /*yield*/
            , (0, _api.getUploadUrl)(config, token)];

          case 4:
            url = _a.sent();
            expect(url).toBe('http://upload.qiniup.com');
            config.uphost = 'qiniu.com';
            return [4
            /*yield*/
            , (0, _api.getUploadUrl)(config, token)];

          case 5:
            url = _a.sent();
            expect(url).toBe('http://qiniu.com');
            return [2
            /*return*/
            ];
        }
      });
    });
  });
});