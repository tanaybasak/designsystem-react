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

  const progressStyle = {
    width: finalVal,
    height: '100%',
    transition: 'width 1s ease-in-out'
  };

  useEffect(() => {
    progress = progress > 1 ? 1 : progress;
    updateFinalValue(progress * 100 + '%');
  }, [updateFinalValue, progress, label, subText, type, customContent]);
  return type === 'determinate' ? (
    <div className={`${prefix}-progressbar-linear`}>
      <div className={`${prefix}-progressbar-linear-label mb-2`}>
        <span className={`${prefix}-progressbar-linear-label-content`}>
          {label}
        </span>
        <span className={`${prefix}-progressbar-linear-label-value`}>
          {customContent}
        </span>
      </div>
      <div className={`${prefix}-progressbar-linear-content`}>
        <div
          className={`${prefix}-progressbar-linear-style`}
          style={progressStyle}
        />
      </div>
      {subText ? (
        <div className={`${prefix}-progressbar-linear-subtext mt-2`}>
          {' '}
          {subText}{' '}
        </div>
      ) : (
        ''
      )}
    </div>
  ) : (
    <>
      <div className={`${prefix}-progressbar-linear-label`}>
        <span className={`${prefix}-progressbar-linear-label-content`}>
          {label}
        </span>
      </div>
      <div className={`${prefix}-indeterm-pb-linear`}>
        <svg
          className={`${prefix}-linear`}
          preserveAspectRatio="none"
          viewBox="0 0 125 4"
        >
          <line
            className={`${prefix}-linear-bgline ${prefix}-linear-line`}
            x1="0"
            y1="2"
            x2="125"
            y2="2"
          />
          <line
            className={`${prefix}-linear-mainline-one ${prefix}-linear-line`}
            x1="0"
            y1="2"
            x2="125"
            y2="2"
          />
          <line
            className={`${prefix}-linear-mainline-two ${prefix}-linear-line`}
            x1="0"
            y1="2"
            x2="125"
            y2="2"
          />
          <line
            className={`${prefix}-linear-dot ${prefix}-linear-dot-one ${prefix}-linear-line`}
            x1="0"
            y1="2"
            x2="125"
            y2="2"
          />
          <line
            className={`${prefix}-linear-dot ${prefix}-linear-dot-two ${prefix}-linear-line`}
            x1="0"
            y1="2"
            x2="125"
            y2="2"
          />
          <line
            className={`${prefix}-linear-dot ${prefix}-linear-dot-three ${prefix}-linear-line`}
            x1="0"
            y1="2"
            x2="125"
            y2="2"
          />
        </svg>
      </div>
      {subText ? (
        <div className={`${prefix}-progressbar-linear-subtext mt-2`}>
          {subText}
        </div>
      ) : (
        ''
      )}
    </>
  );
};

LinearProgressBar.propTypes = {
  /** value of the progressbar */
  progress: PropTypes.number,
  /** label of the progressbar */
  label: PropTypes.element,
  /** subtext for the progressbar */
  subText: PropTypes.element,
  /** type of progress bar */
  type: PropTypes.string,
  /** Custom content on the right */
  customContent: PropTypes.string
};

LinearProgressBar.defaultProps = {
  progress: 0.3,
  label: 'Downloading...',
  customContent: '30%',
  subText: 'subtext'
};

export default LinearProgressBar;
