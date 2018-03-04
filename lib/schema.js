'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RecursiveNode = exports.boolean = exports.BooleanNode = exports.number = exports.NumberNode = exports.string = exports.StringNode = exports.oneOf = exports.OneOfNode = exports.EnumerationNode = exports.MaybeNode = exports.SequenceNode = exports.ObjectNode = exports.MappingNode = exports.ConstantNode = exports.any = exports.AnyNode = exports.RefineNode = exports.Node = exports.ValidationError = exports.Context = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Serialization agnostic schema definition language.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @copyright 2016-present, Andrey Popp <8mayday@gmail.com>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

exports.validationError = validationError;
exports.constant = constant;
exports.mapping = mapping;
exports.object = object;
exports.partialObject = partialObject;
exports.arrayOf = arrayOf;
exports.sequence = sequence;
exports.maybe = maybe;
exports.enumeration = enumeration;
exports.recur = recur;

var _message = require('./message');

var _utils = require('./utils');

var _customErrorInstance = require('custom-error-instance');

var _customErrorInstance2 = _interopRequireDefault(_customErrorInstance);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _levenshteinEditDistance = require('levenshtein-edit-distance');

var _levenshteinEditDistance2 = _interopRequireDefault(_levenshteinEditDistance);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Context = exports.Context = function () {
  function Context() {
    var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    _classCallCheck(this, Context);

    this.message = message;
    this.parent = parent;
  }

  _createClass(Context, [{
    key: 'buildMapping',
    value: function buildMapping(_validateValue) {
      throw new Error('not implemented');
    }
  }, {
    key: 'buildSequence',
    value: function buildSequence(_validateValue) {
      throw new Error('not implemented');
    }
  }, {
    key: 'unwrap',
    value: function unwrap(_validate) {
      throw new Error('not implemented');
    }
  }, {
    key: 'buildMessage',
    value: function buildMessage(originalMessage, _contextMessages) {
      return originalMessage;
    }
  }, {
    key: 'error',
    value: function error(inMessage) {
      var context = this;
      var contextMessages = [];
      do {
        if (context.message) {
          contextMessages.push(context.message);
        }
        context = context.parent;
      } while (context);
      var originalMessage = this.buildMessage(inMessage, contextMessages);
      return validationError(originalMessage, contextMessages);
    }
  }]);

  return Context;
}();

var NullContext = function (_Context) {
  _inherits(NullContext, _Context);

  function NullContext() {
    _classCallCheck(this, NullContext);

    return _possibleConstructorReturn(this, (NullContext.__proto__ || Object.getPrototypeOf(NullContext)).apply(this, arguments));
  }

  _createClass(NullContext, [{
    key: 'buildMapping',
    value: function buildMapping(_validateValue) {
      throw this.error('Expected a mapping value but got undefined');
    }
  }, {
    key: 'buildSequence',
    value: function buildSequence(_validateValue) {
      throw this.error('Expected an array value but got undefined');
    }
  }, {
    key: 'unwrap',
    value: function unwrap(validate) {
      var value = validate(undefined);
      return { value: value, context: this };
    }
  }, {
    key: 'buildMessage',
    value: function buildMessage(originalMessage, contextMessages) {
      if (this.parent) {
        return this.parent.buildMessage(originalMessage, contextMessages);
      } else {
        return originalMessage;
      }
    }
  }]);

  return NullContext;
}(Context);

var ValidationError = exports.ValidationError = (0, _customErrorInstance2.default)('ValidationError');

ValidationError.prototype.toString = function () {
  return this.message;
};

ValidationError.prototype.withContext = function () {
  var _contextMessages2;

  var error = validationError(this.originalMessage, (_contextMessages2 = this.contextMessages).concat.apply(_contextMessages2, arguments));
  return error;
};

function validationError(originalMessage, contextMessages) {
  var messages = [originalMessage].concat(contextMessages);
  var message = messages.join('\n');
  return new ValidationError({ message: message, messages: messages, originalMessage: originalMessage, contextMessages: contextMessages });
}

var Node = exports.Node = function () {
  function Node() {
    _classCallCheck(this, Node);
  }

  _createClass(Node, [{
    key: 'validate',
    value: function validate(_context) {
      var message = this.constructor.name + '.validate(context) is not implemented';
      throw new Error(message);
    }
  }, {
    key: 'andThen',
    value: function andThen(refine) {
      var node = new RefineNode(this, refine);
      return node;
    }
  }]);

  return Node;
}();

var RefineNode = exports.RefineNode = function (_Node) {
  _inherits(RefineNode, _Node);

  function RefineNode(validator, refine) {
    _classCallCheck(this, RefineNode);

    var _this2 = _possibleConstructorReturn(this, (RefineNode.__proto__ || Object.getPrototypeOf(RefineNode)).call(this));

    _this2.validator = validator;
    _this2.refine = refine;
    return _this2;
  }

  _createClass(RefineNode, [{
    key: 'validate',
    value: function validate(context) {
      var _validator$validate = this.validator.validate(context),
          value = _validator$validate.value,
          nextContext = _validator$validate.context;

      var nextValue = this.refine(value, context.error.bind(context));
      return { value: nextValue, context: nextContext };
    }
  }]);

  return RefineNode;
}(Node);

var AnyNode = exports.AnyNode = function (_Node2) {
  _inherits(AnyNode, _Node2);

  function AnyNode() {
    _classCallCheck(this, AnyNode);

    return _possibleConstructorReturn(this, (AnyNode.__proto__ || Object.getPrototypeOf(AnyNode)).apply(this, arguments));
  }

  _createClass(AnyNode, [{
    key: 'validate',
    value: function validate(context) {
      return context.unwrap(function (value) {
        if (value == null) {
          var repr = value === null ? 'null' : 'undefined';
          throw context.error('Expected a value but got ' + repr);
        }
        return value;
      });
    }
  }]);

  return AnyNode;
}(Node);

var any = exports.any = new AnyNode();

var ConstantNode = exports.ConstantNode = function (_Node3) {
  _inherits(ConstantNode, _Node3);

  function ConstantNode(value, eq) {
    _classCallCheck(this, ConstantNode);

    var _this4 = _possibleConstructorReturn(this, (ConstantNode.__proto__ || Object.getPrototypeOf(ConstantNode)).call(this));

    _this4.value = value;
    _this4.eq = eq;
    return _this4;
  }

  _createClass(ConstantNode, [{
    key: 'validate',
    value: function validate(context) {
      var _this5 = this;

      return context.unwrap(function (value) {
        if (!_this5.eq(value, _this5.value)) {
          throw context.error('Expected ' + JSON.stringify(_this5.value) + ' but got ' + JSON.stringify(value));
        }
        return value;
      });
    }
  }]);

  return ConstantNode;
}(Node);

function constant(value) {
  var eq = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (v1, v2) {
    return v1 === v2;
  };

  return new ConstantNode(value, eq);
}

var MappingNode = exports.MappingNode = function (_Node4) {
  _inherits(MappingNode, _Node4);

  function MappingNode(valueNode) {
    _classCallCheck(this, MappingNode);

    var _this6 = _possibleConstructorReturn(this, (MappingNode.__proto__ || Object.getPrototypeOf(MappingNode)).call(this));

    _this6.valueNode = valueNode;
    return _this6;
  }

  _createClass(MappingNode, [{
    key: 'validate',
    value: function validate(context) {
      var _this7 = this;

      return context.buildMapping(function (context) {
        return _this7.valueNode.validate(context);
      });
    }
  }]);

  return MappingNode;
}(Node);

function mapping() {
  var valueNode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : any;

  return new MappingNode(valueNode);
}

var ObjectNode = exports.ObjectNode = function (_Node5) {
  _inherits(ObjectNode, _Node5);

  // eslint-disable-line no-undef

  function ObjectNode(values) {
    var defaults = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var options = arguments[2];

    _classCallCheck(this, ObjectNode);

    var _this8 = _possibleConstructorReturn(this, (ObjectNode.__proto__ || Object.getPrototypeOf(ObjectNode)).call(this));

    _this8.values = values;
    _this8.valuesKeys = Object.keys(values);
    _this8.defaults = defaults || {};
    _this8.options = options;
    return _this8;
  }

  _createClass(ObjectNode, [{
    key: 'validate',
    value: function validate(context) {
      var _this9 = this;

      // eslint-disable-line no-undef
      var res = context.buildMapping(function (valueContext, key, keyContext) {
        if (_this9.values[key] == undefined) {
          if (!_this9.options.allowExtra) {
            var suggestion = _this9._guessSuggestion(key);
            if (suggestion) {
              throw keyContext.error('Unexpected key: "' + key + '", did you mean "' + suggestion + '"?');
            } else {
              throw keyContext.error('Unexpected key: "' + key + '"');
            }
          } else {
            return valueContext.unwrap(function (value) {
              return value;
            });
          }
        }
        var value = _this9.values[key].validate(valueContext);
        return value;
      });
      var value = res.value;
      for (var _key in this.values) {
        if (this.values.hasOwnProperty(_key)) {
          if (value[_key] === undefined) {
            if (this.defaults[_key] === undefined) {
              var message = 'While validating missing value for key "' + _key + '"';
              message = context.buildMessage(message, []);
              var nullContext = new NullContext(message, context);

              var _values$_key$validate = this.values[_key].validate(nullContext),
                  missingValue = _values$_key$validate.value;

              if (missingValue !== undefined) {
                value[_key] = missingValue;
              }
            } else {
              value[_key] = this.defaults[_key];
            }
          }
        }
      }
      return _extends({}, res, { value: value });
    }
  }, {
    key: '_compareSuggestions',
    value: function _compareSuggestions(a, b) {
      return a.distance - b.distance;
    }
  }, {
    key: '_guessSuggestion',
    value: function _guessSuggestion(key) {
      var suggestions = this.valuesKeys.map(function (suggestion) {
        return {
          distance: (0, _levenshteinEditDistance2.default)(suggestion, key),
          suggestion: suggestion
        };
      });
      var suggestion = suggestions.sort(this._compareSuggestions)[0];
      if (suggestion.distance === key.length) {
        return null;
      } else {
        return suggestion.suggestion;
      }
    }
  }]);

  return ObjectNode;
}(Node);

function object(values, defaults) {
  // eslint-disable-line no-undef
  return new ObjectNode(values, defaults, { allowExtra: false });
}

function partialObject(values, defaults) {
  // eslint-disable-line no-undef
  return new ObjectNode(values, defaults, { allowExtra: true });
}

var SequenceNode = exports.SequenceNode = function (_Node6) {
  _inherits(SequenceNode, _Node6);

  function SequenceNode() {
    var valueNode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : any;

    _classCallCheck(this, SequenceNode);

    var _this10 = _possibleConstructorReturn(this, (SequenceNode.__proto__ || Object.getPrototypeOf(SequenceNode)).call(this));

    _this10.valueNode = valueNode;
    return _this10;
  }

  _createClass(SequenceNode, [{
    key: 'validate',
    value: function validate(context) {
      var _this11 = this;

      return context.buildSequence(function (context) {
        return _this11.valueNode.validate(context);
      });
    }
  }]);

  return SequenceNode;
}(Node);

function arrayOf() {
  var valueNode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : any;

  return new SequenceNode(valueNode);
}

// Kept for backwards compatibility. Use `arrayOf` instead.
function sequence() {
  var valueNode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : any;

  return new SequenceNode(valueNode);
}

var MaybeNode = exports.MaybeNode = function (_Node7) {
  _inherits(MaybeNode, _Node7);

  function MaybeNode(valueNode) {
    _classCallCheck(this, MaybeNode);

    var _this12 = _possibleConstructorReturn(this, (MaybeNode.__proto__ || Object.getPrototypeOf(MaybeNode)).call(this));

    _this12.valueNode = valueNode;
    return _this12;
  }

  _createClass(MaybeNode, [{
    key: 'validate',
    value: function validate(context) {
      var _this13 = this;

      return context.unwrap(function (value) {
        if (value == null) {
          return value;
        }
        return _this13.valueNode.validate(context).value;
      });
    }
  }]);

  return MaybeNode;
}(Node);

function maybe(valueNode) {
  return new MaybeNode(valueNode);
}

var EnumerationNode = exports.EnumerationNode = function (_Node8) {
  _inherits(EnumerationNode, _Node8);

  function EnumerationNode(values) {
    _classCallCheck(this, EnumerationNode);

    var _this14 = _possibleConstructorReturn(this, (EnumerationNode.__proto__ || Object.getPrototypeOf(EnumerationNode)).call(this));

    _this14.values = values;
    return _this14;
  }

  _createClass(EnumerationNode, [{
    key: 'validate',
    value: function validate(context) {
      var _this15 = this;

      return context.unwrap(function (value) {
        for (var _i = 0; _i < _this15.values.length; _i++) {
          if (value === _this15.values[_i]) {
            return value;
          }
        }
        var expectation = _this15.values.map(function (v) {
          return JSON.stringify(v);
        }).join(', ');
        var repr = JSON.stringify(value);
        throw context.error('Expected value to be one of ' + expectation + ' but got ' + repr);
      });
    }
  }]);

  return EnumerationNode;
}(Node);

function enumeration() {
  for (var _len = arguments.length, values = Array(_len), _key2 = 0; _key2 < _len; _key2++) {
    values[_key2] = arguments[_key2];
  }

  var node = new EnumerationNode(values);
  return node;
}

var OneOfNode = exports.OneOfNode = function (_Node9) {
  _inherits(OneOfNode, _Node9);

  function OneOfNode(nodes) {
    _classCallCheck(this, OneOfNode);

    var _this16 = _possibleConstructorReturn(this, (OneOfNode.__proto__ || Object.getPrototypeOf(OneOfNode)).call(this));

    _this16.nodes = nodes;
    return _this16;
  }

  _createClass(OneOfNode, [{
    key: 'validate',
    value: function validate(context) {
      var errors = [];
      for (var _i2 = 0; _i2 < this.nodes.length; _i2++) {
        try {
          return this.nodes[_i2].validate(context);
        } catch (error) {
          if (error instanceof ValidationError) {
            errors.push(error);
            continue;
          } else {
            throw error;
          }
        }
      }
      (0, _invariant2.default)(errors.length > 0, 'Impossible happened');
      throw optimizeOneOfError(errors);
    }
  }]);

  return OneOfNode;
}(Node);

function oneOf_() {
  for (var _len2 = arguments.length, nodes = Array(_len2), _key3 = 0; _key3 < _len2; _key3++) {
    nodes[_key3] = arguments[_key3];
  }

  if (nodes.length === 1) {
    return nodes[0];
  }
  var node = new OneOfNode(nodes);
  return node;
}

var oneOf = exports.oneOf = oneOf_;

function optimizeOneOfError(errors) {
  var sections = errors.map(function (error) {
    return error.messages;
  });

  sections = sections.map(function (messages) {
    if (messages[0] instanceof _message.AlternativeMessage) {
      return explode(messages[0].alternatives, messages.slice(1));
    } else {
      return [messages];
    }
  });
  sections = (0, _utils.flatten)(sections);

  var maxWeight = Math.max.apply(null, sections.map(function (message) {
    return weightMessage(message);
  }));

  sections = sections.filter(function (message) {
    return weightMessage(message) === maxWeight;
  });

  if (sections.length === 1) {
    return validationError(sections[0][0], sections[0].slice(1));
  }

  sections = sections.map(function (messages) {
    return messages.slice(0).reverse();
  });

  // Collect same lines into a separate section
  var same = [];
  var i = 0;
  while (!sections.every(function (lines) {
    return lines[i] === undefined;
  })) {
    if (sections.every(function (lines) {
      return lines[i] === sections[0][i];
    })) {
      same.unshift(sections[0][i]);
    }
    i++;
  }

  sections = sections.map(function (lines) {
    return (0, _message.message)(null, lines.slice(same.length).reverse());
  });

  // Collect alternatives
  var alternatives = [];
  sections.forEach(function (lines) {
    if (!alternatives.find(function (msg) {
      return sameMessage(msg, lines);
    })) {
      alternatives.push((0, _message.message)(null, lines));
    }
  });

  return validationError(new _message.AlternativeMessage(alternatives), same);
}

function sameMessage(a, b) {
  if (a === b) {
    return true;
  } else if (a instanceof _message.Message) {
    return b instanceof _message.Message && sameMessage(a.message, b.message) && a.children.length === b.children.length && a.children.every(function (child, idx) {
      return sameMessage(child, b.children[idx]);
    });
  }
}

function weightMessage(msg) {
  if (msg instanceof _message.Message) {
    return msg.children.length;
  } else if (Array.isArray(msg)) {
    return msg.length;
  } else {
    return 1;
  }
}

var StringNode = exports.StringNode = function (_Node10) {
  _inherits(StringNode, _Node10);

  function StringNode() {
    _classCallCheck(this, StringNode);

    return _possibleConstructorReturn(this, (StringNode.__proto__ || Object.getPrototypeOf(StringNode)).apply(this, arguments));
  }

  _createClass(StringNode, [{
    key: 'validate',
    value: function validate(context) {
      return context.unwrap(function (value) {
        if (typeof value !== 'string') {
          throw context.error('Expected value of type string but got ' + (0, _utils.typeOf)(value));
        }
        return value;
      });
    }
  }]);

  return StringNode;
}(Node);

var string = exports.string = new StringNode();

var NumberNode = exports.NumberNode = function (_Node11) {
  _inherits(NumberNode, _Node11);

  function NumberNode() {
    _classCallCheck(this, NumberNode);

    return _possibleConstructorReturn(this, (NumberNode.__proto__ || Object.getPrototypeOf(NumberNode)).apply(this, arguments));
  }

  _createClass(NumberNode, [{
    key: 'validate',
    value: function validate(context) {
      return context.unwrap(function (value) {
        if (typeof value !== 'number') {
          throw context.error('Expected value of type number but got ' + (0, _utils.typeOf)(value));
        }
        return value;
      });
    }
  }]);

  return NumberNode;
}(Node);

var number = exports.number = new NumberNode();

var BooleanNode = exports.BooleanNode = function (_Node12) {
  _inherits(BooleanNode, _Node12);

  function BooleanNode() {
    _classCallCheck(this, BooleanNode);

    return _possibleConstructorReturn(this, (BooleanNode.__proto__ || Object.getPrototypeOf(BooleanNode)).apply(this, arguments));
  }

  _createClass(BooleanNode, [{
    key: 'validate',
    value: function validate(context) {
      return context.unwrap(function (value) {
        if (typeof value !== 'boolean') {
          throw context.error('Expected value of type boolean but got ' + (0, _utils.typeOf)(value));
        }
        return value;
      });
    }
  }]);

  return BooleanNode;
}(Node);

var boolean = exports.boolean = new BooleanNode();

var RecursiveNode = exports.RecursiveNode = function (_Node13) {
  _inherits(RecursiveNode, _Node13);

  function RecursiveNode(thunk) {
    _classCallCheck(this, RecursiveNode);

    var _this20 = _possibleConstructorReturn(this, (RecursiveNode.__proto__ || Object.getPrototypeOf(RecursiveNode)).call(this));

    _this20.node = thunk(_this20);
    return _this20;
  }

  _createClass(RecursiveNode, [{
    key: 'validate',
    value: function validate(context) {
      return this.node.validate(context);
    }
  }]);

  return RecursiveNode;
}(Node);

function recur(thunk) {
  return new RecursiveNode(thunk);
}

function explode(variations, rest) {
  var result = [];
  for (var _i3 = 0; _i3 < variations.length; _i3++) {
    result.push([variations[_i3]].concat(rest));
  }
  return result;
}
