import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { User, activeUser, CheckMark, Error } from '../../util/icons';

const Step = ({
  className,
  title,
  description,
  active,
  status,
  onClick,
  linear,
  iconType,
  stepcallBack,
  errorIcon,
  completedIcon,
  defaultIcon,
  activeIcon,
  ...restProps
}) => {
  // active, completed, hcl-wizard__no-title
  // const classnames = ['wiz-item', 'hcl-wizard__no-title'];
  const classnames = ['wiz-item'];
  // console.log('disabled', disabled);

  if (className) {
    classnames.push(className);
  }
  if (active) {
    classnames.push('active');
  }
  switch (status) {
    case 'error':
      classnames.push('error');
      break;
    case 'completed':
      classnames.push('completed');
      break;
    default:
      break;
  }

  useEffect(() => {
    // console.log(restProps.index, 'trigger in step', status);
    // if (status === 'completed') {
    if (linear) stepcallBack();
    // }
  }, [status, linear]);

  const handleIconRender = (active, status) => {
    if (active) {
      return activeIcon;
    } else if (status === 'completed') {
      return completedIcon;
    } else if (status === 'error') {
      return errorIcon;
    } else if (status === 'default') {
      return defaultIcon;
    }
  };
  const handleNumberRender = (active, status) => {
    if (active || status === 'default') {
      return restProps.index + 1;
    } else if (status === 'error') {
      return errorIcon;
    } else if (status === 'completed') {
      return completedIcon;
    }
  };
  const handleNoIconRender = () => {
    return null;
  };

  const stateToReturn = (active, status) => {
    switch (iconType) {
      case 'icon':
        return handleIconRender(active, status);
      case 'number':
        return handleNumberRender(active, status);
      case 'noicon':
        return handleNoIconRender();
      default:
        break;
    }
  };

  return (
    <li
      className={classnames.join(' ')}
      onClick={onClick}
      aria-current={active}
      {...restProps}
    >
      <button
        tabIndex={
          linear ? (status === 'completed' || status === 'error' ? 0 : -1) : 0
        }
      >
        {
          <>
            <div className="ghost" />
            <div className="hcl-wizard-left-pane">
              <div className="hcl-wizard__icon-container">
                <div className="hcl-wizard__user">
                  {stateToReturn(active, status)}
                </div>
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
            {
              <div className="wiz-no-icon-container">
                <span className="no-icon-container">
                  <span className="no-icon-child" />
                </span>
              </div>
            }
          </>
        }
        <div className="wiz-content">
          {<span className="wiz-title">{title}</span>}
          {<span className="wiz-description">{description}</span>}
        </div>
      </button>
    </li>
  );
};

Step.propTypes = {
  /** Name of the custom class to be applied to the Step.  */
  className: PropTypes.string,
  /**
   * * ```true``` : ‘active’ class is added the Step.
   * * ```false``` : ‘active’ is removed from the Step.
   * */
  active: PropTypes.bool,
  /** status of the Step. It can be of - 'default', 'error', 'completed' */
  status: PropTypes.oneOf(['default', 'error', 'completed']),
  /** Title for the Step */
  title: PropTypes.string,
  /** Description for the Step */
  description: PropTypes.string,
  /** An active Icon which can be given to each Step - It can be of image, svg, font icons */
  activeIcon: PropTypes.node,
  /** An error Icon which can be given to each Step - It can be of image, svg, font icons */
  errorIcon: PropTypes.node,
  /** A completed Icon which can be given to each Step - It can be of image, svg, font icons */
  completedIcon: PropTypes.node,
  /** Default Icon which can be given to each Step - It can be of image, svg, font icons */
  defaultIcon: PropTypes.node,
  /** @ignore */
  linear: PropTypes.bool,
  /** @ignore */
  stepcallBack: PropTypes.func,
  /** @ignore */
  iconType: PropTypes.oneOf(['icon', 'number', 'noicon']),
  /** Event to subscribe when Step is clicked.
   *
   * @signature
   * ```event``` : click
   */
  onClick: PropTypes.func
};

Step.defaultProps = {
  className: '',
  active: false,
  status: 'default',
  title: '',
  description: '',
  activeIcon: activeUser,
  errorIcon: Error,
  completedIcon: CheckMark,
  defaultIcon: User,
  linear: true,
  stepcallBack: null,
  iconType: 'icon',
  onClick: () => {}
};

export default Step;
