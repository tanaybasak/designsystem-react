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

export default function Toast({
  className,
  type,
  title,
  subtitle,
  caption,
  iconDescription,
  icon,
  onClose,
  closable,
  visible,
  ...restProps
}) {
  const classnames = `${prefix}-toast ${prefix}-toast-${type} ${className}`.trim();

  return visible ? (
    <div className={classnames} role="alert" {...restProps}>
      <div className={`${prefix}-toast-icon-container`}>
        {icon || useIcon(type)}
      </div>
      <div className={`${prefix}-toast-details`}>
        <h3 className={`${prefix}-toast-title`}>{title}</h3>
        <div className={`${prefix}-toast-subtitle`}>{subtitle}</div>
        {caption ? (
          <div className={`${prefix}-toast-caption`}>{caption}</div>
        ) : null}
      </div>
      {closable ? (
        <button
          className={`${prefix}-toast-close`}
          title={iconDescription}
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

Toast.propTypes = {
  /** Custom class for Toast Component */
  className: PropTypes.string,
  /** Type of Toast Component */
  type: PropTypes.oneOf(['danger', 'info', 'success', 'warning']).isRequired,
  /** Title for Toast Component */
  title: PropTypes.string,
  /** Subtitle for Toast Component */
  subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  /** Caption for Toast Component */
  caption: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  /** Icon for Toast Component */
  icon: PropTypes.element,
  /** Icon description of Toast Component */
  iconDescription: PropTypes.string,
  /** Callback function for on close of Toast Component
   *
   * @signature
   * ```event``` : event upon clicking on close
   */
  onClose: PropTypes.func,
  /** Boolean value to show or hide Toast Component */
  visible: PropTypes.bool.isRequired,
  /** Boolean value to show ot hide close icon from Toast Component */
  closable: PropTypes.bool
};

Toast.defaultProps = {
  className: '',
  title: '',
  subtitle: '',
  caption: '',
  icon: null,
  iconDescription: 'Close',
  closable: false,
  onClose: () => {}
};
