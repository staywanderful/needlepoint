'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _index = require('./index');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var substitutions = new Map();

var MockableContainer = function (_container) {
  _inherits(MockableContainer, _container);

  function MockableContainer() {
    _classCallCheck(this, MockableContainer);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(MockableContainer).apply(this, arguments));
  }

  _createClass(MockableContainer, null, [{
    key: 'substitute',
    value: function substitute(original, replacement) {

      // If any substitutions are made, replace Container's resolve function
      Object.assign(_index.container, {
        resolveSingleInstance: MockableContainer.mockableResolveSingleInstance
      });
      substitutions.set(original, replacement);
    }

    /**
     * Resolve a class into an instance with all of its dependencies injected.
     * @param  {class|string} clazz
     * @return {object}       Resolved instance of the class
     */

  }, {
    key: 'mockableResolveSingleInstance',
    value: function mockableResolveSingleInstance(clazz) {
      // Check and see if there are any dependencies that need to be injected
      var deps = _index.container.resolveAll.apply(_index.container, _toConsumableArray(_get(Object.getPrototypeOf(MockableContainer), 'getDependencies', this).call(this).get(clazz) || []));
      if (substitutions.has(clazz)) {
        var sub = substitutions.get(clazz);
        return new (Function.prototype.bind.apply(sub, [null].concat(_toConsumableArray(deps))))();
      } else {
        // Apply the dependencies and create a new instance of the class
        return new (Function.prototype.bind.apply(clazz, [null].concat(_toConsumableArray(deps))))();
      }
    }
  }, {
    key: 'clear',
    value: function clear() {
      substitutions.clear();
    }
  }]);

  return MockableContainer;
}(_index.container);

exports.default = MockableContainer;