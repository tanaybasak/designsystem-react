import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { prefix } from '../../../settings';

export default function Checkbox({ className, checked, ...restProps }) {
    const [isChecked, setValue] = useState(checked || false);
    const classnames = `${prefix}-checkbox ${className}`.trim();

    return (
        <input
            className={classnames}
            type="checkbox"
            checked={isChecked}
            {...restProps}
            onChange={event => {
                setValue(event.currentTarget.checked);
                restProps.onChange(event);
            }}
        />
    );
};

Checkbox.propTypes = {
    className: PropTypes.string,
    disabled: PropTypes.bool,
    id: PropTypes.string,
    onChange: PropTypes.func,
    checked: PropTypes.bool,
    title: PropTypes.string
};

Checkbox.defaultProps = {
    className: null,
    disabled: false,
    onChange: () => { },
    checked: false
};