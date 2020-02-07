import React from 'react';
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

  return (
    <li className={classnames} {...restProps}>
      <div
        className={`${prefix}-accordion-title`}
        data-index={dataIndex}
        onClick={event => {
          onChange(event);
          onExpand(event);
        }}
      >
        {title}
      </div>
      <div className={`${prefix}-accordion-content`}>{children}</div>
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
