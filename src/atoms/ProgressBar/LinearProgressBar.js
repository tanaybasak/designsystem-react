import React, { useState, useEffect, useRef } from 'react';
import prefix from '../../settings';
import PropTypes from 'prop-types';

const LinearProgressBar = ({ value, label, subText, type, rightText }) => {
  const [finalVal, updateFinalValue] = useState(0);

  const progressStyle = {
    width: finalVal,
    height: '100%',
    transition: 'width 1s ease-in-out'
  };
 
  useEffect(() => {
   value = value > 1 ? 1 : value;
      updateFinalValue(value * 100 + '%')
  }, [
    updateFinalValue,
    value,
    label,
    subText,
    type,
    rightText
  ]);
  return type === 'determinate' ? (
    <div className={`${prefix}-progressbar-linear`}>
      <div className={`${prefix}-progressbar-linear-label mb-2`}>
        <span className={`${prefix}-progressbar-linear-label-content`}>
          {label}
        </span>
        <span className={`${prefix}-progressbar-linear-label-value`}>
          {rightText}
        </span>
      </div>
      <div className={`${prefix}-progressbar-linear-content`}>
        <div
          className={`${prefix}-progressbar-linear-style`}
          style={progressStyle}
        ></div>
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
    <div> newElement</div>
  );
};

LinearProgressBar.propTypes = {
  /** value of the progressbar */
  value: PropTypes.number,
  /** maximum value of the progressbar */
  max: PropTypes.number,
  /** label of the progressbar */
  label: PropTypes.element,
  /** subtext for the progressbar */
  subText: PropTypes.element,
  /** type of progress bar */
  type: PropTypes.string
};

LinearProgressBar.defaultProps = {
  value: 30,
  max: 100,
  label: 'Downloading...'
};

export default LinearProgressBar;
