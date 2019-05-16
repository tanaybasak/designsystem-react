import React from 'react';
import PropTypes from 'prop-types';
import { prefix } from '../../../settings';

const Tab = ({ label, onClick, active, isDisabled }) => {
    return (
        <li
            role='tab'
            className={`${prefix}-tabs-nav-item ${active ? 'active' : ''} ${isDisabled ? `${prefix}-tabs-disabled` : ''}`}
            onClick={onClick}
        >
            <a
                className={`${prefix}-tabs-nav-link`}>
                {label}
            </a>
        </li>
    );
}

Tab.propTypes = {
    label: PropTypes.string,
    isDisabled: PropTypes.bool
}
Tab.defaultProps = {
    label: '',
    isDisabled: false
}

export { Tab };