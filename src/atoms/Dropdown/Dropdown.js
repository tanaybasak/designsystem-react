import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';
import { trackDocumentClick, positionComponent } from '../../util/utility';

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
  });

  const onSelect = event => {
    event.stopPropagation();
    setIsOpen(false);
    const itemSelected = { id: event.target.id, text: event.target.innerText };
    setSelected(itemSelected);
    onChange(itemSelected);
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
        onClick={event => {
          event.stopPropagation();
          setIsOpen(true);
          trackDocumentClick(dropDown.current, () => {
            setIsOpen(false);
          });
        }}
      >
        {selected ? selected.text : label}
      </button>
      {isOpen ? (
        <ul
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
                {item.text}
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
