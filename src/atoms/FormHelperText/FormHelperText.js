import React from 'react';
import PropTypes from 'prop-types';
import { prefix } from '../../settings';

export default function FormHelperText({ className, children, ...restProps }) {

    return (
        <div
            className={`${prefix}-${className}`}
            {...restProps}
        >
            {children}
        </div>
    );
};

FormHelperText.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string.isRequired,
    htmlFor: PropTypes.string,
    onClick: PropTypes.func
};

FormHelperText.defaultProps = {
    children: null,
    className: '',
    htmlFor: '',
    onClick: () => { }
};