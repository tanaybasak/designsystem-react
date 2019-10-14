import React from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';
import { Info, Success, Danger, Warning } from '../../util/icons';

const useIcon = kindProp =>
  ({
    danger: Danger,
    success: Success,
    warning: Warning,
    info: Info
  }[kindProp]);

export default function Notification({
  title,
  type,
  subtitle,
  className,
  icon,
  closable,
  onClose,
  visible
}) {
  const classnames = `${prefix}-notification ${prefix}-${type} ${className}`.trim();

  return visible ? (
    <div className={classnames} role="alert">
      <div className={`${prefix}-notification-body`}>
        {icon || useIcon(type)}
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
}

Notification.propTypes = {
  title: PropTypes.string,
  type: PropTypes.oneOf(['danger', 'info', 'success', 'warning']).isRequired,
  subtitle: PropTypes.string,
  className: PropTypes.string,
  icon: PropTypes.element,
  closable: PropTypes.bool,
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func
};

Notification.defaultProps = {
  title: '',
  subtitle: '',
  className: '',
  icon: null,
  closable: true,
  onClose: () => {}
};
