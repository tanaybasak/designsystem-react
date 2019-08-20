import React from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';

const Notification = ({
  title,
  type,
  subtitle,
  className,
  closable,
  onClose,
  visible
}) => {
  const classnames = `${prefix}-notification ${prefix}-${type} ${className}`.trim();

  return visible ? (
    <div className={classnames} role="alert">
      <div className={`${prefix}-notification-body`}>
        <svg
          focusable="false"
          preserveAspectRatio="xMidYMid meet"
          style={{ willChange: 'transform' }}
          xmlns="http://www.w3.org/2000/svg"
          className={`${prefix}-notification-icon`}
          width="20"
          height="20"
          viewBox="0 0 32 32"
          aria-hidden="true"
        >
          <path d="M16 2a14 14 0 1 0 14 14A14 14 0 0 0 16 2zm0 5a1.5 1.5 0 1 1-1.5 1.5A1.5 1.5 0 0 1 16 7zm4 17.12h-8v-2.24h2.88v-6.76H13v-2.24h4.13v9H20z" />
        </svg>
        <div className={`${prefix}-notification-text-wrapper`}>
          <p className={`${prefix}-notification-title`}>{title}</p>
          <p className={`${prefix}-notification-subtitle`}>{subtitle}</p>
        </div>
      </div>
      {closable ? (
        <button
          className={`${prefix}-notification-close`}
          type="button"
          aria-label="close"
          onClick={onClose}
        />
      ) : null}
    </div>
  ) : null;
};

Notification.propTypes = {
  title: PropTypes.string,
  type: PropTypes.oneOf(['error', 'info', 'success', 'warning']).isRequired,
  subtitle: PropTypes.string,
  className: PropTypes.string,
  closable: PropTypes.bool,
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func
};

Notification.defaultProps = {
  title: '',
  subtitle: '',
  className: '',
  closable: true,
  onClose: () => {}
};

export default Notification;
