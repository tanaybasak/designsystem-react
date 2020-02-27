import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ActionBar from '../../atoms/ActionBar';
import prefix from '../../settings';

const Modal = ({
  type,
  label,
  heading,
  children,
  onClose,
  actions,
  className,
  ...restProps
}) => {
  const classNames = [
    `${prefix}-modal-container ${prefix}-modal-container-lg ${className}`
  ];

  if (type === 'danger') {
    classNames.push(`${prefix}-modal-container-danger`);
  }

  let modal = null;
  useEffect(() => {
    modal.focus();
  });

  const focusTrap = e => {
    const focusableEls = modal.querySelectorAll(
      'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled]), [tabindex]'
    );
    const firstFocusableEl = focusableEls[0];
    const lastFocusableEl = focusableEls[focusableEls.length - 1];

    if (event.keyCode == 27) {
      event.preventDefault();
      onClose();
    }

    const isTabPressed = e.key === 'Tab' || e.keyCode === '9';

    if (!isTabPressed) {
      return;
    }

    if (e.shiftKey) {
      if (document.activeElement === firstFocusableEl) {
        lastFocusableEl.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastFocusableEl) {
        firstFocusableEl.focus();
        e.preventDefault();
      }
    }
  };

  return (
    <section
      className={`${prefix}-modal`}
      {...restProps}
      tabIndex="0"
      ref={section => {
        modal = section;
      }}
      onKeyDown={focusTrap}
    >
      <div className={classNames.join(' ')}>
        <button
          type="button"
          className={`${prefix}-modal-close`}
          onClick={onClose}
        />
        {(heading !== '' || label !== '') && (
          <header className={`${prefix}-modal-header`}>
            {label !== '' ? (
              <small className={`${prefix}-modal-label`}>{label}</small>
            ) : null}
            {heading !== '' && <h5>{heading}</h5>}
          </header>
        )}
        {children && (
          <div className={`${prefix}-modal-content`}>{children}</div>
        )}
        {actions.length > 0 && (
          <footer className={`${prefix}-modal-footer`}>
            <ActionBar actions={actions} />
          </footer>
        )}
      </div>
    </section>
  );
};

Modal.propTypes = {
  /** Default: To create success modal. 
Danger: : To create danger modal. */
  type: PropTypes.string,

  /** To create label of the modal. */
  label: PropTypes.string,

  /** To create heading of the modal. */
  heading: PropTypes.string,

  /** A callback function which will be executed once modal is closed. */
  onClose: PropTypes.func,

  /** To create action items associated with modal. */
  actions: PropTypes.array,

  /** To pass content to modal. */
  children: PropTypes.node.isRequired,

  /** Class/clasess will be applied on the parent div of Modal */
  className: PropTypes.string
};

Modal.defaultProps = {
  type: 'default',
  label: '',
  heading: '',
  onClose: () => {},
  actions: [],
  className: ''
};

export default Modal;
