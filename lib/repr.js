'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.schema = undefined;

var _schema = require('./schema');

var schema = exports.schema = (0, _schema.recur)(function (schema) {
  return (0, _schema.oneOf)((0, _schema.constant)('string').andThen(function (_) {
    return _schema.string;
  }), (0, _schema.constant)('number').andThen(function (_) {
    return _schema.number;
  }), (0, _schema.constant)('boolean').andThen(function (_) {
    return _schema.boolean;
  }), (0, _schema.constant)('any').andThen(function (_) {
    return _schema.any;
  }), (0, _schema.object)({
    enumeration: (0, _schema.sequence)(_schema.any)
  }).andThen(function (obj) {
    return (0, _schema.enumeration)(obj.enumeration);
  }), (0, _schema.object)({
    constant: _schema.any
  }).andThen(function (obj) {
    return (0, _schema.constant)(obj.constant);
  }), (0, _schema.object)({
    maybe: schema
  }).andThen(function (obj) {
    return (0, _schema.maybe)(obj.maybe);
  }), (0, _schema.object)({
    mapping: schema
  }).andThen(function (obj) {
    return (0, _schema.mapping)(obj.mapping);
  }), (0, _schema.object)({
    sequence: schema
  }).andThen(function (obj) {
    return (0, _schema.sequence)(obj.sequence);
  }), (0, _schema.object)({
    object: (0, _schema.mapping)(schema),
    defaults: (0, _schema.maybe)(_schema.any)
  }).andThen(function (obj) {
    return (0, _schema.object)(obj.object, obj.defaults);
  }), (0, _schema.object)({
    partialObject: (0, _schema.mapping)(schema),
    defaults: (0, _schema.maybe)(_schema.any)
  }).andThen(function (obj) {
    return (0, _schema.partialObject)(obj.partialObject, obj.defaults);
  }));
}); /**
     * @copyright 2016-present, Andrey Popp <8mayday@gmail.com>
     * 
     */
