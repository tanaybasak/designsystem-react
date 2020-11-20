import React from 'react';
import prefix from '../../settings';
import PropTypes from 'prop-types';

const DeterminateProgressBar = ({value, max, label, subText }) => {
  const finalVal = (value / max) * 100 + '%';
  const progressStyle = {
    width: finalVal,
    height: '100%',
    backgroundColor: 'blue',
    transition: 'width 1s ease-in-out'
  };

  return (
    <div className={`${prefix}-progressbar`}>
      <div className={`${prefix}-progressbar-label mb-2`}>
        <span className={`${prefix}-progressbar-label-content`}>{label}</span>
        <span className={`${prefix}-progressbar-label-value`}>{finalVal}</span>
      </div>
      <div className={`${prefix}-progressbar-content`}>
        <div className={`${prefix}-form-control`} style={progressStyle}></div>
      </div>
      {subText ? <div className={`${prefix}-progressbar-subtext mt-2`}> {subText} </div> : ''}
    </div>
  );
};

DeterminateProgressBar.propTypes = {
    /** Progressbar color */
    color: PropTypes.string,
    /** value of the progressbar */
    value: PropTypes.number,
    /** maximum value of the progressbar */
    max : PropTypes.number,
    /** label of the progressbar */
    label : PropTypes.string,
    /** subtext for the progressbar */
    subText : PropTypes.string 
  };
  
  DeterminateProgressBar.defaultProps = {
    value : 30,
    max : 100,
    label : 'Downloading...'
  };

export default DeterminateProgressBar;
