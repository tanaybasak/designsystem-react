import React from 'react';
import PropTypes from 'prop-types';

const Link = ({ className, children, href, ...restProps }) => {
  return (
    <a className={className} href={href} {...restProps}>
      {children}
    </a>
  );
};

Link.propTypes = {
  /** Link content */
  children: PropTypes.node,
  /** Class/clasess will be applied on the link  */
  className: PropTypes.string,
  /** hyperlink - The URL of the link*/
  href: PropTypes.string,
  /** Callback function on click event*/
  onClick: PropTypes.func
};

Link.defaultProps = {
  children: null,
  className: '',
  href: '#',
  onClick: () => {}
};

export default Link;
