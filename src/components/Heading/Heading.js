import React from 'react';
import PropTypes from 'prop-types';
import { prefix } from '../../settings';

export default function Heading(props) {
    const Element = props.type;
    return (
        <Element className={`${prefix}-${props.type} ${prefix}-${props.className}`}>
            {props.children}
        </Element>
    );
};

Heading.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
};