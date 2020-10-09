/* eslint-disable react/prop-types */
import React from 'react';
import prefix from '../../settings';

const Pager = (props, ref) => {
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
        ref={ref}
        value={props.value ? props.value : ''}
        onChange={e => {
          if (props.onChange) props.onChange(e);
        }}
        aria-label={props.arialabel}
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
//Warning: forwardRef render functions do not support propTypes or defaultProps. Did you accidentally pass a React component?

export default React.forwardRef(Pager);
