import React from "react";
import PropTypes from "prop-types";
import { prefix } from '../../../settings';

export default function Tag({ className, children, text, type, closable, onClose, thumbnailSrc, ...restProps }) {
    const classnames = `${prefix}-tag hcl-tag-${type} ${className}`.trim();

    return (
        <button
            className={classnames}
            {...restProps}
        >
            {
                thumbnailSrc ?
                    <img
                        src={thumbnailSrc}
                        className={`${prefix}-tag-thumbnail`}
                        aria-hidden="true"
                        alt="Thumbnail"
                    />
                    : null
            }
            <span className={`${prefix}-tag-text`}>
                {children || text}
            </span>
            {closable ? <span className={`${prefix}-close`} aria-hidden="true" onClick={onClose}></span> : null}
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
    closable: PropTypes.bool,
    onClose: PropTypes.func,
    thumbnailSrc: PropTypes.string
};

Tag.defaultProps = {
    className: '',
    children: '',
    text: null,
    type: 'primary',
    title: '',
    tabIndex: 0,
    disabled: false,
    closable: false,
    onClose: null,
    thumbnailSrc: null
};