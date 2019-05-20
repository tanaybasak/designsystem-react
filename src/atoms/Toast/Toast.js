import React from 'react';
import PropTypes from 'prop-types';
import prefix from "../../settings";

const Toast = ({
  className,
  type,
  title,
  subtitle,
  caption,
  iconDescription,
  onClose,
  closable,
  visible,
  ...restProps
}) => {
  const classnames = `${prefix}-toast ${prefix}-toast-${type} ${className}`.trim();

  return visible ? (
    <div className={classnames} role='alert' {...restProps}>
      <svg
        className={`${prefix}-toast-icon`}
        focusable='false'
        preserveAspectRatio='xMidYMid meet'
        style={{ willChange: "transform" }}
        xmlns='http://www.w3.org/2000/svg'
        width='20'
        height='20'
        viewBox='0 0 32 32'
        aria-hidden='true'
      >
        <path d='M16 2a14 14 0 1 0 14 14A14 14 0 0 0 16 2zm0 5a1.5 1.5 0 1 1-1.5 1.5A1.5 1.5 0 0 1 16 7zm4 17.12h-8v-2.24h2.88v-6.76H13v-2.24h4.13v9H20z' />
      </svg>
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
          type='button'
          aria-label='close'
          onClick={onClose}
        />
      ) : null}
    </div>
  ) : null;
}

Toast.propTypes = {
  className: PropTypes.string,
  type: PropTypes.oneOf(["error", "info", "success", "warning"]).isRequired,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  caption: PropTypes.string,
  iconDescription: PropTypes.string,
  onClose: PropTypes.func,
  closable: PropTypes.bool,
  visible: PropTypes.bool.isRequired
};

Toast.defaultProps = {
  className: "",
  type: "info",
  title: "",
  subtitle: "",
  caption: "",
  iconDescription: "Close",
  onClose: () => {},
  closable: false
};

export default Toast