import React from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';

const Tag = ({
    className,
    children,
    text,
    type,
    closable,
    onClose,
    thumbnailSrc,
    ...restProps
}) => {
    const classnames = `${prefix}-tag hcl-tag-${type} ${className}`.trim();

    return (
        <button type="button" className={classnames} {...restProps}>
            {thumbnailSrc ? (
                <img
                    src={thumbnailSrc}
                    className={`${prefix}-tag-thumbnail`}
                    aria-hidden="true"
                    alt="Thumbnail"
                />
            ) : null}
            <span className={`${prefix}-tag-text`}>{children || text}</span>
            {closable ? (
                <span
                    className={`${prefix}-close`}
                    aria-hidden="true"
                    onClick={onClose}
                />
            ) : null}
        </button>
    );
}

Tag.propTypes = {
    /** Custom class for tag */
    className: PropTypes.string,
    /** Text value for tag */
    children: PropTypes.string,
    /** Text value for tag */
    text: PropTypes.string,
    /** Type of Tag eg: 'primary', 'secondary' */
    type: PropTypes.oneOf(["primary", "secondary"]),
    /** Title of Tag */
    title: PropTypes.string,
    /** Tab index for Tag */
    tabIndex: PropTypes.number,
    /** Boolean value to disable Tag */
    disabled: PropTypes.bool,
    /** Boolean value to show or hide close button in Tag */
    closable: PropTypes.bool,
    /** Callback function on close of Tag Component
     * 
     * Argument – event
     */
    onClose: PropTypes.func,
    /** Src of thumbnail for Tag Component */
    thumbnailSrc: PropTypes.string
};

Tag.defaultProps = {
    className: "",
    children: "",
    text: null,
    type: "primary",
    title: "",
    tabIndex: 0,
    disabled: false,
    closable: false,
    onClose: null,
    thumbnailSrc: null
};

export default Tag;