import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';

const Toggle = ({
  small,
  labelOff,
  labelOn,
  onChange,
  className,
  toggled,
  ...restProps
}) => {
  const [checked, setChecked] = useState(toggled);

  useEffect(() => {
    setChecked(toggled);
  }, [toggled]);

  const keyDownOnToggle = e => {
    const key = e.which || e.keyCode;
    if (key === 39) {
      e.preventDefault();
      setChecked(true);
      onChange(true, event);
    } else if (key === 37) {
      e.preventDefault();
      setChecked(false);
      onChange(false, event);
    }
  };

  return (
    <span
      className={`${prefix}-toggle${small ? '-small' : ''} ${className || ''}`}
    >
      <input
        type="checkbox"
        onChange={event => {
          setChecked(!checked);
          onChange(!checked, event);
        }}
        onKeyDown={keyDownOnToggle}
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
};

Toggle.propTypes = {
  /** Boolean value to change toggle to small */
  small: PropTypes.bool,
  /** Off label for Toggle */
  labelOff: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** On label for Toggle */
  labelOn: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Call back function that is invoked when Toggle is clicked
   *
   * @value : bool value of toggle
   * @event : event when toggled
   */
  onChange: PropTypes.func,
  /** Name of the custom class to apply to the Toggle */
  className: PropTypes.string,
  /** Unique id for Toggle */
  id: PropTypes.string.isRequired,
  /** Boolean value representing state of Toggle Component */
  toggled: PropTypes.bool,
  /** Boolean value to disable Toggle */
  disabled: PropTypes.bool
};

Toggle.defaultProps = {
  small: false,
  labelOff: 'Off',
  labelOn: 'On',
  onChange: () => {},
  disabled: false,
  toggled: false
};

export default Toggle;
