import React from 'react';
import PropTypes from 'prop-types';
import { prefix } from '../../../settings';

export default function Paragraph({ className, children, ...labelProps }) {

    return (
        <p
            className={className}
            {...labelProps}
        >
            {children}
        </p>
    )
};

Paragraph.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string
};

Paragraph.defaultProps = {
    children: '',
    className: ''
};