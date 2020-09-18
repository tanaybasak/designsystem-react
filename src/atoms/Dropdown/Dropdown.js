import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';
import Checkbox from '../Checkbox';
import Overlay from '../Overlay';

let dropdownIdRef = 0;
const Dropdown = ({
  type,
  items,
  label,
  dropdownType,
  onChange,
  config,
  selectedItem,
  className,
  attachElementToBody,
  scrollListner,
  ...restProps
}) => {
  const defaultConfig = { text: 'text', id: 'id' };
  const configuration = { ...defaultConfig, ...config };
  const [selectedCount, setSelectedCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedObj, setSelectedObj] = useState({});
  const [selected, setSelected] = useState('');
  const dropDown = useRef(null);
  const dropDownRef = useRef(null);
  const [dropDownId] = useState(dropdownIdRef++);
  const [targetEl, setTargetEl] = useState(null);

  useEffect(() => {
    if (dropdownType === 'multi') {
      const initialSelectedObj = { ...selectedObj };
      selectedItem
        ? selectedItem.forEach(defaultInput => {
            initialSelectedObj[defaultInput[configuration.id]] = true;
          })
        : null;
      setSelectedObj(initialSelectedObj);
      setSelectedCount(Object.keys(initialSelectedObj).length);
    } else {
      const selectedOption = items.find(item => {
        if (item[configuration.id] === selectedItem) {
          return item;
        }
      });
      setSelected(selectedItem ? selectedOption : null);
    }
  }, [selectedItem]);

  const focusNode = node => {
    if (node.classList.contains(`${prefix}-dropdown-item`)) {
      node.focus();
    }
  };

  const onSelect = item => {
    setSelected(item);
    onChange(item);
    setIsOpen(false);
    dropDown.current.focus();
  };

  const onMultiSelect = (item, event) => {
    event.stopPropagation();
    event.preventDefault();
    const input = event.currentTarget.querySelector('input');
    const tempSelectedObj = { ...selectedObj };
    if (!input.checked) {
      tempSelectedObj[item[defaultConfig.id]] = true;
    } else {
      delete tempSelectedObj[item[defaultConfig.id]];
    }
    setSelectedObj(tempSelectedObj);
    onChange(item, Object.keys(tempSelectedObj));
    setSelectedCount(Object.keys(tempSelectedObj).length);
  };

  const keyDownOnMultiSelect = e => {
    const key = e.which || e.keyCode;
    const listItem = e.target;
    if (key === 40) {
      e.preventDefault();
      if (!listItem.nextElementSibling) {
        listItem.parentElement.firstElementChild.focus();
      } else {
        listItem.nextElementSibling.focus();
      }
    } else if (key === 38) {
      e.preventDefault();
      if (!listItem.previousElementSibling) {
        listItem.parentElement.lastElementChild.focus();
      } else {
        listItem.previousElementSibling.focus();
      }
    }
  };

  const keyDownOnDropdown = e => {
    const key = e.which || e.keyCode;
    const listItem = e.target;
    switch (key) {
      case 40: {
        if (!listItem.nextElementSibling) {
          focusNode(listItem.parentElement.firstElementChild);
        } else {
          focusNode(listItem.nextElementSibling);
        }
        e.preventDefault();
        break;
      }
      case 38: {
        if (!listItem.previousElementSibling) {
          focusNode(listItem.parentElement.lastElementChild);
        } else {
          focusNode(listItem.previousElementSibling);
        }
        e.preventDefault();
        break;
      }
      default:
        break;
    }
  };

  const keydownButton = e => {
    const key = e.which || e.keyCode;
    const listItems = dropDownRef.current;
    if (isOpen) {
      if (key === 40) {
        e.preventDefault();
        dropdownType === 'multi'
          ? listItems.firstElementChild.focus()
          : focusNode(listItems.firstElementChild);
      } else if (key === 38) {
        e.preventDefault();
        dropdownType === 'multi'
          ? listItems.lastElementChild.focus()
          : focusNode(listItems.lastElementChild);
      }
    } else {
      if (key === 38 || key === 40 || key === 13) {
        e.preventDefault();
        toggleDropDown(e);
      }
    }
  };

  const onToggle = (status, type) => {
    setIsOpen(status);
    if (status) {
      if (dropDownRef.current && dropDownRef.current.firstElementChild) {
        dropDownRef.current.firstElementChild.focus();
      }
    } else {
      if (type !== 'outside' && targetEl) {
        targetEl.focus();
      }
    }
  };

  const clearSelection = event => {
    event.stopPropagation();
    setSelectedObj({});
    setSelectedCount(0);
    onChange(null, []);
    dropDown.current.focus();
  };

  const toggleDropDown = event => {
    event.stopPropagation();
    setTargetEl(event.currentTarget);
    setIsOpen(!isOpen);
  };

  const classNames = [`${prefix}-overlay-wrapper`, `${prefix}-dropdown`];
  if (isOpen) {
    classNames.push(`${prefix}-overlay-wrapper-active`);
  }
  if (className) {
    classNames.push(className);
  }

  return (
    <div className={classNames.join(' ')} {...restProps}>
      {dropdownType === 'multi' ? (
        <div
          className={`${prefix}-btn ${prefix}-dropdown-toggle`}
          data-toggle="dropdown"
          tabIndex="0"
          role="button"
          ref={dropDown}
          onKeyDown={keydownButton}
          onClick={toggleDropDown}
          aria-haspopup="true"
        >
          {selectedCount > 0 ? (
            <button
              className={`${prefix}-tag ${prefix}-tag-primary`}
              title="primary-closeable"
              tabIndex="-1"
            >
              <span
                aria-label={`${selectedCount}-selected options`}
                className={`${prefix}-tag-text`}
              >
                {selectedCount}
              </span>
              <span
                className={`${prefix}-close`}
                aria-label="close-icon"
                onKeyDown={event => {
                  if (event.key === 'Enter') {
                    event.preventDefault();
                    clearSelection(event);
                  }
                }}
                onClick={clearSelection}
                tabIndex="0"
              />
            </button>
          ) : null}
          {label}
        </div>
      ) : (
        <button
          className={`${prefix}-btn ${prefix}-dropdown-toggle`}
          data-toggle="dropdown"
          ref={dropDown}
          onKeyDown={keydownButton}
          onClick={toggleDropDown}
          aria-label={label}
          aria-haspopup="true"
          type="button"
        >
          {selected ? selected[configuration.text] : label}
        </button>
      )}

      <Overlay
        attachElementToBody={attachElementToBody}
        scrollListner={scrollListner}
        direction={`${type === 'bottom' ? 'bottom-left' : 'top-left'}`}
        showOverlay={isOpen}
        targetElement={targetEl}
        onToggle={onToggle}
        closeOnEscape
        style={{ width: targetEl ? targetEl.offsetWidth + 'px' : '0' }}
      >
        <ul
          onKeyDown={
            dropdownType === 'multi' ? keyDownOnMultiSelect : keyDownOnDropdown
          }
          className={`${prefix}-dropdown-menu`}
          id={`dropdown-container-${dropDownId}`}
          role="listbox"
          aria-label={label}
          ref={dropDownRef}
        >
          {items.map(item => {
            return (
              <li
                className={`${prefix}-dropdown-item`}
                key={item[configuration.id]}
                onClick={
                  dropdownType === 'multi'
                    ? onMultiSelect.bind(this, item)
                    : onSelect.bind(this, item)
                }
                onKeyDown={e => {
                  const key = e.which || e.keyCode;
                  if (dropdownType === 'multi') {
                    if (key === 13 || key === 32) {
                      e.preventDefault();
                      onMultiSelect(item, e);
                    }
                  } else {
                    if (key === 13) {
                      e.preventDefault();
                      onSelect(item);
                    }
                  }
                }}
                tabIndex="0"
                aria-label={item[configuration.text]}
                role="option"
                aria-checked={
                  dropdownType === 'multi'
                    ? selectedObj[item[defaultConfig.id]]
                      ? true
                      : false
                    : null
                }
              >
                {dropdownType === 'multi' ? (
                  <Checkbox
                    id={item[configuration.id]}
                    label={item[configuration.text]}
                    checked={selectedObj[item[defaultConfig.id]]}
                    tabIndex="-1"
                  />
                ) : (
                  item[configuration.text]
                )}
              </li>
            );
          })}
        </ul>
      </Overlay>
    </div>
  );
};

Dropdown.propTypes = {
  /** Type of dropdown eg : top, bottom */
  type: PropTypes.string,

  /** Array of items eg:
  [{id: 'option-1',text: 'Option 1'},
   {id: 'option-2', text: 'Option 2'}]*/
  items: PropTypes.array.isRequired,

  /** Type of dropdown eg : multiselect, singleselect */
  dropdownType: PropTypes.string,

  /** Label for Dropdown */
  label: PropTypes.string,

  /** Callback function on selecting item*/
  onChange: PropTypes.func,

  /** id of item for default selection */
  selectedItem: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),

  /** Class/clasess will be applied on the parent div of Dropdown */
  className: PropTypes.string,

  /** Configuration Object for updating propery name in items data */
  config: PropTypes.any,

  /** Used to attach the dropdown container to body */
  attachElementToBody: PropTypes.bool,

  /** Dropdown Container position will changed on scroll. This is applicable when Dropdown container is attached to body */
  scrollListner: PropTypes.bool
};

Dropdown.defaultProps = {
  type: 'bottom',
  label: 'Select Option',
  onChange: () => {},
  className: '',
  dropdownType: '',
  config: {},
  attachElementToBody: false,
  scrollListner: false
};

export default Dropdown;
