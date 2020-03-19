import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';
import { addListener, removeListeners } from '../../util/eventManager';
import { positionComponent } from '../../util/utility';

let dropdownIdRef = 0;
const Dropdown = ({
  type,
  items,
  label,
  onChange,
  selectedIndex,
  className,
  ...restProps
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(
    selectedIndex !== null ? items[selectedIndex] : null
  );
  const [typeState, setTypeState] = useState(type);
  const dropDown = useRef(null);
  const [dropDownId] = useState(dropdownIdRef++)

  useEffect(() => {
    setSelected(selectedIndex !== null ? items[selectedIndex] : null);
  }, [selectedIndex]);

  useEffect(() => {
    positionComponent(
      () => {
        setTypeState('top');
      },
      () => {
        setTypeState('bottom');
      },
      type,
      dropDown.current.getElementsByTagName('ul')[0]
    );
    if(dropDown.current.children[1]){
     focusNode(dropDown.current.children[1].children[0])
    }
  });

  useEffect(() => {
    if (!isOpen) {
      removeListeners('dropdown-' + dropDownId, 'click');
    } else {
      addListener(
        'dropdown-' + dropDownId,
        'click',
        e => {
          handleClick(e);
        },
        true
      );
    }
  }, [isOpen]);

  const handleClick = e => {
    if (dropDown.current) {
      if (e && dropDown.current.contains(e.target)) {
        return;
      }
      setIsOpen(false);
    }
  };


  const focusNode = node => {
    if (node.classList.contains(`${prefix}-dropdown-item`)) {
      node.children[0].focus();
    }
  };

  const onSelect = event => {
    event.stopPropagation();
    setIsOpen(false);
    const itemSelected = { id: event.target.id, text: event.target.innerText };
    setSelected(itemSelected);
    onChange(itemSelected);
  };

  const keyDownOnDropdown = e => {
    const key = e.which || e.keyCode;
    const listItem = e.target.parentElement;
      switch (key) {
        case 40: {
          if (!listItem.nextElementSibling) {
            focusNode(listItem.parentElement.firstElementChild);
          } else if (listItem.nextElementSibling.disabled === true) {
            focusNode(listItem.nextElementSibling.nextElementSibling);
          } else {
            focusNode(listItem.nextElementSibling);
          }
          e.preventDefault();
          break;
        }
        case 38: {
          if (!listItem.previousElementSibling) {
            focusNode(listItem.parentElement.lastElementChild);
          } else if (listItem.previousElementSibling.disabled === true) {
            focusNode(
              listItem.previousElementSibling.previousElementSibling
            );
          } else {
            focusNode(listItem.previousElementSibling);
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

  const toggleDropdown = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      dropDown.current.children[0].click();
    }
  };

  const classnames = `${prefix}-dropdown ${
    typeState === 'bottom'
      ? `${prefix}-dropdown-bottom`
      : `${prefix}-dropdown-top`
  } ${className}
  ${isOpen ? `${prefix}-dropdown-open` : ''}`.trim();

  return (
    <section className={classnames} ref={dropDown} {...restProps}>
      <button
        className={`${prefix}-btn ${prefix}-dropdown-toggle`}
        data-toggle="dropdown"
        onKeyPress={toggleDropdown}
        onClick={event => {
          event.stopPropagation();
          setIsOpen(!isOpen);
        }}
      >
        {selected ? selected.text : label}
      </button>
      {isOpen ? (
        <ul
          onKeyDown={keyDownOnDropdown}
          role="dropdownMenu" 
          className={`${prefix}-dropdown-container`}
          aria-labelledby="dropdownMenuButton"
        >
          {items.map(item => {
            return (
              <li
                className={`${prefix}-dropdown-item`}
                key={item.id}
                onClick={onSelect}
                id={item.id}
              >
                <a tabIndex="0" href="#" className={`${prefix}-dropdown-wrapper`}>
                {item.text}
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

  /** Label for Dropdown */
  label: PropTypes.string,

  /** Callback function on selecting item*/
  onChange: PropTypes.func,

  /** index number of item for default selection */
  selectedIndex: PropTypes.number,

  /** Class/clasess will be applied on the parent div of Dropdown */
  className: PropTypes.string
};

Dropdown.defaultProps = {
  type: 'bottom',
  label: 'Select Option',
  onChange: () => {},
  selectedIndex: null,
  className: ''
};

export default Dropdown;