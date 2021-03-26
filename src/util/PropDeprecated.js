const warned = {};
export default function PropDeprecated(propType, explanation) {
  return function validate(props, propName, componentName, ...rest) {
    if (props[propName] != null) {
      const message = `"${propName}" property of "${componentName}" has been deprecated.\n`;
      if (!warned[message]) {
        // eslint-disable-next-line no-console
        console.warn(message, explanation);
        warned[message] = true;
      }
    }

    return propType(props, propName, componentName, ...rest);
  };
}
