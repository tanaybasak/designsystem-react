import React from 'react';
import prefix from '../../../settings';

const ToolBarActions = React.forwardRef(
    ({ ...props }, ref) => {
        return (
            <div {...props} ref={ref} className={`${prefix}-toolbar-content`} />
        );
    },
);

ToolBarActions.displayName = 'ToolBarActions';

export default ToolBarActions