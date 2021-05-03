/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/role-supports-aria-props */
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
  activeLinkProperty,
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

  if (!responsive) classnames.push(`${prefix}-sidebar-nonresponsive`);

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
    let isIconExist = items.some(item => item.hasOwnProperty('icon'));
    updateIconExists(isIconExist);
  }, [items]);

  useEffect(() => {
    setExpanded(expanded);
  }, [expanded]);

  useEffect(() => {
    if (activeLink) {
      let tempActiveItem = sidebarList.find(link => {
        return link[activeLinkProperty] === activeLink;
      });
      if (tempActiveItem) {
        tempActiveItem.parentItem = tempActiveItem;
        setActiveItem(tempActiveItem);
      } else {
        sidebarList.map((link, index) => {
          if (link.children && link.children.length > 0) {
            tempActiveItem = link.children.find(sublink => {
              return sublink[activeLinkProperty] === activeLink;
            });
            if (tempActiveItem) {
              let tempItem = [...sidebarList];
              tempItem[index].expanded = true;
              updateSidebarList([...tempItem]);
              tempActiveItem.parentItem = link;
              setActiveItem(tempActiveItem);
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
    if (window.innerWidth < 992 && responsive) {
      setExpanded(false);
    }
  };

  const iconClass = item => {
    let iconClasses = [`${prefix}-sidebar-link`];
    if (!(item.iconClass || item.icon)) {
      iconClasses.push('no-icon');
    }

    if (!(item.children && item.children.length) && !item.statusIcon) {
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
          className={`${prefix}-sidebar-item${highlightedClass}${
            item.disabled ? ' disable' : ''
          }`}
          onKeyDown={keyDown.bind(this, item, categoryIndex, parentItem)}
          href={item.href}
        >
          {item.icon
            ? React.cloneElement(item.icon, {
                className: `${prefix}-sidebar-icon${
                  item.icon.props.className
                    ? ' ' + item.icon.props.className
                    : ''
                }`
              })
            : null}
          <span
            className={
              iconExist ? iconClass(item) : `${prefix}-sidebar-link no-sideicon`
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
              className: `${prefix}-sidebar-icon${
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
        className: `${prefix}-sidebar-item ${highlightedClass}${
          item.disabled ? ' disable' : ''
        }`,
        onKeyDown: keyDown.bind(this, item, null, parentItem),
        onClick: itemClicked.bind(this, item, parentItem),
        title: item.title,
        children: (
          <>
            {item.icon
              ? React.cloneElement(item.icon, {
                  className: `${prefix}-sidebar-icon${
                    item.icon.props.className
                      ? ' ' + item.icon.props.className
                      : ''
                  }`
                })
              : null}
            <span
              className={
                iconExist
                  ? iconClass(item)
                  : `${prefix}-sidebar-link no-sideicon`
              }
            >
              {template.props.children}
            </span>
            {item.statusIcon &&
              React.cloneElement(item.statusIcon, {
                className: `${prefix}-sidebar-icon${
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
              className: `${prefix}-sidebar-title-icon${
                icon.props.className ? ' ' + icon.props.className : ''
              }`
            })
          : null}
        <span
          className={`${prefix}-sidebar-title-text${
            !icon && expnd ? ' no-sideicon' : ''
          }`}
        >
          {title}
        </span>
        <span
          className={`${prefix}-sidebar-title-toggle`}
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
    if (node.classList.contains(`${prefix}-sidebar-category`)) {
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
        className={`${prefix}-sidebar-hamburger`}
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
                className={`${prefix}-sidebar-category${
                  activeItem === item ? ' active' : ''
                }${item.disabled ? ' disable' : ''}`}
                key={`sidebar_category_${categoryIndex}`}
                aria-expanded={item.expanded ? true : false}
              >
                {getSidebarLink(item, categoryIndex)}
                {item.children && item.children.length ? (
                  <ul className={`${prefix}-sidebar-children`}>
                    {item.children.map((subItem, subItemIndex) => {
                      return (
                        <li
                          className={`${prefix}-sidebar-category${
                            activeItem === subItem ? ' active' : ''
                          }${subItem.disabled ? ' disable' : ''}`}
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

  /** used to set default active link
   *
   *  Active link is set to string or number based on **activeLinkProperty** value
   *
   *  eg :
   *
   * ```
   * activeLink: 1
   * ```*/
  activeLink: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * used to set active link property
   *
   * Active Link Property takes any property as value
   *
   * eg :
   *
   * ```
   * activeLinkProperty: 'id'
   * ```*/
  activeLinkProperty: PropTypes.string,

  /** used to pass custom template in sidebar link */
  sidebarLinkTemplate: PropTypes.any,

  /** Accepts boolean value to make sidebar expanded or collapse */
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

  /** Sidebar Header color change eg: default | primary */
  headerBranding: PropTypes.oneOf(['default', 'primary']),

  /** Types of sidebar eg: default | primary */
  type: PropTypes.oneOf(['default', 'internal']),

  /** Icon for Sidebar Header */
  icon: PropTypes.element,
  /** Callback function that is invoked when Sidebar link is clicked
   *
   * @signature
   * * ```item``` : sidebar link
   * * ```event``` : click event
   */
  onClick: PropTypes.func,
  /** Making sidebar responsive */
  responsive: PropTypes.bool,
  /** Callback function that is invoked when Sidebar Toggled
   *
   * @signature
   * * ```argument``` : toggleStatus
   * * ```event``` : click event
   */
  toggleSidebar: PropTypes.func
};

Sidebar.defaultProps = {
  className: '',
  sidebarLinkTemplate: null,
  activeLink: null,
  activeLinkProperty: 'href',
  expanded: false,
  title: '',
  items: [],
  disabled: false,
  headerPosition: 'top',
  headerVisible: true,
  headerBranding: 'default',
  type: 'default',
  responsive: true,
  icon: null,
  onClick: () => {},
  toggleSidebar: () => {}
};

export default Sidebar;
