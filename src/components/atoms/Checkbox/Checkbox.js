import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { prefix } from '../../../settings';

export default function Checkbox({ className, helperText, checked, ...checkboxProps }) {
    const [isChecked, setValue] = useState(checked || false);

    return (
        <input
            className={`${prefix}-checkbox ${className}`}
            type="checkbox"
            checked={isChecked}
            {...checkboxProps}
            onChange={event => {
                setValue(event.currentTarget.checked);
                checkboxProps.onChange(event);
            }}
        />
    )
};

Checkbox.propTypes = {
    className: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    id: PropTypes.string,
    onChange: PropTypes.func,
    checked: PropTypes.bool,
    helperText: PropTypes.node,
    title: PropTypes.string,
};

Checkbox.defaultProps = {
    className: '',
    disabled: false,
    onChange: () => { },
    checked: false
};