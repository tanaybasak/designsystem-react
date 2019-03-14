import React from 'react';
import PropTypes from "prop-types";
import { prefix } from '../../settings';

const Button = React.forwardRef((props, ref) => (
    <button
        ref={ref}
        className={`${prefix}-btn ${prefix}-btn--${props.className}`}
        {...props.data}
        onClick={props.onClick}
    >
        {props.label}
    </button>
));

Button.propTypes = {
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    className: PropTypes.string.isRequired,
    data: PropTypes.object
};

export default Button;