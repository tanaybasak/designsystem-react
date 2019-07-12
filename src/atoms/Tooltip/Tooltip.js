import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import prefix from "../../settings";
import { getRem } from "../../util/utility";
import EventManager from "../../util/eventManager";

const Tooltip = ({ type, content, direction, children }) => {
  const tooltipContainerRef = useRef(null);
  const parentRef = useRef(null);
  const [showTooltip, toggleTooltip] = useState(false);
  let diff = 0;
  let positionDirection;

  const TooltipContainer = (content, type, tooltipContainerRef) => {
    return ReactDOM.createPortal(
      <div
        className={`${prefix}-tooltip ${prefix}-tooltip-${type} show`}
        data-focus-on-click={type === "interactive"}
        ref={tooltipContainerRef}
      >
        <div className={`${prefix}-tooltip-arrow`} />
        <div>{content}</div>
      </div>,
      document.body
    );
  };

  const handleClick = e => {
    if (tooltipContainerRef.current) {
      if (tooltipContainerRef.current.contains(e.target)) {
        return;
      }
      toggleTooltip(false);
    }
  };

  const handleScroll = () => {
    if (tooltipContainerRef.current) {
      const parentPosition = parentRef.current.getBoundingClientRect();
      showTooltipMain(parentPosition, positionDirection, 10, type);
    }
  };

  useEffect(() => {
    if (showTooltip) {
      const parentPosition = parentRef.current.getBoundingClientRect();
      diff = undefined;
      const newDirection = getDirection(parentPosition, 10, direction);
      tooltipContainerRef.current.children[0].setAttribute(
        "data-direction",
        newDirection
      );
      tooltipContainerRef.current.style.minWidth =
        tooltipContainerRef.current.offsetWidth + "px";
      positionDirection = getDirectionPosition(parentPosition, newDirection);
      showTooltipMain(parentPosition, positionDirection, 10, type);
      if (type === "interactive") {
        EventManager.addEvent(
          "mousedown",
          e => {
            handleClick(e);
          },
          true
        );
        EventManager.addEvent(
          "scroll",
          e => {
            handleScroll(e);
          },
          true
        );
      }
    } else {
      if (type === "interactive") {
        EventManager.removeEvent("mousedown", true);
        EventManager.removeEvent("scroll", true);
      }
    }
  }, [showTooltip]);

  const updateIconPosition = (icon, position, value) => {
    icon.removeAttribute("style");
    icon.style[position] = getRem(value);
  };

  const showTooltipMain = (parentCoords, posHorizontal, dist, type) => {
    const tooltip = tooltipContainerRef.current;
    const icon = tooltip.children[0];

    let left = 0;
    let top = 0;
    let bottom = 0;
    let right = 0;
    let arrowSize = type === "icon" ? 2.5 : 5;
    let offsetY = window.pageYOffset;
    let offsetX = window.pageXOffset;

    if (posHorizontal.startsWith("left")) {
      left = parseInt(parentCoords.left) - dist - tooltip.offsetWidth;
      top =
        (parseInt(parentCoords.top) + parseInt(parentCoords.bottom)) / 2 -
        tooltip.offsetHeight / 2;
      if (posHorizontal === "left") {
        updateIconPosition(icon, "top", tooltip.offsetHeight / 2 - arrowSize);
      } else {
        if (diff === undefined) {
          if (posHorizontal === "left top") {
            diff = top;
            updateIconPosition(
              icon,
              "top",
              parentCoords.top + parentCoords.height / 2 - arrowSize
            );
          } else {
            bottom =
              (parseInt(parentCoords.top) + parseInt(parentCoords.bottom)) / 2 +
              tooltip.offsetHeight / 2;
            diff = bottom - window.innerHeight;
            updateIconPosition(
              icon,
              "bottom",
              window.innerHeight -
                (parentCoords.bottom - parentCoords.height / 2) -
                arrowSize
            );
          }
        }
        top = top - diff;
      }
      tooltip.style.left = getRem(left + offsetX);
      tooltip.style.top = getRem(top + offsetY);
    } else if (posHorizontal.startsWith("right")) {
      top =
        (parseInt(parentCoords.top) + parseInt(parentCoords.bottom)) / 2 -
        tooltip.offsetHeight / 2;
      left = parseInt(parentCoords.right) + dist;
      if (posHorizontal === "right") {
        updateIconPosition(icon, "top", tooltip.offsetHeight / 2 - arrowSize);
      } else {
        if (diff === undefined) {
          if (posHorizontal === "right top") {
            diff = top;
            updateIconPosition(
              icon,
              "top",
              parentCoords.top + parentCoords.height / 2 - arrowSize
            );
          } else {
            bottom =
              (parseInt(parentCoords.top) + parseInt(parentCoords.bottom)) / 2 +
              tooltip.offsetHeight / 2;
            diff = bottom - window.innerHeight;
            updateIconPosition(
              icon,
              "bottom",
              window.innerHeight -
                parentCoords.bottom +
                parentCoords.height / 2 -
                arrowSize
            );
          }
        }
        top = top - diff;
      }
      tooltip.style.left = getRem(left + offsetX);
      tooltip.style.top = getRem(top + offsetY);
    } else if (posHorizontal.startsWith("top")) {
      left =
        parseInt(parentCoords.left) +
        (parentCoords.width - tooltip.offsetWidth) / 2;
      top = parseInt(parentCoords.top) - tooltip.offsetHeight - dist;

      if (posHorizontal === "top") {
        updateIconPosition(icon, "left", tooltip.offsetWidth / 2 - arrowSize);
      } else {
        if (diff === undefined) {
          if (posHorizontal === "top left") {
            diff = left;
            updateIconPosition(
              icon,
              "left",
              parentCoords.left + parentCoords.width / 2 - arrowSize
            );
          } else {
            right =
              parseInt(parentCoords.right) +
              (tooltip.offsetWidth - parentCoords.width) / 2;
            diff = right - window.innerWidth;
            updateIconPosition(
              icon,
              "right",
              window.innerWidth -
                parentCoords.right +
                parentCoords.width / 2 -
                arrowSize
            );
          }
        }
        left = left - diff;
      }
      tooltip.style.top = getRem(top + offsetY);
      tooltip.style.left = getRem(left + offsetX);
    } else if (posHorizontal.startsWith("bottom")) {
      left =
        parseInt(parentCoords.left) +
        (parentCoords.width - tooltip.offsetWidth) / 2;
      top = parseInt(parentCoords.bottom) + dist;

      if (posHorizontal === "bottom") {
        updateIconPosition(icon, "left", tooltip.offsetWidth / 2 - arrowSize);
      } else {
        if (diff === undefined) {
          if (posHorizontal === "bottom left") {
            diff = left;
            updateIconPosition(
              icon,
              "left",
              parentCoords.left + parentCoords.width / 2 - arrowSize
            );
          } else {
            right =
              parseInt(parentCoords.right) +
              (tooltip.offsetWidth - parentCoords.width) / 2;
            diff = right - window.innerWidth;
            updateIconPosition(
              icon,
              "right",
              window.innerWidth -
                parentCoords.right +
                parentCoords.width / 2 -
                arrowSize
            );
          }
        }
        left = left - diff;
      }
      tooltip.style.left = getRem(left + offsetX);
      tooltip.style.top = getRem(top + offsetY);
    }
  };

  const getDirectionPosition = (parentCoords, posHorizontal) => {
    let left = 0;
    let top = 0;
    let bottom = 0;
    let right = 0;
    const tooltip = tooltipContainerRef.current;
    let direction = posHorizontal;
    switch (posHorizontal) {
      case "left": {
        top =
          (parseInt(parentCoords.top) + parseInt(parentCoords.bottom)) / 2 -
          tooltip.offsetHeight / 2;
        bottom =
          (parseInt(parentCoords.top) + parseInt(parentCoords.bottom)) / 2 +
          tooltip.offsetHeight / 2;
        if (top < 0) {
          direction = "left top";
        } else if (bottom > window.innerHeight) {
          direction = "left bottom";
        }
        break;
      }
      case "right": {
        top =
          (parseInt(parentCoords.top) + parseInt(parentCoords.bottom)) / 2 -
          tooltip.offsetHeight / 2;
        bottom =
          (parseInt(parentCoords.top) + parseInt(parentCoords.bottom)) / 2 +
          tooltip.offsetHeight / 2;
        if (top < 0) {
          direction = "right top";
        } else if (bottom > window.innerHeight) {
          direction = "right bottom";
        }

        break;
      }
      case "top": {
        left =
          parseInt(parentCoords.left) +
          (parentCoords.width - tooltip.offsetWidth) / 2;
        right =
          parseInt(parentCoords.right) +
          (tooltip.offsetWidth - parentCoords.width) / 2;
        if (left < 0) {
          direction = "top left";
        } else if (right > window.innerWidth) {
          direction = "top right";
        }
        break;
      }
      case "bottom": {
        left =
          parseInt(parentCoords.left) +
          (parentCoords.width - tooltip.offsetWidth) / 2;
        right =
          parseInt(parentCoords.right) +
          (tooltip.offsetWidth - parentCoords.width) / 2;
        if (left < 0) {
          direction = "bottom left";
        } else if (right > window.innerWidth) {
          direction = "bottom right";
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
      case "left": {
        if (parentCoords.left - dist - tooltip.offsetWidth < 0) {
          outOfBound = true;
        }
        break;
      }
      case "right": {
        if (
          parentCoords.right + dist + tooltip.offsetWidth >
          window.innerWidth
        ) {
          outOfBound = true;
        }
        break;
      }
      case "top": {
        if (parentCoords.top - tooltip.offsetHeight - dist < 0) {
          outOfBound = true;
        }
        break;
      }
      case "bottom": {
        if (
          parentCoords.bottom + dist + tooltip.offsetHeight >
          window.innerHeight
        ) {
          outOfBound = true;
        }
        break;
      }
      default:
        break;
    }
    return outOfBound;
  };

  const getDirection = (parentCoords, dist, posHorizontal) => {
    let newDirection = posHorizontal;
    switch (posHorizontal) {
      case "left": {
        if (isOutofBound(parentCoords, dist, newDirection)) {
          newDirection = "right";
          if (isOutofBound(parentCoords, dist, newDirection)) {
            newDirection = "top";
            if (isOutofBound(parentCoords, dist, newDirection)) {
              newDirection = "bottom";
              if (isOutofBound(parentCoords, dist, newDirection)) {
                newDirection = posHorizontal;
              }
            }
          }
        }
        break;
      }
      case "right": {
        if (isOutofBound(parentCoords, dist, newDirection)) {
          newDirection = "left";
          if (isOutofBound(parentCoords, dist, newDirection)) {
            newDirection = "top";
            if (isOutofBound(parentCoords, dist, newDirection)) {
              newDirection = "bottom";
              if (isOutofBound(parentCoords, dist, newDirection)) {
                newDirection = posHorizontal;
              }
            }
          }
        }
        break;
      }
      case "top": {
        if (isOutofBound(parentCoords, dist, newDirection)) {
          newDirection = "bottom";
          if (isOutofBound(parentCoords, dist, newDirection)) {
            newDirection = "left";
            if (isOutofBound(parentCoords, dist, newDirection)) {
              newDirection = "right";
              if (isOutofBound(parentCoords, dist, newDirection)) {
                newDirection = posHorizontal;
              }
            }
          }
        }
        break;
      }
      case "bottom": {
        if (isOutofBound(parentCoords, dist, newDirection)) {
          newDirection = "top";
          if (isOutofBound(parentCoords, dist, newDirection)) {
            newDirection = "left";
            if (isOutofBound(parentCoords, dist, newDirection)) {
              newDirection = "right";
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

  const openTooltip = () => {
    toggleTooltip(true);
  };

  const closeTooltip = () => {
    toggleTooltip(false);
  };

  let element = null;
  if (typeof children !== "string") {
    element = React.Children.map(children, child => {
      return React.cloneElement(child, {
        onMouseEnter: type !== "interactive" ? openTooltip : null,
        onClick: type === "interactive" ? openTooltip : null,
        onMouseLeave: type !== "interactive" ? closeTooltip : null,
        ref: parentRef,
        className:
          showTooltip && type === "definition"
            ? `${prefix}-tooltip-dottedline`
            : null
      });
    });
  }

  return typeof children === "string" ? (
    <span
      ref={parentRef}
      onClick={type === "interactive" ? openTooltip : null}
      onMouseEnter={type !== "interactive" ? openTooltip : null}
      onMouseLeave={type !== "interactive" ? closeTooltip : null}
      className={
        showTooltip && type === "definition"
          ? `${prefix}-tooltip-dottedline`
          : null
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
  type: PropTypes.oneOf(["icon", "definition", "interactive"]),
  direction: PropTypes.oneOf(["top", "bottom", "left", "right"]),
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
};

Tooltip.defaultProps = {
  type: "definition",
  direction: "bottom",
  content: ""
};

export default Tooltip;
