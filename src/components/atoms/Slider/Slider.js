import React , { useState }from 'react';
import PropTypes from 'prop-types';
import prefix from "../../settings";
import Label from '../Label';

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

  return (
    <div className={classnames}>
      <Label className={`${prefix}-slider-bottom-range`}>{min}</Label>
      <input
        className={`${prefix}-slider-input`}
        type='range'
        min={min}
        max={max}
        step={step}
        value={value}
        {...restProps}
        onChange={event => {
          setValue(event.currentTarget.value);
          if (onChangeHandler && typeof onChangeHandler === "function") {
            onChangeHandler(event);
          }
        }}
      />
      <Label className={`${prefix}-slider-top-range`}>{max}</Label>
      {withInputBox ? (
        <input
          className={`${prefix}-slider-text-input`}
          type='text'
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
      ) : null}
    </div>
  );
}

Slider.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  value: PropTypes.number,
  className: PropTypes.string,
  onChange: PropTypes.func,
  withInputBox: PropTypes.bool
};

Slider.defaultProps = {
  min: 0,
  max: 100,
  step: 1,
  value: 0,
  className: "",
  onChange: () => {},
  withInputBox: true
};

export default Slider;