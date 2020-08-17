import React from 'react';
import prefix from '../../settings';

const ToolBar = React.forwardRef(({ ...props }, ref) => {
  return <div {...props} ref={ref} className={`${prefix}-toolbar`} />;
});

ToolBar.displayName = 'ToolBar';

export default ToolBar;
