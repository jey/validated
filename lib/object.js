'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.validate = validate;

var _schema = require('./schema');

var _utils = require('./utils');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright 2016-present, Andrey Popp <8mayday@gmail.com>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Context = function (_ContextBase) {
  _inherits(Context, _ContextBase);

  function Context(value) {
    var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var parent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    _classCallCheck(this, Context);

    var _this = _possibleConstructorReturn(this, (Context.__proto__ || Object.getPrototypeOf(Context)).call(this, message, parent));

    _this.value = value;
    return _this;
  }

  _createClass(Context, [{
    key: 'buildMapping',
    value: function buildMapping(validate) {
      if (!(0, _utils.isObject)(this.value)) {
        throw this.error('Expected a mapping but got ' + (0, _utils.typeOf)(this.value));
      }
      var keys = Object.keys(this.value);
      var value = {};
      for (var i = 0; i < keys.length; i++) {
        var _key = keys[i];
        var valueContext = new Context(this.value[_key], 'While validating value at key "' + _key + '"', this);
        var _keyContext = new Context(_key, 'While validating key "' + _key + '"', this);
        var res = validate(valueContext, _key, _keyContext);
        value[_key] = res.value;
      }
      return { value: value, context: NULL_CONTEXT };
    }
  }, {
    key: 'buildSequence',
    value: function buildSequence(validate) {
      if (!Array.isArray(this.value)) {
        throw this.error('Expected an array but got ' + (0, _utils.typeOf)(this.value));
      }
      var value = [];
      for (var i = 0; i < this.value.length; i++) {
        var _context = new Context(this.value[i], 'While validating value at index ' + i, this);
        var res = validate(_context);
        value[i] = res.value;
      }
      return { value: value, context: NULL_CONTEXT };
    }
  }, {
    key: 'unwrap',
    value: function unwrap(validate) {
      var value = validate(this.value);
      return { value: value, context: NULL_CONTEXT };
    }
  }]);

  return Context;
}(_schema.Context);

var NULL_CONTEXT = new Context(null);

function validate(schema, value) {
  var context = new Context(value);
  return schema.validate(context).value;
}
