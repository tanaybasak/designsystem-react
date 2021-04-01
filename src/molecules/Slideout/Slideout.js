import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const Slideout = ({
  isOpen,
  type,
  className,
  header,
  footer,
  onClose,
  children
}) => {
  const [opened, setOpened] = useState(isOpen);
  const layoutRef = useRef(null);

  let classNames = ['hcl-slideout'];

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
    // if (isOpen) {
    //   console.log('came in ?');
    //   if (layoutRef.current) {
    //     layoutRef.current.style.width = '400px';
    //     layoutRef.current.style.display = 'block';
    //   }
    // } else {
    //   console.log('came in ???');
    //   if (layoutRef.current) {
    //     layoutRef.current.style.width = '0px';
    //     layoutRef.current.style.display = 'none';
    //   }
    // }
    setOpened(isOpen);
  }, [isOpen]);

  const renderHTML = () => {
    const slideOutEl = (
      <div tabIndex={0} className={classNames.join(' ')}>
        <div className={`hcl-slideout-mask`} />
        <div ref={layoutRef} className={`hcl-slideout-layout`}>
          <header className={`hcl-slideout-header`}>
            {header ? (
              <div className={`hcl-slideout-header__text`}>{header}</div>
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
          {footer ? (
            <footer className={`hcl-slideout-footer`}>{footer}</footer>
          ) : null}
        </div>
      </div>
    );
    return slideOutEl;
  };

  return opened ? ReactDOM.createPortal(renderHTML(), document.body) : null;
};

Slideout.propTypes = {
  isOpen: PropTypes.bool,
  type: PropTypes.oneOf(['default', 'danger', 'warning', 'ghost']),
  header: PropTypes.node,
  footer: PropTypes.node,
  onClose: PropTypes.func,
  children: PropTypes.node
};

Slideout.defaultProps = {
  isOpen: false,
  type: 'default',
  header: null,
  footer: null,
  onClose: null,
  children: null
};

export default Slideout;
