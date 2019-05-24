import React from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';

function Tab({ label, onClick, active = false, isDisabled }) {
    return (
        <li
            role='tab'
            className={`${prefix}-tabs-nav-item ${active ? 'active' : ''} ${
                isDisabled ? `${prefix}-tabs-disabled` : ''
                }`}
            onClick={onClick}
        >
            <a className={`${prefix}-tabs-nav-link`} href={() => { }} tabIndex={0}>{label}</a>
        </li>
    );
}

Tab.propTypes = {
    label: PropTypes.string,
    isDisabled: PropTypes.bool,
    onClick: PropTypes.func,
};
Tab.defaultProps = {
    label: '',
    isDisabled: false,
    onClick: () => { }
};

export default Tab;
