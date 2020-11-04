import React, { useState, cloneElement } from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';

function Tabs({ activeIndex, onChange, children }) {
  const [isActive, setActive] = useState(activeIndex);

  const modifiedChildren = React.Children.map(children, (child, index) => {
    if (child) {
      const { isDisabled, label, className } = child.props;
      return cloneElement(child, {
        onClick: e => {
          if (!isDisabled) {
            setActive(index);
            onChange(Object.assign({}, e, { label, tabIndex: index }));
          }
        },
        key: 'tab' + index,
        active: isActive === index,
        className: className
      });
    }
  });

  const tabContentWithProps = React.Children.map(
    modifiedChildren,
    (child, index) => {
      return (
        <div
          role="tabpanel"
          className={`${prefix}-tabs-panel ${
            index === isActive ? 'active' : ''
          }`}
        >
          {child.props.children}
        </div>
      );
    }
  );

  return (
    <section className={`${prefix}-tab`}>
      <nav data-tabs role="navigation">
        <ul role="tablist" className={`${prefix}-tabs-nav`}>
          {modifiedChildren}
        </ul>
      </nav>
      <div className={`${prefix}-tabcontent`}>{tabContentWithProps}</div>
    </section>
  );
}

Tabs.propTypes = {
  /** Index of the tab to be selected. */
  activeIndex: PropTypes.number,
  /** Accepts event handler as prop/argument. The event object passed has 'label' and 'tabIndex' keys which is used to get the current name and index of the Tab respectively.  */
  onChange: PropTypes.func,
  /** self Children i.e Tab Component. */
  children: PropTypes.node.isRequired
};

Tabs.defaultProps = {
  activeIndex: 0,
  onChange: () => {}
};

export default Tabs;
