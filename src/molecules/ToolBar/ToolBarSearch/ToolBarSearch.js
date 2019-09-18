import React from 'react';
// import prefix from '../../settings';

const ToolBarSearch = React.forwardRef(
    ({ ...props }, ref) => {
        return (
            <div {...props} ref={ref} className="hcl-search hcl-search-sm hcl-bg-white hcl-toolbar-search" />
        );
    },
);

ToolBarSearch.displayName = 'ToolBarSearch';

export default ToolBarSearch