/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import PropTypes from 'prop-types';

export default function Icon({ type, src, children, ...restProps }) {
  return type === 'img' ? (
    <img src={src} {...restProps} />
  ) : (
    <svg {...restProps}>{children}</svg>
  );
}

const check = ({ type, children, src }, propName, componentName) => {
  if (propName === 'children' && type === 'svg' && !children) {
    return new Error(
      `The prop \`${propName}\` is marked as required in \`${componentName}\`, but its value is \`null\`.`
    );
  } else if (propName === 'src' && type === 'img' && !src) {
    return new Error(
      `The prop \`${propName}\` is marked as required in \`${componentName}\`, but its value is \`null\`.`
    );
  }
};

Icon.propTypes = {
  /** Used to define the type of icon */
  type: PropTypes.oneOf(['img', 'svg']).isRequired,
  /** Specifies an alternate text for an image */
  alt: PropTypes.string.isRequired,
  /** A tooltip text for an element */
  title: PropTypes.string.isRequired,
  /** Icon classname */
  className: PropTypes.string,
  /** Specifies the path to the image */
  src: check,
  /** Callback function on click
   *
   * @event : callback on click
   */
  onClick: PropTypes.func,
  /** used to pass svg content */
  children: check
};

Icon.defaultProps = {
  className: '',
  src: null,
  onClick: () => {},
  children: null
};
