import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { addListener, removeListeners } from '../../util/eventManager';
import PropTypes from 'prop-types';
import Actions from '../../atoms/Actions';
import PropDeprecated from '../../util/PropDeprecated';

let slideoutid = 0;

const Slideout = ({
  isOpen,
  type,
  className,
  header,
  onClose,
  onEscClose,
  onOutsideClick,
  varient,
  direction,
  actions,
  children
}) => {
  // const [opened, setOpened] = useState(isOpen || false);
  const layoutRef = useRef(null);

  let classNames = ['hcl-slideout'];
  let classNamesLayout = ['hcl-slideout-layout'];
  if (varient === 'large') {
    classNamesLayout.push('large');
  }
  if (direction === 'left') {
    classNamesLayout.push('layout-left');
  }
  if (isOpen) {
    classNamesLayout.push('show');
    if (direction === 'left') {
      classNamesLayout.push('slide-in-left');
    } else {
      classNamesLayout.push('slide-in');
    }
  } else {
    classNamesLayout.push('hide');
    if (direction === 'left') {
      classNamesLayout.push('slide-in-left');
    } else {
      classNamesLayout.push('slide-in');
    }
    classNamesLayout.push('slide-out');
  }
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
    if (isOpen) {
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
  }, [isOpen]);

  const handleKeyDown = e => {
    const key = e.key;
    if (isOpen) {
      if (key === 'Escape') {
        if (onEscClose && onOutsideClick) onOutsideClick(e);
      }
    }
  };

  const handleClick = e => {
    const { currentTarget } = e;
    if (isOpen) {
      if (currentTarget.classList.contains('hcl-slideout-mask')) {
        if (onEscClose && onOutsideClick) onOutsideClick(e);
      }
    }
  };

  const renderHTML = () => {
    const slideOutEl = (
      <div className={classNames.join(' ')}>
        <div
          className={`hcl-slideout-mask`}
          tabIndex={0}
          onKeyDown={isOpen ? handleKeyDown.bind(this) : null}
          onClick={isOpen ? handleClick.bind(this) : null}
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

  return isOpen ? ReactDOM.createPortal(renderHTML(), document.body) : null;
};

Slideout.propTypes = {
  isOpen: PropTypes.bool,
  type: PropTypes.oneOf(['default', 'danger', 'warning', 'ghost']),
  varient: PropTypes.oneOf(['default', 'large']),
  direction: PropTypes.oneOf(['right', 'left']),
  header: PropTypes.node,
  onClose: PropTypes.func,
  onOutsideClick: PropTypes.func,
  onEscClose: PropTypes.bool,
  children: PropTypes.node,
  /** To create action items associated with modal.
   *
   * * ```label``` : button label,
   * * ```handler``` : function to handle onClick,
   * * ```primary``` : bool,
   * * ```danger``` : bool,
   * * ```disabled``` : bool,
   * * ```warning``` : bool,
   * * ```neutral``` : bool,
   * * ```type``` : type of button
   */
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      handler: PropTypes.func,
      primary: PropDeprecated(
        PropTypes.bool,
        'please use type prop instead of passing primary'
      ),
      danger: PropDeprecated(
        PropTypes.bool,
        'please use type prop instead of passing danger'
      ),
      warning: PropDeprecated(
        PropTypes.bool,
        'please use type prop instead of passing warning'
      ),
      neutral: PropDeprecated(
        PropTypes.bool,
        'please use type prop instead of passing neutral'
      ),
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
  )
};

Slideout.defaultProps = {
  isOpen: false,
  type: 'default',
  varient: 'default',
  direction: 'right',
  header: null,
  onClose: null,
  actions: [],
  onEscClose: true,
  onOutsideClick: null,
  children: null
};

export default Slideout;
