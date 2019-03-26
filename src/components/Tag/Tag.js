import React from 'react';
import PropTypes from 'prop-types';
import { prefix } from '../../settings';
import './Tag.scss';

export default function Tag(props) {
    return (
        <div className={`${prefix}-tag ${props.className}`}
            onClick={props.onClick}
        >
            {props.children}
            {
                props.isCloseable ?
                    <span
                        className={`${prefix}-tag--is-closeable`}
                        onClick={event => { event.stopPropagation(); props.onClose(event); }}
                    >
                        &#9747;
                </span>
                    : null
            }
        </div>
    );
};

Tag.defaultProps = {
    onClose: event => { console.log('Tag close button clicked') }
};

Tag.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string.isRequired,
    isCloseable: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
    onClose: PropTypes.func
};