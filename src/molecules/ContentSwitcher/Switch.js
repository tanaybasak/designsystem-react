import React from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';

function Switch({ label, onClick, active, isDisabled, iconClass, ...restProps }) {
    return (
        <button
            tabIndex={0}
            aria-label={label}
            key={`${label}-`}
            onClick={onClick}
            disabled={isDisabled}
            className={`${prefix}-content-switcher-btn ${active ? 'active' : ''}`}
            {...restProps}
        >
            {
                iconClass ?
                    <div className={`${prefix}-thumbnail-wrapper`}>
                        <span className={`${prefix}-thumbnail ${iconClass}`} />
                    </div>
                    : null
            }
            <span>
                {label}
            </span>
        </button>
    )
}

Switch.propTypes = {
    /** Text used to Differentiate Each Switches. */
    label: PropTypes.string,
    /** Accepts event handler as prop/argument. */
    onClick: PropTypes.func,
    //** Disable Switch */
    isDisabled: PropTypes.bool,
    /** A class name used before the label text. */
    iconClass: PropTypes.string,
    /** true – ‘active’ class is added the switch element 

false – ‘active’ is removed from the switch element. */
    active: PropTypes.bool
};

Switch.defaultProps = {
    label: '',
    onClick: () => { },
    isDisabled: false,
    iconClass: '',
    active: false
};

export default Switch;