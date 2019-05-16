import React from './node_modules/react';
import PropTypes from './node_modules/prop-types';

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