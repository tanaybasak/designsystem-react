import React, { useState, useEffect } from 'react';
import prefix from '../../settings';
import PropTypes from 'prop-types';

const LinearProgressBar = ({
  progress,
  label,
  subText,
  type,
  customContent
}) => {
  const [finalVal, updateFinalValue] = useState(0);
  useEffect(() => {
    progress = progress > 1 ? 1 : progress;
    updateFinalValue(100 - progress * 100);
  }, [updateFinalValue, progress, label, subText, type, customContent]);
  return type === 'determinate' ? (
    <div className={`${prefix}-pb-linear-wrapper`}>
      <div className={`${prefix}-pb-linear-label`}>
        <span className={`${prefix}-pb-linear-label-content`}>{label}</span>
        <span className={`${prefix}-pb-linear-label-value`}>
          {customContent}
        </span>
      </div>
      <svg
        className={`${prefix}-pb-linear ${prefix}-pb-linear-determinate`}
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
      <div className={`${prefix}-pb-linear-subtext mt-2`}>{subText}</div>
    </div>
  ) : (
    <div className={`${prefix}-pb-linear-wrapper`}>
      <svg
        className={`${prefix}-pb-linear ${prefix}-pb-linear-indeterminate`}
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

LinearProgressBar.propTypes = {
  /** value of the progressbar */
  progress: PropTypes.number,
  /** label of the progressbar */
  label: PropTypes.string,
  /** subtext for the progressbar */
  subText: PropTypes.string,
  /** type of progress bar */
  type: PropTypes.string,
  /** Custom content for the progressbar */
  customContent: PropTypes.element
};

LinearProgressBar.defaultProps = {
  progress: 0.3,
  label: 'Downloading...',
  customContent: <p>40%</p>,
  subText: 'subtext'
};

export default LinearProgressBar;
