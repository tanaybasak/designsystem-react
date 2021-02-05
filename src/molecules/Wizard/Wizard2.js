import React, {
  useState,
  useRef,
  useEffect,
  cloneElement,
  Children
} from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';
// import Step from './Step';

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
  const compRef = useRef(null);

  useEffect(() => {
    if (activeIndex > -1) {
      setActiveIdx(activeIndex);
    }
  }, [activeIndex]);

  useEffect(() => {
    if (compRef.current) {
      debugger;
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
          var breakpoints = defaultBreakpoints;

          // Update the matching breakpoints on the observed element.
          Object.keys(breakpoints).forEach(function (breakpoint) {
            var minWidth = breakpoints[breakpoint];
            if (entry.contentRect.width >= minWidth) {
              entry.target.classList.add(breakpoint);
            } else {
              entry.target.classList.remove(breakpoint);
            }
          });
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

  // const renderList = () => {
  //   return model && model.length
  //     ? model.map((item, idx) => {
  //         return (
  //           <li key={idx} className="wiz-item">
  //             <div className="wiz-item-container">
  //               {<span className="wiz-icon">{item.title}</span>}
  //               <div className="wiz-content">
  //                 {<span className="wiz-title">{item.title}</span>}
  //                 {<span className="wiz-description">{item.description}</span>}
  //               </div>
  //             </div>
  //           </li>
  //         );
  //       })
  //     : null;
  // };

  const modifiedChildren = Children.map(children, (child, idx) => {
    return cloneElement(child, {
      key: idx,
      title: child.props.title ? child.props.title : null,
      description: child.props.description ? child.props.description : null,
      icon: child.props.icon ? child.props.icon : null
    });
  });

  return (
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
