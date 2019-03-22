import React from 'react';
import PropTypes from 'prop-types';
import { prefix } from '../../settings';

export default function Link(props) {
    return (
        <a className={`${prefix}-link ${prefix}-link--${props.className}`}
            href={props.href}
            onClick={props.onClick}
        >
            {props.children}
        </a>
    )
};

Link.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    href: PropTypes.string.isRequired,
    target: PropTypes.string
};