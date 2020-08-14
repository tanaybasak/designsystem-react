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
  link,
  ...rest
}) => {
  const classNames = [`${prefix}-overflow-option-item`];
  if (danger) {
    classNames.push(`${prefix}-overflow-option-danger`);
  }
  if (disabled) {
    classNames.push(`${prefix}-overflow-option-disabled`);
  }
  if (separator) {
    classNames.push(`${prefix}-overflow-option-separator`);
  }
  if (className) {
    classNames.push(className);
  }

  return (
    <li className={`${prefix}-overflow-option`}>
      {link ? (
        <a className={classNames.join(' ')} href={link} {...rest}>
          {children}
        </a>
      ) : (
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
      )}
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
  children: PropTypes.any,
  className: PropTypes.string,
  link: PropTypes.string
};

MenuItem.defaultProps = {
  item: {},
  onClick: () => {},
  disabled: false,
  danger: false,
  separator: false,
  children: null,
  className: '',
  link: null
};

export default MenuItem;
