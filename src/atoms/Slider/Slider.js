import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Label from '../Label';
import prefix from '../../settings';
import debounce from '../../util/debounce';
import FormHelperText from '../FormHelperText';
import { isInAP, findMinMax } from '../../util/number';
import {
  numberInputMaxValidation,
  numberInputMinValidation,
  numberInputInvalid,
  numberInputStepSizeValidation
} from '../../content';

const Slider = ({
  min,
  max,
  step,
  className,
  hover,
  onChange: onChangeHandler,
  value: propsVal,
  withInputBox,
  label,
  helperText,
  errorMessage,
  id,
  ...restProps
}) => {
  const [value, setValue] = useState(propsVal || 0);
  const [numberInput, setNumberInput] = useState(propsVal || 0);
  const classnames = `${prefix}-slider-wrapper ${className}`.trim();
  const sliderRef = useRef(null);
  const tooltipRef = useRef(null);
  const [validationMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const percentage = (100 * (value - min)) / (max - min);
    const newPosition = 10 - percentage * 0.2;
    if (sliderRef.current) {
      sliderRef.current.style.setProperty(
        '--progressPercent',
        `${percentage}%`
      );
    }
    if (tooltipRef.current) {
      tooltipRef.current.style.left = `calc(${percentage}% + (${newPosition}px))`;
    }
  }, [value]);

  const isValidNumber = number => {
    if (number === '' || number === null) {
      setErrorMessage(
        errorMessage && errorMessage.invalid
          ? errorMessage.invalid
          : numberInputInvalid
      );
      return false;
    } else {
      if (number < min) {
        setErrorMessage(
          errorMessage && errorMessage.min
            ? errorMessage.min
            : numberInputMinValidation + min
        );
        return false;
      } else if (number > max) {
        setErrorMessage(
          errorMessage && errorMessage.max
            ? errorMessage.max
            : numberInputMaxValidation + max
        );
        return false;
      } else {
        if (isInAP(min, step, number)) {
          setErrorMessage('');
          return true;
        } else {
          const nearestValue = findMinMax(min, step, number);
          setErrorMessage(
            errorMessage && errorMessage.step
              ? errorMessage.step
              : numberInputStepSizeValidation + nearestValue.join(' and ')
          );
          setErrorMessage(
            'Please enter a valid value. The two nearest valid values are ' +
              nearestValue.join(' and ')
          );

          return false;
        }
      }
    }
  };

  const setSearchTerm = useRef(
    debounce(value => {
      if (isValidNumber(value)) {
        setValue(value);
        if (onChangeHandler && typeof onChangeHandler === 'function') {
          onChangeHandler(value);
        }
      }
    }, 500)
  ).current;

  return (
    <div className={classnames} ref={sliderRef}>
      {label ? <Label htmlFor={id ? id : null}>{label} </Label> : null}
      {helperText ? (
        <FormHelperText className="helper-text">{helperText}</FormHelperText>
      ) : null}
      <div className={`${prefix}-slider${hover ? ' on-hover' : ''}`}>
        <Label className={`${prefix}-slider-bottom-range`}>{min}</Label>
        <div className={`${prefix}-slider-input-wrapper`}>
          <input
            className={`${prefix}-slider-input`}
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            {...restProps}
            onClick={event => {
              event.currentTarget.focus();
            }}
            id={id ? id : null}
            onChange={event => {
              setValue(event.currentTarget.value);
              setNumberInput(event.currentTarget.value);
              setErrorMessage('');
              if (onChangeHandler && typeof onChangeHandler === 'function') {
                onChangeHandler(event.currentTarget.value);
              }
            }}
          />
          <div className={`${prefix}-range-value`} ref={tooltipRef}>
            <span>{value}</span>
          </div>
        </div>
        <Label className={`${prefix}-slider-top-range`}>{max}</Label>
        {withInputBox ? (
          <input
            className={`${prefix}-form-control ${prefix}-slider-text-input`}
            type="number"
            min={min}
            max={max}
            step={step}
            value={numberInput}
            data-invalid={validationMessage ? true : false}
            onChange={event => {
              const value = isNaN(event.target.value)
                ? numberInput
                : event.target.value;
              setNumberInput(value);
              setSearchTerm(value);
            }}
            disabled={restProps.disabled}
          />
        ) : null}
      </div>
      {validationMessage ? (
        <FormHelperText className="error-msg">
          {validationMessage}
        </FormHelperText>
      ) : null}
    </div>
  );
};

Slider.propTypes = {
  /** Specifies the minimum value allowed */
  min: PropTypes.number,
  /** Specifies the maximum value allowed  */
  max: PropTypes.number,
  /** Specifies the number intervals  */
  step: PropTypes.number,
  /** Specifies the value of slider  */
  value: PropTypes.number,
  /** Style class of the component */
  className: PropTypes.string,
  /** Callback function on changing the value of slider */
  onChange: PropTypes.func,
  /** Flag to show input box
     true : display input field
     false : hide input field
     */
  withInputBox: PropTypes.bool,
  /** Title for the Slider */
  label: PropTypes.string,
  /** Used for passing custom error message  */
  errorMessage: PropTypes.object,
  /** Specifies helper text */
  helperText: PropTypes.string,
  /** Unique Id */
  id: PropTypes.string.isRequired,
  /** Specifies the tooltip to be shown on hover  */
  hover: PropTypes.bool
};

Slider.defaultProps = {
  min: 0,
  max: 100,
  step: 1,
  value: 0,
  className: '',
  onChange: () => {},
  hover: false,
  withInputBox: true,
  label: null,
  errorMessage: {
    step: null,
    max: null,
    min: null,
    invalid: null
  },
  helperText: null,
  id: ''
};

export default Slider;
