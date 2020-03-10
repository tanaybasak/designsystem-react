import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';

export default function AccordionItem({
  title,
  expanded,
  onChange,
  onExpand,
  className,
  children,
  dataIndex,
  ...restProps
}) {
  const classnames = `${prefix}-accordion-item ${className} ${
    expanded ? 'expanded' : ''
  }`.trim();

  const [height, setHeight] = useState(0);
  const elementRef = useRef(null);
  useEffect(() => {
    if (expanded && elementRef.current) {
      setHeight(elementRef.current.clientHeight);
    } else {
      setHeight(0);
    }
  }, [expanded]);

  return (
    <li className={classnames} {...restProps}>
      <h4
        className={`${prefix}-accordion-title`}
        data-index={dataIndex}
        tabIndex="0"
        onKeyDown={event => {
          if (event.keyCode === 13) {
            onChange(event);
            onExpand(event);
          }
        }}
        onClick={event => {
          onChange(event);
          onExpand(event);
        }}
      >
        {title}
      </h4>
      <div
        className={`${prefix}-accordion-content-wrapper`}
        style={{ height: height + 'px' }}
      >
        <div className={`${prefix}-accordion-content`} ref={elementRef}>
          {children}
        </div>
      </div>
    </li>
  );
}

AccordionItem.propTypes = {
  /** Title for the Accordion Item */
  title: PropTypes.string.isRequired,
  /** True: Accordion Item in expanded mode 
  False: Accordion Item in collapsed mode */
  expanded: PropTypes.bool,
  /** Callback function that is invoked when Accordion is expanded or closed.
  Argument – event */
  onChange: PropTypes.func,
  //ignore
  onExpand: PropTypes.func,
  /** Name of the custom class to apply to the Accordion Item */
  className: PropTypes.string,
  /** Content for Accordion Item */
  children: PropTypes.any,
  /** Internally used by Accordion */
  dataIndex: PropTypes.number
};

AccordionItem.defaultProps = {
  title: null,
  expanded: false,
  onChange: () => {},
  onExpand: () => {},
  className: '',
  children: '',
  dataIndex: null
};
