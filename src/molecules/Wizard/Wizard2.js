/* eslint-disable react/self-closing-comp */
import React, {
  useState,
  useRef,
  useEffect,
  cloneElement,
  Children
} from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';

// eslint-disable-next-line no-unused-vars
const Wizard = ({ direction, activeIndex, className, children }) => {
  const [currentActiveIdx, setActiveIdx] = useState(activeIndex || 0);
  const compRef = useRef(null);

  const childrencount = Children.count(children);

  useEffect(() => {
    if (activeIndex > -1 && activeIndex <= childrencount - 1) {
      setActiveIdx(activeIndex);
    }
  }, [activeIndex]);

  useEffect(() => {
    if (compRef.current) {
      const resizeObserver = new ResizeObserver(entries => {
        console.log('Hello World2', entries);
        var defaultBreakpoints = {
          SM: 375,
          MD: 768,
          LG: 1024,
          XL: 1280
        };
        entries.forEach(function (entry) {
          // If breakpoints are defined on the observed element,
          // use them. Otherwise use the defaults.
          var breakpoints = Object.keys(defaultBreakpoints);
          for (const breakpoint of breakpoints) {
            var minWidth = breakpoints[breakpoint];
            if (entry.contentRect.width >= minWidth) {
              entry.target.classList.add(breakpoint);
            } else {
              entry.target.classList.remove(breakpoint);
            }
          }
        });
      });
      resizeObserver.observe(compRef.current);
    }
  }, []);

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

  const modifiedChildren = Children.map(children, (child, idx) => {
    return cloneElement(child, {
      key: idx,
      index: idx,
      current: currentActiveIdx === idx,
      complete: idx <= currentActiveIdx,
      title: child.props.title ? child.props.title : null,
      description: child.props.description ? child.props.description : null,
      icon: child.props.icon ? child.props.icon : null
    });
  });

  return (
    <div className={'wrapper desktop'}>
      <div ref={compRef} className="wiz-wrapper">
        <ul role="tablist" className="wiz-list">
          {modifiedChildren}
        </ul>
        <div className="step-names__mobile">
          <div className="step-name">
            Step {1} of {6}
          </div>
          <div className="step-description">{'Basic'}</div>
        </div>
      </div>
      {/* Desktop Layout */}
      {/* <div className="hcl-wizard wiz-horizontal">
        <div className="hcl-wizard__item active completed">
          <div className="ghost"></div>
          <div className="hcl-wizard-left-pane">
            <div className="hcl-wizard__icon-container">
              <div className="hcl-wizard__user">1</div>
            </div>
          </div>
          <div className="hcl-wizard-right-pane">
            <div className="hcl-wizard__title">
              {'Little lillies Little lillies Little lillies'}
            </div>
            <div className="hcl-wizard__description">
              {"It's flowering always"}
            </div>
          </div>
        </div>
        <div className="hcl-wizard__item ">
          <div className="ghost"></div>
          <div className="hcl-wizard-left-pane">
            <div className="hcl-wizard__icon-container">
              <div className="hcl-wizard__user">2</div>
            </div>
          </div>
          <div className="hcl-wizard-right-pane">
            <div className="hcl-wizard__title">{'Address'}</div>
            <div className="hcl-wizard__description">
              {'Input your present address'}
            </div>
          </div>
        </div>
      </div> */}
      {/* Desktop Layout */}
    </div>
  );
};

Wizard.propTypes = {
  direction: PropTypes.oneOf(['horizontal', 'vertical']),
  className: PropTypes.string,
  activeIndex: PropTypes.number
};

Wizard.defaultProps = {
  direction: 'horizontal',
  className: '',
  activeIndex: 0
};

export default Wizard;
