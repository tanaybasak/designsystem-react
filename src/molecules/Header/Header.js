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
                {
                    searchComponent ?
                        <div className={`${prefix}-header-search`}>
                            {searchComponent}
                        </div>
                        : null
                }
                <ul className={`${prefix}-header-icons`}>
                    {
                        icons.map(({ className, icon, ...restProps }, index) => (
                            <li className={`${prefix}-header-icon ${className || ''}`.trim()} key={`header_icons_${index}`} {...restProps}>
                                {icon}
                            </li>
                        ))
                    }
                </ul>
            </div>
        </header>
    );
};

Header.propTypes = {
    className: PropTypes.string,
    logo: PropTypes.object.isRequired,
    icons: PropTypes.array.isRequired,
    searchComponent: PropTypes.object
};

Header.defaultProps = {
    className: '',
    logo: null,
    icons: [],
    searchComponent: null
};

export default Header;