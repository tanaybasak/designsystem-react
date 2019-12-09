import React, { useState, cloneElement } from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';

function Breadcrumb({ activeIndex, onSelection, id, className, children }) {
    const [isActive, setActive] = useState(activeIndex);

    const modifiedChildren = React.Children.map(children, (child, index) => {
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
    /** The size of the button */
    id: PropTypes.string,
    activeIndex: PropTypes.number,
    className: PropTypes.string,
    onSelection: PropTypes.func,
};
Breadcrumb.defaultProps = {
    id: "",
    activeIndex: 0,
    className: "",
    onSelection: () => { }
};

export default Breadcrumb;