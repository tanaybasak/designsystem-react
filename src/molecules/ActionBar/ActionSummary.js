import React from 'react';
import prefix from '../../settings';

const ActionSummary = React.forwardRef(
    ({ ...props }, ref) => {
        return (
            <div {...props} ref={ref} className={`${prefix}-actionbar-summary`} />
        );
    },
);

ActionSummary.displayName = 'ActionSummary';

export default ActionSummary