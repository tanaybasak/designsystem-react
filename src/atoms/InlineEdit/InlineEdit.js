import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';
import TextInput from '../TextInput';
import { checkmark, Close } from '../../util/icons';
import Overlay from '../Overlay';

const InlineEdit = ({
  onClose,
  onTextUpdate,
  formStatus,
  errorMessage,
  ...restProps
}) => {
  const textEditorRef = useRef(null);
  const [displayActionPanel, setDisplayActionPanel] = useState(false);
  const [matchedValue, setMatchedValue] = useState(true);
  const [overlayTargetEl, setOverlayTargetEl] = useState(null);
  const stopPropagation = e => {
    e.stopPropagation();
  };

  const updateTreenodeNameOnEnter = event => {
    event.stopPropagation();
    if (event.key === 'Enter') {
      if (restProps.value !== event.currentTarget.value) {
        setMatchedValue(false);
        onTextUpdate(event.currentTarget.value);
      } else {
        setMatchedValue(true);
      }

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
    setOverlayTargetEl(textEditorRef.current.firstElementChild);
    setDisplayActionPanel(true);
    return function cleanup() {};
  }, []);

  const classNames = [`${prefix}-overlay-wrapper`];

  return (
    <div className={classNames.join(' ')} ref={textEditorRef}>
      <TextInput
        type="text"
        {...restProps}
        onBlur={updateTextNodeOnBlur}
        onKeyDown={updateTreenodeNameOnEnter}
        data-invalid={formStatus}
        onClick={stopPropagation}
        onChange={event => {
          restProps.value !== event.currentTarget.value
            ? setMatchedValue(false)
            : setMatchedValue(true);
        }}
      />
      <Overlay
        direction={'bottom-right'}
        showOverlay={displayActionPanel}
        targetElement={overlayTargetEl}
        style={{
          width: overlayTargetEl ? overlayTargetEl.offsetWidth + 'px' : '0'
        }}
      >
        <>
          {errorMessage ? (
            <div className={`${prefix}-inline-error`}>{errorMessage}</div>
          ) : null}
          <div className={`${prefix}-inline-wrapper`}>
            <span className={`${prefix}-inline-panel`}>
              <button
                type="button"
                className={`${prefix}-inline-btn ${prefix}-inline-close`}
                aria-label="inline-close"
                onClick={onClose}
              >
                {Close}
              </button>
              <button
                type="button"
                className={`${prefix}-inline-btn ${prefix}-inline-check`}
                aria-label="inline-check"
                onClick={event => {
                  onTextUpdate(event.currentTarget.value);
                }}
                disabled={errorMessage || matchedValue ? true : false}
              >
                {checkmark}
              </button>
            </span>
          </div>
        </>
      </Overlay>
    </div>
  );
};

InlineEdit.propTypes = {
  /** A callback function which will be executed once close or esc button is clicked. */
  onClose: PropTypes.func,
  /** A callback function which will be executed once check or Enter button is clicked. */
  onTextUpdate: PropTypes.func,
  /** To add a red border on input field upon displaying error message. */
  formStatus: PropTypes.bool,
  /** Error message content which has to be displayed. */
  errorMessage: PropTypes.any
};

InlineEdit.defaultProps = {
  onClose: () => {},
  onTextUpdate: () => {},
  formStatus: false,
  errorMessage: null
};

export default InlineEdit;
