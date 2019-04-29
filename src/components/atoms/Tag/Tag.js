import React from 'react';
import PropTypes from 'prop-types';
import { prefix } from '../../../settings';

export default function Tag({ className, children, text, type, onClose, src, ...restProps }) {
    return (
        <button
            className={`${prefix}-tag hcl-tag-${type} ${className}`}
            {...restProps}
        >
            {src ? <img src={src} className={`${prefix}-tag-thumbnail`} aria-hidden="true" /> : null}
            <span className={`${prefix}-tag-text`}>
                {children || text}
            </span>
            {onClose ? <span className={`${prefix}-close`} aria-hidden="true" onClick={onClose}></span> : null}
        </button>
    );
};

Tag.propTypes = {
    className: PropTypes.string,
    children: PropTypes.string.isRequired,
    text: PropTypes.string,
    type: PropTypes.oneOf(['primary', 'secondary']).isRequired,
    title: PropTypes.string,
    tabIndex: PropTypes.number,
    disabled: PropTypes.bool,
    onClose: PropTypes.func,
    src: PropTypes.string
};

Tag.defaultProps = {
    className: '',
    children: '',
    text: null,
    type: 'primary',
    title: '',
    tabIndex: 0,
    disabled: false,
    onClose: null,
    src: null
};