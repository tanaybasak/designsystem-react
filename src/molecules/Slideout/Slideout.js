/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { addListener, removeListeners } from '../../util/eventManager';
import PropTypes from 'prop-types';
import Actions from '../../atoms/Actions';

let slideoutid = 0;

const Slideout = ({
  isOpen,
  type,
  className,
  overlayBackground,
  header,
  onClose,
  onEscClose,
  onOutsideClick,
  varient,
  direction,
  actions,
  children
}) => {
  const [opened, setOpened] = useState(isOpen || false);
  const layoutRef = useRef(null);
  const slideoutRef = useRef(null);

  let classNames = ['hcl-slideout'];
  let classNamesLayout = ['hcl-slideout-layout'];
  // size classes
  if (varient === 'large') {
    classNamesLayout.push('large');
  }
  if (varient === 'default') {
    classNamesLayout.push('default');
  }
  //layout classes
  if (direction === 'left') {
    classNamesLayout.push('layout-left');
  }
  // type classes
  if (type === 'default') {
    classNames.push('hcl-slideout__default-border');
  } else if (type === 'danger') {
    classNames.push('hcl-slideout__danger-border');
  } else if (type === 'warning') {
    classNames.push('hcl-slideout__warning-border');
  } else if (type === 'ghost') {
    classNames.push('hcl-slideout__ghost-border');
  }

  if (className) {
    classNames.push(className);
  }

  const handleonClose = () => {
    if (onClose) {
      onClose();
    }
  };

  useEffect(() => {
    if (slideoutRef && slideoutRef.current) {
      slideoutRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (!isOpen) {
      if (layoutRef && layoutRef.current) {
        window.requestAnimationFrame(removeShow);
      }
      setTimeout(() => {
        setOpened(isOpen);
        document.body.classList.remove('overflow-slideout');
      }, 200);
    } else {
      window.requestAnimationFrame(addShow);
      setOpened(isOpen);
      document.body.classList.add('overflow-slideout');
    }
    return () => {
      document.body.classList.remove('overflow-slideout');
    };
  }, [isOpen]);

  useEffect(() => {
    if (opened) {
      addListener(
        'slideout-' + slideoutid,
        'keydown',
        e => {
          handleKeyDown(e);
        },
        true
      );
    } else {
      removeListeners('slideout-' + slideoutid, 'keydown');
    }
    return () => {
      removeListeners('slideout-' + slideoutid, 'keydown');
    };
  }, [opened]);

  const addShow = () => {
    layoutRef.current.classList.add('show');
  };

  const removeShow = () => {
    layoutRef.current.classList.remove('show');
    layoutRef.current.classList.add('hide');
  };

  const handleKeyDown = e => {
    const key = e.key;
    if (opened) {
      if (key === 'Escape') {
        if (onEscClose && onOutsideClick) onOutsideClick(e);
      }
    }
  };

  const handleClick = e => {
    const { currentTarget } = e;
    if (opened) {
      if (currentTarget.classList.contains('hcl-slideout-mask')) {
        if (onOutsideClick) onOutsideClick(e);
      }
    }
  };

  const focusTrap = e => {
    const focusableEls = slideoutRef.current.querySelectorAll(
      'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled]), [tabindex]'
    );
    const firstFocusableEl = focusableEls[0];
    const lastFocusableEl = focusableEls[focusableEls.length - 1];

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

  const renderHTML = () => {
    const slideOutEl = (
      <div
        className={classNames.join(' ')}
        ref={slideoutRef}
        tabIndex={0}
        onKeyDown={focusTrap}
      >
        <div
          className={
            overlayBackground
              ? `hcl-slideout-mask`
              : 'hcl-slideout-mask hcl-slideout-mask-noback'
          }
          onKeyDown={opened ? handleKeyDown.bind(this) : null}
          onClick={opened ? handleClick.bind(this) : null}
        />
        <div ref={layoutRef} className={classNamesLayout.join(' ')}>
          <header className={`hcl-slideout-header`}>
            {header ? (
              <div className={`hcl-slideout-header__text`} title={header}>
                {header}
              </div>
            ) : null}
            <button
              className={`hcl-slideout-close`}
              onClick={handleonClose.bind(this)}
            >
              <svg
                version="1.1"
                xmlns="https://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
              >
                <polygon points="15.393,2.021 13.979,0.607 8,6.586 2.021,0.607 0.607,2.021 6.586,8 0.607,13.979 2.021,15.393 8,9.414  13.979,15.393 15.393,13.979 9.414,8 " />
              </svg>
            </button>
          </header>
          {children ? (
            <section className={`hcl-slideout-content`}>{children}</section>
          ) : null}
          {actions && actions.length ? (
            <footer className={`hcl-slideout-footer`}>
              <Actions actions={actions} />
            </footer>
          ) : null}
        </div>
      </div>
    );
    return slideOutEl;
  };

  return opened ? ReactDOM.createPortal(renderHTML(), document.body) : <></>;
};

Slideout.propTypes = {
  /** Used to toggle slideout */
  isOpen: PropTypes.bool,
  /**
   * * ```default:``` Slideout with top border using secondary_border token.
   * * ```danger:``` Slideout with top border using danger_border token.
   * * ```warning:``` Slideout with top border using warning_border token.
   * * ```ghost:``` Slideout with top border using ghost_border token.
   */
  type: PropTypes.oneOf(['default', 'danger', 'warning', 'ghost']),
  /**
   * * ```default:``` Slideout width restricted to 400px.
   * * ```large:``` Slideout width restricted to 600px.
   */
  varient: PropTypes.oneOf(['default', 'large']),
  /**
   * * ```right:``` Slideout shown to the right of the page.
   * * ```left:``` Slideout shown to the left of the page.
   */
  direction: PropTypes.oneOf(['right', 'left']),
  /** To create heading of the Slideout. */
  header: PropTypes.node,
  /** Callback to be used while closing Slideout. */
  onClose: PropTypes.func,
  /** Callback to be used when clicking the backdrop of the Slideout. */
  onOutsideClick: PropTypes.func,
  /** Closes the Slideout when escape key is pressed */
  onEscClose: PropTypes.bool,
  /** Used to pass overlay content */
  children: PropTypes.node,
  /**
   * To create action items associated with slideout.
   *
   * * ```label``` : button label,
   * * ```handler``` : function to handle onClick,
   * * ```disabled``` : bool,
   * * ```type``` : type of button
   */
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      handler: PropTypes.func,
      disabled: PropTypes.bool,
      type: PropTypes.oneOf([
        'primary',
        'primary-danger',
        'secondary',
        'secondary-danger',
        'ghost',
        'neutral',
        'warning'
      ])
    })
  ),
  /** custom className passed to the component */
  className: PropTypes.string,
  /** show overlay background in the component */
  overlayBackground: PropTypes.bool
};

Slideout.defaultProps = {
  isOpen: false,
  type: 'default',
  varient: 'default',
  direction: 'right',
  overlayBackground: true,
  header: null,
  onClose: null,
  actions: [],
  onEscClose: true,
  onOutsideClick: null,
  children: null,
  className: ''
};

export default Slideout;
