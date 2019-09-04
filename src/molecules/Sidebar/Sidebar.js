import React, { useState } from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';

const Sidebar = ({ className, title, items, icon, onClick, ...restProps }) => {
    const [expanded, setExpanded] = useState(false);
    const [activeItem, setActiveItem] = useState(null);
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
        const key = event.currentTarget.dataset.key;
        setActiveItem(key);
        onClick(event);
    }

    const getClass = (cls, active) => {
        let newClass = cls;
        if (active) {
            newClass = `${newClass} ${prefix}-sidebar-item-active` 
        }
        return newClass;
    }

    const getCategoryClass = (isCategory, categoryTitle, categoryKey, className) => {
        let cls = `${prefix}-sidebar-${isCategory ? 'category' : 'item'}`;
        if (expandedCategories.indexOf(categoryTitle) >= 0) {
            cls += ' expanded';
        }
        cls += className||'';
        return getClass(cls, activeItem === categoryKey).trim();
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
                <span />
                <span />
                <span />
            </button>
            <div
                className={`${prefix}-sidebar-title`}
                data-type={'toggle_sidebar'}
                data-title={title}
                onClick={expandSidebar}
            >
                {icon}
                <span className={`${prefix}-sidebar-title-text`}>
                    {title}
                </span>
                <span className={`${prefix}-sidebar-title-toggle`} />
            </div>
            {items && items.length ?
                <ul className={`${prefix}-sidebar-list`}>
                    {
                        items.map(({ title: categoryTitle, icon, href, className, childrens, ...extraProps }, categoryIndex) => (
                            <li
                                className={getCategoryClass(childrens && childrens.length, categoryTitle, `${categoryIndex}`, className)}
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
                                                    {icon}
                                                    <span className={`${prefix}-sidebar-link`}>
                                                        {categoryTitle}
                                                    </span>
                                                </span>
                                                <ul className={`${prefix}-sidebar-children`}>
                                                    {childrens.map(({ title, href, icon }, index) => (
                                                        <li
                                                            className={getClass(`${prefix}-sidebar-item`, activeItem === `${categoryIndex}-${index}`)}
                                                            key={`sidebar_category_children_${categoryTitle}_${categoryIndex}_${index}`}
                                                        >
                                                            {icon}
                                                            <a
                                                                href={href}
                                                                className={`${prefix}-sidebar-link`}
                                                                data-type={'item_clicked'}
                                                                data-title={title}
                                                                data-key={`${categoryIndex}-${index}`}
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
                                            <>
                                                {icon}
                                                <a
                                                    href={href}
                                                    className={`${prefix}-sidebar-link`}
                                                    data-type={'item_clicked'}
                                                    data-title={categoryTitle}
                                                    data-key={categoryIndex}
                                                    onClick={itemClicked}
                                                >
                                                    {categoryTitle}
                                                </a>
                                            </>
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
    icon: PropTypes.object,
    onClick: PropTypes.func
};

Sidebar.defaultProps = {
    className: '',
    title: '',
    items: [],
    disabled: false,
    icon: null,
    onClick: () => { }
};

export default Sidebar;