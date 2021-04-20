import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';

// eslint-disable-next-line react/prop-types
const ExpandableTile = React.forwardRef((props, ref) => {
  const {
    className = '',
    expandableType = 'se',
    id,
    foldContentAbove = null,
    foldContentBelow = null,
    expanded,
    onChange,
    toggleArrowOnly,
    ...restProps
  } = props;

  const [checked, setChecked] = useState(false);

  const toggle = () => {
    setChecked(!checked);
    if (onChange) {
      onChange(!checked);
    }
  };

  useEffect(() => {
    if (typeof expanded === 'boolean') {
      setChecked(expanded);
    }
  }, [expanded]);

  const keyDownOnTile = e => {
    const key = e.which || e.keyCode;
    if (key === 13 || key === 32) {
      e.preventDefault();
      setChecked(!checked);
      if (onChange) {
        onChange(!checked);
      }
    }
  };

  const toggleTile = e => {
    e.preventDefault();
    e.stopPropagation();
    setChecked(!checked);
  };

  // const classNameType = expandableType === 'top' ? 'arrow-top-left' : '';
  let classNameType = '';
  if (expandableType === 'nw') {
    classNameType = 'arrow-top-left';
  }
  if (expandableType === 'ne') {
    classNameType = 'arrow-top-right';
  }
  if (expandableType === 'sw') {
    classNameType = 'arrow-bottom-left';
  }
  // classNames = `${prefix}-tile-expandable ${className} ${classNameType}`.trim();
  let classes = [`${prefix}-tile-expandable`];
  if (className) {
    classes.push(className);
  }
  if (classNameType) {
    classes.push(classNameType);
  }
  return (
    <div className={classes.join(' ')} tabIndex="0" ref={ref} {...restProps}>
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
        aria-expanded={checked}
        tabIndex="0"
      >
        <svg width="12" height="7" viewBox="0 0 12 7">
          <path
            fillRule="nonzero"
            d="M6.002 5.55L11.27 0l.726.685L6.003 7 0 .685.726 0z"
          />
        </svg>
      </label>
      <div
        className={`${prefix}-tile-content`}
        onClick={!toggleArrowOnly ? toggleTile.bind(this) : null}
      >
        {foldContentAbove ? foldContentAbove : null}
      </div>
      <div className={`${prefix}-tile-hide`}>
        {foldContentBelow ? foldContentBelow : null}
      </div>
    </div>
  );
});

ExpandableTile.propTypes = {
  /** Class/clasess will be applied on the parent div of Tile */
  className: PropTypes.string,
  /**
   * Placement of the arrow:
   * * ```nw```: Arrow at top left.
   * * ```ne```: Arrow at top right.
   * * ```se```: Arrow at bottom right.
   * * ```sw```: Arrow at bottom left.
   * */
  expandableType: PropTypes.oneOf(['nw', 'ne', 'se', 'sw']),
  /**  Content above expandable tile */
  foldContentAbove: PropTypes.node,
  /**  Content below expandable tile */
  foldContentBelow: PropTypes.node,
  /**  Specifies state of the Expandable Tile */
  expanded: PropTypes.bool,
  /**  Clickability provided only to arrows. Else, top part of Expandable tile can also be clicked. */
  toggleArrowOnly: PropTypes.bool,
  /** Accepts event handler as prop/argument. */
  onChange: PropTypes.func,

  /** Unique Identifier for Tile, applicable only for selectable tile.  */
  id: function (props, propName, componentName) {
    if (typeof props[propName] === 'undefined') {
      return new Error(
        `The prop \`${propName}\` is marked as required in \`${componentName}\`, but its value is \`undefined\`.`
      );
    }
  }
};
ExpandableTile.defaultProps = {
  className: '',
  expandableType: 'se',
  foldContentAbove: null,
  foldContentBelow: null,
  expanded: false,
  toggleArrowOnly: true,
  onChange: null
};

ExpandableTile.displayName = 'ExpandableTile';

export default ExpandableTile;
