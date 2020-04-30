import React, { useState, cloneElement } from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';
import Overflowmenu from '../../molecules/Overflowmenu';

function Breadcrumb({ activeIndex, onSelection, id, className, children }) {
    const [isActive, setActive] = useState(activeIndex);

    const childCount = React.Children.count(children);
    let renderedOverflowMenu = false;


    const modifiedChildren = React.Children.map(children, (child, index) => {
        if (child) {
            if (childCount > 3 && index !== 0 && (index < childCount - 2) && !renderedOverflowMenu) {
                renderedOverflowMenu = true;
                return (<Overflowmenu listItems={[]} ellipsisType="horizontal" />)
            } else {
                return cloneElement(child, {
                    onClick: e => {
                        setActive(index);
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
