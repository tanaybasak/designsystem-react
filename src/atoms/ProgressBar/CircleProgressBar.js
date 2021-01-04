import React, { useState, useEffect, useRef } from 'react';
import prefix from '../../settings';
import PropTypes from 'prop-types';

const CircleProgressBar = ({
  progress,
  type,
  label,
  labelPosition,
  customContent,
  className,
  progressSize
}) => {
  const [offset, setOffset] = useState(0);
  const [size, setSize] = useState(48);
  const svgRef = useRef(null);
  const circleRef = useRef(null);
  const classnames = `${prefix}-pb-circle${
    progressSize === 'small'
      ? '-small'
      : progressSize === 'large'
      ? '-large'
      : ''
  } ${className}`.trim();

  progress = progress > 1 ? 1 : progress;
  const prg = progress * 100;
  const circumference = 2 * Math.PI * 20;
  const progressOffset = ((100 - prg) / 100) * circumference;

  useEffect(() => {
    if (svgRef && type == 'determinate') {
      setSize(svgRef.current.clientHeight);
    }
    setOffset(progressOffset);
  }, [setSize, progress, label, labelPosition, customContent]);
  return (
    <>
      {type == 'determinate' ? (
        <div
          className={`${prefix}-pb-circle-wrapper ${
            labelPosition == 'left' || labelPosition == 'right'
              ? `${prefix}-pb-label-inline`
              : ``
          } `}
        >
          {labelPosition == 'left' || labelPosition == 'top' ? (
            <div className={`${prefix}-pb-label-content`}>
              <div
                className={`${prefix}-pb-label-text ${
                  labelPosition == 'top' ? `ml-3` : ``
                }`}
              >
                {label}
              </div>
            </div>
          ) : null}
          <div className={classnames} aria-valuenow={prg} role="progressbar">
            <svg
              className={`${prefix}-pb-circle-determinate`}
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
          {labelPosition == 'right' || labelPosition == 'bottom' ? (
            <div className={`${prefix}-pb-label-content`}>
              <div
                className={`${prefix}-pb-label-text ${
                  labelPosition == 'bottom' ? `ml-3` : ``
                }`}
              >
                {label}
              </div>
            </div>
          ) : null}
        </div>
      ) : (
        <div className={classnames} role="progressbar">
          <svg
            className={`${prefix}-pb-circle-indeterminate`}
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
  /** value of the progressbar ranging from 0 to 1  */
  progress: PropTypes.number,

  /** type of the progressbar (eg : determinate / indeterminate) */
  type: PropTypes.string,

  /** label of the progressbar */
  label: PropTypes.string,

  /** labelPosition of the progressbar (eg : left/right/top/bottom) */
  labelPosition: PropTypes.string,

  /** customContent of the progressbar (html element) */
  customContent: PropTypes.element,

  /** Class/clasess will be applied on the parent div of Progressbar */
  className: PropTypes.string,

  /** Size of Progressbar */
  progressSize: PropTypes.string
};

CircleProgressBar.defaultProps = {
  progress: 0,
  type: 'determinate',
  label: 'Downloading..',
  customContent: null,
  labelPosition: 'right',
  className: ''
};

export default CircleProgressBar;
