import React, { useState, createContext, useContext } from 'react';
// import PropTypes from 'prop-types';
import { prefix } from '../../../settings';

export const TabContext = createContext();

function Tabs(props) {
    const { initialValue, children, ...restProps } = props;
    const [activeTab, changeTab] = useState(initialValue);
    const tabProvider = { activeTab, changeTab }

    return (
        <TabContext.Provider value={tabProvider}>
            <section className={`${prefix}-tab`} {...restProps}>
                <nav data-tabs role="navigation">
                    {children}
                </nav>
                {/* <section className={`${prefix}-tabcontent`}>
            </section> */}
            </section >
        </TabContext.Provider>
    )
}

function Tab(props) {
    const { name, label, className = "", onTabClick = () => { }, children, ...restProps } = props;

    const tabContext = useContext(TabContext);

    const handleClick = (e) => {
        tabContext.changeTab(name);
        onTabClick(e);
    };

    return (
        <li role="tab" className={`${prefix}-tabs-nav-item ${tabContext.activeTab === name ? 'active' : ''}`} {...restProps}>
            <a className={`${prefix}-tabs-nav-link ${className}`} href={null} onClick={handleClick}>
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

    return (
        <div role="tabpanel" className={`${prefix}-tabs-panel ${tabContext.activeTab === name ? 'active' : ''}`} {...restProps}>
            {children}
        </div>
    )
}


export { Tabs, Tab, TabList, TabContent, TabPanel };