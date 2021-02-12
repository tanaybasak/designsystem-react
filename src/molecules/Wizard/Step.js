import React from 'react';
import PropTypes from 'prop-types';
// import prefix from '../../settings';
import { User, activeUser, CheckMark, Error } from '../../util/icons';

const Step = ({
  className,
  title,
  iconClass,
  icon,
  description,
  active,
  complete,
  error,
  disabled,
  onClick,
  ...restProps
}) => {
  // active, completed, hcl-wizard__no-title
  // const classnames = ['wiz-item', 'hcl-wizard__no-title'];
  const classnames = ['wiz-item'];
  // console.log('disabled', disabled);

  if (className) {
    classnames.push(className);
  }
  if (complete && !error) {
    classnames.push('completed');
  } else if (active) {
    classnames.push('active');
  } else if (error) {
    classnames.push('error');
  } else if (disabled) {
    // console.log(restProps.index);
    classnames.push('disabled');
  }

  // {
  //   /* <div className="hcl-wizard__user">{restProps.index + 1}</div> */
  // }
  // {
  //   !complete && !iconClass && !icon && !error && !active && (
  //     <div className="hcl-wizard__user">{User}</div>
  //   );
  // }
  // {
  //   !complete && active && !icon && !iconClass && !error && (
  //     <div className="hcl-wizard__user">{activeUser}</div>
  //   );
  // }
  // {
  //   /** Complete Scenarios */
  // }
  // {
  //   complete && !iconClass && !icon && !error && (
  //     <div className="hcl-wizard__user">{CheckMark}</div>
  //   );
  // }
  // {
  //   complete && iconClass && !icon && !error && (
  //     <i className={`${iconClass}`} />
  //   );
  // }
  // {
  //   error && !complete && !iconClass && !icon && (
  //     <div className="hcl-wizard__user">{Error}</div>
  //   );
  // }
  // {
  //   iconClass && !icon && <i className={`${iconClass}`} />;
  // }

  const stateToReturn = (
    active,
    complete,
    error,
    disabled,
    iconClass,
    icon
  ) => {
    if (!complete && !iconClass && !icon && !error && !active) {
      return <div className="hcl-wizard__user">{User}</div>;
    } else if (!complete && active && !icon && !iconClass && !error) {
      return <div className="hcl-wizard__user">{activeUser}</div>;
    } else if (complete && !iconClass && !icon && !error) {
      return <div className="hcl-wizard__user">{CheckMark}</div>;
    } else if (complete && !iconClass && !icon && !error) {
      return <div className="hcl-wizard__user">{Error}</div>;
    }
    // else {
    //   return <div className="hcl-wizard__user" />;
    // }
  };
  // restProps.disabled ? console.log(restProps.onClick()) : null;
  return (
    <li className={classnames.join(' ')} onClick={onClick}>
      {/* <div className="wiz-item-container"> */}
      {
        <>
          <div className="ghost" />
          <div className="hcl-wizard-left-pane">
            <div className="hcl-wizard__icon-container">
              {stateToReturn(
                active,
                complete,
                error,
                disabled,
                iconClass,
                icon
              )}
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
  active: PropTypes.bool,
  complete: PropTypes.bool,
  error: PropTypes.bool,
  onClick: PropTypes.func,
  disabled: PropTypes.bool
};

Step.defaultProps = {
  className: '',
  title: '',
  iconClass: '',
  icon: null,
  description: '',
  onClick: () => {}
};

export default Step;
