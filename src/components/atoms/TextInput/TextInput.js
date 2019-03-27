import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { prefix } from '../../../settings';

export default function TextInput({ className, type, helperText, ...inputFieldProps }) {
    const [value, setValue] = useState(inputFieldProps.value || '');

    return (
        <input
            className={`${prefix}-form-control ${className}`}
            type={type}
            {...inputFieldProps}
            value={value}
            onChange={event => {
                setValue(event.currentTarget.value);
                inputFieldProps.onChange(event);
            }}
        />
    )
};

TextInput.propTypes = {
    className: PropTypes.string.isRequired,
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    disabled: PropTypes.bool,
    id: PropTypes.string,
    onChange: PropTypes.func,
    onClick: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    placeholder: PropTypes.string,
    type: PropTypes.oneOf([
        'text', 'email', 'password', 'search', 'tel', 'url'
    ]).isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    helperText: PropTypes.node,
};

TextInput.defaultProps = {
    className: '',
    disabled: false,
    onChange: () => { },
    onClick: () => { },
    onFocus: () => { },
    onBlur: () => { },
    type: 'text',
    helperText: ''
};