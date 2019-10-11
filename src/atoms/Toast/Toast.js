import React from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';
import { Info, Success, Danger, Warning } from './icons';

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
      {icon || useIcon(type)}
      <div className={`${prefix}-toast-details`}>
        <h3 className={`${prefix}-toast-title`}>{title}</h3>
        <p className={`${prefix}-toast-subtitle`}>{subtitle}</p>
        {caption ? (
          <p className={`${prefix}-toast-caption`}>{caption}</p>
        ) : null}
      </div>
      {closable ? (
        <button
          className={`${prefix}-toast-close`}
          title={iconDescription}
          type="button"
          aria-label="close"
          onClick={onClose}
        />
      ) : null}
    </div>
  ) : null;
}

Toast.propTypes = {
  className: PropTypes.string,
  type: PropTypes.oneOf(['danger', 'info', 'success', 'warning']).isRequired,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  caption: PropTypes.string,
  icon: PropTypes.element,
  iconDescription: PropTypes.string,
  onClose: PropTypes.func,
  visible: PropTypes.bool.isRequired,
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
