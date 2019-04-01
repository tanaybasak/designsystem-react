import React from 'react';
import PropTypes from 'prop-types';
import { prefix } from '../../../settings';

export default function Link({ className, children, href, ...linkProps }) {
    return (
        <a
            className={className}
            href={href}
            {...linkProps}
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
    children: '',
    className: '',
    href: '#',
    onClick: () => { }
};