import React, { useRef, useEffect, useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import prefix from '../../settings';
import { getPositions, visibleY } from '../../util/overlay';
import { addListener, removeListeners } from '../../util/eventManager';
import debounce from '../../util/debounce';
let overlayElementRef = 1;

const Overlay = ({
  children,
  showOverlay,
  direction,
  targetElement,
  scrollListner,
  onToggle,
  attachElementToBody,
  closeOnEscape,
  ...restProps
}) => {
  const overlayContainerRef = useRef(null);
  const [overlayElementId] = useState(overlayElementRef++);

  const handleClick = e => {
    console.log('OUTSIDE Handle Click');
    if (overlayContainerRef.current) {
      if (e && overlayContainerRef.current.contains(e.target)) {
        return;
      }
      if (e && targetElement && targetElement.contains(e.target)) {
        return;
      }
      hideOverlayContainer('outside');
    }
  };

  const scrollEnd = useRef(
    debounce(targetElement => {
      changeOverlayPosition(true, targetElement);
    }, 200)
  ).current;

  const handleScroll = e => {
    console.log('Handle Scroll', targetElement);
    scrollEnd(targetElement);
  };
  useEffect(() => {
    if (showOverlay !== null && targetElement !== null) {
      if (
        showOverlay &&
        overlayContainerRef &&
        overlayContainerRef.current &&
        targetElement
      ) {
        showOverlayContainer();
      } else {
        hideOverlayContainer('stateChange');
      }
    }
  }, [showOverlay, targetElement]);

  const showOverlayContainer = () => {
    addListener(
      'overlayElementId-' + overlayElementId,
      'click',
      e => {
        handleClick(e);
      },
      true
    );

    if (scrollListner) {
      addListener(
        'overlayElementId-' + overlayElementId,
        'scroll',
        e => {
          handleScroll(e);
        },
        true
      );
    }
    changeOverlayPosition(false, targetElement);
    if (onToggle) {
      onToggle(true);
    }
  };

  const hideOverlayContainer = type => {
    removeListeners('overlayElementId-' + overlayElementId, 'click');
    if (scrollListner) {
      removeListeners('overlayElementId-' + overlayElementId, 'scroll');
    }
    if (onToggle && type !== 'stateChange') {
      onToggle(false, type);
    }
  };

  

  const changeOverlayPosition = (isScroll, targetElement) => {
    const elementInfo = overlayContainerRef.current.getBoundingClientRect();
    if (targetElement && visibleY(targetElement)) {
      const positions = getPositions(
        direction,
        elementInfo.width,
        elementInfo.height,
        targetElement,
        attachElementToBody
      );

      overlayContainerRef.current.style.top = positions.top;
      overlayContainerRef.current.style.left = positions.left;
      if (isScroll) {
        overlayContainerRef.current.classList.add(
          'hcl-overlay-container-scroll'
        );
        overlayContainerRef.current.classList.remove(
          'hcl-overlay-container-hidden'
        );
      } else {
        overlayContainerRef.current.classList.add('hcl-overlay-container-show');
      }
    } else {
      if (isScroll) {
        overlayContainerRef.current.classList.add(
          'hcl-overlay-container-hidden'
        );
      }
    }
  };

  const keyDownListner = e => {
    if (closeOnEscape && e.keyCode === 27) {
      hideOverlayContainer('escape');
    } else if (e.keyCode === 9) {
      const focusableEls = overlayContainerRef.current.querySelectorAll(
        'a[href]:not([disabled]):not([tabindex="-1"]), button:not([disabled]):not([tabindex="-1"]), textarea:not([disabled]):not([tabindex="-1"]), input[type="text"]:not([disabled]):not([tabindex="-1"]), input[type="radio"]:not([disabled]):not([tabindex="-1"]), input[type="checkbox"]:not([disabled]):not([tabindex="-1"]), select:not([disabled]):not([tabindex="-1"]), [tabindex]:not([tabindex="-1"])'
      );
      const firstFocusableEl = focusableEls[0];
      const lastFocusableEl = focusableEls[focusableEls.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstFocusableEl) {
          hideOverlayContainer('focusout');
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastFocusableEl) {
          hideOverlayContainer('focusout');
          e.preventDefault();
        }
      }
    }
  };

  const overlayContainer = overlayContainerRef => {
    const overlayContainerEl = (
      <div
        className={`${prefix}-overlay-container`}
        ref={overlayContainerRef}
        onKeyDown={keyDownListner}
        {...restProps}
      >
        {children}
      </div>
    );
    if (attachElementToBody) {
      return ReactDOM.createPortal(overlayContainerEl, document.body);
    } else {
      return overlayContainerEl;
    }
  };

  return showOverlay && targetElement
    ? overlayContainer(overlayContainerRef)
    : null;
};

Overlay.propTypes = {
  children: PropTypes.element,
  showOverlay: PropTypes.bool,
  targetElement: PropTypes.element,
  direction: PropTypes.oneOf([
    'top-right',
    'top-left',
    'bottom-right',
    'bottom-left'
  ]),
  scrollListner: PropTypes.bool,
  onToggle: PropTypes.func,
  attachElementToBody: PropTypes.bool,
  closeOnEscape: PropTypes.bool
};

Overlay.defaultProps = {
  children: null,
  showOverlay: false,
  targetElement: null,
  direction: 'bottom-left',
  scrollListner: false,
  onToggle: () => {},
  attachElementToBody: false,
  closeOnEscape: false
};

export default Overlay;
