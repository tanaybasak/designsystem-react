import React from 'react';
import prefix from '../../settings';
import PropTypes from 'prop-types';

const LinearProgressBar = ({ value, max, label, subText, type }) => {
  const finalVal = (value / max) * 100 + '%';
  const progressStyle = {
    width: finalVal,
    height: '100%',
    transition: 'width 1s ease-in-out'
  };

  return (
    <div className={`${prefix}-progressbar-linear`}>
      <div className={`${prefix}-progressbar-linear-label mb-2`}>
        <span className={`${prefix}-progressbar-linear-label-content`}>{label}</span>
        <span className={`${prefix}-progressbar-linear-label-value`}>{finalVal}</span>
      </div>
      <div className={`${prefix}-progressbar-linear-content`}>
        <div className={`${prefix}-form-control ${prefix}-progressbar-linear-style`} style={progressStyle}></div>
      </div>
      {subText ? (
        <div className={`${prefix}-progressbar-linear-subtext mt-2`}> {subText} </div>
      ) : (
        ''
      )}
    </div>
  );
};

LinearProgressBar.propTypes = {
  /** Progressbar color */
  color: PropTypes.string,
  /** value of the progressbar */
  value: PropTypes.number,
  /** maximum value of the progressbar */
  max: PropTypes.number,
  /** label of the progressbar */
  label: PropTypes.string,
  /** subtext for the progressbar */
  subText: PropTypes.string,
  /** type of progress bar */
  type : PropTypes.string
};

LinearProgressBar.defaultProps = {
  value: 30,
  max: 100,
  label: 'Downloading...'
};

export default LinearProgressBar;
