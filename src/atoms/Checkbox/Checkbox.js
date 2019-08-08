import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';

export default function Checkbox({ className, checked, label, ...restProps }) {
    const [isChecked, setChecked] = useState(checked || false);
    const classnames = `${prefix}-checkbox-item ${className}`.trim();

    useEffect(() => {
        setChecked(checked);
    }, [checked]);

    return (
        <div className={classnames}>
            <input
                className={`${prefix}-checkbox`}
                type="checkbox"
                checked={isChecked}
                aria-checked={isChecked}
                aria-disabled={!!restProps.disabled}
                {...restProps}
                onChange={event => {
                    setChecked(!isChecked);
                    if (restProps.onChange) {
                        restProps.onChange(event);
                    }
                }}
            />
            <label className={`${prefix}-checkbox-label`} htmlFor={restProps.id}>
                {label}
            </label>
        </div>
    );
}

Checkbox.propTypes = {
    className: PropTypes.string,
    disabled: PropTypes.bool,
    label: PropTypes.string,
    id: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    checked: PropTypes.bool,
    title: PropTypes.string
};

Checkbox.defaultProps = {
    className: '',
    disabled: false,
    label: '',
    id: null,
    onChange: () => { },
    checked: false,
    title: '',
};
