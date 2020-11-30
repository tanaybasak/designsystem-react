import React, { useState, useEffect, useRef } from 'react';
import prefix from '../../settings';
import PropTypes from 'prop-types';

const CircleProgressBar = ({
  size,
  progress,
  max,
  type,
  label,
  labelPosition
}) => {
  const [offset, setOffset] = useState(0);
  const [topelement, setTopElement] = useState(null);
  const [bottomelement, setBottomElement] = useState(null);
  const circleRef = useRef(null);
  const center = size / 2;
  const radius = size / 2 - 2.5;
  const circumference = 2 * Math.PI * radius;
  const progressElement  = React.createElement('span',  { className: `${prefix}-progressbar-circle-text` }, progress + '%');
  const progresslabel = React.createElement('span',  { className: `${prefix}-progressbar-circle-text` }, label); 
  const breakLine =  React.createElement('br', null , null); 
  useEffect(() => {
    const progressOffset = ((max - progress) / max) * circumference;
    setOffset(progressOffset);
    circleRef.current.style = 'transition: stroke-dashoffset 850ms ease-in-out';
    if (labelPosition == 'left' && (size == 48 || size == 96)) {
      setBottomElement(null);
      setTopElement(React.createElement('label', { className: `mr-1 ${prefix}-progressbar-circle-text` }, label));
    } else if (labelPosition == 'right' && (size == 48 || size == 96 )) {
      setTopElement(null);
      setBottomElement(
        React.createElement('label', { className: 'ml-1' }, label)
      );
    } else if (labelPosition == 'bottom' && (size == 48 || size == 96)) {
      setTopElement(null);
      setBottomElement(
        React.createElement('div', { className: 'mt-1' }, label)
      );
    } else if (labelPosition == 'top' && (size == 48 || size == 96)) {
      setBottomElement(null);
      setTopElement(React.createElement('div', { className: 'mb-1' }, label));
    } else if ((labelPosition == 'left' || labelPosition == 'bottom'  ) && size == 16) {
      setBottomElement(null);
      setTopElement(React.createElement('label', { className: 'mr-1' }, [progresslabel,breakLine, progressElement]));
    } else if((labelPosition == 'right' || labelPosition == 'top' ) && size == 16) {
      setTopElement(null);
      setBottomElement(React.createElement('label', { className: 'ml-1' }, [progresslabel,breakLine, progressElement]));
    }
  }, [
    setOffset,
    setBottomElement,
    setTopElement,
    progress,
    circumference,
    offset,
    max,
    label,
    labelPosition
  ]);
  return (
    <>
      {label.length ? topelement : null} 
      <span className={`${prefix}-progressbar-circle-container`}>
        <svg
          className={`${prefix}-progressbar-circle`}
          width={size}
          height={size}
        >
          <circle
            className={`${prefix}-progressbar-circle-inner`}
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={size == 16 ? 2 : 4}
          />
          <circle
            className={`${prefix}-progressbar-circle-outer`}
            ref={circleRef}
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={size == 16 ? 2 : 4}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
          {size == 16 ? null : (
            <text
              className={`${prefix}-progressbar-circle-text`}
              x={`${center}`}
              y={`${center}`}
            >
              {progress}%
            </text>
          )}
        </svg>
      </span>
      {label.length ? bottomelement : null}
    </>
  );
};

CircleProgressBar.propTypes = {
  size: PropTypes.number,
  progress: PropTypes.number,
  type: PropTypes.string,
  label: PropTypes.string
};

CircleProgressBar.defaultProps = {
  size: 48,
  progress: 70,
  max: 100,
  type: 'determinate',
  label: 'Downloading..'
};

export default CircleProgressBar;
