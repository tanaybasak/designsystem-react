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
  const [size, setSize] = useState(48);
  const svgRef = useRef(null);
  const classnames = [];

  if (progressSize === 'small') {
    classnames.push(`${prefix}-pb-circle-small`);
  } else if (progressSize === 'large') {
    classnames.push(`${prefix}-pb-circle-large`);
  } else if (progressSize === 'default') {
    classnames.push(`${prefix}-pb-circle`);
  }
  if (className) {
    classnames.push(className);
  }

  const circumferenceValue = 2 * Math.PI * 20;
  const [offset, setOffset] = useState(circumferenceValue);

  useEffect(() => {
    progress = progress > 1 ? 1 : progress;
    const progressOffset = ((100 - progress * 100) / 100) * circumferenceValue;
    setOffset(progressOffset);
  }, [progress]);

  useEffect(() => {
    if (svgRef && type == 'determinate') {
      setSize(svgRef.current.clientHeight);
    }
  }, [progressSize]);
  return (
    <>
      {type == 'determinate' ? (
        <div
          className={`${prefix}-pb-circle-wrapper ${
            labelPosition == 'left' ||
            labelPosition == 'right' ||
            ((labelPosition == 'top' || labelPosition == 'bottom') &&
              size == 16)
              ? `${prefix}-pb-label-inline`
              : ``
          } `}
        >
          {label && (labelPosition == 'left' || labelPosition == 'top') ? (
            <div className={`${prefix}-pb-label-content`}>
              <div
                className={`${prefix}-pb-label-text ${
                  labelPosition == 'top' && size == 96 ? `ml-3` : ``
                } ${prefix}-pb-circle-ellipsis`}
              >
                {label}
              </div>
            </div>
          ) : null}
          <div
            className={classnames.join(' ')}
            aria-valuenow={progress * 100}
            role="progressbar"
          >
            <svg
              className={`${prefix}-pb-circle-determinate`}
              ref={svgRef}
              viewBox="25 25 50 50"
            >
              <circle
                className={`${prefix}-pb-bgcircle pb-circle-inner`}
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
                strokeDasharray={circumferenceValue}
              />
            </svg>
            {size == 16
              ? null
              : customContent && (
                  <div className={`${prefix}-pb-circle-text`}>
                    {customContent}
                  </div>
                )}
          </div>
          {label && (labelPosition == 'right' || labelPosition == 'bottom') ? (
            <div className={`${prefix}-pb-label-content`}>
              <div
                className={`${prefix}-pb-label-text ${prefix}-pb-circle-ellipsis ${
                  labelPosition == 'bottom' && size == 96 ? `ml-3` : ``
                }`}
              >
                {label}
              </div>
            </div>
          ) : null}
        </div>
      ) : (
        <div className={classnames.join(` `)} role="progressbar">
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
  type: PropTypes.oneOf(['determinate', 'indeterminate']),

  /** label of the progressbar */
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),

  /** labelPosition of the progressbar (eg : left/right/top/bottom) */
  labelPosition: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),

  /** customContent of the progressbar (html element) */
  customContent: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),

  /** Class/clasess will be applied on the parent div of Progressbar */
  className: PropTypes.string,

  /** Size of Progressbar */
  progressSize: PropTypes.oneOf(['small', 'default', 'large'])
};

CircleProgressBar.defaultProps = {
  progress: 0,
  type: 'determinate',
  label: null,
  customContent: null,
  labelPosition: 'right',
  className: '',
  progressSize: 'default'
};

export default CircleProgressBar;
