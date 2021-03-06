import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';

const TextInput = ({ className, ...restProps }) => {
  const [value, setValue] = useState(restProps.value || '');
  const classnames = `${prefix}-form-control ${className}`.trim();

  useEffect(() => {
    if (restProps.value || restProps.value === '') {
      setValue(restProps.value);
    }
  }, [restProps.value]);

  return (
    <>
      <input
        className={classnames}
        type="text"
        {...restProps}
        value={value}
        onChange={event => {
          setValue(event.currentTarget.value);
          if (restProps.onChange) {
            restProps.onChange(event);
          }
        }}
      />
    </>
  );
};

TextInput.propTypes = {
  /** Additional class name to be given to <input> tag. */
  className: PropTypes.string,
  /** Specifying the <input> tag is disabled or not. */
  disabled: PropTypes.bool,
  /** Unique Id for the <input> tag. */
  id: PropTypes.string,
  /** Placeholder text for the <input> tag. */
  placeholder: PropTypes.string,
  /** Value of the input field. */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** The default Value of the field on rendering. */
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

TextInput.defaultProps = {
  className: '',
  disabled: false
};

TextInput.displayName = 'TextInput';

export default TextInput;
