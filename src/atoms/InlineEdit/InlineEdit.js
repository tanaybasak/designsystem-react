import React, { useEffect, useRef, useState, cloneElement } from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';
import { checkmark, inlineClose } from '../../util/icons';
import Overlay from '../Overlay';
import Spinner from '../Spinner';
import Button from '../Button';

const InlineEdit = ({
  onClose,
  onTextUpdate,
  customIcon,
  errorMessage,
  loader,
  children,
  ...restProps
}) => {
  const inlineEditorRef = useRef(null);
  const [displayActionPanel, setDisplayActionPanel] = useState(false);
  const [matchedValue, setMatchedValue] = useState(true);

  const inlineEditValue = useRef(null);
  const currentValue = useRef(null);
  const [value, setValue] = useState(null);

  const [overlayTargetEl, setOverlayTargetEl] = useState(null);
  const stopPropagation = e => {
    e.stopPropagation();
  };

  //console.log('errorMessage', errorMessage);

  const updateTreenodeNameOnEnter = event => {
    event.stopPropagation();
    if (event.key === 'Enter') {
      if (!isValueEqual()) {
        onTextUpdate(inlineEditValue.current);
      }

      event.preventDefault();
    } else if (event.key === 'Escape') {
      onClose();
      event.preventDefault();
    }
  };

  useEffect(() => {
    if (
      inlineEditorRef &&
      inlineEditorRef.current &&
      inlineEditorRef.current.firstElementChild
    ) {
      inlineEditorRef.current.firstElementChild.focus();
      if (inlineEditorRef.current.firstElementChild.select) {
        inlineEditorRef.current.firstElementChild.select();
      }

      setOverlayTargetEl(inlineEditorRef.current.firstElementChild);
      setDisplayActionPanel(true);
    }

    return function cleanup() {};
  }, []);

  //   let customElement = null;
  //   customIcon
  //     ? (customElement = React.Children.map(customIcon, child => {
  //         if (child.props.children && child.props.children.length) {
  //           return child.props.children.map((item, index) => {
  //             return React.cloneElement(item, {
  //               key: index,
  //               className: `${prefix}-inline-btn${
  //                 item.props.className ? ' ' + item.props.className : ''
  //               }`
  //             });
  //           });
  //         } else {
  //           return React.cloneElement(child, {
  //             className: `${prefix}-inline-btn${
  //               child.props.className ? ' ' + child.props.className : ''
  //             }`
  //           });
  //         }
  //       }))
  //     : null;

  const classNames = [
    `${prefix}-overlay-wrapper ${prefix}-inline-editor-wrapper`
  ];

  const getChildren = () => {
    if (children.type.name === 'Dropdown') {
      currentValue.current = children.props.selectedItem;
      return cloneElement(children, {
        onVisibleChange: status => {
          setDisplayActionPanel(!status);
        },
        onChange: (value, values) => {
          if (children.props.dropdownType === 'multi') {
            inlineEditValue.current = values;
            setMatchedValue(false);
          } else {
            inlineEditValue.current = value;
            setMatchedValue(currentValue.current === value.id);
          }

          //setValue(value);
        }
      });
    } else if (children.type.name === 'TextInput') {
      currentValue.current = children.props.value;
      return cloneElement(children, {
        onChange: e => {
          e.preventDefault();
          inlineEditValue.current = e.currentTarget.value;
          //setValue(e.currentTarget.value);
          setMatchedValue(currentValue.current === e.currentTarget.value);
        },
        onKeyDown: updateTreenodeNameOnEnter
      });
    } else if (children.type.name === 'DateSelector') {
      return cloneElement(children, {
        onDateSelect: e => {
          inlineEditValue.current = e;
          //setMatchedValue(false);
        },
        onVisibleChange: status => {
          setDisplayActionPanel(!status);
        }
      });
    } else {
      return children;
    }
  };

  const isValueEqual = () => {
    return inlineEditValue.current === currentValue.current;
  };

  const onToggle = status => {
    if (!status && !isValueEqual()) {
      if (!inlineEditValue.current) {
        onClose();
      } else if (!isValueEqual()) {
        onTextUpdate(inlineEditValue.current);
      }
    }
  };

  return (
    <div className={classNames.join(' ')} ref={inlineEditorRef}>
      {getChildren()}
      {loader && <Spinner className={`${prefix}-inline-editor-loader`} small />}

      <Overlay
        direction={'bottom-right'}
        showOverlay={displayActionPanel}
        targetElement={overlayTargetEl}
        className="hcl-inline-editor-overlay"
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
              <Button
                type="neutral"
                disabled={loader ? true : false}
                onClick={onClose}
                aria-label="inline-close"
              >
                {inlineClose}
              </Button>
              <Button
                type="primary"
                disabled={errorMessage || matchedValue || loader ? true : false}
                onClick={() => {
                  onTextUpdate(inlineEditValue.current);
                }}
                aria-label="inline-check"
              >
                {checkmark}
              </Button>
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
  children: PropTypes.any
};

InlineEdit.defaultProps = {
  onClose: () => {},
  onTextUpdate: () => {},
  errorMessage: null,
  loader: false,
  customIcon: null,
  children: null
};

export default InlineEdit;
