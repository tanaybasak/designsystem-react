import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';
import {
  findNextSiblingAncestor,
  findLastVisibleChildren
} from '../../util/treeUtil';
import { addListener, removeListeners } from '../../util/eventManager';
import Icon from '../../atoms/Icon';
let sidebarElementRef = 1;
const Sidebar = ({
  type,
  className,
  title,
  items,
  icon,
  onClick,
  toggleSidebar,
  headerPosition,
  headerVisible,
  headerBranding,
  sidebarLinkTemplate,
  expanded,
  activeLink,
  responsive,
  ...restProps
}) => {
  const [expnd, setExpanded] = useState(expanded);
  const [activeItem, setActiveItem] = useState(null);
  const [sidebarId] = useState(sidebarElementRef++);
  const [sidebarList, updateSidebarList] = useState(items);
  const [iconExist, updateIconExists] = useState(true);
  const classnames = [`${prefix}-sidebar`];
  const headerclasses = [`${prefix}-sidebar-title`];
  const sidebarContainerRef = useRef(null);

  if (className) {
    classnames.push(className);
  }

  if (type === 'internal') classnames.push(`${prefix}-sidebar-vertical`);

  if (responsive) classnames.push(`${prefix}-sidebar-responsive`);
  else classnames.push(`${prefix}-sidebar-nonresponsive`);

  if (headerBranding === 'primary') {
    headerclasses.push(`${prefix}-sidebar-title-primary`);
  }

  const expandSidebar = event => {
    let ex = !expnd;
    setExpanded(ex);
    event.currentTarget.dataset.expanded = ex;
    toggleSidebar(ex, event);
  };

  const expandSidebarOnEnter = event => {
    var key = event.which || event.keyCode;
    if (key === 13) {
      expandSidebar(event);
    }
  };

  const handleClick = e => {
    if (sidebarContainerRef.current) {
      if (e && sidebarContainerRef.current.contains(e.target)) {
        return;
      }
      setExpanded(false);
    }
  };

  useEffect(() => {
    updateSidebarList(items);
  }, [items]);

  useEffect(() => {
    let isIconExist = items.some(item => item.hasOwnProperty('icon'));
    updateIconExists(isIconExist);
  }, [items]);

  useEffect(() => {
    setExpanded(expanded);
  }, [expanded]);

  useEffect(() => {
    if (activeLink) {
      let activeItem = sidebarList.find(link => {
        return link.href === activeLink;
      });
      if (activeItem) {
        activeItem.parentItem = activeItem;
        setActiveItem(activeItem);
      } else {
        sidebarList.map((link, index) => {
          if (link.children && link.children.length > 0) {
            activeItem = link.children.find(sublink => {
              return sublink.href === activeLink;
            });
            if (activeItem) {
              let tempItem = [...sidebarList];
              tempItem[index].expanded = true;
              updateSidebarList([...tempItem]);
              activeItem.parentItem = link;
              setActiveItem(activeItem);
            }
          }
        });
      }
    }
  }, [activeLink]);

  useEffect(() => {
    if (window.innerWidth < 992 && expnd) {
      addListener(
        'sidebarId-' + sidebarId,
        'click',
        e => {
          handleClick(e);
        },
        true
      );
    } else {
      removeListeners('sidebarId-' + sidebarId, 'click');
    }
  }, [expnd]);

  const expandSidebarCategory = index => {
    let tempItem = [...sidebarList];
    tempItem[index].expanded = !tempItem[index].expanded;
    updateSidebarList([...tempItem]);
  };

  const itemClicked = (item, parentItem, event) => {
    item.parentItem = parentItem ? parentItem : item;
    setActiveItem(item);
    onClick(item, event);
    if (window.innerWidth < 992) {
      setExpanded(false);
    }
  };

  const iconClass = item => {
    let iconClasses = [`hcl-sidebar-link`];
    if (!(item.iconClass || item.icon)) {
      iconClasses.push('no-icon');
    }

    if (!item.children?.length && !item.statusIcon) {
      iconClasses.push('no-statusicon');
    }
    return iconClasses.join(` `);
  };

  const getSidebarLink = (item, categoryIndex, parentItem) => {
    let highlightedClass = '';
    const itemMatchedToParent = activeItem && activeItem.parentItem === item;

    if ((item.children && item.children.length) || !sidebarLinkTemplate) {
      if (itemMatchedToParent) {
        if (item.expanded === false) highlightedClass = ' highlight';
        else if (!expnd) highlightedClass = ' highlight';
      }
      return (
        <a
          onClick={
            item.children && item.children.length
              ? expandSidebarCategory.bind(this, categoryIndex)
              : itemClicked.bind(this, item, parentItem)
          }
          tabIndex="0"
          title={item.title}
          className={`hcl-sidebar-item${highlightedClass}`}
          onKeyDown={keyDown.bind(this, item, categoryIndex, parentItem)}
          href={item.href}
        >
          {item.icon
            ? React.cloneElement(item.icon, {
                className: `hcl-sidebar-icon${
                  item.icon.props.className
                    ? ' ' + item.icon.props.className
                    : ''
                }`
              })
            : null}
          <span
            className={
              iconExist ? iconClass(item) : 'hcl-sidebar-link no-sideicon'
            }
          >
            {item.title}
          </span>
          {item.children && item.children.length ? (
            <Icon
              type="svg"
              viewBox="0 0 512 512"
              alt={item.title}
              title={item.title}
              className="toggleIcon"
            >
              <polygon points="160,128.4 192.3,96 352,256 352,256 352,256 192.3,416 160,383.6 287.3,256 " />
            </Icon>
          ) : item.statusIcon ? (
            React.cloneElement(item.statusIcon, {
              className: `hcl-sidebar-icon${
                item.statusIcon.props.className
                  ? ' ' + item.statusIcon.props.className
                  : ''
              }`
            })
          ) : null}
        </a>
      );
    } else {
      let template = sidebarLinkTemplate(item);
      if (itemMatchedToParent && !expnd) {
        highlightedClass = ' highlight';
      }
      return React.cloneElement(template, {
        tabIndex: '0',
        className: `${prefix}-sidebar-item ${highlightedClass}`,
        onKeyDown: keyDown.bind(this, item, null, parentItem),
        onClick: itemClicked.bind(this, item, parentItem),
        title: item.title,
        children: (
          <>
            {item.icon
              ? React.cloneElement(item.icon, {
                  className: `hcl-sidebar-icon${
                    item.icon.props.className
                      ? ' ' + item.icon.props.className
                      : ''
                  }`
                })
              : null}
            <span
              className={
                iconExist ? iconClass(item) : 'hcl-sidebar-link no-sideicon'
              }
            >
              {template.props.children}
            </span>
            {item.statusIcon &&
              React.cloneElement(item.statusIcon, {
                className: `hcl-sidebar-icon${
                  item.statusIcon.props.className
                    ? ' ' + item.statusIcon.props.className
                    : ''
                }`
              })}
          </>
        )
      });
    }
  };

  const navContents = () => {
    return (
      <div
        className={headerclasses.join(` `)}
        data-type={'toggle_sidebar'}
        data-title={title}
        data-expanded={expnd}
      >
        {icon
          ? React.cloneElement(icon, {
              className: `hcl-sidebar-title-icon${
                icon.props.className ? ' ' + icon.props.className : ''
              }`
            })
          : null}
        <span
          className={`hcl-sidebar-title-text${
            !icon && expnd ? ' no-sideicon' : ''
          }`}
        >
          {title}
        </span>
        <span
          className="hcl-sidebar-title-toggle"
          tabIndex="0"
          onClick={expandSidebar}
          onKeyDown={expandSidebarOnEnter}
        >
          <Icon
            type="svg"
            height="24px"
            width="24px"
            viewBox="0 0 512 512"
            alt={title}
            title={title}
          >
            <polygon points="160,128.4 192.3,96 352,256 352,256 352,256 192.3,416 160,383.6 287.3,256 " />
          </Icon>
        </span>
      </div>
    );
  };

  const focusNode = node => {
    if (node.classList.contains('hcl-sidebar-category')) {
      node.firstElementChild.focus();
    }
  };

  const keyDown = (item, categoryIndex, parentItem, e) => {
    var key = e.which || e.keyCode;
    const nodeElement = e.currentTarget;
    switch (key) {
      case 13: {
        if (item.children && item.children.length && categoryIndex !== null) {
          expandSidebarCategory(categoryIndex, e);
        } else {
          item.parentItem = parentItem ? parentItem : item;
          setActiveItem(item);
          nodeElement.click();
        }
        e.preventDefault();
        break;
      }
      case 40: {
        if (
          nodeElement.parentElement.getAttribute('aria-expanded') === 'true' &&
          nodeElement.nextElementSibling &&
          nodeElement.nextElementSibling.children &&
          nodeElement.nextElementSibling.children.length > 0
        ) {
          focusNode(nodeElement.nextElementSibling.firstElementChild);
        } else {
          if (nodeElement.parentElement.nextElementSibling) {
            focusNode(nodeElement.parentElement.nextElementSibling);
          } else {
            const nextSiblingAncestor = findNextSiblingAncestor(nodeElement);
            if (nextSiblingAncestor) {
              focusNode(nextSiblingAncestor);
            }
          }
        }

        e.preventDefault();
        break;
      }
      case 38: {
        if (nodeElement.parentElement.previousElementSibling) {
          const lastElement = findLastVisibleChildren(
            nodeElement.parentElement.previousElementSibling
          );
          focusNode(lastElement);
        } else {
          const parentNodeElement =
            nodeElement.parentElement.parentElement.parentElement;
          if (parentNodeElement) {
            focusNode(parentNodeElement);
          }
        }
        e.preventDefault();
        break;
      }
      case 39: {
        if (
          nodeElement.parentElement.hasAttribute('aria-expanded') &&
          nodeElement.parentElement.getAttribute('aria-expanded') === 'false'
        ) {
          if (item.children && item.children.length && categoryIndex) {
            expandSidebarCategory(categoryIndex, e);
          }
        }
        e.preventDefault();
        break;
      }
      case 37: {
        if (
          nodeElement.parentElement.hasAttribute('aria-expanded') &&
          nodeElement.parentElement.getAttribute('aria-expanded') === 'true'
        ) {
          if (item.children && item.children.length && categoryIndex) {
            expandSidebarCategory(categoryIndex, e);
          }
        } else {
          const parentNodeElement =
            nodeElement.parentElement.parentElement.parentElement;
          if (parentNodeElement) {
            focusNode(parentNodeElement);
          }
        }
        e.preventDefault();
        break;
      }
    }
  };

  return (
    <nav
      className={`${classnames.join(` `)}${expnd ? ` expanded` : ''}`}
      {...restProps}
      ref={sidebarContainerRef}
    >
      <button
        className="hcl-sidebar-hamburger"
        data-type={'toggle_sidebar'}
        data-title={title}
        onClick={expandSidebar}
      >
        <span />
        <span />
        <span />
      </button>
      {headerPosition == 'top' && headerVisible && navContents()}
      {sidebarList && sidebarList.length ? (
        <ul className={`${prefix}-sidebar-list`}>
          {sidebarList.map((item, categoryIndex) => {
            return (
              <li
                className={`hcl-sidebar-category${
                  activeItem === item ? ' active' : ''
                }`}
                key={`sidebar_category_${categoryIndex}`}
                aria-expanded={`${item.expanded ? 'true' : 'false'}`}
              >
                {getSidebarLink(item, categoryIndex)}
                {item.children && item.children.length ? (
                  <ul className="hcl-sidebar-children">
                    {item.children.map((subItem, subItemIndex) => {
                      return (
                        <li
                          className={`hcl-sidebar-category${
                            activeItem === subItem ? ' active' : ''
                          }`}
                          key={`sidebar_category_children_${categoryIndex}_${subItemIndex}`}
                        >
                          {getSidebarLink(subItem, null, item)}
                        </li>
                      );
                    })}
                  </ul>
                ) : null}
              </li>
            );
          })}
        </ul>
      ) : null}
      {headerPosition == 'bottom' && headerVisible && navContents()}
    </nav>
  );
};

Sidebar.propTypes = {
  /** Name of the custom class to apply to the Sidebar */
  className: PropTypes.string,

  /** used to set default active link */
  activeLink: PropTypes.string,

  /** used to pass custom template in sidebar link */
  sidebarLinkTemplate: PropTypes.any,

  /** Accepts boolean value  to make sidebar expanded or collapse */
  expanded: PropTypes.bool,

  /** Title for the Sidebar */
  title: PropTypes.string,

  /** Content for Sidebar */
  items: PropTypes.array,

  /** Boolean value to disable Sidebar */
  disabled: PropTypes.bool,

  /** Position of sidebar header eg: top | bottom */
  headerPosition: PropTypes.oneOf(['top', 'bottom']),

  /** Sidebar Header Visibility */
  headerVisible: PropTypes.bool,

  /** Sidebar Header Branding */
  headerBranding: PropTypes.oneOf(['default', 'primary']),

  /** Type of sidebar */
  type: PropTypes.oneOf(['default', 'internal']),

  /** Icon for Sidebar */
  icon: PropTypes.element,
  /** Callback function that is invoked when Sidebar link is clicked
   *
   * Argument – link , event
   */
  onClick: PropTypes.func,
  /** Responsive sidebar */
  responsive: PropTypes.bool,
  /** Callback function that is invoked when Sidebar Toggled
   *
   * Argument – toggleStatus , event
   */
  toggleSidebar: PropTypes.func
};

Sidebar.defaultProps = {
  className: '',
  sidebarLinkTemplate: null,
  activeLink: null,
  expanded: false,
  title: '',
  items: [],
  disabled: false,
  headerPosition: 'bottom',
  headerVisible: true,
  headerBranding: 'default',
  type: 'default',
  responsive: true,
  icon: null,
  onClick: () => {},
  toggleSidebar: () => {}
};

export default Sidebar;
