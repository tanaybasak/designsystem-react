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
    /** Custom class on the Checkbox wrapper. */
    className: PropTypes.string,
    /** Disable Checkbox */
    disabled: PropTypes.bool,
    /** Text for Checkbox Label. */
    label: PropTypes.string,
    /** Unique string for the Checkbox. */
    id: PropTypes.string.isRequired,
    /** Accepts event handler as prop/argument. */
    onChange: PropTypes.func,
    /** Control Checked state for Checkbox */
    checked: PropTypes.bool,
    /** Unique identifier used within forms. */
    name: PropTypes.string,
    /** Text value to be considered when submitting forms. */
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

Checkbox.defaultProps = {
    className: '',
    disabled: false,
    label: '',
    onChange: () => { },
    checked: false
};
