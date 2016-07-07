import Container from './container';

var substitutions = new Map();

export default class MockableContainer extends Container {
    static substitute(original, replacement) {
       substitutions.set(original, replacement);
    }


        /**
     * Resolve a single class to an instance, injecting dependencies as needed
     * @param  {class|string} clazz
     * @return {object}       Instance of the class
     */
    static resolve(clazz) {
        clazz = Container.normalizeClass(clazz);

        // If the class being injected is a singleton, handle it separately
        // since instances of it are cached.
        if(super.getSingletons().has(clazz)) {
            return MockableContainer.resolveSingleton(clazz);
        } else {
            return MockableContainer.resolveSingleInstance(clazz);
        }
    }

    /**
     * Resolve the specified classes, injecting dependencies as needed
     * @param  {class|string} ...classes
     * @return {...object}
     */
    static resolveAll(...classes) {
        console.log("MC resolveAll");
        return classes.map(MockableContainer.resolve);
    }

    /**
     * Resolve a class into a singleton instance. This single instance will be
     * used across the entire application.
     * @param  {class|string} clazz
     * @return {object}       Resolved instance of the class as a singleton
     */
    static resolveSingleton(clazz) {
        if(super.getSingletons().get(clazz) === null) {
            super.getSingletons().set(clazz, MockableContainer.resolveSingleInstance(clazz));
        }

        return super.getSingletons().get(clazz);
    }

    /**
     * Resolve a class into an instance with all of its dependencies injected.
     * @param  {class|string} clazz
     * @return {object}       Resolved instance of the class
     */
    static resolveSingleInstance(clazz) {
        console.log("MC Resolving: " + clazz + " type " + typeof(clazz));
        // Check and see if there are any dependencies that need to be injected
        var deps = MockableContainer.resolveAll(...(super.getDependencies().get(clazz) || []));
        if(substitutions.has(clazz)) {
          var sub = substitutions.get(clazz);
          return new sub(...deps);
        } else {
          // Apply the dependencies and create a new instance of the class
          return new clazz(...deps);
        }
    }

    static clear() {
      substitutions.clear();
    }
}