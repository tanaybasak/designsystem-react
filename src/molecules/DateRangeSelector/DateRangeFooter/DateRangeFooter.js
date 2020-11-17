import React from 'react';
import PropTypes from 'prop-types';
// import prefix from '../../../../settings';
// import { convertToDateObj } from '../../../../util/utility';

const DateRangeFooter = ({ onCancel, onDone, ...restProps }) => {
  return (
    <div className="hcl-dateSelector-footer">
      <div className="hcl-dateSelector-footer-range">
        <span> Range:</span>
        <span> 1 day</span>
      </div>
      <div>
        <button className="hcl-btn hcl-ghost mr-4" onClick={onCancel}>
          Cancel
        </button>
        <button className="hcl-btn hcl-primary" onClick={onDone}>
          Done
        </button>
      </div>
    </div>
  );
};

DateRangeFooter.propTypes = {
  // dateSelected: PropTypes.string.isRequired,
  // format: PropTypes.string.isRequired
  // currDateObj: PropTypes.object,
};

export default DateRangeFooter;
