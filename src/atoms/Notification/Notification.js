import React from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';
import { Info, Success, Danger, Warning, Close } from '../../util/icons';

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
  const classnames = `${prefix}-notification ${
    type ? prefix + '-' + type : ''
  } ${className}`.trim();
  return visible ? (
    <div className={classnames} role="alert">
      <div className={`${prefix}-notification-body`}>
        <div className={`${prefix}-notification-icon-container`}>
          {icon || useIcon(type)}
        </div>
        <div className={`${prefix}-notification-text-wrapper`}>
          <p className={`${prefix}-notification-title`}>{title}</p>
          <div className={`${prefix}-notification-subtitle`}>{subtitle}</div>
        </div>
      </div>
      {closable ? (
        <button
          className={`${prefix}-notification-close`}
          type="button"
          aria-label="close"
          onClick={onClose}
        >
          {Close}
        </button>
      ) : null}
    </div>
  ) : null;
}

Notification.propTypes = {
  /** Notification Title */
  title: PropTypes.string,
  /** Notification Type. eg :  danger, info, success, warning*/
  type: PropTypes.oneOf(['danger', 'info', 'success', 'warning']).isRequired,
  /** Notification Sub Title */
  subtitle: PropTypes.node,
  /** Class/clasess will be applied on the parent div of Notification  */
  className: PropTypes.string,
  /** Notification Icon */
  icon: PropTypes.element,
  /** to show close icon in notification */
  closable: PropTypes.bool,
  /** to show notification */
  visible: PropTypes.bool.isRequired,
  /** Callback to invoke when a notification is closed.
   *
   * @event: callback event is sent.
   */
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
