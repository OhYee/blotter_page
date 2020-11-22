module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../ssr-module-cache.js');
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ({

/***/ 3:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("D4/9");


/***/ }),

/***/ "4Q3z":
/***/ (function(module, exports) {

module.exports = require("next/router");

/***/ }),

/***/ "D4/9":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("F5FC");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("xnum");
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("4Q3z");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components_card__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("bTPZ");
/* harmony import */ var _utils_redirect__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("lqEU");
/* harmony import */ var _utils_global__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("dSKx");
/* harmony import */ var _styles_text_module_scss__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("s0TQ");
/* harmony import */ var _styles_text_module_scss__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_styles_text_module_scss__WEBPACK_IMPORTED_MODULE_7__);



function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }









class ErrorPage extends react__WEBPACK_IMPORTED_MODULE_1__["Component"] {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "context", void 0);
  }

  static async getInitialProps(args) {
    const {
      res
    } = args;
    return {
      status: res.statusCode
    };
  }

  render() {
    const path = Object(_utils_redirect__WEBPACK_IMPORTED_MODULE_5__[/* guessPath */ "a"])(this.props.router.asPath);
    const errorMessage = {
      403: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("span", {
        children: "\u4F60\u8BBF\u95EE\u4E86\u6CA1\u6709\u6743\u9650\u7684\u9875\u9762"
      }),
      404: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("span", {
        children: "\u627E\u4E0D\u5230\u9875\u9762\uFF0C\u5927\u6982\u662F\u91CD\u6784\u4FEE\u6539\u4E86\u90E8\u5206\u9875\u9762\u7684\u94FE\u63A5\uFF0C\u8BF7\u5C1D\u8BD5\u6839\u636E\u6807\u7B7E\u6216\u8005\u641C\u7D22\u529F\u80FD\u627E\u5230\u5BF9\u5E94\u7684\u5185\u5BB9"
      }),
      500: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("span", {
        children: ["\u670D\u52A1\u5668\u70B8\u4E86\uFF1F", /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("a", {
          href: `mailto://${this.context.email}`,
          children: "\u8054\u7CFB\u6211"
        }), "\u6765\u4FEE\u590D\u5427"]
      }),
      501: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("span", {
        children: ["\u6CA1\u6709\u627E\u5230\u5BF9\u5E94\u7684\u63A5\u53E3\uFF0C\u6B63\u5E38\u800C\u8A00\uFF0C\u6B63\u5E38\u6D4F\u89C8\u4E0D\u4F1A\u9047\u5230\u8FD9\u4E2A\u9519\u8BEF\u3002\u5982\u679C\u60F3\u8981\u83B7\u53D6\u535A\u5BA2\u76F8\u5173\u63A5\u53E3\uFF0C\u53EF\u4EE5\u67E5\u770B", /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("a", {
          href: "https://github.com/OhYee/blotter",
          children: "\u5F00\u6E90\u9879\u76EE"
        })]
      }),
      502: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("span", {
        children: ["\u7F51\u5173\u9519\u8BEF\uFF0C\u5927\u6982\u662F\u540E\u7AEF\u670D\u52A1\u5668\u70B8\u4E86\u3002 ", /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("a", {
          href: `mailto://${this.context.email}`,
          children: "\u8054\u7CFB\u6211"
        }), "\u6765\u4FEE\u590D\u5427"]
      })
    };
    return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])(_components_card__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"], {
      neumorphism: true,
      children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_utils_global__WEBPACK_IMPORTED_MODULE_6__[/* Context */ "a"].Consumer, {
        children: context => /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(next_head__WEBPACK_IMPORTED_MODULE_2___default.a, {
          children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("title", {
            children: `发生一个${this.props.status}错误！|${this.context.blog_name}`
          })
        })
      }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("h1", {
        className: _styles_text_module_scss__WEBPACK_IMPORTED_MODULE_7___default.a.color,
        style: {
          display: 'inline-block',
          marginRight: 10
        },
        children: `发生一个${this.props.status}错误！`
      }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("p", {
        className: _styles_text_module_scss__WEBPACK_IMPORTED_MODULE_7___default.a.secondary,
        style: {
          display: 'inline-block'
        },
        children: errorMessage[this.props.status]
      }), this.props.status == 404 && path !== '' ? /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("strong", {
        children: ["\u5F53\u524D\u60A8\u8BBF\u95EE\u7684\u9875\u9762\u662F", this.props.router.asPath, "\uFF0C\u731C\u6D4B\u5F97\u51FA\u4F60\u5B9E\u9645\u8981\u8BBF\u95EE\u5F97\u8FDE\u63A5\u662F", /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("a", {
          href: path,
          children: path
        }), "\uFF08\u7EAF\u7CB9\u731C\u6D4B\uFF09"]
      }) : null, /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("p", {
        style: {
          lineHeight: '2em'
        },
        children: ["\u4E00\u822C\u800C\u8A00\uFF0C\u6240\u6709\u53D1\u751F\u9519\u8BEF\u53EF\u80FD\u7684\u60C5\u51B5\u5982\u4E0B\uFF1A", /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("ul", {
          children: Object.keys(errorMessage).map(status => /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("li", {
            children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("strong", {
              children: [status, "\u9519\u8BEF"]
            }), ",", errorMessage[status]]
          }, status))
        })]
      })]
    });
  }

}

_defineProperty(ErrorPage, "contextType", _utils_global__WEBPACK_IMPORTED_MODULE_6__[/* Context */ "a"]);

/* harmony default export */ __webpack_exports__["default"] = (Object(next_router__WEBPACK_IMPORTED_MODULE_3__["withRouter"])(ErrorPage));

/***/ }),

/***/ "EyMQ":
/***/ (function(module, exports) {

// Exports
module.exports = {
	"card": "card_card__15tjc",
	"main": "card_main__3mURI"
};


/***/ }),

/***/ "F5FC":
/***/ (function(module, exports) {

module.exports = require("react/jsx-runtime");

/***/ }),

/***/ "Hh1h":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return concat; });
function concat(...classList) {
  return classList.filter(s => !!s).join(' ');
}

/***/ }),

/***/ "bTPZ":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("F5FC");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_container__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("pJr+");
/* harmony import */ var _utils_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("Hh1h");
/* harmony import */ var _card_module_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("EyMQ");
/* harmony import */ var _card_module_scss__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_card_module_scss__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _styles_shadow_module_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("tyXD");
/* harmony import */ var _styles_shadow_module_scss__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_styles_shadow_module_scss__WEBPACK_IMPORTED_MODULE_5__);



function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }







function Card(props, ref) {
  const {
    shadow = false,
    neumorphism = false,
    neumorphismInset = false,
    cover,
    className,
    style,
    children,
    mainStyle
  } = props,
        restProps = _objectWithoutProperties(props, ["shadow", "neumorphism", "neumorphismInset", "cover", "className", "style", "children", "mainStyle"]);

  var classList = [_card_module_scss__WEBPACK_IMPORTED_MODULE_4___default.a.card, className];
  if (shadow) classList.push(_styles_shadow_module_scss__WEBPACK_IMPORTED_MODULE_5___default.a.shadow);
  if (neumorphism) classList.push(_styles_shadow_module_scss__WEBPACK_IMPORTED_MODULE_5___default.a.neumorphism);
  if (neumorphismInset) classList.push(_styles_shadow_module_scss__WEBPACK_IMPORTED_MODULE_5___default.a.neumorphism_inset);
  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("div", _objectSpread(_objectSpread({}, restProps), {}, {
    ref: ref,
    className: Object(_utils_component__WEBPACK_IMPORTED_MODULE_3__[/* concat */ "a"])(...classList),
    style: style,
    children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])(_components_container__WEBPACK_IMPORTED_MODULE_2__[/* Flex */ "a"], {
      direction: "TB",
      fullWidth: true,
      children: [cover, /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("div", {
        className: _card_module_scss__WEBPACK_IMPORTED_MODULE_4___default.a.main,
        style: mainStyle,
        children: children
      })]
    })
  }));
}

/* harmony default export */ __webpack_exports__["a"] = (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.forwardRef(Card));

/***/ }),

/***/ "cDcd":
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "dSKx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return defaultContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Context; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return getTimeTheme; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const defaultContext = {
  callback: () => {},
  menus: [],
  beian: '',
  view: 0,
  blog_name: 'blotter',
  email: '',
  qq: '',
  github: '',
  //   token: '',
  friends: [],
  big_screen: false,
  theme: 'default',
  grey: false,
  root: '',
  author: '',
  avatar: '',
  from: '',
  head: '',
  ad_show: '',
  ad_inner: '',
  ad_text: '',
  user: {
    id: '000000000000000000000000',
    username: '',
    password: '',
    avatar: '',
    token: '',
    email: '',
    qq: '',
    ns_id: '',
    ns_name: '',
    ac_name: '',
    ac_island: '',
    permission: 0,
    existed: false,
    qq_connected: false,
    github_connected: false,
    self: false
  }
};
const Context = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createContext(defaultContext);
function getTimeTheme() {
  const hour = new Date().getHours();
  return hour >= 19 || hour < 7 ? 'dark' : 'default';
}

/***/ }),

/***/ "lqEU":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return guessPath; });
var hasPrefix = (s, prefix) => {
  const l = prefix.length;
  return s.length >= l && s.slice(0, l) === prefix;
};

var hasSuffix = (s, suffix) => {
  const l = s.length;
  const l2 = suffix.length;
  return l >= l2 && s.slice(l - l2) === suffix;
};

const guessPath = pathname => {
  var path = '';

  if (hasPrefix(pathname, '/post/')) {
    var url = pathname.slice(6).toLocaleLowerCase().replace(/\//g, '_');
    url = hasSuffix(url, '.html') ? url.slice(0, url.length - 5) : url;
    url = hasSuffix(url, '_') ? url.slice(0, url.length - 1) : url;
    path = `/post/${url}`;
  }

  if (hasPrefix(pathname, '/tag/')) {
    var url = pathname.slice(5).toLocaleLowerCase().replace(/\//g, '_');
    url = hasSuffix(url, '.html') ? url.slice(0, url.length - 5) : url;
    url = hasSuffix(url, '_') ? url.slice(0, url.length - 1) : url;
    path = `/tag/${url}`;
  }

  if (path == pathname) {
    path = '';
  }

  return path;
};

/***/ }),

/***/ "pJr+":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* binding */ Flex; });

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__("F5FC");

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__("cDcd");
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);

// CONCATENATED MODULE: ./utils/object.ts
function ObjectFilter(obj, callback) {
  var ret = {};

  for (var key in obj) {
    const value = obj[key];

    if (callback(key, value)) {
      ret[key] = value;
    }
  }

  return ret;
}
// CONCATENATED MODULE: ./components/container.tsx


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }




function getSize(size) {
  return size === 'large' ? 20 : size === 'middle' ? 10 : size === 'small' ? 5 : size === 'none' ? 0 : size;
}

const FlexComponent = (props, ref) => {
  const {
    direction = 'LR',
    wrap = true,
    mainSize = 'middle',
    subSize = 0,
    mainAxis = 'space-between',
    subAxis = 'center',
    itemStyle = {},
    fullWidth = false,
    children,
    style
  } = props,
        restProps = _objectWithoutProperties(props, ["direction", "wrap", "mainSize", "subSize", "mainAxis", "subAxis", "itemStyle", "fullWidth", "children", "style"]);

  const list = (Array.isArray(children) ? children : [children]).filter(s => !!s);
  const dir = direction === 'LR' ? 'row' : direction === 'TB' ? 'column' : direction;
  const mSize = getSize(mainSize);
  const sSize = getSize(subSize); // 容器样式

  const containerStyles = {
    display: 'flex',
    flexDirection: dir,
    flexWrap: wrap === true ? 'wrap' : wrap === false ? 'nowrap' : wrap,
    justifyContent: mainAxis,
    alignItems: subAxis
  }; // 元素样式 - 计算每个元素之间的边距

  var defaultStyle = {};
  var specialStyle = {};
  var after = 'marginRight';
  var before = 'marginLeft';
  var subAxis1 = 'marginTop';
  var subAxis2 = 'marginBottom';
  const specialPos = mainAxis === 'space-around' ? dir === 'row' || dir === 'column' ? 0 : list.length - 1 : dir === 'row' || dir === 'column' ? list.length - 1 : 0;

  switch (dir) {
    case 'row':
      {
        after = 'marginRight';
        before = 'marginLeft';
        subAxis1 = 'marginTop';
        subAxis2 = 'marginBottom';
        break;
      }

    case 'column':
      {
        after = 'marginBottom';
        before = 'marginTop';
        subAxis1 = 'marginLeft';
        subAxis2 = 'marginRight';
        break;
      }

    case 'row-reverse':
      {
        after = 'marginLeft';
        before = 'marginRight';
        subAxis1 = 'marginTop';
        subAxis2 = 'marginBottom';
        break;
      }

    case 'column-reverse':
      {
        after = 'marginTop';
        before = 'marginBottom';
        subAxis1 = 'marginLeft';
        subAxis2 = 'marginRight';
        break;
      }
  }

  if (mainAxis === 'space-around') {
    defaultStyle = {
      [after]: mSize,
      [subAxis1]: sSize,
      [subAxis2]: sSize
    };
    specialStyle = {
      [after]: mSize,
      [before]: mSize,
      [subAxis1]: sSize,
      [subAxis2]: sSize
    };
  } else {
    defaultStyle = {
      [after]: mSize,
      [subAxis2]: sSize
    };
    specialStyle = {
      [subAxis2]: sSize
    };
  } // 删除为 0 的值


  defaultStyle = ObjectFilter(defaultStyle, (_, value) => value != 0);
  specialStyle = ObjectFilter(specialStyle, (_, value) => value != 0);
  return /*#__PURE__*/Object(jsx_runtime_["jsx"])("div", _objectSpread(_objectSpread({
    ref: ref,
    style: _objectSpread(_objectSpread(_objectSpread({}, fullWidth ? {
      width: '100%'
    } : {}), containerStyles), style)
  }, restProps), {}, {
    children: list.map((child, idx) => /*#__PURE__*/Object(jsx_runtime_["jsx"])(FlexItem, {
      style: _objectSpread(_objectSpread(_objectSpread({}, fullWidth ? {
        width: '100%'
      } : {}), idx === specialPos ? specialStyle : defaultStyle), itemStyle),
      children: child
    }, idx))
  }));
};

const FlexItem = props => {
  var {
    style = {},
    className = '',
    children
  } = props,
      restProps = _objectWithoutProperties(props, ["style", "className", "children"]);

  var child = children;
  if (!!!child) return null;
  const key = child.key;

  if (!Array.isArray(child) && !!child.type && !!child.type.name && child.type.displayName === FlexItem.displayName) {
    const _ref = child.props,
          {
      style: style2,
      className: className2,
      children: child2
    } = _ref,
          restProps2 = _objectWithoutProperties(_ref, ["style", "className", "children"]);

    style = _objectSpread(_objectSpread({}, style), style2);
    className = [className, className2].filter(s => s != '').join(' ');
    child = child2;
    restProps = _objectSpread(_objectSpread({}, restProps), restProps2);
  }

  return /*#__PURE__*/Object(jsx_runtime_["jsx"])("div", _objectSpread(_objectSpread({
    style: style,
    className: className
  }, restProps), {}, {
    children: child
  }), key);
};

FlexItem.displayName = 'FlexItem';
const Flex = Object.assign( /*#__PURE__*/external_react_default.a.forwardRef(FlexComponent), {
  Item: FlexItem
});

/***/ }),

/***/ "s0TQ":
/***/ (function(module, exports) {

// Exports
module.exports = {
	"color": "text_color__2A4_3",
	"primary": "text_primary__37eNP",
	"secondary": "text_secondary__2icKR",
	"ellipsis": "text_ellipsis__3pMbC",
	"em75": "text_em75__1_s6d"
};


/***/ }),

/***/ "tyXD":
/***/ (function(module, exports) {

// Exports
module.exports = {
	"shadow": "shadow_shadow__PE22E",
	"clickable": "shadow_clickable__2SFEP",
	"neumorphism": "shadow_neumorphism__1Zl60",
	"shadow_light": "shadow_shadow_light__olbE2",
	"neumorphism_light": "shadow_neumorphism_light__3Vo3U",
	"neumorphism_inset": "shadow_neumorphism_inset__3_9tK"
};


/***/ }),

/***/ "xnum":
/***/ (function(module, exports) {

module.exports = require("next/head");

/***/ })

/******/ });