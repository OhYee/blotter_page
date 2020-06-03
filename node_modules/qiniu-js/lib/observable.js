"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.Observable = exports.Subscriber = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/typeof"));

var _assign = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/assign"));

var _create = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/create"));

var _setPrototypeOf = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/set-prototype-of"));

var __extends = void 0 && (void 0).__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = _setPrototypeOf["default"] || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? (0, _create["default"])(b) : (__.prototype = b.prototype, new __());
  };
}();

var __assign = void 0 && (void 0).__assign || function () {
  __assign = _assign["default"] || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};
/** 表示可清理的资源，比如 Observable 的执行 */


var Subscription =
/** @class */
function () {
  function Subscription() {
    /** 用来标示该 Subscription 是否被取消订阅的标示位 */
    this.closed = false;
  }
  /** 取消 observer 的订阅 */


  Subscription.prototype.unsubscribe = function () {
    if (this.closed) {
      return;
    }

    this.closed = true;

    if (this._unsubscribe) {
      this._unsubscribe();
    }
  };
  /** 添加一个 tear down 在该 Subscription 的 unsubscribe() 期间调用 */


  Subscription.prototype.add = function (teardown) {
    this._unsubscribe = teardown;
  };

  return Subscription;
}();
/**
 * 实现 Observer 接口并且继承 Subscription 类，Observer 是消费 Observable 值的公有 API
 * 所有 Observers 都转化成了 Subscriber，以便提供类似 Subscription 的能力，比如 unsubscribe
*/


var Subscriber =
/** @class */
function (_super) {
  __extends(Subscriber, _super);

  function Subscriber(observerOrNext, error, complete) {
    var _this = _super.call(this) || this;

    _this.isStopped = false;

    if (observerOrNext && (0, _typeof2["default"])(observerOrNext) === 'object') {
      _this.destination = observerOrNext;
    } else {
      _this.destination = __assign(__assign(__assign({}, observerOrNext && {
        next: observerOrNext
      }), error && {
        error: error
      }), complete && {
        complete: complete
      });
    }

    return _this;
  }

  Subscriber.prototype.unsubscribe = function () {
    if (this.closed) {
      return;
    }

    this.isStopped = true;

    _super.prototype.unsubscribe.call(this);
  };

  Subscriber.prototype.next = function (value) {
    if (!this.isStopped && this.destination.next) {
      this.destination.next(value);
    }
  };

  Subscriber.prototype.error = function (err) {
    if (!this.isStopped && this.destination.error) {
      this.isStopped = true;
      this.destination.error(err);
    }
  };

  Subscriber.prototype.complete = function (result) {
    if (!this.isStopped && this.destination.complete) {
      this.isStopped = true;
      this.destination.complete(result);
    }
  };

  return Subscriber;
}(Subscription);

exports.Subscriber = Subscriber;

/** 可观察对象，当前的上传事件的集合 */
var Observable =
/** @class */
function () {
  function Observable(_subscribe) {
    this._subscribe = _subscribe;
  }

  Observable.prototype.subscribe = function (observerOrNext, error, complete) {
    var sink = new Subscriber(observerOrNext, error, complete);
    sink.add(this._subscribe(sink));
    return sink;
  };

  return Observable;
}();

exports.Observable = Observable;