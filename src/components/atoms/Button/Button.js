import React from 'react';
import PropTypes from 'prop-types';
import { prefix } from '../../../settings';

export default function Button({ className, children, onClick, ...restProps }) {
    return (
        <button
            className={`${prefix}-btn ${className}`}
            {...restProps}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

Button.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    onClick: PropTypes.func.isRequired
};

Button.defaultProps = {
    children: 'Click Me',
    className: '',
    disabled: false,
    onClick: () => { }
};