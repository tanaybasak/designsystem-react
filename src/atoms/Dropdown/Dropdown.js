import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';
import { addListener, removeListeners } from '../../util/eventManager';
import Checkbox from '../Checkbox';

let dropdownIdRef = 0;
const Dropdown = ({
  type,
  items,
  label,
  dropdownType,
  onChange,
  checkedInput,
  config,
  selectedItem,
  className,
  ...restProps
}) => {
  const defaultConfig = { text: 'text', id: 'id' };
  const configuration = { ...defaultConfig, ...config };
  const [isOpen, setIsOpen] = useState(false);
  const [selectedObj, setSelectedObj] = useState({});
  const selectedOption = items.find((item) => {
    if (item[configuration.id] === selectedItem) {
      return item;
    }
  });

  const [selected, setSelected] = useState(
    selectedItem ? selectedOption : null
  );

  const dropDown = useRef(null);
  const [dropDownId] = useState(dropdownIdRef++);

  useEffect(() => {
    setSelected(selectedItem ? selectedOption : null);
    if (dropdownType === 'multi') {
      checkedInput.forEach((defaultInput) => {
        selectedObj[defaultInput[configuration.id]] = true;
      });
      setMultiSelectVal(Object.keys(selectedObj).length);
    }
  }, [selectedItem]);

  useEffect(() => {
    const dropdownMenu = dropDown.current.getElementsByTagName('ul')[0];
    if (dropdownMenu) {
      dropdownMenu.style.display = 'block';
      if (!isInViewport(dropdownMenu)) {
        if (type === 'bottom') {
          dropDown.current.classList.remove(`${prefix}-dropdown-bottom`);
          dropDown.current.classList.add(`${prefix}-dropdown-top`);
        }
        if (type === 'top') {
          dropDown.current.classList.remove(`${prefix}-dropdown-top`);
          dropDown.current.classList.add(`${prefix}-dropdown-bottom`);
        }
      }
    }
  });

  const isInViewport = (elem) => {
    const bounding = elem.getBoundingClientRect();
    return (
      bounding.top >= 0 &&
      bounding.left >= 0 &&
      bounding.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      bounding.right <=
        (window.innerWidth || document.documentElement.clientWidth)
    );
  };

  useEffect(() => {
    if (!isOpen) {
      removeListeners('dropdown-' + dropDownId, 'click');
      dropDown.current.children[0].focus();
    } else {
      addListener(
        'dropdown-' + dropDownId,
        'click',
        (e) => {
          handleClick(e);
        },
        true
      );
    }
  }, [isOpen]);

  const handleClick = (e) => {
    e.preventDefault();
    if (dropDown.current) {
      if (e && dropDown.current.contains(e.target)) {
        return;
      }
      setIsOpen(false);
    }
  };

  const focusNode = (node) => {
    if (node.classList.contains(`${prefix}-dropdown-item`)) {
      node.children[0].focus();
    }
  };

  const setMultiSelectVal = (value) => {
    if (value > 0) {
      dropDown.current.querySelector(`.${prefix}-tag-text`).innerText = value;
      dropDown.current
        .querySelector(`.${prefix}-tag-primary`)
        .classList.remove(`hidden`);
    } else {
      dropDown.current
        .querySelector(`.${prefix}-tag-primary`)
        .classList.add(`hidden`);
    }
  };

  const onSelect = (item) => {
    setSelected(item);
    onChange(item);
    setIsOpen(false);
    dropDown.current.children[0].focus();
  };

  const onMultiSelect = (event, item) => {
    event.stopPropagation();
    event.preventDefault();
    const input = event.currentTarget.querySelector('input');
    input.checked = !input.checked;
    if (input.checked) {
      onChange(item);
      selectedObj[item[defaultConfig.id]] = true;
    } else {
      delete selectedObj[item[defaultConfig.id]];
    }
    setMultiSelectVal(Object.keys(selectedObj).length);
  };

  const keyDownOnMultiSelect = (e) => {
    const key = e.which || e.keyCode;
    const listItem = e.target;
    switch (key) {
      case 40: {
        if (!listItem.nextElementSibling) {
          listItem.parentElement.firstElementChild.focus();
        } else {
          listItem.nextElementSibling.focus();
        }
        e.preventDefault();
        break;
      }
      case 38: {
        if (!listItem.previousElementSibling) {
          listItem.parentElement.lastElementChild.focus();
        } else {
          listItem.previousElementSibling.focus();
        }
        e.preventDefault();
        break;
      }
      case 13: {
        e.preventDefault();
        e.target.click();
        break;
      }
      default:
        break;
    }
  };

  const keyDownOnDropdown = (e) => {
    const key = e.which || e.keyCode;
    const listItem = e.target.parentElement;
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

  const toggleDropdown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      dropDown.current.children[0].click();
    }
  };

  const keydownButton = (e) => {
    const key = e.which || e.keyCode;
    const listItems = e.target.nextElementSibling;
    if (key === 40) {
      e.preventDefault();
      dropdownType === 'multi' ? listItems.firstElementChild.focus() : focusNode(listItems.firstElementChild);
    } else if (key === 38) {
      e.preventDefault();
      dropdownType === 'multi' ? listItems.lastElementChild.focus() : focusNode(listItems.lastElementChild);
    }
  };

  const classnames = `${prefix}-dropdown ${
    type === 'bottom' ? `${prefix}-dropdown-bottom` : `${prefix}-dropdown-top`
  } ${className}
  ${isOpen ? `${prefix}-dropdown-open` : ''}`.trim();

  return (
    <section className={classnames} ref={dropDown} {...restProps}>
      {dropdownType === 'multi' ? (
        <div
          className={`${prefix}-btn ${prefix}-dropdown-toggle`}
          data-toggle="dropdown"
          tabIndex="0"
          onKeyPress={toggleDropdown}
          onKeyDown={keydownButton}
          onClick={(event) => {
            event.stopPropagation();
            setIsOpen(!isOpen);
            event.target.focus();
          }}
        >
          <button
            className={`${prefix}-tag ${prefix}-tag-primary hidden`}
            title="primary-closeable"
            tabIndex="-1"
          >
            <span className={`${prefix}-tag-text`} />
            <span
              className={`${prefix}-close`}
              onClick={(event) => {
                event.stopPropagation();
                setSelectedObj({});
                setMultiSelectVal(0);
              }}
              aria-hidden="true"
              tabIndex="0"
            />
          </button>
          {label}
        </div>
      ) : (
        <button
          className={`${prefix}-btn ${prefix}-dropdown-toggle`}
          data-toggle="dropdown"
          onKeyPress={toggleDropdown}
          onKeyDown={keydownButton}
          onClick={(event) => {
            event.stopPropagation();
            setIsOpen(!isOpen);
            event.target.focus();
          }}
        >
          {selected ? selected[configuration.text] : label}
        </button>
      )}

      {isOpen && Array.isArray(items) && items.length ? (
        <ul
          onKeyDown={dropdownType === 'multi' ? keyDownOnMultiSelect : keyDownOnDropdown}
          role="dropdownMenu"
          className={`${prefix}-dropdown-container`}
          aria-labelledby="dropdownMenuButton"
          style={{ display: 'none' }}
        >
          {items.map((item) => {
            return dropdownType === 'multi' ? (
              <li
                className={`${prefix}-dropdown-item ${prefix}-dropdown-option`}
                key={item[configuration.id]}
                onClick={(e) => {
                  onMultiSelect(e, item);
                }}
                tabIndex="0"
              >
                <Checkbox
                  id={item[configuration.id]}
                  label={item[configuration.text]}
                  checked={selectedObj[item[defaultConfig.id]]}
                  tabIndex="-1"
                />
              </li>
            ) : (
              <li
                className={`${prefix}-dropdown-item`}
                key={item[configuration.id]}
                onClick={onSelect.bind(this, item)}
              >
                <a
                  href="#"
                  className={`${prefix}-dropdown-wrapper`}
                  tabIndex="-1"
                >
                  {item[configuration.text]}
                </a>
              </li>
            );
          })}
        </ul>
      ) : null}
    </section>
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
  selectedItem: PropTypes.string,

  /** Class/clasess will be applied on the parent div of Dropdown */
  className: PropTypes.string,

  /** default checked options for multiselect dropdown */
  checkedInput: PropTypes.array,

  /** Configuration Object for updating propery name in items data */
  config: PropTypes.any,
};

Dropdown.defaultProps = {
  type: 'bottom',
  label: 'Select Option',
  onChange: () => {},
  selectedItem: '',
  className: '',
  checkedInput: [],
  dropdownType: '',
  config: {},
};

export default Dropdown;
