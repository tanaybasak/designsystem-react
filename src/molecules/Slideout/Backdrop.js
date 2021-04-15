import React from 'react';
import PropTypes from 'prop-types';

const Backdrop = ({ children, className }) => {
  const classNames = ['hcl-backdrop'];

  if (className) {
    classNames.push(className);
  }

  return <div className={classNames.join(' ')}>{children}</div>;
};

Backdrop.propTypes = {
  className: PropTypes.string
};

Backdrop.defaultProps = {
  className: ''
};

export default Backdrop;
