import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { prefix } from '../../../settings';

export default function TextArea({ className, helperText, ...inputFieldProps }) {
    const [value, setValue] = useState(inputFieldProps.value || '');

    return (
        <textarea
            className={`${prefix}-text-area ${className}`}
            {...inputFieldProps}
            value={value}
            onChange={event => {
                setValue(event.currentTarget.value);
                inputFieldProps.onChange(event);
            }}
        />
    )
};

TextArea.propTypes = {
    className: PropTypes.string.isRequired,
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    disabled: PropTypes.bool,
    id: PropTypes.string,
    onChange: PropTypes.func,
    onClick: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    placeholder: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    helperText: PropTypes.node,
};

TextArea.defaultProps = {
    className: '',
    disabled: false,
    onChange: () => { },
    onClick: () => { },
    onFocus: () => { },
    onBlur: () => { },
    helperText: ''
};