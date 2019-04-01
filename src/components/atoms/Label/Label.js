import React from 'react';
import PropTypes from 'prop-types';
import { prefix } from '../../../settings';

export default function Label({ className, children, ...labelProps }) {

    return (
        <label
            className={`${prefix}-label ${className}`}
            {...labelProps}
        >
            <span>{children}</span>
        </label>
    )
};

Label.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    htmlFor: PropTypes.string,
    onClick: PropTypes.func
};

Label.defaultProps = {
    children: '',
    className: '',
    htmlFor: '',
    onClick: () => { }
};