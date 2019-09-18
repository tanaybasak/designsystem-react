import React from 'react';
import prefix from '../../settings';

const ToolBarSearch = React.forwardRef(
    ({ ...props }, ref) => {
        return (
            <div {...props} ref={ref} className={`${prefix}-search ${prefix}-search-sm ${prefix}-bg-white ${prefix}-toolbar-search`} />
        );
    },
);

ToolBarSearch.displayName = 'ToolBarSearch';

export default ToolBarSearch