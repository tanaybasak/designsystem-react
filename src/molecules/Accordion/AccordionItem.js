import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';

export default function AccordionItem({
  title,
  expanded,
  onChange,
  className,
  ...restProps
}) {
  const classnames = `${`${prefix}-accordion-item ${className}`.trim()}${
    expanded ? ' expanded' : ''
  }`;
  const { dataIndex, onExpand, children } = restProps;

  const [height, setHeight] = useState('0px');
  const [overflow, setOverflow] = useState('hidden');
  const elementRef = useRef(null);
  useEffect(() => {
    if (expanded && elementRef.current) {
      if (elementRef.current.clientHeight) {
        setHeight(elementRef.current.clientHeight + 'px');
        setTimeout(() => {
          setHeight('auto');
          setOverflow('visible');
        }, 300);
      } else {
        setHeight('auto');
        setOverflow('visible');
      }
    } else {
      setHeight(elementRef.current.clientHeight + 'px');
      setTimeout(() => {
        setHeight('0px');
        setOverflow('hidden');
      }, 100);
    }
  }, [expanded]);

  return (
    <li className={classnames}>
      <div
        className={`${prefix}-accordion-title`}
        data-index={dataIndex}
        tabIndex="0"
        onKeyDown={event => {
          if (event.keyCode === 13) {
            onChange(event);
            if (onExpand) {
              onExpand(event);
            }
          } else if (event.keyCode === 38) {
            event.preventDefault();
            if (event.currentTarget.parentElement.previousElementSibling) {
              event.currentTarget.parentElement.previousElementSibling.firstChild.focus();
            } else {
              event.currentTarget.parentElement.parentElement.lastChild.firstChild.focus();
            }
          } else if (event.keyCode === 40) {
            if (event.currentTarget.parentElement.nextElementSibling) {
              event.currentTarget.parentElement.nextElementSibling.firstChild.focus();
            } else {
              event.currentTarget.parentElement.parentElement.firstChild.firstChild.focus();
            }
            event.preventDefault();
          }
        }}
        onClick={event => {
          onChange(event);
          if (onExpand) {
            onExpand(event);
          }
        }}
      >
        {title}
      </div>
      <div
        className={`${prefix}-accordion-content-wrapper`}
        style={{ height: height, overflow: overflow }}
      >
        <div className={`${prefix}-accordion-content`} ref={elementRef}>
          {children ? children : null}
        </div>
      </div>
    </li>
  );
}

AccordionItem.propTypes = {
  /** Title for the Accordion Item */
  title: PropTypes.string.isRequired,
  /** True: Accordion Item in expanded mode
   * False: Accordion Item in collapsed mode
   */
  expanded: PropTypes.bool,
  /** Callback function that is invoked when Accordion is expanded or closed.
   *
   * @event : click event
   */
  onChange: PropTypes.func,
  /** Name of the custom class to apply to the Accordion Item */
  className: PropTypes.string
};

AccordionItem.defaultProps = {
  title: null,
  expanded: false,
  onChange: () => {},
  className: ''
};
