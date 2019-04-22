import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { prefix } from '../../settings';

export default function TextArea({ className, ...restProps }) {
    const [value, setValue] = useState(restProps.value || '');

    return (
        <textarea
            className={`${prefix}-text-area ${className}`}
            {...restProps}
            value={value}
            onChange={event => {
                setValue(event.currentTarget.value);
                restProps.onChange(event);
            }}
        />
    );
};

TextArea.propTypes = {
    className: PropTypes.string.isRequired,
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    disabled: PropTypes.bool,
    id: PropTypes.string,
    onChange: PropTypes.func,
    onClick: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    placeholder: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

TextArea.defaultProps = {
    className: null,
    disabled: false,
    onChange: () => { },
    onClick: () => { },
    onFocus: () => { },
    onBlur: () => { }
};