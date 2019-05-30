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
    label: PropTypes.string,
    isDisabled: PropTypes.bool,
    active: PropTypes.bool,
    onClick: PropTypes.func,
};
Tab.defaultProps = {
    label: '',
    isDisabled: false,
    active: true,
    onClick: () => { }
};

export default Tab;
