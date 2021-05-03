import React from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';

// eslint-disable-next-line react/prop-types
const Tile = React.forwardRef((props, ref) => {
  let classNames = null;

  const { className = '', children, ...restProps } = props;

  classNames = `${prefix}-tile ${className}`.trim();
  return (
    <div ref={ref} className={classNames} {...restProps}>
      {children}
    </div>
  );
});

Tile.propTypes = {
  /** Class/clasess will be applied on the parent div of Tile */
  className: PropTypes.string,

  /** For Readable, Clickable & Selectable Tile:
  Content for tile. */
  children: PropTypes.any,
  /** Accepts event handler as prop/argument. */
  onChange: PropTypes.func
};
Tile.defaultProps = {
  className: '',
  onChange: () => {}
};

Tile.displayName = 'Tile';

export default Tile;
