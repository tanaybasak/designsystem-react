import React from 'react';
import PropTypes from 'prop-types';
import prefix from "../../../settings";

const ActionList = React.forwardRef(
    ({ ...props }, ref) => {
        return (
            <div {...props} ref={ref} className={`${prefix}-actionbar-list`} />
        );
    },
);

ActionList.propTypes = {
    children: PropTypes.node.isRequired,
};

ActionList.defaultProps = {

};

ActionList.displayName = 'ActionList';
export default ActionList