import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';

function Switch({ label, onClick, active, isDisabled, icon, ...restProps }) {
    return (
        <button
            role="tab"
            tabIndex={0}
            aria-label={label}
            key={`${label}-`}
            onClick={onClick}
            disabled={isDisabled}
            className={`${prefix}-content-switcher-btn ${active ? 'active' : ''}`}
            {...restProps}
        >
            {
                icon ?
                    (
                        cloneElement(icon, {
                            className: `${prefix}-thumbnail${icon.props.className ? ' ' + icon.props.className : ''}`
                        })
                    ) : null
            }
            {label}
        </button>
    )
}

Switch.propTypes = {
    /** Text used to Differentiate Each Switches. */
    label: PropTypes.string,
    /** Accepts event handler as prop/argument. */
    onClick: PropTypes.func,
    /** Disables individual Switch */
    isDisabled: PropTypes.bool,
    /** An icon tag or <img> tag for rendering the icon. */
    icon: PropTypes.element,
    /** true – ‘active’ class is added the switch element 

false – ‘active’ is removed from the switch element. */
    active: PropTypes.bool
};

Switch.defaultProps = {
    label: '',
    onClick: () => { },
    isDisabled: false,
    icon: null,
    active: false
};

export default Switch;