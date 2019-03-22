import React from 'react';
import PropTypes from 'prop-types';
import { prefix } from '../../settings';

export default function Button(props) {
    return (
        <button
            className={`${prefix}-btn ${prefix}-btn--${props.className}`}
            onClick={props.onClick}
        >
            {props.children}
        </button>
    );
};

Button.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};