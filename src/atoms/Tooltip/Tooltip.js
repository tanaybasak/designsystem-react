import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import prefix from '../../settings';
import { getRem } from '../../util/utility';
import { addListener, removeListeners } from '../../util/eventManager';
const tooltipAdjustment = 2;
let tooltipElementRef = 1;

const Tooltip = ({ type, content, direction, children }) => {
  const tooltipContainerRef = useRef(null);
  const parentRef = useRef(null);
  const [showTooltip, toggleTooltip] = useState(false);
  let diff = 0;
  let positionDirection;
  const [tooltipId] = useState(tooltipElementRef++);
  let mouseOut = false;
  let contentIn = false;

  let focusTootlip = false;

  const TooltipContainer = (content, type, tooltipContainerRef) => {
    return ReactDOM.createPortal(
      <div
        className={`${prefix}-tooltip ${prefix}-tooltip-${type}`}
        data-focus-on-click={type === 'interactive'}
        ref={tooltipContainerRef}
        onMouseEnter={type !== 'interactive' ? tooltipContentMouseEnter : null}
        onMouseLeave={type !== 'interactive' ? tooltipContentMouseLeave : null}
      >
        <div className={`${prefix}-tooltip-arrow`} />
        <div>{content}</div>
      </div>,
      document.body
    );
  };

  const tooltipContentMouseEnter = () => {
    mouseOut = false;
    contentIn = true;
  };

  const tooltipContentMouseLeave = () => {
    mouseOut = true;
    if (contentIn) {
      contentIn = false;
      if (!focusTootlip) {
        toggleTooltip(false);
      }
    }
  };

  const handleClick = e => {
    if (tooltipContainerRef.current) {
      if (e && tooltipContainerRef.current.contains(e.target)) {
        return;
      }
      toggleTooltip(false);
    }
  };

  const handleScroll = () => {
    if (tooltipContainerRef.current && parentRef.current) {
      const parentPosition = parentRef.current.getBoundingClientRect();
      showTooltipMain(parentPosition, positionDirection, 10, type);
    }
  };

  useEffect(() => {
    if (showTooltip && parentRef.current) {
      const parentPosition = parentRef.current.getBoundingClientRect();
      diff = undefined;
      const newDirection = getDirection(parentPosition, 10, direction);
      tooltipContainerRef.current.children[0].dataset.direction = newDirection;
      tooltipContainerRef.current.style.minWidth =
        tooltipContainerRef.current.offsetWidth + 'px';
      positionDirection = getDirectionPosition(parentPosition, newDirection);
      showTooltipMain(parentPosition, positionDirection, 10, type);
      if (type === 'interactive') {
        addListener(
          'tooltipId-' + tooltipId,
          'click',
          e => {
            handleClick(e);
          },
          true
        );

        addListener(
          'tooltipId-' + tooltipId,
          'keypress',
          e => {
            var key = e.which || e.keyCode;
            if (key === 13) {
              handleClick(e);
            }
          },
          true
        );
      }

      addListener(
        'tooltipId-' + tooltipId,
        'scroll',
        e => {
          handleScroll(e);
        },
        true
      );

      if (tooltipContainerRef.current)
        tooltipContainerRef.current.classList.add('show');
    } else {
      if (type === 'interactive') {
        removeListeners('tooltipId-' + tooltipId, 'click');
        removeListeners('tooltipId-' + tooltipId, 'keypress');
      }
      removeListeners('tooltipId-' + tooltipId, 'scroll');
      if (tooltipContainerRef.current)
        tooltipContainerRef.current.classList.remove('show');
    }
  }, [showTooltip, tooltipId]);

  const updateIconPosition = (icon, position, value) => {
    icon.removeAttribute('style');
    icon.style[position] = getRem(value);
  };

  const multiDirectionPositioning = (
    type,
    parentCoords,
    icon,
    arrowSize,
    top,
    bottom,
    left,
    right
  ) => {
    switch (type) {
      case 'left': {
        if (diff <= 0) {
          diff = diff - tooltipAdjustment;

          updateIconPosition(
            icon,
            'left',
            parentCoords.left +
              parentCoords.width / 2 -
              arrowSize -
              tooltipAdjustment
          );
        } else if (diff >= 1 && diff < tooltipAdjustment) {
          diff = tooltipAdjustment - diff;

          updateIconPosition(
            icon,
            'left',
            parentCoords.left +
              parentCoords.width / 2 -
              arrowSize -
              (tooltipAdjustment + diff)
          );

          diff = -tooltipAdjustment;
        } else {
          updateIconPosition(
            icon,
            'left',
            parentCoords.left + parentCoords.width / 2 - arrowSize
          );
        }
        break;
      }
      case 'right': {
        if (right >= window.innerWidth) {
          diff = right - window.innerWidth + tooltipAdjustment;
          updateIconPosition(
            icon,
            'right',
            window.innerWidth -
              parentCoords.right +
              parentCoords.width / 2 -
              arrowSize -
              tooltipAdjustment
          );
        } else if (
          right < window.innerWidth &&
          right >= window.innerWidth - tooltipAdjustment
        ) {
          updateIconPosition(
            icon,
            'right',
            window.innerWidth -
              parentCoords.right +
              parentCoords.width / 2 -
              arrowSize -
              (tooltipAdjustment + (window.innerWidth - right))
          );
          diff = tooltipAdjustment;
        } else {
          diff = right - window.innerWidth;
          updateIconPosition(
            icon,
            'right',
            window.innerWidth -
              parentCoords.right +
              parentCoords.width / 2 -
              arrowSize
          );
        }
        break;
      }
      case 'top': {
        if (diff <= 0) {
          diff = diff - tooltipAdjustment;

          updateIconPosition(
            icon,
            'top',
            parentCoords.top +
              parentCoords.height / 2 -
              arrowSize -
              tooltipAdjustment
          );
        } else if (diff >= 1 && diff < tooltipAdjustment) {
          diff = tooltipAdjustment - diff;
          updateIconPosition(
            icon,
            'top',
            parentCoords.top +
              parentCoords.height / 2 -
              arrowSize -
              tooltipAdjustment
          );

          diff = -diff;
        } else {
          updateIconPosition(
            icon,
            'top',
            parentCoords.top + parentCoords.height / 2 - arrowSize
          );
        }
        break;
      }
      case 'bottom': {
        if (bottom >= window.innerHeight) {
          diff = diff + tooltipAdjustment;
          updateIconPosition(
            icon,
            'bottom',
            window.innerHeight -
              (parentCoords.bottom - parentCoords.height / 2) -
              arrowSize -
              tooltipAdjustment
          );
        } else if (
          bottom < window.innerHeight &&
          bottom >= window.innerHeight - tooltipAdjustment
        ) {
          updateIconPosition(
            icon,
            'bottom',
            window.innerHeight -
              (parentCoords.bottom - parentCoords.height / 2) -
              arrowSize -
              tooltipAdjustment -
              (window.innerHeight - bottom)
          );
          diff = tooltipAdjustment;
        } else {
          diff = right - window.innerWidth;
          updateIconPosition(
            icon,
            'bottom',
            window.innerHeight -
              (parentCoords.bottom - parentCoords.height / 2) -
              arrowSize
          );
        }
        break;
      }
    }
  };
  const showTooltipMain = (parentCoords, posHorizontal, dist, type) => {
    const tooltip = tooltipContainerRef.current;
    const icon = tooltip.children[0];
    let left = 0;
    let top = 0;
    let bottom = 0;
    let right = 0;
    const arrowSize = type === 'icon' ? 2.5 : 5;
    const offsetY = window.pageYOffset;
    const offsetX = window.pageXOffset;

    if (posHorizontal.startsWith('left')) {
      left = parseInt(parentCoords.left) - dist - tooltip.offsetWidth;
      top =
        (parseInt(parentCoords.top) + parseInt(parentCoords.bottom)) / 2 -
        tooltip.offsetHeight / 2;
      if (posHorizontal === 'left') {
        updateIconPosition(icon, 'top', tooltip.offsetHeight / 2 - arrowSize);
      } else {
        if (diff === undefined) {
          if (posHorizontal === 'left top') {
            diff = top;
            multiDirectionPositioning('top', parentCoords, icon, arrowSize);
          } else {
            bottom =
              (parseInt(parentCoords.top) + parseInt(parentCoords.bottom)) / 2 +
              tooltip.offsetHeight / 2;
            diff = bottom - window.innerHeight;

            multiDirectionPositioning(
              'bottom',
              parentCoords,
              icon,
              arrowSize,
              top,
              bottom,
              left,
              right
            );
          }
        }
        top = top - diff;
      }
      tooltip.style.left = getRem(left + offsetX);
      tooltip.style.top = getRem(top + offsetY);
    } else if (posHorizontal.startsWith('right')) {
      top =
        (parseInt(parentCoords.top) + parseInt(parentCoords.bottom)) / 2 -
        tooltip.offsetHeight / 2;
      left = parseInt(parentCoords.right) + dist;
      if (posHorizontal === 'right') {
        updateIconPosition(icon, 'top', tooltip.offsetHeight / 2 - arrowSize);
      } else {
        if (diff === undefined) {
          if (posHorizontal === 'right top') {
            diff = top;
            multiDirectionPositioning('top', parentCoords, icon, arrowSize);
          } else {
            bottom =
              (parseInt(parentCoords.top) + parseInt(parentCoords.bottom)) / 2 +
              tooltip.offsetHeight / 2;
            diff = bottom - window.innerHeight;

            multiDirectionPositioning(
              'bottom',
              parentCoords,
              icon,
              arrowSize,
              top,
              bottom,
              left,
              right
            );
          }
        }
        top = top - diff;
      }
      tooltip.style.left = getRem(left + offsetX);
      tooltip.style.top = getRem(top + offsetY);
    } else if (posHorizontal.startsWith('top')) {
      left =
        parseInt(parentCoords.left) +
        (parentCoords.width - tooltip.offsetWidth) / 2;
      top = parseInt(parentCoords.top) - tooltip.offsetHeight - dist;

      if (posHorizontal === 'top') {
        updateIconPosition(icon, 'left', tooltip.offsetWidth / 2 - arrowSize);
      } else {
        if (diff === undefined) {
          if (posHorizontal === 'top left') {
            diff = left;

            multiDirectionPositioning(
              'left',
              parentCoords,
              icon,
              arrowSize,
              top,
              bottom,
              left,
              right
            );
          } else {
            right =
              parseInt(parentCoords.right) +
              (tooltip.offsetWidth - parentCoords.width) / 2;

            multiDirectionPositioning(
              'right',
              parentCoords,
              icon,
              arrowSize,
              top,
              bottom,
              left,
              right
            );
          }
        }
        left = left - diff;
      }
      tooltip.style.top = getRem(top + offsetY);
      tooltip.style.left = getRem(left + offsetX);
    } else if (posHorizontal.startsWith('bottom')) {
      left =
        parseInt(parentCoords.left) +
        (parentCoords.width - tooltip.offsetWidth) / 2;
      top = parseInt(parentCoords.bottom) + dist;

      if (posHorizontal === 'bottom') {
        updateIconPosition(icon, 'left', tooltip.offsetWidth / 2 - arrowSize);
      } else {
        if (diff === undefined) {
          if (posHorizontal === 'bottom left') {
            diff = left;
            multiDirectionPositioning(
              'left',
              parentCoords,
              icon,
              arrowSize,
              top,
              bottom,
              left,
              right
            );
          } else {
            right =
              parseInt(parentCoords.right) +
              (tooltip.offsetWidth - parentCoords.width) / 2;

            multiDirectionPositioning(
              'right',
              parentCoords,
              icon,
              arrowSize,
              top,
              bottom,
              left,
              right
            );
          }
        }
        left = left - diff;
      }
      tooltip.style.left = getRem(left + offsetX);
      tooltip.style.top = getRem(top + offsetY);
    }
    tooltip.classList.add('show');
  };

  const getDirectionPosition = (parentCoords, posHorizontal) => {
    let left = 0;
    let top = 0;
    let bottom = 0;
    let right = 0;
    let direction = posHorizontal;
    const tooltip = tooltipContainerRef.current;
    switch (posHorizontal) {
      case 'left': {
        top =
          (parseInt(parentCoords.top) + parseInt(parentCoords.bottom)) / 2 -
          tooltip.offsetHeight / 2;
        bottom =
          (parseInt(parentCoords.top) + parseInt(parentCoords.bottom)) / 2 +
          tooltip.offsetHeight / 2;
        if (top < tooltipAdjustment) {
          direction = 'left top';
        } else if (bottom > window.innerHeight - tooltipAdjustment) {
          direction = 'left bottom';
        }
        break;
      }
      case 'right': {
        top =
          (parseInt(parentCoords.top) + parseInt(parentCoords.bottom)) / 2 -
          tooltip.offsetHeight / 2;
        bottom =
          (parseInt(parentCoords.top) + parseInt(parentCoords.bottom)) / 2 +
          tooltip.offsetHeight / 2;
        if (top < tooltipAdjustment) {
          direction = 'right top';
        } else if (bottom > window.innerHeight - tooltipAdjustment) {
          direction = 'right bottom';
        }

        break;
      }
      case 'top': {
        left =
          parseInt(parentCoords.left) +
          (parentCoords.width - tooltip.offsetWidth) / 2;
        right =
          parseInt(parentCoords.right) +
          (tooltip.offsetWidth - parentCoords.width) / 2;
        if (left < tooltipAdjustment) {
          direction = 'top left';
        } else if (right > window.innerWidth - tooltipAdjustment) {
          direction = 'top right';
        }
        break;
      }
      case 'bottom': {
        left =
          parseInt(parentCoords.left) +
          (parentCoords.width - tooltip.offsetWidth) / 2;
        right =
          parseInt(parentCoords.right) +
          (tooltip.offsetWidth - parentCoords.width) / 2;
        if (left < tooltipAdjustment) {
          direction = 'bottom left';
        } else if (right > window.innerWidth - tooltipAdjustment) {
          direction = 'bottom right';
        }
        break;
      }
    }
    return direction;
  };

  const isOutofBound = (parentCoords, dist, posHorizontal) => {
    let outOfBound = false;
    const tooltip = tooltipContainerRef.current;
    switch (posHorizontal) {
      case 'left': {
        if (
          parseInt(parentCoords.left) - dist - tooltip.offsetWidth <
          tooltipAdjustment
        ) {
          outOfBound = true;
        }
        break;
      }
      case 'right': {
        if (
          parentCoords.right + dist + tooltip.offsetWidth >
          window.innerWidth - tooltipAdjustment
        ) {
          outOfBound = true;
        }
        break;
      }
      case 'top': {
        if (
          parseInt(parentCoords.top) - tooltip.offsetHeight - dist <
          tooltipAdjustment
        ) {
          outOfBound = true;
        }
        break;
      }
      case 'bottom': {
        if (
          parseInt(parentCoords.bottom) + dist + tooltip.offsetHeight >
          window.innerHeight - tooltipAdjustment
        ) {
          outOfBound = true;
        }
        break;
      }
    }
    return outOfBound;
  };

  const getDirection = (parentCoords, dist, posHorizontal) => {
    let newDirection = posHorizontal;
    switch (posHorizontal) {
      case 'left': {
        if (isOutofBound(parentCoords, dist, newDirection)) {
          newDirection = 'right';
          if (isOutofBound(parentCoords, dist, newDirection)) {
            newDirection = 'top';
            if (isOutofBound(parentCoords, dist, newDirection)) {
              newDirection = 'bottom';
              if (isOutofBound(parentCoords, dist, newDirection)) {
                newDirection = posHorizontal;
              }
            }
          }
        }
        break;
      }
      case 'right': {
        if (isOutofBound(parentCoords, dist, newDirection)) {
          newDirection = 'left';
          if (isOutofBound(parentCoords, dist, newDirection)) {
            newDirection = 'top';
            if (isOutofBound(parentCoords, dist, newDirection)) {
              newDirection = 'bottom';
              if (isOutofBound(parentCoords, dist, newDirection)) {
                newDirection = posHorizontal;
              }
            }
          }
        }
        break;
      }
      case 'top': {
        if (isOutofBound(parentCoords, dist, newDirection)) {
          newDirection = 'bottom';
          if (isOutofBound(parentCoords, dist, newDirection)) {
            newDirection = 'left';
            if (isOutofBound(parentCoords, dist, newDirection)) {
              newDirection = 'right';
              if (isOutofBound(parentCoords, dist, newDirection)) {
                newDirection = posHorizontal;
              }
            }
          }
        }
        break;
      }
      case 'bottom': {
        if (isOutofBound(parentCoords, dist, newDirection)) {
          newDirection = 'top';
          if (isOutofBound(parentCoords, dist, newDirection)) {
            newDirection = 'left';
            if (isOutofBound(parentCoords, dist, newDirection)) {
              newDirection = 'right';
              if (isOutofBound(parentCoords, dist, newDirection)) {
                newDirection = posHorizontal;
              }
            }
          }
        }
        break;
      }
      default:
        break;
    }
    return newDirection;
  };

  const openTooltip = e => {
    parentRef.current = e.currentTarget;
    if (!focusTootlip) {
      mouseOut = false;
      toggleTooltip(true);
    }
  };

  const openTooltipFocus = e => {
    parentRef.current = e.currentTarget;
    focusTootlip = true;
    mouseOut = false;
    toggleTooltip(true);
  };

  const closeTooltip = () => {
    parentRef.current = null;
    if (!focusTootlip) {
      mouseOut = true;
      setTimeout(() => {
        if (mouseOut) {
          mouseOut = false;
          contentIn = false;
          toggleTooltip(false);
        }
      }, 200);
    }
  };

  const closeTooltipOnBlur = () => {
    parentRef.current = null;
    focusTootlip = false;
    if (!contentIn) {
      toggleTooltip(false);
    }
  };

  const openInteractiveTooltip = e => {
    parentRef.current = e.currentTarget;
    toggleTooltip(true);
  };

  const showTooltipOnEnter = event => {
    parentRef.current = event.currentTarget;
    if (event.charCode === 13) {
      openTooltip();
    }
  };

  let element = null;
  if (typeof children !== 'string') {
    element = React.Children.map(children, child => {
      let customClass = child.props.className ? child.props.className : '';
      if (showTooltip && type === 'definition') {
        customClass += ` ${prefix}-tooltip-dottedline`;
      }
      return React.cloneElement(child, {
        onMouseEnter:
          type !== 'interactive' ? openTooltip : child.props.onMouseEnter,
        onClick:
          type === 'interactive' ? openInteractiveTooltip : child.props.onClick,
        onMouseLeave:
          type !== 'interactive' ? closeTooltip : child.props.onMouseLeave,
        onFocus:
          type !== 'interactive' ? openTooltipFocus : child.props.onFocus,
        onBlur:
          type !== 'interactive' ? closeTooltipOnBlur : child.props.onBlur,
        onKeyPress:
          type === 'interactive' ? showTooltipOnEnter : child.props.onKeyPress,
        className: customClass
      });
    });
  }

  return typeof children === 'string' ? (
    <span
      tabIndex="0"
      onClick={type === 'interactive' ? openInteractiveTooltip : null}
      onMouseEnter={type !== 'interactive' ? openTooltip : null}
      onMouseLeave={type !== 'interactive' ? closeTooltip : null}
      onFocus={type !== 'interactive' ? openTooltipFocus : null}
      onBlur={type !== 'interactive' ? closeTooltipOnBlur : null}
      onKeyPress={type === 'interactive' ? showTooltipOnEnter : null}
      className={
        showTooltip && type === 'definition'
          ? `${prefix}-def-tooltip ${prefix}-tooltip-dottedline`
          : `${prefix}-def-tooltip`
      }
    >
      {children}
      {showTooltip
        ? TooltipContainer(content, type, tooltipContainerRef)
        : null}
    </span>
  ) : (
    <React.Fragment>
      {element}
      {showTooltip
        ? TooltipContainer(content, type, tooltipContainerRef)
        : null}
    </React.Fragment>
  );
};

Tooltip.propTypes = {
  /** Type of Tooltip 
  Icon – An icon tooltip is used to clarify the action or name of an interactive icon button. 
  definition – The definition tooltip provides additional help or defines an item or term 
  Interactive - Interactive tooltips may contain rich text and other interactive elements like buttons or links 
    */
  type: PropTypes.oneOf(['icon', 'definition', 'interactive']),
  /** Tooltip Direction eg: top, bottom, left, right */
  direction: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
  /** Tooltip title. Can pass string or html e */
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
};

Tooltip.defaultProps = {
  type: 'definition',
  direction: 'bottom',
  content: ''
};

export default Tooltip;
