import React from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';

const ClickableTile = React.forwardRef((props, ref) => {
  let classNames = null;

  const { className = '', children, href, ...restProps } = props;

  const clickableTile = () => {
    classNames = `${prefix}-tile-clickable ${className}`.trim();
    return (
      <a
        ref={ref}
        className={classNames}
        href={href}
        tabIndex="0"
        {...restProps}
      >
        {children}
      </a>
    );
  };

  return <>{children && clickableTile()}</>;
});

ClickableTile.propTypes = {
  /** Class/clasess will be applied on the parent div of Tile */
  className: PropTypes.string,

  /** For Readable, Clickable & Selectable Tile:
  Content for tile. */
  children: PropTypes.any,
  /** Accepts event handler as prop/argument. */
  onChange: PropTypes.func,

  /** Hyperlink refernece which will be activated on click, applicable only for clickable tile.  */
  href: function (props, propName, componentName) {
    if (typeof props[propName] === 'undefined') {
      return new Error(
        `The prop \`${propName}\` is marked as required in \`${componentName}\`, but its value is \`undefined\`.`
      );
    }
  }
};
ClickableTile.defaultProps = {
  className: '',
  onChange: () => {}
};

ClickableTile.displayName = 'ClickableTile';

export default ClickableTile;
