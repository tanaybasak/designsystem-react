import React from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';
import Link from '../Link';

function BreadcrumbItem({
  onClick,
  children,
  href,
  itemClass,
  active,
  ...restProps
}) {
  const defaultStyle = {
    breadcrumbItem: `${prefix}-breadcrumb-item`,
    breadcrumbLink: `${prefix}-link`
  };

  return (
    <li
      className={`${defaultStyle.breadcrumbItem} ${
        itemClass ? itemClass : ''
      } ${active ? prefix + '-breadcrumb-item-active' : ''}`}
      onClick={onClick}
    >
      <Link
        href={href ? href : null}
        className={`${defaultStyle.breadcrumbLink}`}
        tabIndex="0"
        onKeyDown={event => {
          if (event.keyCode === 13) {
            onClick(event);
          }
        }}
      >
        {children}
      </Link>
    </li>
  );
}

BreadcrumbItem.propTypes = {
  /** hyperlink - The URL of the link*/
  href: PropTypes.string,
  /** Class/clasess will be applied on the breadcrumb item  */
  itemClass: PropTypes.string,
  /** active state of a breadcrumb item  */
  active: PropTypes.bool,
  /** Callback function on selecting item*/
  onClick: PropTypes.func
};
BreadcrumbItem.defaultProps = {
  href: '',
  itemClass: '',
  active: false,
  onClick: () => {}
};

export default BreadcrumbItem;
