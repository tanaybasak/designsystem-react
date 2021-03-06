/* eslint-disable react/self-closing-comp */
import React, { useState, cloneElement, Children } from 'react';
import PropTypes from 'prop-types';

const Wizard = React.forwardRef(
  (
    {
      activeIndex,
      className,
      children,
      linear,
      kind,
      iconType,
      currentStepLabel
    },
    ref
  ) => {
    const [lastCompletedStep, setLastCompletedStep] = useState(null);

    const childs = Children.toArray(children);

    let classnames = ['hcl-wiz-wrapper', 'desktop'];
    if (className) {
      classnames.push(className);
    }
    if (linear) {
      classnames.push('linear');
    }
    if (!linear) {
      classnames.push('nonlinear');
    }
    if (kind === 'medium') {
      classnames.push('hcl-wizard__no-title');
    } else if (kind === 'mobile') {
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

    const stepcallBack = () => {
      // if (lastCompletedStep === null || lastCompletedStep < idx) {
      //   setLastCompletedStep(idx);
      // }
      let lastCompletedStep = null;
      Children.map(childs, (child, index) => {
        if (
          child.props.status === 'completed' ||
          child.props.status === 'error'
        ) {
          lastCompletedStep = index;
        }
      });
      setLastCompletedStep(lastCompletedStep);
    };

    const modifiedChildren = Children.map(childs, (child, idx) => {
      // debugger;
      return cloneElement(child, {
        key: idx,
        index: idx,
        active: idx === activeIndex ? true : false,
        onClick:
          linear &&
          (activeIndex === null ||
            lastCompletedStep === null ||
            lastCompletedStep + 1 < idx)
            ? null
            : child.props.onClick,
        linear,
        stepcallBack,
        iconType: iconType
      });
    });

    return (
      <div className={classnames.join(' ')} ref={ref}>
        {/* // <div className={'wrapper desktop hcl-wizard__no-title'}> */}
        <div className="wiz-wrapper" role="navigation">
          <ul className="wiz-list">{modifiedChildren}</ul>
          <div className="step-names__mobile">
            <div className="step-name">{currentStepLabel}</div>
            <div className="step-description">
              {childs &&
              activeIndex !== null &&
              typeof activeIndex === 'number' &&
              !Number.isNaN(activeIndex) &&
              childs[activeIndex].props['title']
                ? childs[activeIndex].props['title']
                : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

// console.log(activeIndex);

Wizard.displayName = 'Wizard';

Wizard.propTypes = {
  /** Name of the custom class to be applied to the Step.  */
  className: PropTypes.string,
  /** Index of the Step to be selected in Wizard. */
  activeIndex: PropTypes.number,
  /** Steps can't be freely navigated until unless Step's prop, status is marked 'completed'. */
  linear: PropTypes.bool,
  /** Variants of Wizard Styles which can be used */
  kind: PropTypes.oneOf(['default', 'medium', 'mobile']),
  /** Icon Types to be be used. It can be 'icon', 'number', 'noicon' */
  iconType: PropTypes.oneOf(['icon', 'number', 'noicon']),
  /** Only applicable in mobile Variant style of Wizard. */
  currentStepLabel: PropTypes.string
};

Wizard.defaultProps = {
  className: '',
  activeIndex: null,
  linear: true,
  kind: 'default',
  iconType: 'icon',
  currentStepLabel: ''
};

export default Wizard;
