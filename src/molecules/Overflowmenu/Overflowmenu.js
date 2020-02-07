import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MenuList from '../../atoms/MenuList';
import prefix from '../../settings';

const Overflowmenu = ({
  className,
  direction,
  ellipsisType,
  onClick,
  ...restProps
}) => {
  const [display, changeDisplay] = useState(false);

  const clickHandler = event => {
    changeDisplay(!display);
    if (onClick) {
      onClick(event);
    }
  };

  const classnames = `${prefix}-overflow-container ${className}`.trim();

  return (
    <section className={classnames} {...restProps}>
      <div
        className={`${prefix}-ellipsis${
          ellipsisType === 'horizontal' ? ' horizontal-ellipsis' : ''
        }`}
        onClick={clickHandler}
      />
      {display && (
        <div
          className={`${prefix}-overflow-menu ${prefix}-overflow-${direction}`}
        >
          <MenuList
            items={restProps.listItems}
            onClick={event => {
              changeDisplay(false);
              onClick(event);
            }}
          />
          <div
            className={`${prefix}-overflow-caret${
              direction === 'left' ? '' : '-right'
            }`}
          />
        </div>
      )}
    </section>
  );
};

Overflowmenu.defaultProps = {
  direction: 'left',
  listItems: null,
  ellipsisType: 'vertical',
  onClick: () => {},
  className: ''
};

Overflowmenu.propTypes = {
  /** Left: To open overflow menu in left direction. 
  Right: To open overflow menu in right direction  */
  direction: PropTypes.oneOf(['left', 'right']),

  /** List of the item and associated actions, which should be part of menu. */
  listItems: PropTypes.array.isRequired,

  /** Horizontal: To make ellipsis horizontal. 
  Vertical: To make ellipsis vertical.  */
  ellipsisType: PropTypes.oneOf(['vertical', 'horizontal']),

  /** Callback function on selecting item*/
  onClick: PropTypes.func.isRequired,

  /** Class/clasess will be applied on the parent div of OverflowMenu */
  className: PropTypes.string
};

export default Overflowmenu;
