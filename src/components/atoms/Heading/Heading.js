import React from './node_modules/react';
import PropTypes from './node_modules/prop-types';
import { prefix } from '../../../settings';

export default function Heading(props) {
    const Element = props.type;

    return (
        <Element
            className={`${prefix}-${props.type} ${props.className}`}
        >
            {props.children}
        </Element>
    );
};

Heading.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']).isRequired
};

Heading.defaultProps = {
    children: 'Heading',
    className: '',
    type: 'h2'
};