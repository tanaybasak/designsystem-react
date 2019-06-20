import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';
import FormHelperText from '../FormHelperText';
import Label from '../Label';
const NumberInput = (
    {
        defaultValue,
        id,
        label,
        disabled,
        ...restProps
    }
) => {
    let [value, setValue] = useState(Number(defaultValue) || 0);
    const inputRef = useRef(null);
    const increment = (event) => {
        event.preventDefault();
        if (inputRef.current.stepUp) {
            inputRef.current.stepUp();
        } else {
            stepUp(inputRef.current, inputRef.current.step === '' ? 1 : inputRef.current.step)
        }

        inputRef.current.focus();
        setValue(inputRef.current.value);
        if (restProps.onChange) {
            restProps.onChange(inputRef.current.value);
        }
    }

    const decrement = (event) => {
        event.preventDefault();

        if (inputRef.current.stepDown) {
            inputRef.current.stepDown();
        } else {
            stepDown(inputRef.current, inputRef.current.step === '' ? 1 : inputRef.current.step)
        }
        inputRef.current.focus();
        setValue(inputRef.current.value);
        if (restProps.onChange) {
            restProps.onChange(inputRef.current.value);
        }
    }

    const stepUp = (input, step) => {
        if (input.max !== '' && Number(input.max) < (Number(input.value) + Number(step))) {
            return;
        }
        input.value = Number(input.value) + Number(step);
    }
    const stepDown = (input, step) => {
        if (input.min !== '' && Number(input.min) > (Number(input.value) - Number(step))) {
            return;
        }
        input.value = Number(input.value) - Number(step);
    }

    return (
        <div className={`${prefix}-form-group`} disabled={disabled ? 'disabled' : null} data-invalid={restProps.validationMessage ? true : false}>
            <div className={`${prefix}-form-control ${prefix}-number-input`}>
                <input
                    type="number"
                    className={`${prefix}-form-control`}
                    max={restProps.max ? restProps.max : null}
                    min={restProps.min ? restProps.min : null}
                    step={restProps.step ? restProps.step : null}
                    disabled={disabled ? 'disabled' : null}
                    id={id ? id : null}
                    value={value}
                    onChange={event => {
                        setValue(event.currentTarget.value);
                        if (restProps.onChange) {
                            restProps.onChange(event.currentTarget.value);
                        }
                    }}
                    ref={inputRef}
                />
                <div className={`${prefix}-number-input-control`}>
                    <button className="increment-btn" type="button" tabIndex="-1" onMouseDown={increment} disabled={disabled ? 'disabled' : null}>
                        <svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 4" aria-hidden="true">
                            <path d="M0 4l4-4 4 4z" />
                        </svg>
                    </button>
                    <button className="decrement-btn" type="button" tabIndex="-1" onMouseDown={decrement} disabled={disabled ? 'disabled' : null}>
                        <svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 4" aria-hidden="true">
                            <path d="M8 0L4 4 0 0z" />
                        </svg>
                    </button>
                </div>
            </div>

            {label ? <Label htmlFor={id}>{label} </Label> : null}
            {restProps.helperText ? <FormHelperText className="helper-text">{restProps.helperText}</FormHelperText> : null}
            {restProps.validationMessage ? <FormHelperText className="error-msg">{restProps.validationMessage}</FormHelperText> : null}
        </div>
    )
}

NumberInput.propTypes = {
    defaultValue: PropTypes.number,
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    disabled: PropTypes.bool
};

NumberInput.defaultProps = {
    defaultValue: 0,
    id: '',
    label: '',
    disabled: false
};

export default NumberInput;
