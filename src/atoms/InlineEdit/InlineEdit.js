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
  errorMessage,
  loader,
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
    ['Dropdown', 'TextInput', 'DateSelector'].indexOf(children.type.name) ===
    -1;

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

  useEffect(() => {
    if (
      inlineEditorRef &&
      inlineEditorRef.current &&
      inlineEditorRef.current.firstElementChild &&
      inlineEditorRef.current.firstElementChild.firstElementChild
    ) {
      inlineEditorRef.current.firstElementChild.firstElementChild.focus();
      if (inlineEditorRef.current.firstElementChild.firstElementChild.select) {
        inlineEditorRef.current.firstElementChild.firstElementChild.select();
      }
      setOverlayTargetEl(inlineEditorRef.current.firstElementChild);
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
    if (children.type.name === 'Dropdown') {
      currentValue.current = children.props.selectedItem;
      return cloneElement(children, {
        onVisibleChange: status => {
          setDisplayActionPanel(!status);
        },
        disabled: loader,
        onChange: (value, values) => {
          if (children.props.dropdownType === 'multi') {
            inlineEditValue.current = values;
            setMatchedValue(false);
          } else {
            inlineEditValue.current = value;
            setMatchedValue(currentValue.current === value.id);
          }
        }
      });
    } else if (children.type.name === 'TextInput') {
      currentValue.current = children.props.value;
      return cloneElement(children, {
        onChange: e => {
          e.preventDefault();
          inlineEditValue.current = e.currentTarget.value;
          setMatchedValue(currentValue.current === e.currentTarget.value);
        },
        disabled: loader,
        onKeyDown: updateTreenodeNameOnEnter
      });
    } else if (children.type.name === 'DateSelector') {
      currentValue.current = children.props.defaultDate;
      return cloneElement(children, {
        onDateSelect: date => {
          inlineEditValue.current = date;
          setMatchedValue(
            isDateEqual(currentValue.current, inlineEditValue.current)
          );
        },
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
      if (children.type.name === 'TextInput') {
        return inlineEditValue.current === currentValue.current;
      } else {
        return matchedValue;
      }
    } else {
      return true;
    }
  };

  const onToggle = status => {
    if (!status) {
      if (!isCustomComponent) {
        if (isValueEqual()) {
          setDisplayActionPanel(status);
          onClose();
        } else {
          onTextUpdate(inlineEditValue.current);
        }
      } else {
        setDisplayActionPanel(status);
        onClose();
      }
    }
  };

  const inlineEditorWrapperClassname = [`${prefix}-inline-editor-component`];
  if (children.type.name === 'DateSelector') {
    inlineEditorWrapperClassname.push(
      `${prefix}-inline-editor-component-dt-picker`
    );
  }
  if (children.type.name === 'TextInput') {
    inlineEditorWrapperClassname.push(
      `${prefix}-inline-editor-component-text-input`
    );
  }
  if (loader) {
    inlineEditorWrapperClassname.push(`${prefix}-inline-editor-loader-active`);
  }

  return (
    <div className={classNames.join(' ')} ref={inlineEditorRef} {...restProps}>
      <div className={inlineEditorWrapperClassname.join(' ')}>
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
                    disabled={loader ? true : false}
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
                    disabled={matchedValue || loader ? true : false}
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
  /** A callback function which will be executed once close or esc button is clicked. */
  onClose: PropTypes.func,
  /** A callback function which will be executed once check or Enter button is clicked. */
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
  children: PropTypes.element
};

InlineEdit.defaultProps = {
  onClose: () => {},
  onTextUpdate: () => {},
  errorMessage: null,
  loader: false,
  customIcon: null,
  children: null,
  className: null
};

export default InlineEdit;
