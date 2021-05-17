/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState, cloneElement } from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';
import { checkmark, inlineClose } from '../../util/icons';
import Overlay from '../Overlay';
import Spinner from '../Spinner';
import Button from '../Button';
import { isDateEqual } from '../../util/utility';

const InlineEdit = ({
  onClose,
  onTextUpdate,
  customIcon,
  onChange,
  errorMessage,
  loader,
  disableSave,
  disableClose,
  children,
  className,
  ...restProps
}) => {
  const inlineEditorRef = useRef(null);
  const [displayActionPanel, setDisplayActionPanel] = useState(false);
  const [matchedValue, setMatchedValue] = useState(true);

  const inlineEditValue = useRef(null);
  const currentValue = useRef(null);

  const [overlayTargetEl, setOverlayTargetEl] = useState(null);

  const classNames = [
    `${prefix}-overlay-wrapper ${prefix}-inline-editor-wrapper`
  ];
  if (className) {
    classNames.push(className);
  }

  const isCustomComponent =
    ['Dropdown', 'TextInput', 'DateSelector'].indexOf(
      children.type.displayName
    ) === -1;

  const updateTreenodeNameOnEnter = event => {
    event.stopPropagation();
    if (event.key === 'Enter') {
      if (!isValueEqual()) {
        onTextUpdate(inlineEditValue.current);
      }

      event.preventDefault();
    } else if (event.key === 'Escape') {
      setDisplayActionPanel(false);
      onClose();
      event.preventDefault();
    }
  };

  const closeOnEscape = () => {
    event.stopPropagation();
    if (event.key === 'Escape') {
      setDisplayActionPanel(false);
      onClose();
      event.preventDefault();
    }
  };

  const closeOnFocusOut = () => {
    setTimeout(() => {
      if (
        !inlineEditorRef.current.parentElement.contains(document.activeElement)
      ) {
        closeOverlay();
      }
    });
  };

  useEffect(() => {
    if (
      inlineEditorRef &&
      inlineEditorRef.current &&
      inlineEditorRef.current.firstElementChild
    ) {
      let focusableElement = inlineEditorRef.current.firstElementChild;
      if (!isCustomComponent) {
        if (children.type.displayName === 'Dropdown') {
          focusableElement = focusableElement.firstElementChild;
        } else if (children.type.displayName === 'DateSelector') {
          focusableElement = focusableElement.querySelector(
            '.hcl-dateSelector-input '
          );
        }
      }
      focusableElement.focus();
      if (focusableElement.select) {
        focusableElement.select();
      }
      setOverlayTargetEl(inlineEditorRef.current);
      setDisplayActionPanel(true);
    }

    return function cleanup() {};
  }, []);

  useEffect(() => {
    if (errorMessage) {
      setDisplayActionPanel(true);
    }
  }, [errorMessage]);

  const getChildren = () => {
    if (children.type.displayName === 'Dropdown') {
      currentValue.current = children.props.selectedItem;
      return cloneElement(children, {
        onVisibleChange: status => {
          setDisplayActionPanel(!status);
        },
        onKeyDown: closeOnEscape,
        onBlur: closeOnFocusOut,
        disabled: loader,
        onChange: (value, values) => {
          onChange(value, values);
          if (children.props.dropdownType === 'multi') {
            inlineEditValue.current = values;
            setMatchedValue(false);
          } else {
            inlineEditValue.current = value;
            setMatchedValue(currentValue.current === value.id);
          }
        }
      });
    } else if (children.type.displayName === 'TextInput') {
      currentValue.current = children.props.value;
      return cloneElement(children, {
        onChange: e => {
          e.preventDefault();
          onChange(e);
          inlineEditValue.current = e.currentTarget.value;
          setMatchedValue(currentValue.current === e.currentTarget.value);
        },
        onBlur: closeOnFocusOut,
        disabled: loader,
        onKeyDown: updateTreenodeNameOnEnter
      });
    } else if (children.type.displayName === 'DateSelector') {
      currentValue.current = children.props.defaultDate;
      return cloneElement(children, {
        onDateSelect: date => {
          onChange(date);
          inlineEditValue.current = date;
          setMatchedValue(
            isDateEqual(currentValue.current, inlineEditValue.current)
          );
        },
        onBlur: closeOnFocusOut,
        onKeyDown: closeOnEscape,
        disabled: loader,
        onVisibleChange: status => {
          setDisplayActionPanel(!status);
        }
      });
    } else {
      return children;
    }
  };

  const isValueEqual = () => {
    if (inlineEditValue.current) {
      if (children.type.displayName === 'TextInput') {
        return inlineEditValue.current === currentValue.current;
      } else {
        return matchedValue;
      }
    } else {
      return true;
    }
  };

  const onToggle = (status, type, direction) => {
    if (!status) {
      if (type === 'focusout' && direction === 'backward') {
        const focusableEls = inlineEditorRef.current.parentElement.querySelectorAll(
          'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled]), [tabindex]'
        );

        for (let i = 0; i < focusableEls.length; i++) {
          if (focusableEls[i] === document.activeElement) {
            focusableEls[i - 1].focus();
          }
        }
      } else {
        closeOverlay(status);
      }
    }
  };

  const closeOverlay = status => {
    if (!isCustomComponent) {
      if (isValueEqual() || disableSave) {
        setDisplayActionPanel(status);
        onClose();
      } else {
        onTextUpdate(inlineEditValue.current);
      }
    } else {
      setDisplayActionPanel(status);
      onClose();
    }
  };

  const inlineEditorWrapperClassname = [`${prefix}-inline-editor-component`];
  if (children.type.displayName === 'DateSelector') {
    inlineEditorWrapperClassname.push(
      `${prefix}-inline-editor-component-dt-picker`
    );
  }
  if (children.type.displayName === 'TextInput') {
    inlineEditorWrapperClassname.push(
      `${prefix}-inline-editor-component-text-input`
    );
  }
  if (loader) {
    inlineEditorWrapperClassname.push(`${prefix}-inline-editor-loader-active`);
  }

  return (
    <div className={classNames.join(' ')} {...restProps}>
      <div
        className={inlineEditorWrapperClassname.join(' ')}
        ref={inlineEditorRef}
      >
        {getChildren()}
        {loader && (
          <Spinner className={`${prefix}-inline-editor-loader`} small />
        )}
      </div>

      <Overlay
        direction={'bottom-right'}
        showOverlay={displayActionPanel}
        targetElement={overlayTargetEl}
        className={`${prefix}-inline-editor-overlay`}
        style={{
          width: overlayTargetEl ? overlayTargetEl.offsetWidth + 'px' : '0'
        }}
        onToggle={onToggle}
      >
        <>
          {errorMessage ? (
            <div className={`${prefix}-inline-editor-error`}>
              {errorMessage}
            </div>
          ) : null}

          <div className={`${prefix}-inline-editor-action-wrapper`}>
            <span className={`${prefix}-inline-editor-action-panel`}>
              {customIcon}
              {!isCustomComponent ? (
                <>
                  <Button
                    type="neutral"
                    kind="button"
                    disabled={disableClose || loader ? true : false}
                    onClick={() => {
                      setDisplayActionPanel(false);
                      onClose();
                    }}
                    aria-label="inline-close"
                  >
                    {inlineClose}
                  </Button>
                  <Button
                    type="primary"
                    kind="button"
                    disabled={
                      disableSave || matchedValue || loader ? true : false
                    }
                    onClick={() => {
                      onTextUpdate(inlineEditValue.current);
                    }}
                    aria-label="inline-check"
                  >
                    {checkmark}
                  </Button>
                </>
              ) : null}
            </span>
          </div>
        </>
      </Overlay>
    </div>
  );
};

InlineEdit.propTypes = {
  /** A callback function which will be executed once close or esc button is clicked.
   *
   * @signature
   * ```event``` : callback event on close button click
   */
  onClose: PropTypes.func,
  /** A callback function which will be executed once check or Enter button is clicked.
   *
   * @signature
   * ```updatedContent``` : updated content value is sent via callback.
   */
  onTextUpdate: PropTypes.func,
  /** Error message content which has to be displayed. */
  errorMessage: PropTypes.any,
  /** Used to pass custom button template */
  customIcon: PropTypes.element,
  /** loader is shown upon click */
  loader: PropTypes.bool,
  /** Class/clasess will be applied on the parent div of Select */
  className: PropTypes.string,
  /** Used to pass inline element. eg DateSelector, TextInput, Dropdown */
  children: PropTypes.element,
  /** disable flag for save button */
  disableSave: PropTypes.bool,
  /** disable flag for close button*/
  disableClose: PropTypes.bool,
  /** A callback function which will be executed on change value for dropdown, textinput and dropdown*/
  onChange: PropTypes.func
};

InlineEdit.defaultProps = {
  onClose: () => {},
  onChange: () => {},
  onTextUpdate: () => {},
  errorMessage: null,
  loader: false,
  customIcon: null,
  children: null,
  className: null,
  disableSave: false,
  disableClose: false
};

export default InlineEdit;
