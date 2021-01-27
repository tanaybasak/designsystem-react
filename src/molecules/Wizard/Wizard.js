import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';

// eslint-disable-next-line no-unused-vars
const Wizard = ({ direction, model, readOnly, activeIndex, className }) => {
  const [currentActiveIdx, setActiveIdx] = useState(activeIndex || 0);

  useEffect(() => {
    if (activeIndex > -1) {
      setActiveIdx(activeIndex);
    }
  }, [activeIndex]);

  let classnames = [`${prefix}-wizard`];
  if (className) {
    classnames.push(className);
  }
  if (direction === 'horizontal') {
    classnames.push(`wiz-horizontal`);
  }
  if (direction === 'vertical') {
    classnames.push(`wiz-vertical`);
  }

  return (
    <div className={classnames.join(' ')}>
      {model.map((item, idx) => {
        let newClass = [];
        if (currentActiveIdx === idx) {
          newClass.push('active');
        }
        if (idx <= currentActiveIdx) {
          newClass.push('completed');
        }
        newClass.push(`hcl-wizard__no-title`);

        return (
          <div
            className={`${prefix}-wizard__item ${newClass.join(' ')}`}
            key={idx}
          >
            <div className={`${prefix}-wizard-left-pane`}>
              <div className={`${prefix}-wizard__icon-container`}>
                {item.iconClass && !item.icon && (
                  <i className={`${item.iconClass}`} />
                )}
                {item.icon && !item.iconClass && item.icon}
                {!item.icon && !item.iconClass && (
                  <div className={`${prefix}-wizard__user`}>{idx + 1}</div>
                )}
              </div>
            </div>
            <div className={`${prefix}-wizard-right-pane`}>
              <div className={`${prefix}-wizard__title`}>{item.title}</div>
              <div className={`${prefix}-wizard__description`}>
                {item.description}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

Wizard.propTypes = {
  direction: PropTypes.oneOf(['horizontal', 'vertical']),
  className: PropTypes.string,
  model: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
      icon: PropTypes.node,
      iconClass: PropTypes.string
    })
  ),
  activeIndex: PropTypes.number,
  readOnly: PropTypes.bool
};

Wizard.defaultProps = {
  direction: 'horizontal',
  className: '',
  model: [],
  activeIndex: 0,
  readOnly: true
};

export default Wizard;
