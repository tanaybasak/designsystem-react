import React, { useState, cloneElement } from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';

function Tabs({ activeIndex, onChange, children }) {
    const [isActive, setActive] = useState(activeIndex);
    let tabContent = null;

    const modifiedChildren = React.Children.map(children, (child, index) => {
        if (index === isActive) {
            tabContent = child.props.children;
        }
        const { isDisabled, label } = child.props;
        return cloneElement(child, {
            onClick: e => {
                if (!isDisabled) {
                    setActive(index);
                    onChange(Object.assign({}, e, { label, tabIndex: index }));
                }
            },
            key: index,
            active: isActive === index
        });
    });

    return (
        <section className={`${prefix}-tab`}>
            <nav data-tabs role="navigation">
                <ul role="tablist" className={`${prefix}-tabs-nav`}>
                    {modifiedChildren}
                </ul>
            </nav>
            <div className={`${prefix}-tabcontent`}>
                <div role="tabpanel" className={`${prefix}-tabs-panel active`}>
                    {tabContent}
                </div>
            </div>
        </section>
    );
}

Tabs.propTypes = {
    activeIndex: PropTypes.number,
    onChange: PropTypes.func,
    children: PropTypes.node.isRequired
};

Tabs.defaultProps = {
    activeIndex: 0,
    onChange: () => { }
};

export default Tabs;
