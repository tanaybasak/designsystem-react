import React, { useState } from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';

const Sidebar = ({ className, title, items, onClick, ...restProps }) => {
    const [expanded, setExpanded] = useState(false);
    const [expandedCategories, setExpandedCategories] = useState([]);

    const classnames = `${prefix}-sidebar ${className}`.trim();

    const expandSidebar = event => {
        let ex = !expanded;
        setExpanded(ex);
        event.currentTarget.dataset.expanded = ex;
        onClick(event);
    }

    const expandSidebarCategory = event => {
        const title = event.currentTarget.dataset.title;
        if (expandedCategories.indexOf(title) >= 0) {
            setExpandedCategories(expandedCategories.filter(item => item !== title));
            event.currentTarget.dataset.expanded = false;
        } else {
            setExpandedCategories([...expandedCategories, title]);
            event.currentTarget.dataset.expanded = true;
        }
        onClick(event);
    }

    const itemClicked = event => {
        onClick(event);
    }

    return (
        <nav
            className={`${classnames}${expanded ? ` expanded` : ''}`}
            {...restProps}
        >
            <button
                className={`${prefix}-sidebar-hamburger`}
                data-type={'toggle_sidebar'}
                data-title={title}
                onClick={expandSidebar}
            >
                <span className={`${prefix}-icon-2`}>
                    <span />
                    <span />
                    <span />
                </span>
            </button>
            <div
                className={`${prefix}-sidebar-title`}
                data-type={'toggle_sidebar'}
                data-title={title}
                onClick={expandSidebar}
            >
                <span className={`${prefix}-sidebar-title-icon`} />
                <span className={`${prefix}-sidebar-title-text`}>
                    {title}
                </span>
                <span className={`${prefix}-sidebar-title-toggle`} />
            </div>
            {items && items.length ?
                <ul className={`${prefix}-sidebar-list`}>
                    {
                        items.map(({ title: categoryTitle, href, className, childrens, ...extraProps }, categoryIndex) => (
                            <li
                                className={`${prefix}-sidebar-${childrens && childrens.length ? 'category' : 'item'}${expandedCategories.indexOf(categoryTitle) >= 0 ? ' expanded' : ''} ${className || ''}`.trim()}
                                key={`sidebar_category_${title}_${categoryIndex}`}
                                {...extraProps}
                            >
                                {
                                    childrens && childrens.length ?
                                        (
                                            <>
                                                <span
                                                    className={`${prefix}-sidebar-category-title`}
                                                    data-type={childrens && childrens.length ? 'toggle_category' : 'item_clicked'}
                                                    data-title={categoryTitle}
                                                    onClick={childrens && childrens.length ? expandSidebarCategory : itemClicked}
                                                >
                                                    <span className={`${prefix}-sidebar-icon`} />
                                                    <span className={`${prefix}-sidebar-link`}>
                                                        {categoryTitle}
                                                    </span>
                                                </span>
                                                <ul className={`${prefix}-sidebar-children`}>
                                                    {childrens.map(({ title, href }, index) => (
                                                        <li
                                                            className={`${prefix}-sidebar-item`}
                                                            key={`sidebar_category_children_${categoryTitle}_${categoryIndex}_${index}`}
                                                        >
                                                            <a
                                                                href={href}
                                                                className={`${prefix}-sidebar-link`}
                                                                data-type={'item_clicked'}
                                                                data-title={title}
                                                                onClick={itemClicked}
                                                            >
                                                                {title}
                                                            </a>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </>)
                                        :
                                        (
                                            <a
                                                href={href}
                                                className={`${prefix}-sidebar-link`}
                                                data-type={'item_clicked'}
                                                data-title={categoryTitle}
                                                onClick={itemClicked}
                                            >
                                                {title}
                                            </a>
                                        )

                                }
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
    disabled: PropTypes.bool,
    onClick: PropTypes.func
};

Sidebar.defaultProps = {
    className: '',
    title: '',
    items: [],
    disabled: false,
    onClick: () => { }
};

export default Sidebar;