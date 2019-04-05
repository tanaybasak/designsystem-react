import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { prefix } from '../../../settings';
import './Toggle.scss';

export default function Toggle({ defaultToggled, label, labelA, labelB, onToggle, className, id, toggled, disabled }) {
    const [checked, setChecked] = useState(toggled || false);

    return (
        <fieldset className={`${prefix}-fieldset ${className || ''}`} id={id}>
            {label ? <legend className={`${prefix}-label`}>{label}</legend> : null}
            <label className={`${prefix}-toggle`}>
                <input
                    type="checkbox"
                    onChange={event => {
                        setChecked(!checked);
                        onToggle(event);
                    }}
                    checked={checked}
                    disabled={disabled}
                />
                <span className={`${prefix}-slider`}></span>
                {labelA ? <span className={`${prefix}-toggle-label-off`}>{labelA}</span> : null}
                {labelB ? <span className={`${prefix}-toggle-label-on`}>{labelB}</span> : null}
            </label>
        </fieldset>
    )
};

Toggle.propTypes = {
    defaultToggled: PropTypes.bool,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    labelA: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    labelB: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onToggle: PropTypes.func,
    className: PropTypes.string,
    id: PropTypes.string.isRequired,
    toggled: PropTypes.bool,
    disabled: PropTypes.bool
};

Toggle.defaultProps = {
    defaultToggled: false,
    label: '',
    labelA: 'Off',
    labelB: 'On',
    onToggle: () => { },
    disabled: false
};