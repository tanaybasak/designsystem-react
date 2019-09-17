import React from 'react';
import PropTypes from 'prop-types';
import prefix from "../../settings";

const ActionBar = React.forwardRef(
    ({ ...props }, ref) => {
        return (
            <section {...props} ref={ref} className={`${prefix}-actionbar`} aria-label="Table Action Bar" />
        );
    },
);

ActionBar.propTypes = {
    children: PropTypes.node.isRequired,
};

ActionBar.defaultProps = {

};

ActionBar.displayName = 'ActionBar';
export default ActionBar