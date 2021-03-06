/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';
import Paragraph from '../../atoms/Paragraph/Paragraph';
import { Close } from '../../util/icons';
export default function FileUploader({
  id,
  name,
  className,
  label,
  children,
  description,
  disabled,
  multiple,
  fileType,
  tabIndex,
  hideFile,
  required,
  onChange,
  ...restProps
}) {
  const classnames = `${prefix}-file-btn ${prefix}-btn ${className}`.trim();

  const [fileLists, setFileList] = useState([]);

  const fileContainer = useRef(null);

  const keyListener = event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      fileContainer.current.querySelector(`.${prefix}-file-btn`).click();
    }
  };

  const getFileList = event => {
    const files = event.target.files;
    const filelist = Object.keys(files).map(i => files[i]);
    const tempFileLists = multiple
      ? [...fileLists, ...filelist]
      : [...filelist];
    setFileList(tempFileLists);
    onChange(tempFileLists, event);
    //event.target.value = null;
  };

  const removeFile = (event, name) => {
    event.preventDefault();
    const index = fileLists.findIndex(file => file.name === name);
    const newFileList = [...fileLists];
    if (index !== -1) {
      newFileList.splice(index, 1);
      setFileList(newFileList);
      clearInputElement();
    }
    onChange(newFileList, event);
  };

  const clearInputElement = () => {
    fileContainer.current.querySelector('input').value = '';
  };

  return (
    <div className={`${prefix}-form-item`}>
      {label && label.length ? (
        <span className={`${prefix}-label`}>{label}</span>
      ) : null}
      {description && description.length ? (
        <Paragraph className={`${prefix}-label-description`}>
          {description}
        </Paragraph>
      ) : null}
      <div
        className={`${prefix}-file-uploader`}
        ref={fileContainer}
        {...restProps}
      >
        <input
          type="file"
          className={`${prefix}-file-input`}
          id={id}
          name={name}
          tabIndex={tabIndex}
          onChange={getFileList}
          disabled={disabled}
          multiple={multiple}
          accept={fileType}
          required={required}
        />
        <label
          htmlFor={id}
          className={classnames}
          onKeyDown={keyListener}
          tabIndex={!disabled ? '0' : null}
        >
          {children}
        </label>
        <div className={`${prefix}-file-container`}>
          {fileLists.length && !hideFile
            ? fileLists.map((fileList, index) => (
                <div key={index} className={`${prefix}-file-container-item`}>
                  <span
                    title={fileList.name}
                    className={`${prefix}-file-selected-file`}
                  >
                    <p className={`${prefix}-file-filename`}>{fileList.name}</p>
                  </span>
                  <button
                    aria-label="close file"
                    onClick={e => removeFile(e, fileList.name)}
                    type="button"
                    className={`${prefix}-file-close`}
                  >
                    {Close}
                  </button>
                </div>
              ))
            : null}
        </div>
      </div>
    </div>
  );
}

FileUploader.propTypes = {
  /** Unique id for File Uploader */
  id: PropTypes.string.isRequired,
  /** Name of uploading file */
  name: PropTypes.string,
  /** Name of the custom class to apply to the File Uploader Button
   * eg:
   *
   * * ```Primary``` : 'hcl-btn hcl-primary',
   * * ```Primary Danger``` : 'hcl-btn hcl-primary hcl-danger',
   * * ```Primary Danger Small``` : 'hcl-btn hcl-primary hcl-danger hcl-sm',
   * * ```Primary Small``` : 'hcl-btn hcl-primary hcl-sm',
   * * ```Secondary``` : 'hcl-btn hcl-secondary',
   * * ```Secondary Danger``` : 'hcl-btn hcl-secondary hcl-danger',
   * * ```Secondary Danger Small``` : 'hcl-btn hcl-secondary hcl-danger hcl-sm',
   * * ```Ghost``` : 'hcl-btn hcl-ghost'
   */
  className: PropTypes.string,
  /** Label for File Uploader */
  label: PropTypes.string,
  /** Children of File Uploader button */
  children: PropTypes.any,
  /** Description of File Uploader */
  description: PropTypes.string,
  /** Boolean value to disable File Uploader */
  disabled: PropTypes.bool,
  /** Boolean value to select Multiple files from File Uploader */
  multiple: PropTypes.bool,
  /** File type for File Uploader */
  fileType: PropTypes.string,
  /** Tab Index for File Uploader */
  tabIndex: PropTypes.number,
  /** Call back function that is invoked when File Uploader is clicked
   *
   * @signature
   * * ```filename``` : filename
   * * ```event``` : click event
   */
  onChange: PropTypes.func,
  /** Boolean value to hide or show file names selected from File Uploader */
  hideFile: PropTypes.bool,
  /** Boolean value, if true, files must be present before submitting the form */
  required: PropTypes.bool
};

FileUploader.defaultProps = {
  id: null,
  name: '',
  className: '',
  label: '',
  children: null,
  description: '',
  disabled: false,
  multiple: false,
  fileType: '',
  tabIndex: 0,
  hideFile: false,
  required: false,
  onChange: () => {}
};
