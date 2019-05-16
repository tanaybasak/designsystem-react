import React, { useState, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { Tab } from './Tab';
import { prefix } from '../../../settings';


const Tabs = ({ activeIndex, onSelectionChange, children }) => {
    const [isActive, setActive] = useState(activeIndex || 0);
    let tabContent = null;

    const modifiedChildren = React.Children.map(children, (child, index) => {
        if (index === isActive)
            tabContent = child.props.children;
        const { isDisabled, label } = child.props;
        return cloneElement(child, {
            onClick: (e) => {
                if (!isDisabled)
                    setActive(index);
                onSelectionChange(Object.assign({}, e, { label }));
            },
            key: index,
            active: (isActive === index)
        })
    });

    return (
        <section className={`${prefix}-tab`}>
            <nav data-tabs role='navigation'>
                <ul role='tablist' className={`${prefix}-tabs-nav`}>
                    {modifiedChildren}
                </ul>
            </nav>
            <section className={`${prefix}-tabcontent`}>
                <div role='tabpanel' className={`${prefix}-tabs-panel active`}>
                    {tabContent}
                </div>
            </section>
        </section >
    )
}

Tabs.propTypes = {
    activeIndex: PropTypes.number,
    onSelectionChange: PropTypes.func
}

Tabs.defaultProps = {
    onSelectionChange: () => { }
}

export { Tabs, Tab };