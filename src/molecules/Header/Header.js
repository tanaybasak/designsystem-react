import React from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';

const Header = ({ className, ...restProps }) => {
    const classnames = `${prefix}-navbar ${prefix}-navbar-expand-lg ${className}`.trim();

    return (

        <header className={classnames} style={{ height: '3.125rem' }} {...restProps}>
            <img
                src={require("../../../assets/images/logo.png")}
                alt="Logo"
            />
        </header>
    );
};

Header.propTypes = {
    className: PropTypes.string,
    disabled: PropTypes.bool
};

Header.defaultProps = {
    className: '',
    disabled: false
};

export default Header;