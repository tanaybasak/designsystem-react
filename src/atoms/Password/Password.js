import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Tooltip from '../Tooltip/Tooltip';
import prefix from '../../settings';

const Password = ({ className, disabled, ...restProps }) => {
  const [value, setValue] = useState(restProps.value || '');
  const [isIconVisible, toggleIconVisibility] = useState(false);
  const [typechange, setType] = useState('password');
  const classnames = `${prefix}-form-control ${className}`.trim();
  const inputRef = useRef(null);

  const passwordIcon = (
    <button
      type="button"
      disabled={disabled}
      className="hcl-password-visibility"
      aria-label="Show password"
      onClick={() => {
        toggleIconVisibility(!isIconVisible);
        inputRef && inputRef.current ? inputRef.current.focus() : null;
      }}
    >
      {disabled ? (
        <>
          <svg
            className="hcl-icon-visibility-off"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            style={isIconVisible ? { display: 'none' } : { display: 'initial' }}
          >
            <path d="M11.846 3.45L15.293.007 16 .714l-3.284 3.281c1.261.902 2.377 2.212 3.347 3.93C14.02 11.642 11.333 13.5 8 13.5c-1.392 0-2.667-.324-3.822-.973L.703 16l-.706-.708 3.323-3.32C2.071 11.042.976 9.694.035 7.924 2.012 4.308 4.667 2.5 8 2.5c1.395 0 2.677.317 3.846.95zm-6.928 8.338c.944.477 1.97.712 3.082.712 2.795 0 5.076-1.483 6.907-4.568-.866-1.417-1.833-2.486-2.91-3.219l-1.55 1.55a3 3 0 0 1-4.185 4.182l-1.344 1.343zm-.882-.533l1.518-1.517A3 3 0 0 1 9.74 5.556l1.364-1.363A7.02 7.02 0 0 0 8 3.5c-2.798 0-5.047 1.439-6.819 4.432.842 1.465 1.792 2.568 2.855 3.323zm2.948-1.532a2 2 0 0 0 2.74-2.738l-2.74 2.738zm-.707-.707l2.74-2.738a2 2 0 0 0-2.74 2.738z" />
          </svg>
          <svg
            className="hcl-icon-visibility-on"
            aria-label="Hide password"
            width="16"
            height="16"
            viewBox="0 0 16 11"
            style={
              !isIconVisible ? { display: 'none' } : { display: 'initial' }
            }
          >
            <path d="M8 7.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 1c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3z" />
            <path d="M8 10c2.8 0 5.1-1.5 6.9-4.6C13.1 2.5 10.8 1 8 1 5.2 1 3 2.4 1.2 5.4 2.9 8.6 5.2 10 8 10zM8 0c3.3 0 6 1.8 8.1 5.4C14 9.2 11.3 11 8 11S2 9.2 0 5.5C2 1.9 4.6 0 8 0z" />
          </svg>
        </>
      ) : (
        <>
          <Tooltip content="Show Password" direction="top" type="icon">
            <svg
              className="hcl-icon-visibility-off"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              style={
                isIconVisible ? { display: 'none' } : { display: 'initial' }
              }
            >
              <path d="M11.846 3.45L15.293.007 16 .714l-3.284 3.281c1.261.902 2.377 2.212 3.347 3.93C14.02 11.642 11.333 13.5 8 13.5c-1.392 0-2.667-.324-3.822-.973L.703 16l-.706-.708 3.323-3.32C2.071 11.042.976 9.694.035 7.924 2.012 4.308 4.667 2.5 8 2.5c1.395 0 2.677.317 3.846.95zm-6.928 8.338c.944.477 1.97.712 3.082.712 2.795 0 5.076-1.483 6.907-4.568-.866-1.417-1.833-2.486-2.91-3.219l-1.55 1.55a3 3 0 0 1-4.185 4.182l-1.344 1.343zm-.882-.533l1.518-1.517A3 3 0 0 1 9.74 5.556l1.364-1.363A7.02 7.02 0 0 0 8 3.5c-2.798 0-5.047 1.439-6.819 4.432.842 1.465 1.792 2.568 2.855 3.323zm2.948-1.532a2 2 0 0 0 2.74-2.738l-2.74 2.738zm-.707-.707l2.74-2.738a2 2 0 0 0-2.74 2.738z" />
            </svg>
          </Tooltip>
          <Tooltip content="Hide Password" direction="top" type="icon">
            <svg
              className="hcl-icon-visibility-on"
              aria-label="Hide password"
              width="16"
              height="16"
              viewBox="0 0 16 11"
              style={
                !isIconVisible ? { display: 'none' } : { display: 'initial' }
              }
            >
              <path d="M8 7.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 1c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3z" />
              <path d="M8 10c2.8 0 5.1-1.5 6.9-4.6C13.1 2.5 10.8 1 8 1 5.2 1 3 2.4 1.2 5.4 2.9 8.6 5.2 10 8 10zM8 0c3.3 0 6 1.8 8.1 5.4C14 9.2 11.3 11 8 11S2 9.2 0 5.5C2 1.9 4.6 0 8 0z" />
            </svg>
          </Tooltip>
        </>
      )}
    </button>
  );

  useEffect(() => {
    if (restProps.value || restProps.value === '') {
      setValue(restProps.value);
    }
  }, [restProps.value]);

  useEffect(() => {
    if (isIconVisible) {
      setType('text');
    } else {
      setType('password');
    }
  }, [isIconVisible]);

  return (
    <>
      <input
        ref={inputRef}
        className={classnames}
        type={typechange}
        disabled={disabled}
        {...restProps}
        value={value}
        onChange={event => {
          setValue(event.currentTarget.value);
          restProps.onChange(event);
        }}
      />
      {passwordIcon}
    </>
  );
};

Password.propTypes = {
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
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Event to subscribe when the value of the Input field changes. */
  onChange: PropTypes.func,
  /** Event to subscribe when the Input field is clicked. */
  onClick: PropTypes.func,
  /** Event to subscribe when the Input field is focused. */
  onFocus: PropTypes.func,
  /** Event to subscribe when the Input field is Blurred. */
  onBlur: PropTypes.func
};

Password.defaultProps = {
  className: '',
  disabled: false,
  onChange: () => {},
  onClick: () => {},
  onFocus: () => {},
  onBlur: () => {}
};

export default Password;
