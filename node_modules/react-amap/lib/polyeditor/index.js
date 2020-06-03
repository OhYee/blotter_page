'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _withPropsReactive = require('../utils/withPropsReactive');

var _withPropsReactive2 = _interopRequireDefault(_withPropsReactive);

var _log = require('../utils/log');

var _log2 = _interopRequireDefault(_log);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PolyEditor = function (_React$Component) {
  _inherits(PolyEditor, _React$Component);

  function PolyEditor(props) {
    _classCallCheck(this, PolyEditor);

    var _this = _possibleConstructorReturn(this, (PolyEditor.__proto__ || Object.getPrototypeOf(PolyEditor)).call(this, props));

    if (typeof window !== 'undefined') {
      if (!(props.__map__ && props.__poly__)) {
        _log2.default.warning('MAP_INSTANCE_REQUIRED');
      } else {
        var self = _this;
        _this.setterMap = {
          active: function active(val) {
            self.toggleActive(val);
          }
        };
        _this.map = props.__map__;
        _this.poly = props.__poly__;
        _this.editorActive = false;
        _this.createEditorInstance().then(function () {
          _this.props.onInstanceCreated && _this.props.onInstanceCreated();
        });
      }
    }
    return _this;
  }

  _createClass(PolyEditor, [{
    key: 'toggleActive',
    value: function toggleActive(active) {
      if (active) {
        if (!this.editorActive) {
          this.activeEditor();
        }
      } else {
        if (this.editorActive) {
          this.inactiveEditor();
        }
      }
    }
  }, {
    key: 'activeEditor',
    value: function activeEditor() {
      if (this.polyEditor) {
        this.editorActive = true;
        this.polyEditor.open();
      }
    }
  }, {
    key: 'inactiveEditor',
    value: function inactiveEditor() {
      this.editorActive = false;
      if (this.polyEditor) {
        this.polyEditor.close();
      }
    }
  }, {
    key: 'createEditorInstance',
    value: function createEditorInstance() {
      var _this2 = this;

      if (this.polyEditor) {
        return Promise.resolve(this.polyEditor);
      }
      return new Promise(function (resolve) {
        _this2.map.plugin(['AMap.PolyEditor'], function () {
          _this2.polyEditor = new window.AMap.PolyEditor(_this2.map, _this2.poly);
          resolve(_this2.polyEditor);
        });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }, {
    key: 'instance',
    get: function get() {
      return this.polyEditor;
    }
  }]);

  return PolyEditor;
}(_react2.default.Component);

exports.default = (0, _withPropsReactive2.default)(PolyEditor);