import React from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';

const Header = ({ className, logo, searchComponent, icons, ...restProps }) => {
  const classnames = `${prefix}-header ${className}`.trim();

  return (
    <header className={classnames} {...restProps}>
      <a href="/" className={`${prefix}-header-brand`}>
        {logo}
      </a>
      <div className={`${prefix}-header-wrapper`}>
        {searchComponent ? (
          <div className={`${prefix}-header-search`}>{searchComponent}</div>
        ) : null}
        <ul className={`${prefix}-header-icons`}>
          {icons.map(({ className, icon, ...restProps }, index) => (
            <li
              className={`${prefix}-header-icon ${className || ''}`.trim()}
              key={`header_icons_${index}`}
              {...restProps}
            >
              {icon}
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

Header.propTypes = {
  /** Name of the custom class to apply to the header */
  className: PropTypes.string,
  /** Logo for header */
  logo: PropTypes.node.isRequired,
  /** Icons for Header */
  icons: PropTypes.array.isRequired,
  /** Search component for Header */
  searchComponent: PropTypes.node
};

Header.defaultProps = {
  className: '',
  logo: null,
  icons: [],
  searchComponent: null
};

export default Header;
