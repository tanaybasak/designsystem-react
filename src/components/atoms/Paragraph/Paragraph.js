import React from 'react';
import PropTypes from 'prop-types';
import { prefix } from '../../../settings';

export default function Paragraph({ className, children, ...restProps }) {

    return (
        <p
            className={className}
            {...restProps}
        >
            {children}
        </p>
    );
};

Paragraph.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string
};

Paragraph.defaultProps = {
    children: null,
    className: ''
};