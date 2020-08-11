import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';

const SubMenuItem = ({ items, onSelect, children, ...rest }) => {
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
        className={`${prefix}-overflow-option-btn`}
        {...rest}
        style={{ height: '32px' }}
      >
        {children}
      </button>
    </li>
    //     );
    //   })}
    // </ul>
  );
};

SubMenuItem.propTypes = {
  items: PropTypes.array.isRequired,
  onSelect: PropTypes.func
};

SubMenuItem.defaultProps = {
  items: [],
  onSelect: () => {}
};

export default SubMenuItem;
