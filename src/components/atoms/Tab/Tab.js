import React, { useState } from 'react';

function TabPanel() {

}

function renderTabHeader(tab, index) {

}

function renderTabHeaders() {
    return (
        React.Children.map(this.props.children, (tab, index) => {
            return renderTabHeader(tab, index);
        })
    );
}

function renderNavigator() {
    const headers = renderTabHeaders();

    return (
        <nav data-tabs role="navigation" class="hcl-tabs">
            {headers}
        </nav>
    );
}

function renderTabPanels() {

}

function TabView(props) {
    if (!props['onTabChange']) {
        const [activeIndex, setIndex] = useState(0);
    }

    const navigator = renderNavigator();
    const content = renderTabPanels();

    return (
        <>
        </>
    )
}


export { };