import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../../atoms/Button';
// import prefix from '../../../../settings';
import { convertToDateObj, dayDiff } from '../../../util/utility';

const DateRangeFooter = ({
  onCancel,
  onDone,
  startDateSelected,
  endDateSelected,
  format,
  ...restProps
}) => {
  let range = 0;
  if (startDateSelected && endDateSelected) {
    const endDateObj = convertToDateObj(format, endDateSelected);
    const startDateObj = convertToDateObj(format, startDateSelected);
    range = dayDiff(startDateObj, endDateObj);
  }
  return (
    <div className="hcl-dateSelector-footer">
      <div className="hcl-dateSelector-footer-range">
        <span> Range:</span>
        <span> {`${range} days`}</span>
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
