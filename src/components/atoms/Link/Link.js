import React from 'react';
import PropTypes from 'prop-types';

const Link = ({ className, children, href, ...restProps }) => {
    return (
        <a className={className} href={href} {...restProps}>
            {children}
        </a>
    );
}

Link.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    href: PropTypes.string,
    onClick: PropTypes.func
};

Link.defaultProps = {
    children: null,
    className: "",
    href: "#",
    onClick: () => { }
};

export default Link;