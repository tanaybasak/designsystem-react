import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// import prefix from '../../settings';

const Step = ({ stepClass, title, iconClass, icon, description }) => {
  const classnames = ['wiz-item'];
  if (stepClass) {
    classnames.push(stepClass);
  }
  return (
    <li className={classnames.join(' ')}>
      <div className="wiz-item-container">
        {
          <>
            {icon || iconClass ? (
              <span className="wiz-icon-container">
                {icon ? (
                  <span className="img-container">{icon}</span>
                ) : iconClass ? (
                  <span className="icon-class-container">
                    <i className={iconClass} />
                  </span>
                ) : null}
              </span>
            ) : (
              <span className="wiz-no-icon-container">
                <span className="no-icon-container">
                  <span className="no-icon-child" />
                </span>
              </span>
            )}
          </>
        }
        <div className="wiz-content">
          {<span className="wiz-title">{title}</span>}
          {<span className="wiz-description">{description}</span>}
        </div>
      </div>
    </li>
  );
};

Step.propTypes = {
  stepClass: PropTypes.string,
  title: PropTypes.string,
  iconClass: PropTypes.string,
  icon: PropTypes.element,
  description: PropTypes.string
};

Step.defaultProps = {
  stepClass: '',
  title: '',
  iconClass: '',
  icon: null,
  description: ''
};

export default Step;
