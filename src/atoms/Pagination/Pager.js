import React from 'react';
import PropTypes from 'prop-types';
import { Select, SelectItem } from '../Select';

const Pager = ({
  options,
  className,
  onKeyDown,
  value,
  onChange,
  arialabel
}) => {
  return (
    <Select
      className={className ? className : ''}
      value={value ? value : undefined}
      onChange={e => {
        if (onChange) onChange(e);
      }}
      aria-label={arialabel ? arialabel : ''}
      onKeyDown={e => {
        if (onKeyDown) onKeyDown(e);
      }}
    >
      {options.map((item, idx) => {
        return <SelectItem text={item} key={idx} value={item} />;
      })}
    </Select>
  );
};

Pager.propTypes = {
  options: PropTypes.array.isRequired,
  className: PropTypes.string.isRequired,
  arialabel: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
  value: PropTypes.number
};

Pager.defaultProps = {
  options: [],
  className: '',
  arialabel: '',
  onChange: () => {},
  onKeyDown: () => {},
  value: undefined
};

export default Pager;
