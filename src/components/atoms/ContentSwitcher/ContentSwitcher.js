import React, { useState, createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import { prefix } from '../../../settings';

export const ContentSwitcherContext = createContext();

function ContentSwitcher(props) {
    const { initialValue, children, onSelectionChange, ...restProps } = props;
    const [activeSwitch, changeSwitch] = useState(initialValue);
    const SwitchProvider = { activeSwitch, changeSwitch, onSelectionChange }

    return (
        <ContentSwitcherContext.Provider value={SwitchProvider}>
            <div className={`${prefix}-content-switcher`} role="tablist" {...restProps}>
                {children}
            </div>
        </ContentSwitcherContext.Provider>
    )
}

const Switch = (props) => {
    const { name, text, className, isDisabled, iconClass, ...restProps } = props;

    const switchContext = useContext(ContentSwitcherContext);

    const handleClick = (e) => {
        switchContext.changeSwitch(name);
        switchContext.onSelectionChange(Object.assign({}, e, { selectedValue: name }));
    };

    return (
        <Button role="button"
            tabIndex={0}
            aria-label={name}
            key={`${name}-`}
            onClick={handleClick}
            disabled={isDisabled}
            className={`${prefix}-content-switcher-btn ${className} ${switchContext.activeSwitch === name ? 'active' : ''}`}
            {...restProps}
        >
            {iconClass ? <span className={`${prefix}-thumbnail ${iconClass}`}>

            </span> : null}
            <span>
                {text}
            </span>
        </Button>
    )
}

ContentSwitcher.propTypes = {
    initialValue: PropTypes.string.isRequired,
    onSelectionChange: PropTypes.func
}

ContentSwitcher.defaultProps = {
    onSelectionChange: () => { }
}

Switch.propTypes = {
    name: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    className: PropTypes.string,
    isDisabled: PropTypes.bool,
    iconClass: PropTypes.string,
}
Switch.defaultProps = {
    isDisabled: false,
    iconClass: '',
    className: ''
}

export { ContentSwitcher, Switch };