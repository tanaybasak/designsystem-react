import React from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';

const Pager = props => {
  if (
    !props.options &&
    !props.className &&
    !props.onChange &&
    !props.onKeyDown &&
    props.options.length <= 0 &&
    !props.value
  ) {
    return null;
  }

  return (
    <>
      <select
        className={props.className ? props.className : ''}
        value={props.value ? props.value : undefined}
        onChange={e => {
          if (props.onChange) props.onChange(e);
        }}
        aria-label={props.arialabel ? props.arialabel : ''}
        onKeyDown={e => {
          if (props.onKeyDown) props.onKeyDown(e);
        }}
      >
        {props.options.map((item, idx) => {
          return (
            <option key={idx} value={item}>
              {item}
            </option>
          );
        })}
      </select>
      <svg
        className={`${prefix}-select-arrow`}
        width="10"
        height="5"
        viewBox="0 0 10 5"
      >
        <path d="M0 0l5 4.998L10 0z" fillRule="evenodd" />
      </svg>
    </>
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
