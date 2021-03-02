import React, { useState, useRef } from 'react';
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
const ExpandableTile = React.forwardRef((props, ref) => {
  let classNames = null;
  const expandableElement = useRef(null);

  const combinedExpandableRef = useCombinedRefs(ref, expandableElement);

  const {
    className = '',
    expandableType = 'bottom',
    id,
    foldContentAbove = null,
    foldContentBelow = null,
    onChange,
    ...restProps
  } = props;

  const [checked, setChecked] = useState(false);

  const toggle = () => {
    setChecked(!checked);
    onChange(!checked);
  };

  const keyDownOnTile = e => {
    const input = combinedExpandableRef.current
      ? combinedExpandableRef.current.querySelector('input[type="checkbox"]')
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

  const expandableTile = () => {
    const classNameType = expandableType === 'top' ? 'arrow-top-left' : '';
    classNames = `${prefix}-tile-expandable ${className} ${classNameType}`.trim();
    return (
      <div
        className={classNames}
        tabIndex="0"
        ref={combinedExpandableRef}
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

  return <>{expandableTile()}</>;
});

ExpandableTile.propTypes = {
  /** Class/clasess will be applied on the parent div of Tile */
  className: PropTypes.string,

  /** expandableType: top or bottom arrow option. */
  expandableType: PropTypes.string,
  /**  Content above expandable tile */
  foldContentAbove: PropTypes.node,
  /**  Content below expandable tile */
  foldContentBelow: PropTypes.node,
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
  expandableType: 'bottom',
  foldContentAbove: null,
  foldContentBelow: null,
  onChange: () => {}
};

ExpandableTile.displayName = 'ExpandableTile';

export default ExpandableTile;
