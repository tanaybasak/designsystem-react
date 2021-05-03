/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';

let selectTileCount = 0;

const SelectableTile = React.forwardRef((props, ref) => {
  let classNames = null;

  const { className = '', children, onChange, selected, ...restProps } = props;

  const [checked, setChecked] = useState(false);

  const toggle = () => {
    setChecked(!checked);
    onChange(!checked);
  };

  useEffect(() => {
    if (selected) {
      setChecked(selected);
    } else {
      setChecked(selected);
    }
  }, [selected]);

  const keyDownOnTile = e => {
    const key = e.which || e.keyCode;
    if (key === 13 || key === 32) {
      e.preventDefault();
      setChecked(!checked);
      onChange(!checked);
    }
  };

  const selectableTile = () => {
    selectTileCount += 1;
    classNames = `${prefix}-tile-selectable ${className}`.trim();
    return (
      <div onKeyDown={keyDownOnTile} ref={ref} {...restProps}>
        <label
          tabIndex="0"
          aria-checked={checked}
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
  /**  Specifies state of the Selectable Tile */
  selected: PropTypes.bool,
  /** Accepts event handler as prop/argument. */
  onChange: PropTypes.func
};
SelectableTile.defaultProps = {
  className: '',
  selected: false,
  onChange: () => {}
};

SelectableTile.displayName = 'SelectableTile';

export default SelectableTile;
