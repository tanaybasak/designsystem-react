import React from 'react';
import prefix from '../../settings';

const ActionBar = React.forwardRef(({ ...props }, ref) => {
  return (
    <section
      {...props}
      ref={ref}
      className={`${prefix}-actionbar`}
      aria-label="Table Action Bar"
    />
  );
});

ActionBar.displayName = 'ActionBar';

export default ActionBar;
