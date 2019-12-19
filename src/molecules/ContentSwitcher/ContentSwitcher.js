import React, { useState, cloneElement } from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';

function ContentSwitcher({ activeIndex, onChange, children }) {
    const [activeSwitch, changeSwitch] = useState(activeIndex);

    const modifiedChildren = React.Children.map(children, (child, index) => {
        const { label } = child.props;
        return cloneElement(child, {
            onClick: (e) => {
                changeSwitch(index);
                onChange(Object.assign({}, e, { label, switchIndex: index }))
            },
            active: (activeSwitch === index)
        });
    });

    return (
        <div className={`${prefix}-content-switcher`} role="tablist">
            {modifiedChildren}
        </div>
    );
}

ContentSwitcher.propTypes = {
    /** Index of the tab to be selected. */
    activeIndex: PropTypes.number,
    /** Accepts event handler as prop/argument. */
    onChange: PropTypes.func,
    /** self Children i.e Switch Component. */
    children: PropTypes.node.isRequired
};

ContentSwitcher.defaultProps = {
    activeIndex: 0,
    onChange: () => { }
};

export default ContentSwitcher;