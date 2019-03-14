import React from 'react';
import PropTypes from 'prop-types';
import { prefix } from '../../settings';
import './Tag.scss';

const Tag = props => (
    <div className={`${prefix}-tag ${prefix}-tag--${props.className}`}
        onClick={props.onClick}
    >
        {props.children}
        {
            props.isCloseable ?
                <span
                    className={`${prefix}-tag--is-closeable`}
                    onClick={props.onClick}
                >
                    &#9747;
                </span>
                : null
        }
    </div>
)

Tag.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string.isRequired,
    isCloseable: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired
};

export default Tag;