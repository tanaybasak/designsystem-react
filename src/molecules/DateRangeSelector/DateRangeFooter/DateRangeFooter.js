import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../../atoms/Button';
// import prefix from '../../../../settings';

const DateRangeFooter = ({ onCancel, onDone, range }) => {
  return (
    <div className="hcl-dateSelector-footer">
      <div className="hcl-dateSelector-footer-range">
        {range >= 0 ? (
          <>
            <span> Range:</span>
            <span> {`${range + 1} days`}</span>
          </>
        ) : (
          <span className="hcl-dateSelector-footer-error">
            Start date should be less than end date
          </span>
        )}
      </div>
      <div>
        <button className="hcl-btn hcl-ghost mr-4" onClick={onCancel}>
          Cancel
        </button>
        <Button
          className=""
          disabled={range < 0 ? true : false}
          onClick={onDone}
          small={false}
          title="Default"
          type="primary"
        >
          Done
        </Button>
      </div>
    </div>
  );
};

DateRangeFooter.propTypes = {
  onCancel: PropTypes.func,
  onDone: PropTypes.func,
  range: PropTypes.any
};

export default DateRangeFooter;
