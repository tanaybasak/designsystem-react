import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';
import FormHelperText from '../../atoms/FormHelperText';
import Label from '../../atoms/Label';
import { numberInputMaxValidation, numberInputMinValidation, numberInputInvalid } from '../../content';
const NumberInput = (
    {
        defaultValue,
        id,
        label,
        disabled,
        max,
        min,
        step,
        className,
        ...restProps
    }
) => {
    let [value, setValue] = useState(Number(defaultValue) || 0);
    let [validationMessage, setValidationMessage] = useState('')
    const inputRef = useRef(null);
    const classnames = `${prefix}-number-input-wrapper ${prefix}-form-group ${className.trim()}`;

    useEffect(
        () => {
            let newValue = Number(value);
            if (restProps.required && value === '') {
                setValidationMessage(numberInputInvalid);
                return;
            } else if (value !== '') {
                if (max) {
                    if (newValue > max) {
                        setValidationMessage(`${numberInputMaxValidation} ${max}`);
                        return;
                    }
                }
                if (min) {
                    if (newValue < min) {
                        setValidationMessage(`${numberInputMinValidation} ${min}`);
                        return;
                    }
                }
            }
            setValidationMessage('')
        },
        [value]
    );

    const increment = (event) => {
        event.preventDefault();
        if (inputRef.current.stepUp) {
            inputRef.current.stepUp();
            setValue(inputRef.current.value);
        } else {
            stepUp(inputRef.current, inputRef.current.step === '' ? 1 : inputRef.current.step)
        }
        inputRef.current.focus();
        if (restProps.onChange) {
            restProps.onChange(inputRef.current.value);
        }
    }

    const decrement = (event) => {
        event.preventDefault();
        if (inputRef.current.stepDown) {
            inputRef.current.stepDown();
            setValue(inputRef.current.value);
        } else {
            stepDown(inputRef.current, inputRef.current.step === '' ? 1 : inputRef.current.step)
        }
        inputRef.current.focus();
        if (restProps.onChange) {
            restProps.onChange(inputRef.current.value);
        }
    }

    const stepUp = (input, step) => {
        if (input.max !== '' && Number(input.max) < (Number(input.value) + Number(step))) {
            return;
        }
        setValue(Number(input.value) + Number(step));
    }
    const stepDown = (input, step) => {
        if (input.min !== '' && Number(input.min) > (Number(input.value) - Number(step))) {
            return;
        }
        setValue(Number(input.value) - Number(step));
    }

    return (
        <div className={classnames} disabled={disabled ? 'disabled' : null} data-invalid={validationMessage !== '' ? true : false}>
            <div className={`${prefix}-form-control ${prefix}-number-input`}>
                <input
                    type="number"
                    className={`${prefix}-form-control`}
                    max={max ? max : null}
                    min={min ? min : null}
                    step={step ? step : null}
                    disabled={disabled ? 'disabled' : null}
                    data-invalid={validationMessage !== '' ? true : false}
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
            {<FormHelperText className="error-msg">{validationMessage}</FormHelperText>}
        </div>
    )
}

NumberInput.propTypes = {
    defaultValue: PropTypes.number,
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    max: PropTypes.number,
    min: PropTypes.number,
    step: PropTypes.number,
    className: PropTypes.string
};

NumberInput.defaultProps = {
    defaultValue: 0,
    id: '',
    label: '',
    disabled: false,
    max: null,
    min: null,
    step: null,
    className: ''
};

export default NumberInput;
