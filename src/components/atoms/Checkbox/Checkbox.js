import React, { useState } from./node_modules/reactct';
import PropTypes from './node_modules/prop-types';
import { prefix } from '../../../settings';

export default function Checkbox({ className, checked, labelText, ...restProps }) {
    const [isChecked, setChecked] = useState(checked || false);
    const classnames = `${prefix}-checkbox-item ${className}`.trim();

    return (
        <div className={classnames}>
            <input
                className={`${prefix}-checkbox`}
                type="checkbox"
                checked={isChecked}
                aria-checked={isChecked}
                aria-disabled={restProps['disabled'] ? true : false}
                {...restProps}
                onChange={event => {
                    setChecked(!isChecked);
                    if (restProps.onChange) {
                        restProps.onChange(event);
                    }
                }}
            />
            {
                labelText ?
                    <label
                        className={`${prefix}-checkbox-label`}
                        htmlFor={restProps.id}
                    >
                        {labelText}
                    </label>
                    : null
            }
        </div>
    );
};

Checkbox.propTypes = {
    className: PropTypes.string,
    disabled: PropTypes.bool,
    labelText: PropTypes.string,
    id: PropTypes.string,
    onChange: PropTypes.func,
    checked: PropTypes.bool,
    title: PropTypes.string
};

Checkbox.defaultProps = {
    className: '',
    labelText: '',
    disabled: false,
    onChange: () => { },
    checked: false
};