import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';

let selectTileCount = 0;

const Tile = ({
  className,
  children,
  type,
  expandableType,
  id,
  href,
  foldContentAbove,
  foldContentBelow,
  ...restProps
}) => {
  let classNames = null;
  const expandableElement = useRef(null);
  const selectableElement = useRef(null);

  const [checked, setChecked] = useState(false);

  const toggle = () => {
    setChecked(!checked);
    if (restProps.onChange) {
      restProps.onChange(!checked);
    }
  };

  const keyDownOnTile = e => {
    const input = expandableElement.current
      ? expandableElement.current.querySelector('input[type="checkbox"]')
      : selectableElement.current.querySelector('input[type="checkbox"]');
    const key = e.which || e.keyCode;
    if (key === 13 || key === 32) {
      e.preventDefault();
      if (input) {
        setChecked(!checked);
      }
      if (restProps.onChange) {
        restProps.onChange(!checked);
      }
    }
  };

  const clickableTile = () => {
    classNames = `${prefix}-tile-clickable ${className}`.trim();
    return (
      <a className={classNames} href={href} tabIndex="0" {...restProps}>
        {children}
      </a>
    );
  };

  const selectableTile = () => {
    selectTileCount += 1;
    classNames = `${prefix}-tile-selectable ${className}`.trim();
    return (
      <div onKeyDown={keyDownOnTile} ref={selectableElement} {...restProps}>
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

  const expandableTile = () => {
    const classNameType = expandableType === 'top' ? 'arrow-top-left' : '';
    classNames = `${prefix}-tile-expandable ${className} ${classNameType}`.trim();
    return (
      <div
        className={classNames}
        tabIndex="0"
        ref={expandableElement}
        {...restProps}
      >
        <input
          id={`${id}`}
          className={`${prefix}-tile-input`}
          type="checkbox"
          onChange={toggle}
          title="tile"
          checked={checked}
        />
        <label
          htmlFor={`${id}`}
          onKeyDown={keyDownOnTile}
          className={`${prefix}-tile-arrow`}
          tabIndex="0"
        >
          <svg width="12" height="7" viewBox="0 0 12 7">
            <path
              fillRule="nonzero"
              d="M6.002 5.55L11.27 0l.726.685L6.003 7 0 .685.726 0z"
            />
          </svg>
        </label>
        <div className={`${prefix}-tile-content`}>
          {foldContentAbove ? foldContentAbove : null}
        </div>
        <div className={`${prefix}-tile-hide`}>
          {foldContentBelow ? foldContentBelow : null}
        </div>
      </div>
    );
  };

  const readableTile = () => {
    classNames = `${prefix}-tile ${className}`.trim();
    return (
      <div className={classNames} {...restProps}>
        {children}
      </div>
    );
  };

  return (
    <>
      {children && type === 'clickable' ? clickableTile() : null}
      {children && type === 'selectable' ? selectableTile() : null}
      {children && type === 'readable' ? readableTile() : null}
      {type === 'expandable' ? expandableTile() : null}
    </>
  );
};

Tile.propTypes = {
  /** Class/clasess will be applied on the parent div of Tile */
  className: PropTypes.string,

  /** Readable: This is for readable Tile. 
  Clickable: This is for clickable Tile. 
  Selectable: This is for selectable Tile. 
  Expandable: This is for expandable Tile.  */
  type: PropTypes.oneOf(['clickable', 'selectable', 'expandable', 'readable']),

  /** expandableType: top or bottom arrow option. */
  expandableType: PropTypes.string,
  /**  Content above expandable tile */
  foldContentAbove: PropTypes.node,
  /**  Content below expandable tile */
  foldContentBelow: PropTypes.node,

  /** For Readable, Clickable & Selectable Tile:  
  Content for tile. */
  children: PropTypes.any,

  /** Unique Identifier for Tile, applicable only for selectable tile.  */
  id: function (props, propName, componentName) {
    if (
      props.hasOwnProperty('type') &&
      props['type'] === 'expandable' &&
      typeof props[propName] === 'undefined'
    ) {
      return new Error(
        `The prop \`${propName}\` is marked as required in \`${componentName}\`, but its value is \`undefined\`.`
      );
    }
  },

  /** Hyperlink refernece which will be activated on click, applicable only for clickable tile.  */
  href: function (props, propName, componentName) {
    if (
      props.hasOwnProperty('type') &&
      props['type'] === 'clickable' &&
      typeof props[propName] === 'undefined'
    ) {
      return new Error(
        `The prop \`${propName}\` is marked as required in \`${componentName}\`, but its value is \`undefined\`.`
      );
    }
  }
};

Tile.defaultProps = {
  className: '',
  type: 'readable',
  expandableType: 'bottom',
  foldContentAbove: null,
  foldContentBelow: null
};

export default Tile;
