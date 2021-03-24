const warned = {};
export default function propDeprecated(propType, explanation) {
  return function validate(props, propName, componentName, ...rest) {
    // Note ...rest here
    if (props[propName] != null) {
      const message = `"${propName}" property of "${componentName}" has been deprecated.\n${explanation}`;
      if (!warned[message]) {
        // eslint-disable-next-line no-console
        console.warn(false, message);
        warned[message] = true;
      }
    }

    return propType(props, propName, componentName, ...rest); // and here
  };
}
