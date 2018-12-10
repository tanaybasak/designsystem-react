import React from 'react';
import PropTypes from "prop-types";
import './Button.scss';

const Button = props => <button className={`patron-btn ${props.className}`} {...props.data} onClick={props.onClick}>{props.title}</button>

Button.propTypes = {
    title: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    className: PropTypes.string.isRequired,
    data: PropTypes.object
};

Button.defaultProps = {
    title: 'Click Me',
    onClick: event => { },
    className: 'patron-btn-primary',
    data: {}
};


export default Button;