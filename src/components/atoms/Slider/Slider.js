import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { prefix } from '../../../settings';

export default function Slider({ min = 0, max = 100, className, ...restProps }) {
    const [value, setValue] = useState(restProps.value || 50);
    const classnames = `${prefix}-slider ${className}`.trim();

    return (
        <div className={classnames}>
            <label className={`${prefix}-slider-bottom-range`}>{min}</label>
            <input className={`${prefix}-slider-input`}
                type="range"
                min={min}
                max={max}
                value={value}
                onChange={event => {
                    setValue(event.currentTarget.value);
                    //restProps.onChange(event);
                }}
            />
            <label className={`${prefix}-slider-top-range`}>{max}</label>
            <input
                className={`${prefix}-slider-text-input`}
                type="text"
                value={value}
                onChange={event => {
                    const val = event.currentTarget.value;
                    const minVal = Number(min);
                    const maxVal = Number(max);
                    if ((Number(val) && Number(val) >= minVal && Number(val) <= maxVal) || !val) {
                        setValue(event.currentTarget.value || 0);
                    }
                }}
            />
        </div>
    );
};

Slider.propTypes = {
    small: PropTypes.bool,
    title: PropTypes.string,
    className: PropTypes.string
};

Slider.defaultProps = {
    small: false,
    title: '',
    className: ''
};