import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';

function useCombinedRefs(...refs) {
  const targetRef = React.useRef();

  React.useEffect(() => {
    refs.forEach(ref => {
      if (!ref) return;

      if (typeof ref === 'function') {
        ref(targetRef.current);
      } else {
        ref.current = targetRef.current;
      }
    });
  }, [refs]);

  return targetRef;
}

// eslint-disable-next-line react/prop-types
const Tile = React.forwardRef((props, ref) => {
  let classNames = null;
  const readableRef = useRef(null);
  const combinedReadableRef = useCombinedRefs(ref, readableRef);

  const { className = '', children, ...restProps } = props;

  const readableTile = () => {
    classNames = `${prefix}-tile ${className}`.trim();
    return (
      <div ref={combinedReadableRef} className={classNames} {...restProps}>
        {children}
      </div>
    );
  };

  return <>{children && readableTile()}</>;
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
