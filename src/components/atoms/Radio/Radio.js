import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { prefix } from '../../../settings';

export default function Radio({ className, checked, ...restProps }) {
    const [isChecked, setValue] = useState(checked || false);
    const classnames = `${prefix}-radio ${className}`.trim();

    return (
        <input
            className={classnames}
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
    className: PropTypes.string,
    disabled: PropTypes.bool,
    id: PropTypes.string,
    onChange: PropTypes.func,
    checked: PropTypes.bool,
    name: PropTypes.string,
    title: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

Radio.defaultProps = {
    className: '',
    disabled: false,
    onChange: () => { },
    checked: false
};