'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _log = require('../utils/log');

var _log2 = _interopRequireDefault(_log);

var _isFun = require('../utils/isFun');

var _isFun2 = _interopRequireDefault(_isFun);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CircleEditor = function (_React$Component) {
  _inherits(CircleEditor, _React$Component);

  function CircleEditor(props) {
    _classCallCheck(this, CircleEditor);

    var _this = _possibleConstructorReturn(this, (CircleEditor.__proto__ || Object.getPrototypeOf(CircleEditor)).call(this, props));

    if (typeof window !== 'undefined') {
      if (!(props.__map__ && props.__circle__)) {
        _log2.default.warning('CIRCLE_INSTANCE_REQUIRED');
      } else {
        _this.map = props.__map__;
        _this.element = _this.map.getContainer();
        _this.circle = props.__circle__;
        _this.editorActive = false;
        _this.onPropsUpdate(props);
      }
    }
    return _this;
  }

  _createClass(CircleEditor, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.map) {
        this.onPropsUpdate(nextProps);
      }
    }
  }, {
    key: 'onPropsUpdate',
    value: function onPropsUpdate(props) {
      if ('active' in props && props.active === false) {
        this.toggleActive(false, props);
      } else {
        this.toggleActive(true, props);
      }
    }
  }, {
    key: 'toggleActive',
    value: function toggleActive(active, props) {
      if (active) {
        if (!this.editorActive) {
          this.activeEditor(props);
        }
      } else {
        if (this.editorActive) {
          this.inactiveEditor();
        }
      }
    }
  }, {
    key: 'activeEditor',
    value: function activeEditor(props) {
      var _this2 = this;

      this.loadCircleEditor(props).then(function (editor) {
        _this2.editorActive = true;
        editor.open();
      });
    }
  }, {
    key: 'inactiveEditor',
    value: function inactiveEditor() {
      this.editorActive = false;
      if (this.circleEditor) {
        this.circleEditor.close();
      }
    }
  }, {
    key: 'loadCircleEditor',
    value: function loadCircleEditor(props) {
      var _this3 = this;

      if (this.circleEditor) {
        return Promise.resolve(this.circleEditor);
      }
      return new Promise(function (resolve) {
        _this3.map.plugin(['AMap.CircleEditor'], function () {
          resolve(_this3.createEditorInstance(props));
        });
      });
    }
  }, {
    key: 'createEditorInstance',
    value: function createEditorInstance(props) {
      this.circleEditor = new window.AMap.CircleEditor(this.map, this.circle);
      var events = this.exposeEditorInstance(props);
      events && this.bindEditorEvents(events);
      return this.circleEditor;
    }
  }, {
    key: 'exposeEditorInstance',
    value: function exposeEditorInstance(props) {
      if ('events' in props) {
        var _events = props.events || {};
        if ((0, _isFun2.default)(_events.created)) {
          _events.created(this.circleEditor);
        }
        delete _events.created;
        return _events;
      }
      return false;
    }
  }, {
    key: 'bindEditorEvents',
    value: function bindEditorEvents(events) {
      var _this4 = this;

      var list = Object.keys(events);
      list.length && list.forEach(function (evName) {
        _this4.circleEditor.on(evName, events[evName]);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }]);

  return CircleEditor;
}(_react2.default.Component);

exports.default = CircleEditor;