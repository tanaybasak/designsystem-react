import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { prefix } from '../../../settings';

export default function Slider({ min, max, step, className, onChange: _onChangeHandler, value: propsVal, withInputBox, ...restProps }) {
    const [value, setValue] = useState(propsVal || 0);
    const classnames = `${prefix}-slider ${className}`.trim();

    return (
        <div className={classnames}>
            <label className={`${prefix}-slider-bottom-range`}>{min}</label>
            <input className={`${prefix}-slider-input`}
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                {...restProps}
                onChange={event => {
                    setValue(event.currentTarget.value);
                    if (_onChangeHandler && typeof _onChangeHandler === 'function') {
                        _onChangeHandler(event);
                    }
                }}
            />
            <label className={`${prefix}-slider-top-range`}>{max}</label>
            {
                withInputBox ?
                    <input
                        className={`${prefix}-slider-text-input`}
                        type="text"
                        value={value}
                        onChange={event => {
                            setValue(Number(event.currentTarget.value));
                        }}
                        onBlur={event => {
                            let val = Number(event.currentTarget.value);
                            val = val > max ? max : val < min ? min : val;
                            setValue(val);
                        }}
                        disabled={restProps.disabled}
                    />
                    : null
            }
        </div>
    );
};

Slider.propTypes = {
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    step: PropTypes.number.isRequired,
    value: PropTypes.number,
    className: PropTypes.string,
    onChange: PropTypes.func,
    withInputBox: PropTypes.bool.isRequired
};

Slider.defaultProps = {
    min: 0,
    max: 100,
    step: 1,
    onChange: () => { },
    withInputBox: true
};