import React, { useState, createContext, useContext, useEffect } from 'react';
// import PropTypes from 'prop-types';
import { prefix } from '../../../settings';

export const TabContext = createContext();

function Tabs(props) {
    const { initialValue, children, onSelectionChange = () => {}, ...restProps } = props;
    const [activeTab, changeTab] = useState(initialValue);
    const tabProvider = { activeTab, changeTab, onSelectionChange }

    return (
        <TabContext.Provider value={tabProvider}>
            <section className={`${prefix}-tab`} {...restProps}>
                <nav data-tabs role="navigation">
                    {children}
                </nav>
            </section >
        </TabContext.Provider>
    )
}

function Tab(props) {
    const { name, label, className = "", isDisabled = false, ...restProps } = props;

    const tabContext = useContext(TabContext);

    const handleClick = (e) => {
        if (!e.currentTarget.classList.contains(`${prefix}-tabs-disabled`)) {
            tabContext.changeTab(name);
            tabContext.onSelectionChange(e);
        }
    };

    return (
        <li role="tab"
            onClick={handleClick}
            className={`${prefix}-tabs-nav-item ${tabContext.activeTab === name ? 'active' : ''} ${isDisabled ? `${prefix}-tabs-disabled` : ''}`}
            {...restProps}
        >
            <a className={`${prefix}-tabs-nav-link ${className}`} href="javascript:void(0);">
                {label}
            </a>
        </li>
    )
}

function TabList(props) {
    const { className = "", children, ...restProps } = props;


    return (
        <ul role="tablist" className={`${prefix}-tabs-nav ${className}`} {...restProps}>
            {children}
        </ul>
    );
}

function TabContent(props) {
    const { className = "", children, ...restProps } = props;

    return (
        <section className={`${prefix}-tabcontent ${className}`} {...restProps}>
            {children}
        </section>
    );
}

function TabPanel(props) {
    const { children, name, ...restProps } = props;
    const tabContext = useContext(TabContext);
    const isActive = tabContext.activeTab === name;

    return (
        isActive && (
            <div role="tabpanel" className={`${prefix}-tabs-panel ${isActive ? 'active' : ''}`} {...restProps}>
                {children}
            </div>)
    )
}


export { Tabs, Tab, TabList, TabContent, TabPanel };