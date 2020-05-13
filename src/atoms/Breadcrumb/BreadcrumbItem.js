import React from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';
import Link from '../Link';

function BreadcrumbItem({ onClick, children, active, href, itemClass }) {
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
      >
        {children}
      </Link>
    </li>
  );
}

BreadcrumbItem.propTypes = {
  active: PropTypes.bool,
  /** hyperlink - The URL of the link*/
  href: PropTypes.string,
  /** Class/clasess will be applied on the breadcrumb item  */
  itemClass: PropTypes.string,
  /** Callback function on selecting item*/
  onClick: PropTypes.func
};
BreadcrumbItem.defaultProps = {
  active: false,
  href: '',
  itemClass: '',
  onClick: () => {}
};

export default BreadcrumbItem;
