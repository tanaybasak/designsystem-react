import React from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';

// To select the type of List (nested) : UL or OL
const _getList = (type, list) => {
  return React.createElement(
    type,
    { className: `${prefix}-list-nested` },
    _getListItem(type, list)
  );
};

const classNameOptions = {
  decimal: 'hcl-decimal',
  'upper-alpha': 'hcl-upper-alpha',
  'lower-alpha': 'hcl-lower-alpha',
  'lower-roman': 'hcl-lower-roman',
  'upper-roman': 'hcl-upper-roman',
  circle: 'hcl-circle',
  square: 'hcl-square',
  disc: 'hcl-disc',
};

// To create LIs
const _getListItem = (type, listItems) => {
  return (
    listItems &&
    listItems.length &&
    listItems.map((item, index) => (
      <li
        className={`${prefix}-list-item`}
        data-value={item.value}
        key={`${item.value}-${index}`}
      >
        <React.Fragment>
          {item.name}
          {item.child && item.child.length ? _getList(type, item.child) : null}
        </React.Fragment>
      </li>
    ))
  );
};

export default function List({
  listItems,
  type,
  //   ordered,
  className,
  ...restProps
}) {
  const classNameType = classNameOptions[type] ? classNameOptions[type] : '';
  const orderedTypes = [
    'decimal',
    'upper-alpha',
    'lower-alpha',
    'upper-roman',
    'lower-roman',
  ];
  const unOrderedTypes = ['circle', 'disc', 'square'];
  let listType = '';
  if (orderedTypes.indexOf(type) > -1) {
    listType = 'ordered';
  } else if (unOrderedTypes.indexOf(type) > -1) {
    listType = 'unordered';
  }
  const classnames = `${prefix}-list-${listType} ${className} ${classNameType}`.trim();
  const listElement = listType === 'ordered' ? 'ol' : 'ul';

  return React.createElement(
    listElement,
    { className: classnames, ...restProps },
    _getListItem(listElement, listItems)
  );
}

List.propTypes = {
  /** Class/clasess will be applied on the list  */
  className: PropTypes.string,
  /**  type of lists for ordered: decimal , upper-alpha , lower-alpha , lower-roman, upper-roman; type of lists for unordered: circle, square, disc */
  type: PropTypes.string,
  /** Data for list  */
  listItems: PropTypes.array,
  /** Callback function on selecting item*/
  onClick: PropTypes.func,
};

List.defaultProps = {
  className: '',
  type: 'disc',
  listItems: [],
  onClick: () => {},
};
