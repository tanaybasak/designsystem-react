import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';

const TextArea = ({ className, ...restProps }) => {
    const [value, setValue] = useState(restProps.value || "");
    const classnames = `${prefix}-textarea ${className}`.trim();

    useEffect(() => {
        if (restProps.value || restProps.value === '') {
            setValue(restProps.value);
        }
    }, [restProps.value]);

    return (
        <textarea
            className={classnames}
            {...restProps}
            value={value}
            onChange={event => {
                setValue(event.currentTarget.value);
                restProps.onChange(event);
            }}
        />
    );
}

TextArea.propTypes = {
    /** Additional class name to be given to <input> tag. */
    className: PropTypes.string,
    /** The default Value of the field on rendering. */
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /** Specifying the <input> tag is disabled or not. */
    disabled: PropTypes.bool,
    /** Unique Id for the <input> tag. */
    id: PropTypes.string,
    /** Event to subscribe when the value of the Input field changes. */
    onChange: PropTypes.func,
    /** Event to subscribe when the Input field is clicked. */
    onClick: PropTypes.func,
    /** Event to subscribe when the Input field is focused. */
    onFocus: PropTypes.func,
    /** Event to subscribe when the Input field is Blurred. */
    onBlur: PropTypes.func,
    /** Placeholder text for the <input> tag. */
    placeholder: PropTypes.string,
    /** Value of the input field. */
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

TextArea.defaultProps = {
    className: "",
    disabled: false,
    onChange: () => { },
    onClick: () => { },
    onFocus: () => { },
    onBlur: () => { }
};

export default TextArea;