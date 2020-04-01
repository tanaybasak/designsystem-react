import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Label from '../Label';
import prefix from '../../settings';
import colors from '../../util/colors';
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
  const classnames = `${prefix}-slider ${className}`.trim();

  const getBackground = () => {
    const percentage = (100 * (value - min)) / (max - min);
    return `linear-gradient(90deg, ${colors.blue} ${percentage}%, ${
      colors.light60
    } ${percentage + 0.1}%)`;
  };

  return (
    <div className={classnames}>
      <Label className={`${prefix}-slider-bottom-range`}>{min}</Label>
      <input
        className={`${prefix}-slider-input`}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        style={{ background: getBackground() }}
        {...restProps}
        onChange={event => {
          setValue(event.currentTarget.value);
          if (onChangeHandler && typeof onChangeHandler === 'function') {
            onChangeHandler(event);
          }
        }}
      />
      <Label className={`${prefix}-slider-top-range`}>{max}</Label>
      {withInputBox ? (
        <input
          className={`${prefix}-form-control ${prefix}-slider-text-input`}
          type="text"
          value={value}
          onChange={event => {
            const newValue = Number(event.currentTarget.value);
            if (!isNaN(newValue) && newValue >= min && newValue <= max) {
              setValue(newValue);
            }
          }}
          onBlur={event => {
            let val = Number(event.currentTarget.value);
            val = val > max ? max : val < min ? min : val;
            setValue(val);
          }}
          disabled={restProps.disabled}
        />
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
