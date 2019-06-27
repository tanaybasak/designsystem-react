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
            data-component="navigation"
            {...restProps}
        >
            <div
                className={`${prefix}-sidebar-title`}
                onClick={expandSidebar}
            >
                <div className={`${prefix}-sidebar-title-item`}>
                    <span className={`${prefix}-icon-2`} />
                    <span className={`${prefix}-sidebar-title-text`}>{title}</span>
                </div>
                <div className={`${prefix}-sidebar-title-item`}>
                    <button className={`${prefix}-icon-2`}>&#62;</button>
                </div>
            </div>
            <ul className={`${prefix}-sidebar-list`}>
                {
                    items.map(({ href, title, className, ...extraProps }) => (
                        <li
                            className={`${prefix}-sidebar-list-item ${className}`.trim()}
                            key={`sidebar_item_${title}`}
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