import React from 'react';
import PropTypes from 'prop-types';
import prefix from "../../../settings";

const ActionSummary = React.forwardRef(
    ({ ...props }, ref) => {
        return (
            <div {...props} ref={ref} className={`${prefix}-actionbar-summary`} />
        );
    },
);

ActionSummary.propTypes = {
    children: PropTypes.node.isRequired,
};

ActionSummary.defaultProps = {

};

ActionSummary.displayName = 'ActionSummary';
export default ActionSummary