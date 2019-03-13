import React from 'react';
import PropTypes from 'prop-types';
import { prefix } from '../../settings';

const Link = props => (
    <a className={`${prefix}-link ${prefix}-${props.className}`}
        {...props.data}
        href={props.href}
        onClick={props.onClick}
    >
        {props.label}
    </a>
);

Link.propTypes = {
    label: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
    data: PropTypes.object
};

export default Link;