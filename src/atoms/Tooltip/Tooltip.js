import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import prefix from "../../settings";

export default function Tooltip({ type, content, direction, children }) {

    const tooltipContainerRef = useRef(null);
    const parentRef = useRef(null);
    const [showTooltip, toggleTooltip] = useState(false);

    const TooltipContainer = (content, type, tooltipContainerRef) => {
        return ReactDOM.createPortal(
            (
                <div
                    className={`${prefix}-tooltip ${prefix}-tooltip-${type}`}
                    data-focus-on-click={type === 'interactive'}
                    ref={tooltipContainerRef}
                >
                    <div className={`${prefix}-tooltip-arrow`} />
                    <div>{content}</div>
                </div>
            ),
            document.body
        );
    }

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
            const newDirection = getDirection(parentPosition, 10, direction)
            positionTooltip(parentPosition, newDirection, 10, type)
        }
    }

    useEffect(
        () => {
            if (showTooltip) {
                const parentPosition = parentRef.current.getBoundingClientRect();
                const newDirection = getDirection(parentPosition, 10, direction)
                positionTooltip(parentPosition, newDirection, 10, type)
            }
        },
        [showTooltip]

    );
    useEffect(
        () => {
            if (type === 'interactive') {
                document.addEventListener("mousedown", handleClick);
                document.addEventListener("scroll", handleScroll, true);
                return () => {
                    document.removeEventListener("mousedown", handleClick);
                    document.removeEventListener("scroll", handleScroll, true);
                };
            }
        }
    );

    const getRem = (value) => {
        return `${value / 16}rem`;
    }

    const positionTooltip = (parentCoords, posHorizontal, dist, type) => {

        const tooltip = tooltipContainerRef.current;
        const icon = tooltip.children[0];

        let left = 0;
        let top = 0;
        let bottom = 0;
        let right = 0;
        const arrowSize = type === 'icon' ? 2.5 : 5;
        tooltip.removeAttribute("style");
        icon.removeAttribute("style");
        icon.setAttribute('data-direction', posHorizontal)

        const offsetY = window.pageYOffset;
        const offsetX = window.pageXOffset;
        switch (posHorizontal) {
            case 'left': {
                left = parentCoords.left - dist - tooltip.offsetWidth;
                top = (parentCoords.top + parentCoords.bottom) / 2 - tooltip.offsetHeight / 2;
                bottom = (parentCoords.top + parentCoords.bottom) / 2 + (tooltip.offsetHeight / 2);
                if (top < 0) {
                    top = 0;
                    tooltip.style.top = getRem(top + offsetY)
                    icon.style.top = getRem(parentCoords.top + (parentCoords.height / 2) - arrowSize)
                } else if (bottom > window.innerHeight) {
                    bottom = 0;
                    tooltip.style.bottom = getRem(bottom - offsetY)
                    icon.style.bottom = getRem((window.innerHeight - (parentCoords.bottom - (parentCoords.height / 2))) - arrowSize);
                } else {
                    tooltip.style.top = getRem(top + offsetY)
                    icon.style.top = getRem(tooltip.offsetHeight / 2 - arrowSize)
                }
                tooltip.style.left = getRem(left + offsetX)
                break;
            }
            case 'right': {
                top = (parentCoords.top + parentCoords.bottom) / 2 - tooltip.offsetHeight / 2;
                bottom = (parentCoords.top + parentCoords.bottom) / 2 + (tooltip.offsetHeight / 2);
                left = parentCoords.right + dist;
                if (top < 0) {
                    top = 0;
                    tooltip.style.top = getRem(top + offsetY)
                    icon.style.top = getRem(parentCoords.top + (parentCoords.height / 2) - arrowSize)
                } else if (bottom > window.innerHeight) {
                    bottom = 0;
                    tooltip.style.bottom = getRem(bottom - offsetY)
                    icon.style.bottom = getRem((window.innerHeight - parentCoords.bottom + (parentCoords.height / 2)) - arrowSize)
                } else {
                    tooltip.style.top = getRem(top + offsetY)
                    icon.style.top = getRem(tooltip.offsetHeight / 2 - arrowSize)
                }
                tooltip.style.left = getRem(left + offsetX);
                break;
            }
            case 'top': {
                left = parentCoords.left + ((parentCoords.width - tooltip.offsetWidth) / 2);
                right = parentCoords.right + ((tooltip.offsetWidth - parentCoords.width) / 2);
                top = parentCoords.top - tooltip.offsetHeight - dist;
                if (left < 0) {
                    left = 0;
                    tooltip.style.left = getRem(left + offsetX)
                    icon.style.left = getRem((parentCoords.left + parentCoords.width / 2) - (arrowSize));
                } else if (right > window.innerWidth) {
                    right = 0;
                    tooltip.style.right = getRem(right - offsetX)
                    icon.style.right = getRem(((window.innerWidth - parentCoords.right) + (parentCoords.width / 2)) - (arrowSize))
                } else {
                    tooltip.style.left = getRem(left + offsetX)
                    icon.style.left = getRem((tooltip.offsetWidth / 2) - arrowSize);
                }
                tooltip.style.top = getRem(top + offsetY);
                break;
            }
            case 'bottom': {
                left = parentCoords.left + ((parentCoords.width - tooltip.offsetWidth) / 2);
                right = parentCoords.right + ((tooltip.offsetWidth - parentCoords.width) / 2);
                top = parentCoords.bottom + dist;
                if (left < 0) {
                    left = 0;
                    tooltip.style.left = getRem(left + offsetX)
                    icon.style.left = getRem((parentCoords.left + parentCoords.width / 2) - (arrowSize))
                } else if (right > window.innerWidth) {
                    right = 0;
                    tooltip.style.right = getRem(right - offsetX)
                    icon.style.right = getRem(((window.innerWidth - parentCoords.right) + (parentCoords.width / 2)) - (arrowSize))
                } else {
                    tooltip.style.left = getRem(left + offsetX)
                    icon.style.left = getRem((tooltip.offsetWidth / 2) - (arrowSize))
                }
                tooltip.style.top = getRem(top + offsetY);
                break;
            }
            default: break;
        }
    }

    const isOutofBound = (parentCoords, dist, posHorizontal) => {
        let outOfBound = false;
        const tooltip = tooltipContainerRef.current;
        switch (posHorizontal) {
            case 'left': {
                if ((parentCoords.left - dist - tooltip.offsetWidth) < 0) {
                    outOfBound = true;
                }
                break;
            }
            case 'right': {
                if ((parentCoords.right + dist + tooltip.offsetWidth) > window.innerWidth) {
                    outOfBound = true;
                }
                break;
            }
            case 'top': {
                if ((parentCoords.top - tooltip.offsetHeight - dist) < 0) {
                    outOfBound = true;
                }
                break;
            }
            case 'bottom': {
                if ((parentCoords.bottom + dist + tooltip.offsetHeight) > window.innerHeight) {
                    outOfBound = true;
                }
                break;
            }
            default: break;
        }
        return outOfBound;

    }

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
            default: break;
        }
        return newDirection;
    }

    const openTooltip = () => {
        toggleTooltip(true);
    }

    const closeTooltip = () => {
        toggleTooltip(false);
    }

    let element = null;
    if (typeof children !== 'string') {
        element = React.Children.map(children, (child) => {
            return React.cloneElement(child, {
                onMouseEnter: type !== 'interactive' ? openTooltip : null,
                onClick: type === 'interactive' ? openTooltip : null,
                onMouseLeave: type !== 'interactive' ? closeTooltip : null,
                ref: parentRef,
                className: showTooltip && type === 'definition' ? `${prefix}-tooltip-dottedline` : null
            });
        });
    }

    return (
        (typeof children === 'string' ?
            <span
                ref={parentRef}
                onClick={type === 'interactive' ? openTooltip : null}
                onMouseEnter={type !== 'interactive' ? openTooltip : null}
                onMouseLeave={type !== 'interactive' ? closeTooltip : null}
                className={showTooltip && type === 'definition' ? `${prefix}-tooltip-dottedline` : null}
            >
                {children}
                {showTooltip ? TooltipContainer(content, type, tooltipContainerRef) : null}
            </span>

            : (
                <React.Fragment>
                    {element}
                    {showTooltip ? TooltipContainer(content, type, tooltipContainerRef) : null}
                </React.Fragment>
            )
        )
    );
}

Tooltip.propTypes = {
    type: PropTypes.oneOf(["icon", "definition", "interactive"]),
    direction: PropTypes.oneOf(["top", "bottom", "left", "right"]),
    content: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
};

Tooltip.defaultProps = {
    type: "definition",
    direction: 'bottom',
    content: ''
};