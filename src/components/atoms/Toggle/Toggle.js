import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { prefix } from '../../../settings';

export default function Toggle({ defaultToggled, labelOff, labelOn, onToggle, className, id, toggled, disabled }) {
    const [checked, setChecked] = useState(toggled || false);

    return (
        <span className={`${prefix}-toggle-container ${className || ''}`}>
            <input
                id={id}
                type="checkbox"
                onChange={event => {
                    setChecked(!checked);
                    onToggle(event);
                }}
                checked={checked}
                disabled={disabled}
            />
            <label className={`${prefix}-toggle`} htmlFor={id}>
                <span className={`${prefix}-slider`} />
            </label>
            {labelOff ? <span className={`${prefix}-toggle-off`}>{labelOff}</span> : null}
            {labelOn ? <span className={`${prefix}-toggle-on`}>{labelOn}</span> : null}
        </span>
    )
};

Toggle.propTypes = {
    defaultToggled: PropTypes.bool,
    labelOff: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    labelOn: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onToggle: PropTypes.func,
    className: PropTypes.string,
    id: PropTypes.string.isRequired,
    toggled: PropTypes.bool,
    disabled: PropTypes.bool
};

Toggle.defaultProps = {
    defaultToggled: false,
    labelOff: 'Off',
    labelOn: 'On',
    onToggle: () => { },
    disabled: false
};