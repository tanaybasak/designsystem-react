import React from 'react';
import PropTypes from 'prop-types';
import { prefix } from '../../../settings';

export default function FormHelperText({ className, children, ...labelProps }) {

    return (
        <div className={`${prefix}-${className}`} {...labelProps}>
            {children}
        </div>
    )
};

FormHelperText.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string.isRequired,
    htmlFor: PropTypes.string,
    onClick: PropTypes.func
};

FormHelperText.defaultProps = {
    children: '',
    className: '',
    htmlFor: '',
    onClick: () => { }
};