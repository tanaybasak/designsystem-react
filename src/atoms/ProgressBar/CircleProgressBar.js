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
  const [size, setSize] = useState(48);
  const svgRef = useRef(null);
  const circleRef = useRef(null);

  progress = progress > 1 ? 1 : progress;
  const prg = progress * 100;
  const circumference = 2 * Math.PI * 20;
  const progressOffset = ((100 - prg) / 100) * circumference;

  useEffect(() => {
    setSize(svgRef.current.clientHeight);
    setOffset(progressOffset);
  }, [setSize, progress, label, labelPosition, customContent]);
  return (
    <>
      {type == 'determinate' ? (
        <div
          className={`${prefix}-pb-circle-wrapper ${prefix}-pb-label-leftRight`}
        >
          <div className={`${prefix}-pb-circle-large`}>
            <svg
              className={`${prefix}-pb-circle-svg-determ`}
              ref={svgRef}
              viewBox="25 25 50 50"
            >
              <circle
                className={`${prefix}-pb-bgcircle pb-circle-inner`}
                ref={circleRef}
                cx="50"
                cy="50"
                r="20"
              />
              <circle
                className={`pb-circle-outer`}
                cx="50"
                cy="50"
                r="20"
                strokeDashoffset={offset}
                strokeDasharray={circumference}
              />
            </svg>
            {size == 16 ? null : (
              <div className={`${prefix}-pb-circle-text`}>{customContent}</div>
            )}
          </div>
          <div className={`${prefix}-pb-label-content`}>
            <div className={`${prefix}-pb-label-text`}>{label}</div>
          </div>
        </div>
      ) : (
        <div className={`${prefix}-pb-circle`}>
          <svg
            className={`${prefix}-pb-circle-svg-indeterm`}
            viewBox="25 25 50 50"
          >
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
  /** size of the progressbar */
  size: PropTypes.number,

  /** value of the progressbar */
  progress: PropTypes.number,

  /** type of the progressbar */
  type: PropTypes.string,

  /** label of the progressbar */
  label: PropTypes.string,

  /** labelPosition of the progressbar */
  labelPosition: PropTypes.string,

  /** customContent of the progressbar */
  customContent: PropTypes.element
};

CircleProgressBar.defaultProps = {
  progress: 0.7,
  type: 'determinate',
  label: 'Downloading..'
};

export default CircleProgressBar;
