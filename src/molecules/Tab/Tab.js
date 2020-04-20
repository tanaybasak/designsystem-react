import React from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';

function Tab({ label, onClick, active, isDisabled }) {
    return (
        <li
            role="tab"
            className={`${prefix}-tabs-nav-item ${active ? 'active' : ''} ${
                isDisabled ? `${prefix}-tabs-disabled` : ''
                }`}
            onClick={onClick}
        >
            <a className={`${prefix}-tabs-nav-link`} tabIndex={0}>{label}</a>
        </li>
    );
}

Tab.propTypes = {
    /** Text used to Differentiate Each Tab. */
    label: PropTypes.string,
    /** Disables Tab if 'true'*/
    isDisabled: PropTypes.bool,
    /** true – ‘active’ class is added to the current element 

false – ‘active’ is removed from the current element.  */
    active: PropTypes.bool,
    /** Accepts Click handler as prop/Argument. */
    onClick: PropTypes.func,
};
Tab.defaultProps = {
    label: '',
    isDisabled: false,
    active: true,
    onClick: () => { }
};

export default Tab;