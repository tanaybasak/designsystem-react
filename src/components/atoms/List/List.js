import React from 'react';
import PropTypes from 'prop-types';
import { prefix } from '../../../settings';

function _getList(type, list) { // for nested ol/ul

    return React.createElement(
        type,
        { className: `${prefix}-list-nested` },
        _getListItem(type, list)
    );
}

function _getListItem(type, listItems) { // for li's

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