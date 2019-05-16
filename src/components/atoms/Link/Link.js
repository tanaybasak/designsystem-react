import React from './node_modules/react';
import PropTypes from './node_modules/prop-types';

export default function Link({ className, children, href, ...restProps }) {
    
    return (
        <a
            className={className}
            href={href}
            {...restProps}
        >
            {children}
        </a>
    );
}


Link.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    href: PropTypes.string.isRequired,
    onClick: PropTypes.func
};

Link.defaultProps = {
    children: null,
    className: '',
    href: '#',
    onClick: () => { }
};