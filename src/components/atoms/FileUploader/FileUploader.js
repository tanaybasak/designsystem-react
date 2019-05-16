import React from 'react';
import PropTypes from 'prop-types';
import { prefix } from '../../../settings';

export default function FileUploader({ id, className, label, description, disabled, multiple, tabIndex, onChange, ...restProps }) {
    const classnames = `${prefix}-file ${className}`.trim();

    return (
        <div className={`${prefix}-form-item`}>
            <strong className={`${prefix}-label`}>{label}
            </strong>
            <p className={`${prefix}-label-description`}>{description}</p>
            <div className={classnames} {...restProps}>
                <input type="file" className={`${prefix}-file-input`} id={id} tabIndex={tabIndex}
                    onChange={onChange} disabled={disabled} multiple={multiple} />
                <label for={id} className={`${prefix}-file-btn ${prefix}-btn ${prefix}-primary
                    ${prefix}-primary-outline ${prefix}-sm`} role="button" tabindex="0">
                    Add file
                    <span className={`${prefix}-file-btn-icon`}></span>
                </label>
            </div>
        </div>
    );
};

FileUploader.propTypes = {
    id: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    multiple: PropTypes.bool,
    tabIndex: PropTypes.number,
    onChange: PropTypes.func
};

FileUploader.defaultProps = {
    id: null,
    className: '',
    label: '',
    description: '',
    disabled: false,
    multiple: true,
    tabIndex: 0,
    onChange: () => { }
};