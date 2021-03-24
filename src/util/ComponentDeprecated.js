import React from 'react';
const warned = {};
function ComponentDeprecated(WrappedComponent, msg = '') {
  class InnerComponent extends React.Component {
    componentDidMount() {
      if (process.env.NODE_ENV === 'development') {
        if (!warned[msg]) {
          // eslint-disable-next-line no-console
          console.warn(
            `${getDisplayName(WrappedComponent)} is deprecated`,
            msg
          );
          warned[msg] = true;
        }
      }
    }

    render() {
      // Render the wrapped component with the same props
      return <WrappedComponent {...this.props} />;
    }
  }
  InnerComponent.displayName = `InnerComponent(${getDisplayName(
    WrappedComponent
  )})`;
  return InnerComponent;
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
export default ComponentDeprecated;
