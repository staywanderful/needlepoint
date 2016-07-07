import Container from './container';

var substitutions = new Map();

export default class MockableContainer extends Container {
    static substitute(original, replacement) {

      // If any substitutions are made, replace Container's resolve function
      Object.assign(Container, {
        resolveSingleInstance: MockableContainer.mockableResolveSingleInstance
      })
      substitutions.set(original, replacement);
    }

    /**
     * Resolve a class into an instance with all of its dependencies injected.
     * @param  {class|string} clazz
     * @return {object}       Resolved instance of the class
     */
    static mockableResolveSingleInstance(clazz) {
        // Check and see if there are any dependencies that need to be injected
        var deps = Container.resolveAll(...(super.getDependencies().get(clazz) || []));
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
