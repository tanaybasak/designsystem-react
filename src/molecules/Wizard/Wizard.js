/* eslint-disable react/self-closing-comp */
import React, { useState, cloneElement, Children } from 'react';
import PropTypes from 'prop-types';

const Wizard = React.forwardRef(
  ({ activeIndex, className, children, linear, type, iconType }, ref) => {
    // const [currentActiveIdx, setActiveIdx] = useState(activeIndex || 0);
    // const compRef = useRef(null);
    // const prevShow = usePrevious(currentActiveIdx);

    const [lastCompletedStep, setLastCompletedStep] = useState(null);

    const childrencount = Children.count(children);
    const childs = Children.toArray(children);

    let classnames = ['hcl-wiz-wrapper', 'desktop'];
    if (className) {
      classnames.push(className);
    }
    if (type === 'style2') {
      classnames.push('hcl-wizard__no-title');
    } else if (type === 'style3') {
      classnames = classnames.filter(
        e => e != 'desktop' && e != 'hcl-wizard__no-title'
      );
    }
    if (iconType === 'noicon') {
      classnames.push('no-icon');
    } else if (iconType === 'number') {
      classnames.push('number');
    }

    // if (direction === 'horizontal') {
    //   classnames.push(`wiz-horizontal`);
    // }
    // if (direction === 'vertical') {
    //   classnames.push(`wiz-vertical`);
    // }

    const stepcallBack = idx => {
      if (lastCompletedStep === null || lastCompletedStep < idx) {
        setLastCompletedStep(idx);
      }
    };

    const modifiedChildren = Children.map(childs, (child, idx) => {
      return cloneElement(child, {
        key: idx,
        index: idx,
        active: idx === activeIndex ? true : false,
        onClick:
          linear && lastCompletedStep + 1 < idx ? null : child.props.onClick,
        stepcallBack,
        iconType: iconType
      });
    });

    1 < 0;
    1 < 1;
    1 < 2;

    const mobileFormat = () => {
      return `Step ${activeIndex + 1} of ${childrencount}`;
    };

    return (
      <div className={classnames.join(' ')} ref={ref}>
        {/* // <div className={'wrapper desktop hcl-wizard__no-title'}> */}
        <div className="wiz-wrapper">
          <ul role="tablist" className="wiz-list">
            {modifiedChildren}
          </ul>
          <div className="step-names__mobile">
            <div className="step-name">
              {activeIndex > -1 ? mobileFormat : null}
            </div>
            <div className="step-description">
              {childs && activeIndex > -1 && childs[activeIndex].props['title']
                ? childs[activeIndex].props['title']
                : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

Wizard.displayName = 'Wizard';

Wizard.propTypes = {
  className: PropTypes.string,
  activeIndex: PropTypes.number,
  linear: PropTypes.bool,
  type: PropTypes.oneOf(['style1', 'style2', 'style3']),
  iconType: PropTypes.oneOf(['icon', 'number', 'noicon'])
};

Wizard.defaultProps = {
  className: '',
  activeIndex: -1,
  linear: true,
  type: 'style1',
  iconType: 'icon'
};

export default Wizard;
