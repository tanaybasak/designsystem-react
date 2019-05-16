import React , { useState }from 'react';
import PropTypes from 'prop-types';
import prefix from '../../../settings';

const Toggle = ({
  small,
  labelOff,
  labelOn,
  onChange,
  className,
  toggled,
  ...restProps
}) => {
  const [checked, setChecked] = useState(toggled || false);

  return (
    <span
      className={`${prefix}-toggle${small ? "-small" : ""} ${className || ""}`}
    >
      <input
        type='checkbox'
        onChange={event => {
          setChecked(!checked);
          onChange(event);
        }}
        checked={checked}
        {...restProps}
      />
      <label className={`${prefix}-toggle-label`} htmlFor={restProps.id}>
        <span className={`${prefix}-switch`} />
      </label>
      {labelOff ? (
        <span className={`${prefix}-toggle-off`}>{labelOff}</span>
      ) : null}
      {labelOn ? (
        <span className={`${prefix}-toggle-on`}>{labelOn}</span>
      ) : null}
    </span>
  );
}

Toggle.propTypes = {
  small: PropTypes.bool,
  labelOff: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  labelOn: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  toggled: PropTypes.bool,
  disabled: PropTypes.bool
};

Toggle.defaultProps = {
  small: false,
  labelOff: "Off",
  labelOn: "On",
  onChange: () => {},
  disabled: false
};

export default Toggle;
