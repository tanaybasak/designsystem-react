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

  const [value, setValue] = useState(null);

  const [overlayTargetEl, setOverlayTargetEl] = useState(null);
  const stopPropagation = e => {
    e.stopPropagation();
  };

  //console.log('errorMessage', errorMessage);

  const updateTreenodeNameOnEnter = event => {
    event.stopPropagation();
    if (event.key === 'Enter') {
      //   if (restProps.value !== event.currentTarget.value) {
      //     setMatchedValue(false);
      //     onTextUpdate(event.currentTarget.value);
      //   } else {
      //     setMatchedValue(true);
      //   }
      onTextUpdate(value);
      event.preventDefault();
    } else if (event.key === 'Escape') {
      onClose();
      event.preventDefault();
    }
  };

  useEffect(() => {
    try {
      inlineEditorRef.current.firstElementChild.focus();
      inlineEditorRef.current.firstElementChild.select();
    } catch (e) {
      console.log(e);
    }

    setOverlayTargetEl(inlineEditorRef.current.firstElementChild);
    setDisplayActionPanel(true);
    return function cleanup() {};
  }, []);

  let customElement = null;
  customIcon
    ? (customElement = React.Children.map(customIcon, child => {
        if (child.props.children && child.props.children.length) {
          return child.props.children.map((item, index) => {
            return React.cloneElement(item, {
              key: index,
              className: `${prefix}-inline-btn${
                item.props.className ? ' ' + item.props.className : ''
              }`
            });
          });
        } else {
          return React.cloneElement(child, {
            className: `${prefix}-inline-btn${
              child.props.className ? ' ' + child.props.className : ''
            }`
          });
        }
      }))
    : null;

  const classNames = [`${prefix}-overlay-wrapper ${prefix}-inline-overlay`];

  const getChildren = () => {
    if (children.type.name === 'Dropdown') {
      return cloneElement(children, {
        onVisibleChange: status => {
          setDisplayActionPanel(!status);
        },
        onChange: value => {
          setValue(value);
          setMatchedValue(false);
        }
      });
    } else if (children.type.name === 'TextInput') {
      return cloneElement(children, {
        onChange: e => {
          setValue(e.currentTarget.value);
          setMatchedValue(false);
        },
        onKeyDown: updateTreenodeNameOnEnter
      });
    } else if (children.type.name === 'DateSelector') {
      return cloneElement(children, {
        onDateSelect: e => {
          setValue(e);
          setMatchedValue(false);
        },
        onVisibleChange: status => {
          setDisplayActionPanel(!status);
        }
      });
    } else {
      return children;
    }
  };

  return (
    <div className={classNames.join(' ')} ref={inlineEditorRef}>
      {/* <TextInput
        type="text"
        {...restProps}
        className={`${prefix}-inline-text`}
        onKeyDown={updateTreenodeNameOnEnter}
        data-invalid={formStatus}
        onClick={stopPropagation}
        onChange={event => {
          restProps.value !== event.currentTarget.value
            ? setMatchedValue(false)
            : setMatchedValue(true);
        }}
      /> */}
      {getChildren()}
      {/* {children} */}
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
              <Button
                type="neutral"
                className={`${prefix}-inline-btn`}
                disabled={loader ? true : false}
                onClick={onClose}
                aria-label="inline-close"
              >
                {inlineClose}
              </Button>
              <Button
                type="primary"
                className={`${prefix}-inline-btn`}
                disabled={errorMessage || matchedValue || loader ? true : false}
                onClick={() => {
                  onTextUpdate(value);
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
