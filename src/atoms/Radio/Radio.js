import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { prefix } from '../../../settings';

export default function Radio({ className, checked, ...restProps }) {
    const [isChecked, setValue] = useState(checked || false);

    return (
        <input
            className={`${prefix}-radio ${className}`}
            type="radio"
            checked={isChecked}
            {...restProps}
            onChange={event => {
                setValue(event.currentTarget.checked);
                restProps.onChange(event);
            }}
        />
    );
};

Radio.propTypes = {
    className: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    id: PropTypes.string,
    onChange: PropTypes.func,
    checked: PropTypes.bool,
    name: PropTypes.string,
    title: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

Radio.defaultProps = {
    className: null,
    disabled: false,
    onChange: () => { },
    checked: false
};