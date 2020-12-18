import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Actions from '../../atoms/Actions';
import prefix from '../../settings';
import { Close } from '../../util/icons';
const Modal = ({
  type,
  label,
  heading,
  children,
  showClose,
  onClose,
  actions,
  keyboard,
  resizeable,
  className,
  ...restProps
}) => {
  const modal = useRef(null);
  const modalContainer = useRef(null);
  const modalResize = useRef(null);
  const classNames = [
    `${prefix}-modal-container ${prefix}-modal-container-lg ${className}`
  ];

  if (type === 'danger') {
    classNames.push(`${prefix}-modal-container-danger`);
  }
  if (type === 'warning') {
    classNames.push(`${prefix}-modal-container-warning`);
  }

  if (type === 'ghost') {
    classNames.push(`${prefix}-modal-container-ghost`);
  }

  useEffect(() => {
    modalResize.current.addEventListener('mousedown', initResize, false);
    modal.current.focus();
  }, []);

  const initResize = () => {
    window.addEventListener('mousemove', resize, false);
    window.addEventListener('mouseup', stopResize, false);
  };

  const resize = e => {
    modalContainer.current.style.width =
      e.clientX - modalContainer.current.offsetLeft + 'px';
    modalContainer.current.style.height =
      e.clientY - modalContainer.current.offsetTop + 'px';
  };

  const stopResize = () => {
    window.removeEventListener('mousemove', resize, false);
    window.removeEventListener('mouseup', stopResize, false);
  };

  const focusTrap = e => {
    const focusableEls = modal.current.querySelectorAll(
      'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled]), [tabindex]'
    );
    const firstFocusableEl = focusableEls[0];
    const lastFocusableEl = focusableEls[focusableEls.length - 1];

    if (e.keyCode == 27) {
      if (keyboard) {
        e.preventDefault();
        onClose();
      }
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
      ref={modal}
      onKeyDown={focusTrap}
    >
      <div className={classNames.join(' ')} ref={modalContainer}>
        {showClose ? (
          <button
            type="button"
            className={`${prefix}-modal-close`}
            aria-label="modal-close"
            onClick={onClose}
          >
            {Close}
          </button>
        ) : null}
        {(heading !== '' || label !== '') && (
          <header
            className={`${prefix}-modal-header ${prefix}-modal-header-lg`}
          >
            {label !== '' ? (
              <small className={`${prefix}-modal-label`}>{label}</small>
            ) : null}
            {heading !== '' && <h5>{heading}</h5>}
          </header>
        )}
        {children && (
          <div className={`${prefix}-modal-content ${prefix}-modal-content-lg`}>
            {children}
          </div>
        )}
        {actions.length > 0 && (
          <footer
            className={`${prefix}-modal-footer ${prefix}-modal-footer-lg`}
          >
            <Actions actions={actions} />
          </footer>
        )}
        {resizeable ? (
          <div className={`${prefix}-modal-resize`} ref={modalResize} />
        ) : null}
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

  /** To toggle close button of the modal. */
  showClose: PropTypes.bool,

  /** A callback function which will be executed once modal is closed. */
  onClose: PropTypes.func,

  /** To create action items associated with modal. */
  actions: PropTypes.array,

  /** To pass content to modal. */
  children: PropTypes.node.isRequired,

  /** Resize the modal */
  resizeable: PropTypes.bool,

  /** Class/clasess will be applied on the parent div of Modal */
  className: PropTypes.string,
  /** Closes the modal when escape key is pressed */
  keyboard: PropTypes.bool
};

Modal.defaultProps = {
  type: 'default',
  label: '',
  heading: '',
  showClose: true,
  onClose: () => {},
  actions: [],
  className: '',
  keyboard: true
};

export default Modal;
