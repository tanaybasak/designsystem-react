import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import prefix from '../../../settings';

function Switch({ label, onClick, active, isDisabled, iconClass, ...restProps }) {
    return (
        <Button
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
                    <span className={`${prefix}-thumbnail ${iconClass}`}>
                    </span> : null
            }
            <span>
                {label}
            </span>
        </Button>
    )
}

Switch.propTypes = {
    label: PropTypes.string,
    onClick: PropTypes.func,
    isDisabled: PropTypes.bool,
    iconClass: PropTypes.string,
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