import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';
import TextInput from '../TextInput';
import Overlay from '../Overlay';
const TextEditor = ({
  onClose,
  onTextUpdate,
  formStatus,
  errorMessage,
  ...restProps
}) => {
  const textEditorRef = useRef(null);
  const [width, setOverlayWidth] = useState('');
  const stopPropagation = e => {
    e.stopPropagation();
  };

  const updateTreenodeNameOnEnter = event => {
    event.stopPropagation();
    if (event.key === 'Enter') {
      onTextUpdate(event.currentTarget.value);
      event.preventDefault();
    } else if (event.key === 'Escape') {
      onClose();
      event.preventDefault();
    }
  };

  const updateTextNodeOnBlur = event => {
    onTextUpdate(event.currentTarget.value);
  };

  useEffect(() => {
    textEditorRef.current.firstElementChild.focus();
    textEditorRef.current.firstElementChild.select();
    setOverlayWidth(textEditorRef.current.firstElementChild.offsetWidth);
    return function cleanup() {};
  }, []);

  const [showOverlay, setOverlay] = useState(false);
  useEffect(() => {
    if (errorMessage) {
      setOverlay(true);
    }
  }, [errorMessage]);

  return (
    <div
      className={`${prefix}-form-group ${prefix}-text-container`}
      ref={textEditorRef}
    >
      <TextInput
        type="text"
        {...restProps}
        onBlur={updateTextNodeOnBlur}
        onKeyDown={updateTreenodeNameOnEnter}
        data-invalid={formStatus}
        onClick={stopPropagation}
      />
      {errorMessage ? (
        <Overlay
          showOverlay={showOverlay}
          targetElement={textEditorRef ? textEditorRef.current : null}
          attachElementToBody
          style={{ width: width }}
        >
          {errorMessage}
        </Overlay>
      ) : null}
    </div>
  );
};

TextEditor.propTypes = {
  onClose: PropTypes.func,
  onTextUpdate: PropTypes.func,
  formStatus: PropTypes.bool,
  errorMessage: PropTypes.any
};

TextEditor.defaultProps = {
  onClose: () => {},
  onTextUpdate: () => {},
  formStatus: false,
  errorMessage: null
};

export default TextEditor;
