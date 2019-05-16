import React from './node_modules/react';
import PropTypes from './node_modules/prop-types';
import { prefix } from '../../../settings';

// To select the type of List (nested) : UL or OL
const _getList = (type, list) => { 

    return React.createElement(
        type,
        { className: `${prefix}-list-nested` },
        _getListItem(type, list)
    );
}

// To create LIs
const _getListItem = (type, listItems) => { 

    return listItems && listItems.length && listItems.map((item, index) => (
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
    ));
}

export default function List({ listItems, type, className, ...restProps }) {
    const listType = type === 'ol' ? 'ordered' : 'unordered';
    const classnames = `${prefix}-list-${listType} ${className}`.trim();

    return React.createElement(
        type,
        { className: classnames, ...restProps },
        _getListItem(type, listItems)
    );
};

List.propTypes = {
    className: PropTypes.string,
    type: PropTypes.oneOf(['ol', 'ul']).isRequired,
    listItems: PropTypes.array.isRequired,
    onClick: PropTypes.func
};

List.defaultProps = {
    className: '',
    type: 'ul',
    listItems: []
};