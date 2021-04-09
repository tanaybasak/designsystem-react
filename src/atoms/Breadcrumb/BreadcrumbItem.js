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
  let breadcrumbStyle = [`${prefix}-breadcrumb-item`];
  if (itemClass) {
    breadcrumbStyle.push(itemClass);
  }
  if (active) {
    breadcrumbStyle.push(`${prefix}-breadcrumb-item-active`);
  }

  return (
    <li className={breadcrumbStyle.join(' ')} {...restProps}>
      <Link
        href={href ? href : null}
        className={`${prefix}-link`}
        tabIndex="0"
        onClick={onClick}
      >
        {children}
      </Link>
    </li>
  );
}

BreadcrumbItem.propTypes = {
  /**
   *
   * ```hyperlink``` : The URL of the link*/
  href: PropTypes.string,
  /** Class/clasess will be applied on the breadcrumb item  */
  itemClass: PropTypes.string,
  /** @ignore */
  active: PropTypes.bool,
  /** Callback function on selecting item - (to be deprecated soon, instead use onSelection in Breadcrumb component )
   *
   * @signature
   * ```event``` : callback event upon click
   */
  onClick: PropTypes.func
};
BreadcrumbItem.defaultProps = {
  href: '',
  itemClass: '',
  active: false,
  onClick: () => {}
};

export default BreadcrumbItem;
