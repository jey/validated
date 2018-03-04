'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AlternativeMessage = exports.Message = undefined;

var _class, _temp;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @copyright 2016-present, Andrey Popp <8mayday@gmail.com>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

exports.message = message;

var _indentString = require('indent-string');

var _indentString2 = _interopRequireDefault(_indentString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NEWLINE = '\n';
var INDENT = '  ';

var Message = exports.Message = function () {
  function Message(message) {
    var children = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    _classCallCheck(this, Message);

    this.message = message;
    this.children = children;
  }

  _createClass(Message, [{
    key: 'toString',
    value: function toString() {
      if (this.message === null) {
        return this.children.map(function (m) {
          return m.toString();
        }).join(NEWLINE);
      } else {
        return [this.message].concat(this.children.map(function (m) {
          return (0, _indentString2.default)(m.toString(), INDENT, 1);
        })).join(NEWLINE);
      }
    }
  }]);

  return Message;
}();

var AlternativeMessage = exports.AlternativeMessage = (_temp = _class = function (_Message) {
  _inherits(AlternativeMessage, _Message);

  function AlternativeMessage(alternatives) {
    _classCallCheck(this, AlternativeMessage);

    var children = [''];
    alternatives.forEach(function (line) {
      children.push(line);
      children.push('');
    });

    var _this = _possibleConstructorReturn(this, (AlternativeMessage.__proto__ || Object.getPrototypeOf(AlternativeMessage)).call(this, AlternativeMessage.DESCRIPTION, children));

    _this.alternatives = alternatives;
    return _this;
  }

  return AlternativeMessage;
}(Message), _class.DESCRIPTION = 'Either:', _temp);
function message(message) {
  var inChildren = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  var children = Array.isArray(inChildren) ? inChildren : [inChildren];
  if (children.length === 1 && message == null) {
    return children[0];
  }
  return new Message(message, children);
}
