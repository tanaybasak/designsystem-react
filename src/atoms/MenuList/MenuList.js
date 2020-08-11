import React from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';

const MenuList = ({ items, onSelect }) => {

    const focusNode = (listItem, direction = 'next') => {
        const nextElem = listItem.nextElementSibling;
        const prevElem = listItem.previousElementSibling;
        if (direction === 'next') {
          if (!nextElem) {
            if (
              listItem.parentElement.firstElementChild.children[0].hasAttribute(
                'disabled'
              )
            ) {
              focusNode(listItem.parentElement.firstElementChild);
            } else {
              listItem.parentElement.firstElementChild.children[0].focus();
            }
          } else if (nextElem && nextElem.children[0].hasAttribute('disabled')) {
            focusNode(nextElem);
          } else {
            if (nextElem) {
              nextElem.children[0].focus();
            }
          }
        } else if (direction === 'previous') {
          if (!prevElem) {
            if (
              listItem.parentElement.lastElementChild.children[0].hasAttribute(
                'disabled'
              )
            ) {
              focusNode(listItem.parentElement.lastElementChild, 'previous');
            } else {
              listItem.parentElement.lastElementChild.children[0].focus();
            }
          } else if (prevElem && prevElem.children[0].hasAttribute('disabled')) {
            focusNode(prevElem, 'previous');
          } else {
            if (prevElem) {
              prevElem.children[0].focus();
            }
          }
        }
      };
      
    const keyDownOnOverflow = (e) => {
        const key = e.which || e.keyCode;
        const listItem = e.target.parentElement;
        switch (key) {
          case 40: {
            focusNode(listItem, 'next');
            e.preventDefault();
            break;
          }
          case 38: {
            focusNode(listItem, 'previous');
            e.preventDefault();
            break;
          }
          default:
            break;
        }
      };

  return (
    <ul className={`${prefix}-overflow-list`} onKeyDown={keyDownOnOverflow}>
      {items.map((item, index) => {
        const { danger, disabled, separator, link, name, ...rest } = item;
        const itemClassNames = [`${prefix}-overflow-option`];
        const btnClassNames = [`${prefix}-overflow-option-btn`];

        danger && btnClassNames.push(`${prefix}-overflow-option-dangerbtn`);
        disabled && btnClassNames.push(`${prefix}-overflow-option-disablebtn`);
        separator && btnClassNames.push(`${prefix}-overflow-separator`);

        return (
          <li
            className={itemClassNames}
            data-name={name}
            {...rest}
            key={`menulist-${name}-${index}`}
          >
            <button
              className={btnClassNames.join(' ')}
              data-name={name}
              disabled={disabled}
              onClick={(e) => {
                onSelect(item, index, e);
                link ? window.open(link, e.metaKey ? '' : '_self') : null;
              }}
            >
              {link ? (
                <a tabIndex="-1" href={link} title={name}>
                  {name}
                </a>
              ) : (
                name
              )}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

MenuList.propTypes = {
  items: PropTypes.array.isRequired,
  onSelect: PropTypes.func
};

MenuList.defaultProps = {
  items: [],
  onSelect: () => {}
};

export default MenuList;
