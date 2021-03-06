/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import prefix from '../../settings';
import PropTypes from 'prop-types';

const LinearProgressIndicator = ({
  progress,
  label,
  subText,
  className,
  type,
  customContent
}) => {
  const [finalVal, updateFinalValue] = useState(100);
  const classnames = [`${prefix}-pb-linear`];

  if (className) {
    classnames.push(className);
  }

  useEffect(() => {
    progress = progress > 1 ? 1 : progress;
    updateFinalValue(100 - progress * 100);
  }, [updateFinalValue, progress, label, subText, type, customContent]);
  return type === 'determinate' ? (
    <div
      className={`${prefix}-pb-linear-wrapper`}
      aria-valuenow={finalVal}
      role="progressbar"
    >
      {(label || customContent) && (
        <div className={`${prefix}-pb-linear-label`}>
          <span
            className={`${prefix}-pb-linear-label-content ${prefix}-pb-linear-ellipsis`}
          >
            {label}
          </span>
          <span className={`${prefix}-pb-linear-label-value`}>
            {customContent}
          </span>
        </div>
      )}
      <svg
        className={`${classnames.join(` `)} ${prefix}-pb-linear-determinate`}
        preserveAspectRatio="none"
        viewBox="0 0 100 4"
      >
        <line
          className={`${prefix}-pb-linear-bgline hcl-pb-linear-line`}
          x1="0"
          y1="2"
          x2="100"
          y2="2"
        />
        <line
          className={`${prefix}-pb-linear-mainline hcl-pb-linear-line`}
          x1="0"
          y1="2"
          x2="100"
          y2="2"
          strokeDashoffset={finalVal}
        />
      </svg>
      {subText && (
        <div
          className={`${prefix}-pb-linear-subtext ${prefix}-pb-linear-ellipsis mt-2`}
        >
          {subText}
        </div>
      )}
    </div>
  ) : (
    <div className={`${prefix}-pb-linear-wrapper`} role="progressbar">
      <svg
        className={`${classnames.join(` `)} ${prefix}-pb-linear-indeterminate`}
        preserveAspectRatio="none"
        viewBox="0 0 125 4"
      >
        <line
          className={`${prefix}-pb-linear-bgline ${prefix}-pb-linear-line`}
          x1="0"
          y1="2"
          x2="125"
          y2="2"
        />
        <line
          className={`${prefix}-pb-linear-mainline-one ${prefix}-pb-linear-line`}
          x1="0"
          y1="2"
          x2="125"
          y2="2"
        />
        <line
          className={`${prefix}-pb-linear-mainline-two ${prefix}-pb-linear-line`}
          x1="0"
          y1="2"
          x2="125"
          y2="2"
        />
        <line
          className={`${prefix}-pb-linear-dot ${prefix}-pb-linear-dot-one ${prefix}-pb-linear-line`}
          x1="0"
          y1="2"
          x2="125"
          y2="2"
        />
        <line
          className={`${prefix}-pb-linear-dot ${prefix}-pb-linear-dot-two ${prefix}-pb-linear-line`}
          x1="0"
          y1="2"
          x2="125"
          y2="2"
        />
        <line
          className={`${prefix}-pb-linear-dot ${prefix}-pb-linear-dot-three ${prefix}-pb-linear-line`}
          x1="0"
          y1="2"
          x2="125"
          y2="2"
        />
      </svg>
    </div>
  );
};

LinearProgressIndicator.propTypes = {
  /** value of the progressbar ranging from 0 to 1  */
  progress: PropTypes.number,
  /** label of the progressbar is placed in topleft of the progressbar */
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  /** subtext for the progressbar is placed in bottomleft of the progressbar */
  subText: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  /** type of the progressbar (eg : determinate / indeterminate) */
  type: PropTypes.oneOf(['determinate', 'indeterminate']),
  /** customContent of the progressbar is placed in topright of the progressbar (html element) */
  customContent: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  /** Class/clasess will be applied on the parent div of Progressbar */
  className: PropTypes.string
};

LinearProgressIndicator.defaultProps = {
  progress: 0,
  label: null,
  customContent: null,
  subText: null,
  type: 'determinate',
  className: ''
};

export default LinearProgressIndicator;
