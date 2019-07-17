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
  title: PropTypes.string.isRequired,
  expanded: PropTypes.bool,
  onChange: PropTypes.func,
  onExpand: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.any,
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
