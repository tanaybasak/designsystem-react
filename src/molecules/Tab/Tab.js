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
            <a className={`${prefix}-tabs-nav-link`} href="javaScript:void(0);" tabIndex={0}>{label}</a>
        </li>
    );
}

Tab.propTypes = {
    /** Text used to Differentiate Each Tab. */
    label: PropTypes.string,
    /** Disable Tab */
    isDisabled: PropTypes.bool,
    /** true – ‘active’ class is added the switch element 

false – ‘active’ is removed from the switch element.  */
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