import React from 'react';
import prefix from '../../settings';

const ActionList = React.forwardRef(({ ...props }, ref) => {
  return <div {...props} ref={ref} className={`${prefix}-actionbar-list`} />;
});

ActionList.displayName = 'ActionList';

export default ActionList;
