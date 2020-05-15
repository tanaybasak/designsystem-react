import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Label from '../Label';
import prefix from '../../settings';
import debounce from '../../util/debounce';

const Slider = ({
  min,
  max,
  step,
  className,
  onChange: onChangeHandler,
  value: propsVal,
  withInputBox,
  ...restProps
}) => {
  const [value, setValue] = useState(propsVal || 0);
  const [numberInput, setNumberInput] = useState(propsVal || 0);
  const classnames = `${prefix}-slider ${className}`.trim();
  const sliderRef = useRef(null);
  const tooltipRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState('');

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

  const isInAP = (a, d, x) => {
    if (d == 0) {
      return x == a;
    } else {
      return (x - a) % d == 0 && (x - a) / d >= 0;
    }
  };

  const findMinMax = (a, d, x) => {
    const number = x / d + 1;
    const minV = Math.floor(number);
    const maxV = Math.ceil(number);

    return [a + (minV - 1) * d, a + (maxV - 1) * d];
  };

  const isValidNumber = number => {
    if (number < min) {
      setErrorMessage('Please Enter a value greater than ' + min);
    } else if (number > max) {
      setErrorMessage('Please Enter a less than ' + max);
    } else {
      if (isInAP(min, step, number)) {
        setErrorMessage('');
        return true;
      } else {
        const nearestValue = findMinMax(min, step, number);
        setErrorMessage(
          'Please Enter a valid value. Nearest values are ' + nearestValue
        );

        return false;
      }
    }
  };

  const setSearchTerm = useRef(
    debounce(value => {
      if (isValidNumber(value)) {
        setValue(value);
      }
    }, 1000)
  ).current;

  return (
    <div className="hcl-slider-wrapper" ref={sliderRef}>
      <label>Slider Form</label>
      <div className={classnames}>
        <Label className={`${prefix}-slider-bottom-range`}>{min}</Label>
        <div className="hcl-slider-input-wrapper">
          <div className="range-value" ref={tooltipRef}>
            <span>{value}</span>
          </div>
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
            onChange={event => {
              setValue(event.currentTarget.value);
              setNumberInput(event.currentTarget.value);
              if (onChangeHandler && typeof onChangeHandler === 'function') {
                onChangeHandler(event);
              }
            }}
          />
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
            data-invalid="true"
            onChange={event => {
              const value = Number(event.currentTarget.value);
              setNumberInput(value);
              setSearchTerm(value);
            }}
            // onBlur={event => {
            //   // let val = Number(event.currentTarget.value);
            //   // val = val > max ? max : val < min ? min : val;
            //   //const value = Number(event.currentTarget.value);
            //   if (value < min) {
            //     setValue(min);
            //   } else if (value > max) {
            //     setValue(max);
            //   } else {
            //     setValue(value);
            //   }
            // }}
            disabled={restProps.disabled}
          />
        ) : null}
      </div>
      {errorMessage ? (
        <div className="hcl-error-msg">{errorMessage}</div>
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
  withInputBox: PropTypes.bool
};

Slider.defaultProps = {
  min: 0,
  max: 100,
  step: 1,
  value: 0,
  className: '',
  onChange: () => {},
  withInputBox: true
};

export default Slider;
