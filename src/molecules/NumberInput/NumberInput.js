import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';
import FormHelperText from '../../atoms/FormHelperText';
import Label from '../../atoms/Label';
import {
  numberInputMaxValidation,
  numberInputMinValidation,
  numberInputInvalid
} from '../../content';
const NumberInput = ({
  defaultValue,
  id,
  label,
  disabled,
  max,
  min,
  step,
  className,
  helperText,
  required,
  errorMessage,
  ...restProps
}) => {
  let [value, setValue] = useState(Number(defaultValue) || 0);
  let [validationMessage, setValidationMessage] = useState('');
  const inputRef = useRef(null);
  const classnames = `${prefix}-number-input-wrapper ${className.trim()}`;

  useEffect(() => {
    let newValue = Number(value);
    if (required && value === '') {
      setValidationMessage(
        errorMessage && errorMessage.required
          ? errorMessage.required
          : numberInputInvalid
      );
      return;
    } else if (value !== '') {
      if (max != null) {
        if (newValue > max) {
          setValidationMessage(
            errorMessage && errorMessage.max
              ? errorMessage.max
              : `${numberInputMaxValidation} ${max}`
          );
          return;
        }
      }
      if (min != null) {
        if (newValue < min) {
          setValidationMessage(
            errorMessage && errorMessage.min
              ? errorMessage.min
              : `${numberInputMinValidation} ${min}`
          );
          return;
        }
      }
    }
    setValidationMessage('');
  }, [value]);

  const increment = event => {
    event.preventDefault();
    if (inputRef.current.stepUp) {
      inputRef.current.stepUp();
      setValue(inputRef.current.value);
    } else {
      stepUp(
        inputRef.current,
        inputRef.current.step === '' ? 1 : inputRef.current.step
      );
    }
    inputRef.current.focus();
    if (restProps.onChange) {
      restProps.onChange(inputRef.current.value);
    }
  };

  const decrement = event => {
    event.preventDefault();
    if (inputRef.current.stepDown) {
      inputRef.current.stepDown();
      setValue(inputRef.current.value);
    } else {
      stepDown(
        inputRef.current,
        inputRef.current.step === '' ? 1 : inputRef.current.step
      );
    }
    inputRef.current.focus();
    if (restProps.onChange) {
      restProps.onChange(inputRef.current.value);
    }
  };

  const stepUp = (input, step) => {
    if (
      input.max !== '' &&
      Number(input.max) < Number(input.value) + Number(step)
    ) {
      return;
    }
    setValue(Number(input.value) + Number(step));
  };
  const stepDown = (input, step) => {
    if (
      input.min !== '' &&
      Number(input.min) > Number(input.value) - Number(step)
    ) {
      return;
    }
    setValue(Number(input.value) - Number(step));
  };

  return (
    <div
      className={classnames}
      disabled={disabled ? 'disabled' : null}
    >
      {label ? <Label htmlFor={id ? id : null}>{label} </Label> : null}
      {helperText ? (
        <FormHelperText className="helper-text">{helperText}</FormHelperText>
      ) : null}
      <div className={`${prefix}-number-input`}>
        <input
          type="number"
          className={`${prefix}-form-control`}
          max={max != null ? max : null}
          min={min != null ? min : null}
          step={step != null ? step : null}
          disabled={disabled ? 'disabled' : null}
          data-invalid={validationMessage !== '' ? true : false}
          id={id ? id : null}
          value={value}
          {...restProps}
          onChange={event => {
            setValue(event.currentTarget.value);
            if (restProps.onChange) {
              restProps.onChange(event.currentTarget.value);
            }
          }}
          ref={inputRef}
        />
        <div className={`${prefix}-number-input-control`}>
          <button
            className="increment-btn"
            type="button"
            tabIndex="-1"
            aria-label="increment button"
            onMouseDown={increment}
            disabled={disabled ? 'disabled' : null}
          >
            <svg
              focusable="false"
              preserveAspectRatio="xMidYMid meet"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 8 4"
              aria-hidden="true"
            >
              <path d="M0 4l4-4 4 4z" />
            </svg>
          </button>
          <button
            className="decrement-btn"
            type="button"
            tabIndex="-1"
            aria-label="decrement button"
            onMouseDown={decrement}
            disabled={disabled ? 'disabled' : null}
          >
            <svg
              focusable="false"
              preserveAspectRatio="xMidYMid meet"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 8 4"
              aria-hidden="true"
            >
              <path d="M8 0L4 4 0 0z" />
            </svg>
          </button>
        </div>
      </div>
      {
        <FormHelperText className="error-msg">
          {validationMessage}
        </FormHelperText>
      }
    </div>
  );
};

NumberInput.propTypes = {
  /** Specifies the default value */
  defaultValue: PropTypes.number,
  /** Specifies helper text */
  helperText: PropTypes.string,
  /** Unique Id */
  id: PropTypes.string,
  /** Title for the Number Input */
  label: PropTypes.string,
  /** True : Disable the  Number Input  */
  disabled: PropTypes.bool,
  /** Specifies the maximum value allowed  */
  max: PropTypes.number,
  /** Specifies the minimum value allowed */
  min: PropTypes.number,
  /** Specifies the number intervals  */
  step: PropTypes.number,
  /** Class/clasess will be applied on the parent div of Number Input  */
  className: PropTypes.string,
  /** Specifies the number is required or not  */
  required: PropTypes.bool,
  /** Used for passing error message  */
  errorMessage: PropTypes.any
};

NumberInput.defaultProps = {
  defaultValue: 0,
  id: '',
  label: null,
  disabled: false,
  max: null,
  min: null,
  step: null,
  helperText: null,
  className: '',
  required: false,
  errorMessage: {
    required: null,
    max: null,
    min: null
  }
};

export default NumberInput;
