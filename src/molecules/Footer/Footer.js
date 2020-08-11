import React from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';

const Footer = ({ className, caption, links, onClick, ...restProps }) => {
  const classnames = `${prefix}-footer ${className}`.trim();

  return (
    <footer className={classnames} {...restProps}>
      <div className={`${prefix}-footer-caption`}>{caption}</div>
      <ul className={`${prefix}-footer-navigation`}>
        {links.map(({ label, href, className, ...props }, index) => (
          <li
            className={`${prefix}-navigation-item`}
            key={`footer-navigation-item-${index}`}
          >
            <a
              href={href || '#'}
              className={`${prefix}-link${className ? ' ' + className : ''}`}
              data-index={index}
              data-label={label}
              onClick={onClick}
              {...props}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </footer>
  );
};

Footer.propTypes = {
  /** Custom class for Footer Component */
  className: PropTypes.string,
  /** Caption for Footer Component */
  caption: PropTypes.string,
  /** List of links for Footer Component */
  links: PropTypes.array,
  /** Callback function for on click of links in Footer Component */
  onClick: PropTypes.func
};

Footer.defaultProps = {
  className: '',
  caption: '',
  links: [],
  onClick: () => {}
};

export default Footer;
