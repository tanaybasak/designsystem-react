import React, { useState } from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';

const Sidebar = ({ className, title, items, ...restProps }) => {
    const [expanded, setExpanded] = useState(false);

    const classnames = `${prefix}-sidebar ${className}`.trim();

    const expandSidebar = () => {
        setExpanded(!expanded);
    }

    return (
        <nav
            className={`${classnames}${expanded ? ` ${prefix}-sidebar-expanded` : ''}`}
            {...restProps}
        >
            <div
                className={`${prefix}-sidebar-title`}
                onClick={expandSidebar}
            >
                <div className={`${prefix}-sidebar-title-item`}>
                    {title && title.length ?
                        <>
                            <span className={`${prefix}-icon-2`} />
                            <span className={`${prefix}-sidebar-title-text`}>{title}</span>
                        </>
                        : null}
                </div>
                <div className={`${prefix}-sidebar-title-item`}>
                    <button className={`${prefix}-icon-2`}>&#62;</button>
                </div>
            </div>
            {items && items.length ?
                <ul className={`${prefix}-sidebar-list`}>
                    {
                        items.map(({ href, title, className, ...extraProps }, index) => (
                            <li
                                className={`${prefix}-sidebar-list-item ${className}`.trim()}
                                key={`sidebar_item_${title}_${index}`}
                            >
                                <a
                                    href={href}
                                    className={`${prefix}-sidebar-list-link`}
                                    {...extraProps}
                                >
                                    <span>{title}</span>
                                </a>
                            </li>
                        ))
                    }
                </ul>
                : null}
        </nav>
    );
};

Sidebar.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
    items: PropTypes.array,
    disabled: PropTypes.bool
};

Sidebar.defaultProps = {
    className: '',
    title: '',
    items: [],
    disabled: false
};

export default Sidebar;