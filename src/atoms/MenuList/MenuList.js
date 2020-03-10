import React from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';

const MenuList = ({ items, onClick: onClickGlobal }) => {
  return (
    <ul className={`${prefix}-overflow-list`}>
      {items.map((item, index) => {
        const {
          onClick,
          danger,
          disabled,
          separator,
          link,
          name,
          ...rest
        } = item;
        const itemClassNames = [`${prefix}-overflow-option`];
        const btnClassNames = [`${prefix}-overflow-option-btn`];

        danger && btnClassNames.push(`${prefix}-overflow-option-dangerbtn`);
        disabled && btnClassNames.push(`${prefix}-overflow-option-disablebtn`);
        separator && btnClassNames.push(`${prefix}-overflow-separator`);

        return (
          <li
            className={itemClassNames}
            data-name={name}
            {...rest}
            key={`menulist-${name}-${index}`}
          >
            <button
              className={btnClassNames.join(' ')}
              data-name={name}
              disabled={disabled}
              onClick={event => {
                onClickGlobal(event);
                if (onClick) onClick(event);
              }}
              {...rest}
            >
              {link ? (
                <a tabIndex="-1" href={link} title={name}>
                  {name}
                </a>
              ) : (
                name
              )}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

MenuList.propTypes = {
  items: PropTypes.array.isRequired,
  onClick: PropTypes.func
};

MenuList.defaultProps = {
  items: [],
  onClick: () => {}
};

export default MenuList;
