'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.typeOf = typeOf;
exports.isObject = isObject;
exports.flatten = flatten;
/**
 * @copyright 2016-present, Andrey Popp <8mayday@gmail.com>
 * 
 */

function typeOf(value) {
  if (value === null) {
    return 'null';
  } else if (Array.isArray(value)) {
    return 'array';
  } else {
    return typeof value === 'undefined' ? 'undefined' : _typeof(value);
  }
}

function isObject(obj) {
  return obj != null && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && !Array.isArray(obj);
}

function flatten(array) {
  var result = [];
  for (var i = 0; i < array.length; i++) {
    result = result.concat(array[i]);
  }
  return result;
}
