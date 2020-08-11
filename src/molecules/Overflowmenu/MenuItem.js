import React from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';

const MenuItem = ({
  item,
  onClick,
  disabled,
  danger,
  separator,
  children,
  className,
  ...rest
}) => {
  const classNames = [`${prefix}-overflow-option-btn`];
  if (danger) {
    classNames.push(`${prefix}-overflow-option-dangerbtn`);
  }
  if (disabled) {
    classNames.push(`${prefix}-overflow-option-disablebtn`);
  }
  if (separator) {
    classNames.push(`${prefix}-overflow-separator`);
  }
  if(className){
    classNames.push(className)
  }
  
  return (
    //   {items.map((item, index) => {
    //     const { danger, disabled, separator, link, name, ...rest } = item;
    //     const itemClassNames = [`${prefix}-overflow-option`];
    //     const btnClassNames = [`${prefix}-overflow-option-btn`];

    //     danger && btnClassNames.push(`${prefix}-overflow-option-dangerbtn`);
    //     disabled && btnClassNames.push(`${prefix}-overflow-option-disablebtn`);
    //     separator && btnClassNames.push(`${prefix}-overflow-separator`);

    //     return (
    <li className={`${prefix}-overflow-option`}>
      <button
        className={classNames.join(' ')}
        disabled={disabled}
        onClick={e => {
          if (onClick) {
            onClick(item, e);
          }
        }}
        {...rest}
      >
        {children}
      </button>
    </li>
    //     );
    //   })}
    // </ul>
  );
};

MenuItem.propTypes = {
  item: PropTypes.any,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  danger: PropTypes.bool,
  separator: PropTypes.bool,
  children: PropTypes.any
};

MenuItem.defaultProps = {
  item: {},
  onClick: () => {},
  disabled: false,
  danger: false,
  separator: false,
  children: null
};

export default MenuItem;
