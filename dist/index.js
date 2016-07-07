'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _container = require('./container');

Object.defineProperty(exports, 'container', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_container).default;
  }
});

var _singleton = require('./singleton');

Object.defineProperty(exports, 'singleton', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_singleton).default;
  }
});

var _dependencies = require('./dependencies');

Object.defineProperty(exports, 'dependencies', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_dependencies).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }