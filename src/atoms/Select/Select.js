import React from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';

const Select = ({
  label,
  onChange,
  id,
  className,
  disabled,
  isGhostMode,
  ...restProps
}) => {
  const onSelect = event => {
    const itemSelected = {
      value:
        event.currentTarget.options[event.currentTarget.selectedIndex].value,
      text:
        event.currentTarget.options[event.currentTarget.selectedIndex].innerText
    };
    onChange(itemSelected);
  };

  const classnames = [`${prefix}-select`, `${prefix}-form-control`];
  if (isGhostMode) {
    classnames.push(`${prefix}-ghost-dropdown`);
  }
  if (className) {
    classnames.push(className);
  }

  return (
    <>
      {label ? <label htmlFor={id}>{label}</label> : null}
      <select
        id={id}
        disabled={disabled}
        className={classnames.join(' ')}
        onChange={onSelect}
        {...restProps}
      />
    </>
  );
};

Select.propTypes = {
  /** Label for select, if this props is not passed no label will appear. */
  label: PropTypes.string,

  /** Call back which will be invoked when selection is made.
   *
   * @signature
   * ```item``` : Object returns value and text.
   */
  onChange: PropTypes.func,

  /** Unique identifier for select component.  */
  id: PropTypes.string,

  /** Class/clasess will be applied on the parent div of Select */
  className: PropTypes.string,

  /** Disable select, if this props is not passed the select won't disable. */
  disabled: PropTypes.bool,
  /**
   * used to show select in ghost mode.
   * need to set this to **false** inorder to apply *outline* or *filled* style
   * */
  isGhostMode: PropTypes.bool
};

Select.defaultProps = {
  label: null,
  onChange: () => {},
  className: '',
  id: null,
  disabled: false,
  isGhostMode: true
};

export default Select;
