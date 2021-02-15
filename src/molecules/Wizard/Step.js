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
    if (status === 'completed') {
      restProps.stepcallBack(restProps.index);
    }
  }, [status]);

  const handleIconRender = (active, status) => {
    if (active && status === 'completed') {
      return <div className="hcl-wizard__user">{activeUser}</div>;
    } else if (active && status === 'default') {
      return <div className="hcl-wizard__user">{activeUser}</div>;
    } else if (active && status === 'error') {
      return <div className="hcl-wizard__user">{activeUser}</div>;
    } else if (!active && status === 'completed') {
      return <div className="hcl-wizard__user">{CheckMark}</div>;
    } else if (!active && status === 'default') {
      return <div className="hcl-wizard__user">{User}</div>;
    } else if (!active && status === 'error') {
      return <div className="hcl-wizard__user">{Error}</div>;
    } else if (errorIcon) {
      return <div className="hcl-wizard__user">{errorIcon}</div>;
    } else if (completedIcon) {
      return <div className="hcl-wizard__user">{completedIcon}</div>;
    } else if (activeIcon) {
      return <div className="hcl-wizard__user">{activeIcon}</div>;
    } else if (defaultIcon) {
      return <div className="hcl-wizard__user">{defaultIcon}</div>;
    }
  };
  const handleNumberRender = () => {
    return <div className="hcl-wizard__user">{restProps.index + 1}</div>;
  };
  const handleNoIconRender = (active, status) => {
    if (active && status === 'completed') {
      return <div className="hcl-wizard__user" />;
    } else if (active && status === 'default') {
      return <div className="hcl-wizard__user" />;
    } else if (active && status === 'error') {
      return <div className="hcl-wizard__user" />;
    } else if (!active && status === 'completed') {
      return <div className="hcl-wizard__user" />;
    } else if (!active && status === 'default') {
      return <div className="hcl-wizard__user" />;
    }
  };

  const stateToReturn = (active, status) => {
    switch (restProps.iconType) {
      case 'icon':
        return handleIconRender(active, status);
      case 'number':
        return handleNumberRender();
      case 'noicon':
        return handleNoIconRender(active, status);
      default:
        break;
    }
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
              {stateToReturn(active, status)}
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
      {/* </div> */}
    </li>
  );
};

Step.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  // iconClass: PropTypes.string,
  // icon: PropTypes.element,
  description: PropTypes.string,
  active: PropTypes.bool,
  status: PropTypes.oneOf(['default', 'error', 'completed']),
  errorIcon: PropTypes.element,
  completedIcon: PropTypes.element,
  activeIcon: PropTypes.element,
  defaultIcon: PropTypes.element,
  onClick: PropTypes.func
};

Step.defaultProps = {
  active: false,
  status: 'default',
  className: '',
  title: '',
  // iconClass: '',
  // icon: null,
  description: '',
  onClick: () => {}
};

export default Step;
