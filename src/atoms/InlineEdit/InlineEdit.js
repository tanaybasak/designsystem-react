import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';
import TextInput from '../TextInput';
import { checkmark, Close } from '../../util/icons';
import Overlay from '../Overlay';
import Spinner from '../Spinner';

const InlineEdit = ({
  onClose,
  onTextUpdate,
  formStatus,
  errorMessage,
  loader,
  ...restProps
}) => {
  const inlineEditorRef = useRef(null);
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

  useEffect(() => {
    inlineEditorRef.current.firstElementChild.focus();
    inlineEditorRef.current.firstElementChild.select();
    setOverlayTargetEl(inlineEditorRef.current.firstElementChild);
    setDisplayActionPanel(true);
    return function cleanup() {};
  }, []);

  const classNames = [`${prefix}-overlay-wrapper`];

  return (
    <div className={classNames.join(' ')} ref={inlineEditorRef}>
      <TextInput
        type="text"
        {...restProps}
        onKeyDown={updateTreenodeNameOnEnter}
        data-invalid={formStatus}
        onClick={stopPropagation}
        onChange={event => {
          restProps.value !== event.currentTarget.value
            ? setMatchedValue(false)
            : setMatchedValue(true);
        }}
      />
      {loader && (
        <Spinner
          style={{ top: '0.75rem', left: '9rem', position: 'absolute' }}
          small
        />
      )}

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
                onClick={() => {
                  onTextUpdate(inlineEditorRef.current.firstElementChild.value);
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
  errorMessage: PropTypes.any,
  loader: PropTypes.bool
};

InlineEdit.defaultProps = {
  onClose: () => {},
  onTextUpdate: () => {},
  formStatus: false,
  errorMessage: null,
  loader: false
};

export default InlineEdit;
