'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _container = require('./container');

var _container2 = _interopRequireDefault(_container);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var substitutions = new Map();

var MockableContainer = function (_Container) {
    _inherits(MockableContainer, _Container);

    function MockableContainer() {
        _classCallCheck(this, MockableContainer);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(MockableContainer).apply(this, arguments));
    }

    _createClass(MockableContainer, null, [{
        key: 'substitute',
        value: function substitute(original, replacement) {
            substitutions.set(original, replacement);
        }

        /**
        * Resolve a single class to an instance, injecting dependencies as needed
        * @param  {class|string} clazz
        * @return {object}       Instance of the class
        */

    }, {
        key: 'resolve',
        value: function resolve(clazz) {
            clazz = _container2.default.normalizeClass(clazz);

            // If the class being injected is a singleton, handle it separately
            // since instances of it are cached.
            if (_get(Object.getPrototypeOf(MockableContainer), 'getSingletons', this).call(this).has(clazz)) {
                return _get(Object.getPrototypeOf(MockableContainer), 'resolveSingleton', this).call(this, clazz);
            } else {
                return MockableContainer.resolveSingleInstance(clazz);
            }
        }

        /**
         * Resolve the specified classes, injecting dependencies as needed
         * @param  {class|string} ...classes
         * @return {...object}
         */

    }, {
        key: 'resolveAll',
        value: function resolveAll() {
            for (var _len = arguments.length, classes = Array(_len), _key = 0; _key < _len; _key++) {
                classes[_key] = arguments[_key];
            }

            return classes.map(MockableContainer.resolve);
        }

        /**
         * Resolve a class into an instance with all of its dependencies injected.
         * @param  {class|string} clazz
         * @return {object}       Resolved instance of the class
         */

    }, {
        key: 'resolveSingleInstance',
        value: function resolveSingleInstance(clazz) {
            // Check and see if there are any dependencies that need to be injected
            var deps = MockableContainer.resolveAll.apply(MockableContainer, _toConsumableArray(_get(Object.getPrototypeOf(MockableContainer), 'getDependencies', this).call(this).get(clazz) || []));
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
}(_container2.default);

exports.default = MockableContainer;