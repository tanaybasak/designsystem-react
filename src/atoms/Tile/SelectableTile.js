import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';

let selectTileCount = 0;

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

const SelectableTile = React.forwardRef((props, ref) => {
  let classNames = null;

  const selectableElement = useRef(null);
  const selectableRef = useCombinedRefs(ref, selectableElement);

  const { className = '', children, onChange, ...restProps } = props;

  const [checked, setChecked] = useState(false);

  const toggle = () => {
    setChecked(!checked);
    onChange(!checked);
  };

  const keyDownOnTile = e => {
    const input = selectableRef.current
      ? selectableRef.current.querySelector('input[type="checkbox"]')
      : null;
    const key = e.which || e.keyCode;
    if (key === 13 || key === 32) {
      e.preventDefault();
      if (input) {
        setChecked(!checked);
      }
      onChange(!checked);
    }
  };

  const selectableTile = () => {
    selectTileCount += 1;
    classNames = `${prefix}-tile-selectable ${className}`.trim();
    return (
      <div onKeyDown={keyDownOnTile} ref={selectableRef} {...restProps}>
        <label
          tabIndex="0"
          className={
            checked ? `${classNames} ${prefix}-tile-active` : `${classNames}`
          }
          htmlFor={`select-tile-${selectTileCount}`}
        >
          <input
            id={`select-tile-${selectTileCount}`}
            className={`${prefix}-tile-input`}
            type="checkbox"
            onChange={toggle}
            title="tile"
            checked={checked}
          />
          <svg
            className={`${prefix}-tile-checkbox`}
            width="16"
            height="16"
            viewBox="0 0 16 16"
          >
            <path
              d="M8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16zm3.646-10.854L6.75 10.043 4.354 7.646l-.708.708 3.104 3.103 5.604-5.603-.708-.708z"
              fillRule="evenodd"
            />
          </svg>
          {children}
        </label>
      </div>
    );
  };

  return <>{children && selectableTile()}</>;
});

SelectableTile.propTypes = {
  /** Class/clasess will be applied on the parent div of Tile */
  className: PropTypes.string,

  /** For Readable, Clickable & Selectable Tile:
  Content for tile. */
  children: PropTypes.any,
  /** Accepts event handler as prop/argument. */
  onChange: PropTypes.func
};
SelectableTile.defaultProps = {
  className: '',
  onChange: () => {}
};

SelectableTile.displayName = 'SelectableTile';

export default SelectableTile;
