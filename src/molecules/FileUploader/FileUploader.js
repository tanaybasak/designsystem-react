import React from 'react';
import PropTypes from 'prop-types';
import prefix from "../../settings";
import Paragraph from '../../atoms/Paragraph/Paragraph';

export default function FileUploader({ id, className, label, children, description, disabled, multiple, fileType, tabIndex, onChange, ...restProps }) {
    const classnames = `${prefix}-file-btn ${className}`.trim();

    return (
        <div className={`${prefix}-form-item`}>
            <span className={`${prefix}-label`}>{label}
            </span>
            <Paragraph className={`${prefix}-label-description`}>{description}</Paragraph>
            <div className={`${prefix}-file-uploader`} {...restProps}>
                <input type="file" className={`${prefix}-file-input`} id={id} tabIndex={tabIndex}
                    onChange={onChange} disabled={disabled} multiple={multiple} accept={fileType}
                />
                <label htmlFor={id} className={classnames} role="button">
                    {children}
                </label>
            </div>
        </div>
    );
}

FileUploader.propTypes = {
    id: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    children: PropTypes.any,
    description: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    multiple: PropTypes.bool,
    fileType: PropTypes.string,
    tabIndex: PropTypes.number,
    onChange: PropTypes.func
};

FileUploader.defaultProps = {
    id: null,
    className: '',
    label: '',
    children: null,
    description: '',
    disabled: false,
    multiple: true,
    fileType: '',
    tabIndex: 0,
    onChange: () => { }
};