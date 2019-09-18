import React from 'react';
import prefix from '../../settings';

const ToolBar = React.forwardRef(
    ({ ...props }, ref) => {
        return (
            <div {...props} ref={ref} className="hcl-toolbar" />
            );
    },
);

ToolBar.displayName = 'ToolBar';

export default ToolBar;