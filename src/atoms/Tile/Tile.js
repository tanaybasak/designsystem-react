import React from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';

let selectTileCount = 0;

const Tile = ({ className, children, type, id, href, ...restProps }) => {
  let classNames = null;
  const clickableTile = () => {
    classNames = `${prefix}-tile-clickable ${className}`.trim();
    return (
      <div className={classNames} tabIndex="0" {...restProps}>
        <a href={href}>{children}</a>
      </div>
    );
  };

  const selectableTile = () => {
    selectTileCount += 1;
    classNames = `${prefix}-tile-selectable ${className}`.trim();
    return (
      <div {...restProps}>
        <label
          htmlFor={`select-tile-${selectTileCount}`}
          className={classNames}
          tabIndex="0"
        >
          <input
            id={`select-tile-${selectTileCount}`}
            className={`${prefix}-tile-input`}
            type="checkbox"
            title="tile"
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
    classNames = `${prefix}-tile-expandable ${className}`.trim();
    return (
      <div className={classNames} tabIndex="0" {...restProps}>
        <input
          id={`${id}`}
          className={`${prefix}-tile-input`}
          type="checkbox"
          title="tile"
        />
        <label htmlFor={`${id}`} className={`${prefix}-tile-arrow`}>
          <svg width="12" height="7" viewBox="0 0 12 7">
            <path
              fillRule="nonzero"
              d="M6.002 5.55L11.27 0l.726.685L6.003 7 0 .685.726 0z"
            />
          </svg>
        </label>
        <div className={`${prefix}-tile-content`}>{children[0]}</div>
        <div className={`${prefix}-tile-hide`}>{children[1]}</div>
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
      {children
        ? type === 'clickable'
          ? clickableTile()
          : type === 'selectable'
          ? selectableTile()
          : type === 'expandable'
          ? expandableTile()
          : readableTile()
        : null}
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

  /** For Readable, Clickable & Selectable Tile:  
  Content for tile. 
  For Expandable: 
  Two children are input. First will be shown prior expand and second will be shown after expand  */
  children: PropTypes.node.isRequired,

  /** Unique Identifier for Tile, applicable only for selectable tile.  */
  id: function(props, propName, componentName) {
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
  href: function(props, propName, componentName) {
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
  type: 'readable'
};

export default Tile;
