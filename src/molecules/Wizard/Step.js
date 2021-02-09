import React from 'react';
import PropTypes from 'prop-types';
// import prefix from '../../settings';

const Step = ({
  className,
  title,
  iconClass,
  icon,
  description,
  current,
  complete,
  ...restProps
}) => {
  // active, completed, hcl-wizard__no-title
  // const classnames = ['wiz-item', 'hcl-wizard__no-title'];
  const classnames = ['wiz-item'];
  if (className) {
    classnames.push(className);
  }
  if (complete) {
    classnames.push('completed');
  }
  if (current) {
    classnames.push('active');
  }
  return (
    <li className={classnames.join(' ')} onClick={restProps.onClick}>
      {/* <div className="wiz-item-container"> */}
      {
        <>
          <div className="ghost" />
          <div className="hcl-wizard-left-pane">
            <div className="hcl-wizard__icon-container">
              <div className="hcl-wizard__user">{restProps.index + 1}</div>
            </div>
          </div>
          <div className={`hcl-wizard-right-pane`}>
            <div
              className={`hcl-wizard__title ${
                !description ? 'no-description' : ''
              }`}
            >
              {title}
            </div>
            {description && (
              <div className={`hcl-wizard__description`}>{description}</div>
            )}
          </div>
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
            <div className="wiz-no-icon-container">
              <span className="no-icon-container">
                <span className="no-icon-child" />
              </span>
            </div>
          )}
        </>
      }
      <div className="wiz-content">
        {<span className="wiz-title">{title}</span>}
        {<span className="wiz-description">{description}</span>}
      </div>
      {/* </div> */}
    </li>
  );
};

Step.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  iconClass: PropTypes.string,
  icon: PropTypes.element,
  description: PropTypes.string,
  current: PropTypes.bool,
  complete: PropTypes.bool,
  onClick: PropTypes.func
};

Step.defaultProps = {
  className: '',
  title: '',
  iconClass: '',
  icon: null,
  description: ''
  // onClick: () => {}
};

export default Step;
