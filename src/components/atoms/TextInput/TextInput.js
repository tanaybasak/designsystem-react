import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { prefix } from '../../../settings';

export default function TextInput({ className, type, ...restProps }) {
    const [value, setValue] = useState(restProps.value || '');
    const classnames = `${prefix}-form-control ${className}`.trim();

    return (
        <input
            className={classnames}
            type={type}
            {...restProps}
            value={value}
            onChange={event => {
                setValue(event.currentTarget.value);
                restProps.onChange(event);
            }}
        />
    );
};

TextInput.propTypes = {
    className: PropTypes.string,
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
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

TextInput.defaultProps = {
    className: '',
    disabled: false,
    onChange: () => { },
    onClick: () => { },
    onFocus: () => { },
    onBlur: () => { },
    type: 'text'
};