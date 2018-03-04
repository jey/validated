#!/usr/bin/env node
'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
/**
 * @copyright 2016-present, Andrey Popp <8mayday@gmail.com>
 */

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _package = require('../../package.json');

var _package2 = _interopRequireDefault(_package);

var _schema = require('../schema');

var _repr = require('../repr');

var repr = _interopRequireWildcard(_repr);

var _json = require('../json5');

var json5 = _interopRequireWildcard(_json);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var args = _commander2.default.version(_package2.default.version).command('validated <schema> <config>').parse(process.argv);

var _args$args = _slicedToArray(args.args, 2),
    schema = _args$args[0],
    config = _args$args[1];

if (!schema) {
  error('missing <schema> argument');
}

if (!config) {
  error('missing <config> argument');
}

function error(message) {
  console.error('error: ' + message); // eslint-disable-line no-console
  process.exit(1);
}

var schemaSrc = _fs2.default.readFileSync(schema, 'utf8');
var schemaNode = void 0;
try {
  schemaNode = json5.validate(repr.schema, schemaSrc);
} catch (error) {
  if (error instanceof _schema.ValidationError) {
    console.error(error.message); // eslint-disable-line no-console
    console.error('While validating schema "' + schema + '"'); // eslint-disable-line no-console
    process.exit(1);
  } else {
    throw error;
  }
}

(0, _invariant2.default)(schemaNode != null, 'Impossible');

var configSrc = _fs2.default.readFileSync(config, 'utf8');
var configValidated = undefined;
try {
  configValidated = json5.validate(schemaNode, configSrc);
} catch (error) {
  if (error instanceof _schema.ValidationError) {
    console.error(error.message); // eslint-disable-line no-console
    console.error('While validating "' + config + '"'); // eslint-disable-line no-console
    process.exit(1);
  } else {
    throw error;
  }
}

console.log(JSON.stringify(configValidated, null, 2)); // eslint-disable-line no-console
