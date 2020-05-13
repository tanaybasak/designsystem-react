import React, { useState, cloneElement } from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';
import Overflowmenu from '../../molecules/Overflowmenu';

function Breadcrumb({ activeIndex, onSelection, id, className, children }) {
    const [isActive, setActive] = useState(activeIndex);

    const childCount = React.Children.count(children);
    let renderedOverflowMenu = false;
    let propChildren = children;

    const modifiedChildren = React.Children.map(children, (child, index) => {
        if (child && child.type.name === "BreadcrumbItem") {
            if (index > 0 && (index < childCount - 2) && !renderedOverflowMenu) {
                renderedOverflowMenu = true; let _listItems = [];
                propChildren = propChildren.slice(1, -2);
                React.Children.forEach(propChildren, (innerChild) => {
                    _listItems.push({ name: innerChild.props.children, link: innerChild.props.href });
                });
                return (
                    <Overflowmenu
                        listItems={_listItems}
                        direction="right"
                        ellipsisType="horizontal"
                        onClick={(e) => {
                            setActive(index + 1);
                            onSelection(Object.assign({}, e, { tabIndex: index + 1 }));
                        }}
                    />)
            } else if (index === 0 || !(index < (childCount - 2))) {
                return cloneElement(child, {
                    onClick: e => {
                        setActive(index);
                        if (child.props.onClick) {
                            child.props.onClick(e);
                        }
                        onSelection(Object.assign({}, e, { tabIndex: index }));
                    },
                    key: index,
                    children: child.props.children,
                    href: child.props.href,
                    itemClass: child.props.className,
                    active: isActive === index
                });
            }
        }
    });

    return (
        <ul
            className={`${prefix}-breadcrumb ${className ? className : ''}`}
            aria-label="breadcrumb"
            id={id}
        >
            {modifiedChildren}
        </ul>
    );
}

Breadcrumb.propTypes = {
    /** Unique Id */
    id: PropTypes.string,
    /** dafault active breadcrumb item */
    activeIndex: PropTypes.number,
    /** Class/clasess will be applied on the parent div of Breadcrumb  */
    className: PropTypes.string,
    /** Callback function on selecting item*/
    onSelection: PropTypes.func
};
Breadcrumb.defaultProps = {
    id: '',
    activeIndex: 0,
    className: '',
    onSelection: () => { }
};

export default Breadcrumb;
