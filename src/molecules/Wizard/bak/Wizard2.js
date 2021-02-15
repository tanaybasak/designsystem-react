/* eslint-disable react/self-closing-comp */
import React, {
  useState,
  useRef,
  useEffect,
  cloneElement,
  Children
} from 'react';
import PropTypes from 'prop-types';
import prefix from '../../../settings';

function usePrevious(value) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

const Wizard2 = React.forwardRef(
  (
    {
      activeIndex,
      className,
      children,
      nonlinear,
      titleBelow,
      responsive
      // clickable
    },
    ref
  ) => {
    // const [currentActiveIdx, setActiveIdx] = useState(activeIndex || 0);
    const [isDesktopNoIconMode, setisDesktopNoIconMode] = useState(true);
    // const compRef = useRef(null);
    // const prevShow = usePrevious(currentActiveIdx);

    const childrencount = Children.count(children);
    const childs = Children.toArray(children);

    useEffect(() => {
      if (childs && childrencount > 0) {
        let y = childs.every(item => {
          const { icon, iconClass } = item.props;
          return icon === null && iconClass === '';
        });
        setisDesktopNoIconMode(y);
        // console.log(isDesktopNoIconMode);
      }
    }, [childs]);

    // useEffect(() => {
    //   if (activeIndex > -1 && activeIndex <= childrencount - 1) {
    //     setActiveIdx(activeIndex);
    //   }
    // }, [activeIndex]);

    // useEffect(() => {
    //   if (compRef.current) {
    //     const resizeObserver = new ResizeObserver(entries => {
    //       console.log('Hello World2', entries);
    //       var defaultBreakpoints = {
    //         SM: 375,
    //         MD: 768,
    //         LG: 1024,
    //         XL: 1280
    //       };
    //       entries.forEach(function (entry) {
    //         // If breakpoints are defined on the observed element,
    //         // use them. Otherwise use the defaults.
    //         var breakpoints = Object.keys(defaultBreakpoints);
    //         for (const breakpoint of breakpoints) {
    //           var minWidth = breakpoints[breakpoint];
    //           if (entry.contentRect.width >= minWidth) {
    //             entry.target.classList.add(breakpoint);
    //           } else {
    //             entry.target.classList.remove(breakpoint);
    //           }
    //         }
    //       });
    //     });
    //     resizeObserver.observe(compRef.current);
    //   }
    // }, []);

    let classnames = ['wrapper', 'desktop'];
    if (className) {
      classnames.push(className);
    }
    if (titleBelow) {
      classnames.push('hcl-wizard__no-title');
    }
    // if (isDesktopNoIconMode) {
    //   classnames.push('no-icon');
    // }
    if (responsive) {
      classnames = classnames.filter(
        e => e != 'desktop' && e != 'hcl-wizard__no-title'
      );
    }
    // if (direction === 'horizontal') {
    //   classnames.push(`wiz-horizontal`);
    // }
    // if (direction === 'vertical') {
    //   classnames.push(`wiz-vertical`);
    // }
    const modifiedChildren = Children.map(childs, (child, idx) => {
      const state = {
        index: idx,
        active: false,
        complete: false,
        error: false,
        disabled: false
      };

      if (!nonlinear && activeIndex === idx) {
        console.log(activeIndex);
        state.active = true;
      } else if (!nonlinear && activeIndex > idx) {
        state.complete = true;
      } else if (!nonlinear && idx + 1 >= activeIndex) {
        state.disabled = true;
      }
      // console.log('disabled', state.disabled);

      // m
      // if (activeIndex === idx) {
      //   state.active = true;
      // }
      // if (!nonlinear && activeIndex > idx) {
      //   state.complete = true;
      // }

      // if (activeIndex === idx) {
      //   state.current = true;
      // }
      // if (linear) {
      //   state.active = currentActiveIdx === idx;
      //   state.complete = idx <= currentActiveIdx;
      // }
      // if (!linear) {
      //   state.current =
      // }

      return cloneElement(child, {
        key: idx,
        // index: idx,
        // current: currentActiveIdx === idx,
        // complete: idx <= currentActiveIdx,
        // onClick: e => {
        //   if (onChange) {
        //     setActiveIdx(activeIndex);
        //     onChange(e, idx);
        //   }
        // },

        // title: child.props.title ? child.props.title : null,
        // description: child.props.description ? child.props.description : null,
        // icon: child.props.icon ? child.props.icon : null,
        ...state,
        ...child.props
        // onClick: () => {
        //   if (!nonlinear && !state.disabled) {
        //     console.log('came in ?');
        //     setActiveIdx(idx);
        //     // child.props.onClick(e, idx);
        //     // }
        //   }
        // }
      });
    });

    return (
      <div className={classnames.join(' ')} ref={ref}>
        {/* // <div className={'wrapper desktop hcl-wizard__no-title'}> */}
        <div className="wiz-wrapper">
          <ul role="tablist" className="wiz-list">
            {modifiedChildren}
          </ul>
          <div className="step-names__mobile">
            <div className="step-name">
              Step {activeIndex + 1} of {childrencount}
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
  }
);

Wizard2.displayName = 'Wizard2';

Wizard2.propTypes = {
  className: PropTypes.string,
  activeIndex: PropTypes.number,
  onChange: PropTypes.func,
  nonlinear: PropTypes.bool,
  // clickable: PropTypes.bool,
  titleBelow: PropTypes.bool,
  responsive: PropTypes.bool
};

Wizard2.defaultProps = {
  className: '',
  activeIndex: 0,
  onChange: () => {},
  // clickable: true,
  nonlinear: false,
  responsive: false
};

/*
nonlinear false linear true
nonlinear true linear false
*/

export default Wizard2;
