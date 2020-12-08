import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';
import TextInput from '../TextInput';
import { checkmark, inlineClose } from '../../util/icons';
import Overlay from '../Overlay';
import Spinner from '../Spinner';

const InlineEdit = ({
  onClose,
  onTextUpdate,
  formStatus,
  customIcon,
  errorMessage,
  loader,
  onClick,
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

  let customElement = null;
  customIcon
    ? (customElement = React.Children.map(customIcon, child => {
        if (child.props.children && child.props.children.length) {
          return child.props.children.map((item, index) => {
            const icon = React.cloneElement(item);
            return (
              <button
                key={index}
                type="button"
                className={`${prefix}-inline-btn ${prefix}-inline-custom-btn`}
                aria-label="inline-btn"
                onClick={onClick}
              >
                {icon}
              </button>
            );
          });
        } else {
          const icon = React.cloneElement(child);
          return (
            <button
              type="button"
              className={`${prefix}-inline-btn ${prefix}-inline-custom-btn`}
              aria-label="inline-btn"
              onClick={onClick}
              disabled={loader ? true : false}
            >
              {icon}
            </button>
          );
        }
      }))
    : null;

  const classNames = [`${prefix}-overlay-wrapper ${prefix}-inline-overlay`];

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
      {loader && <Spinner className={`${prefix}-inline-loader`} small />}

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
              {customElement}
              <button
                type="button"
                className={`${prefix}-inline-btn ${prefix}-inline-close`}
                aria-label="inline-close"
                onClick={onClose}
                disabled={loader ? true : false}
              >
                {inlineClose}
              </button>
              <button
                type="button"
                className={`${prefix}-inline-btn ${prefix}-inline-check`}
                aria-label="inline-check"
                onClick={() => {
                  onTextUpdate(inlineEditorRef.current.firstElementChild.value);
                }}
                disabled={errorMessage || matchedValue || loader ? true : false}
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
  /** Used to pass custom icon template */
  customIcon: PropTypes.element,
  /** A callback function which will be executed once custom button is clicked. */
  onClick: PropTypes.func.isRequired,
  /** loader is shown upon click */
  loader: PropTypes.bool
};

InlineEdit.defaultProps = {
  onClose: () => {},
  onClick: () => {},
  onTextUpdate: () => {},
  formStatus: false,
  errorMessage: null,
  loader: false,
  customIcon: null
};

export default InlineEdit;
