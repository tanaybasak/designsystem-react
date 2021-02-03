import React, { useState, useEffect, cloneElement, Children } from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';
import Step from './Step';

// eslint-disable-next-line no-unused-vars
const Wizard = ({
  direction,
  model,
  readOnly,
  activeIndex,
  className,
  children
}) => {
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

  const renderList = () => {
    return model && model.length
      ? model.map((item, idx) => {
          return (
            <li key={idx} className="wiz-item">
              <div className="wiz-item-container">
                {<span className="wiz-icon">{item.title}</span>}
                <div className="wiz-content">
                  {<span className="wiz-title">{item.title}</span>}
                  {<span className="wiz-description">{item.description}</span>}
                </div>
              </div>
            </li>
          );
        })
      : null;
  };

  const modifiedChildren = Children.map(children, (child, idx) => {
    return cloneElement(child, {
      key: idx,
      title: child.props.title ? child.props.title : null,
      description: child.props.description ? child.props.description : null,
      icon: child.props.icon ? child.props.icon : null
    });
  });

  return (
    <div className="wiz-wrapper">
      <ul role="tablist" className="wiz-list">
        {modifiedChildren}
      </ul>
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
