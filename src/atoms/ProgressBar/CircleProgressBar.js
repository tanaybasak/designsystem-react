import React, { useState, useEffect, useRef } from 'react';
import prefix from '../../settings';
import PropTypes from 'prop-types';

const CircleProgressBar = ({
  progress,
  type,
  label,
  labelPosition,
  customContent
}) => {
  const [offset, setOffset] = useState(0);
  const [topelement, setTopElement] = useState(null);
  const [bottomelement, setBottomElement] = useState(null);
  const [center, setCenter] = useState(0);
  const [radius, setRadius] = useState(0);
  const [circumference, setCircumference] = useState(0);
  const [size, setSize] = useState(48);
  const svgRef = useRef(null);
  const circleRef = useRef(null);
  const circleContainer = useRef(null);
  const svgContainer = useRef(null);

  progress = progress > 1 ? 1 : progress;
  const prg = progress * 100;
  const progressElement = React.createElement(
    'span',
    { className: `${prefix}-progressbar-circle-text` },
    customContent
  );
  const progresslabel = React.createElement(
    'span',
    { className: `${prefix}-progressbar-circle-text` },
    label
  );
  const breakLine = React.createElement('br', null, null);
  useEffect(() => {
    if (svgRef.current) {
      setSize(svgRef.current.clientHeight);
    }
    setCenter(size / 2);
    setRadius(size / 2 - 2.5);
    setCircumference(2 * Math.PI * (size / 2 - 2.5));
    const progressOffset = ((100 - prg) / 100) * circumference;
    setOffset(progressOffset);
    if (circleRef.current)
      circleRef.current.style =
        'transition: stroke-dashoffset 850ms ease-in-out';
    if (labelPosition == 'left' && (size == 48 || size == 96)) {
      setBottomElement(null);
      circleContainer.current.classList.remove(`${prefix}-pb-top-bottom`);
      setTopElement(
        React.createElement(
          'div',
          {
            className: `mr-1 ${prefix}-progressbar-circle-text ${prefix}-pb-displayLeft`
          },
          label
        )
      );
    } else if (labelPosition == 'right' && (size == 48 || size == 96)) {
      setTopElement(null);
      circleContainer.current.classList.remove(`${prefix}-pb-top-bottom`);
      setBottomElement(
        React.createElement(
          'div',
          { className: `ml-1 ${prefix}-progressbar-circle-text` },
          label
        )
      );
    } else if (labelPosition == 'bottom' && (size == 48 || size == 96)) {
      setTopElement(null);
      circleContainer.current.classList.add(`${prefix}-pb-top-bottom`);
      setBottomElement(
        React.createElement(
          'div',
          { className: `mt-1 ${prefix}-progressbar-circle-text` },
          label
        )
      );
    } else if (labelPosition == 'top' && (size == 48 || size == 96)) {
      setBottomElement(null);
      circleContainer.current.classList.add(`${prefix}-pb-top-bottom`);
      setTopElement(
        React.createElement(
          'div',
          { className: `mb-1 ${prefix}-progressbar-circle-text` },
          label
        )
      );
    } else if (
      (labelPosition == 'left' || labelPosition == 'bottom') &&
      size == 16
    ) {
      setBottomElement(null);
      circleContainer.current.classList.remove(`${prefix}-pb-top-bottom`);
      setTopElement(
        React.createElement(
          'div',
          { className: `mr-1 ${prefix}-progressbar-circle-text` },
          [progresslabel, breakLine, progressElement]
        )
      );
    } else if (
      (labelPosition == 'right' || labelPosition == 'top') &&
      size == 16
    ) {
      setTopElement(null);
      circleContainer.current.classList.remove(`${prefix}-pb-top-bottom`);
      setBottomElement(
        React.createElement(
          'div',
          { className: `ml-1 ${prefix}-progressbar-circle-text` },
          [progresslabel, breakLine, progressElement]
        )
      );
    }
  }, [
    setOffset,
    setBottomElement,
    setTopElement,
    progress,
    circumference,
    offset,
    label,
    labelPosition,
    customContent
  ]);
  return (
    <>
      {type == 'determinate' ? (
        <div className={`${prefix}-circle-pb`} ref={circleContainer}>
          {label.length && type == 'determinate' ? topelement : null}
          <div
            className={`${prefix}-determ-pb-circle-small`}
            ref={svgContainer}
          >
            <svg
              className={`${prefix}-progressbar-circle`}
              width={size}
              height={size}
              ref={svgRef}
            >
              <circle
                className={`${prefix}-progressbar-circle-inner`}
                cx={center}
                cy={center}
                r={radius}
              />
              <circle
                className={`${prefix}-progressbar-circle-outer`}
                ref={circleRef}
                cx={center}
                cy={center}
                r={radius}
                strokeDasharray={circumference}
                strokeDashoffset={offset}
              />
            </svg>
            {size == 16 ? null : (
              <div className={`${prefix}-progressbar-circle-customContent`}>
                {customContent}
              </div>
            )}
          </div>
          {label.length && type == 'determinate' ? bottomelement : null}
        </div>
      ) : (
        <div className={`${prefix}-indeterm-pb-circle`}>
          <svg className={`${prefix}-circle-pb-svg`} viewBox="25 25 50 50">
            <circle
              className={`${prefix}-pb-bgcircle pb-circle`}
              cx="50"
              cy="50"
              r="20"
            />
            <circle
              className={`${prefix}-pb-maincircle pb-circle`}
              cx="50"
              cy="50"
              r="20"
            />
            <circle
              className={`${prefix}-pb-dot1 dot pb-circle`}
              cx="50"
              cy="50"
              r="20"
            />
            <circle
              className={`${prefix}-pb-dot2 dot pb-circle`}
              cx="50"
              cy="50"
              r="20"
            />
            <circle
              className={`${prefix}-pb-dot3 dot pb-circle`}
              cx="50"
              cy="50"
              r="20"
            />
          </svg>
        </div>
      )}
    </>
  );
};

CircleProgressBar.propTypes = {
  size: PropTypes.number,
  progress: PropTypes.number,
  type: PropTypes.string,
  label: PropTypes.string,
  labelPosition: PropTypes.string,
  customContent: PropTypes.element
};

CircleProgressBar.defaultProps = {
  progress: 0.7,
  type: 'determinate',
  label: 'Downloading..'
};

export default CircleProgressBar;
