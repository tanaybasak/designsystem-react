import React, { useState, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { prefix } from '../../../settings';

// export const ContentSwitcherContext = createContext();

// function ContentSwitcher(props) {
//     const { initialValue, children, onSelectionChange, ...restProps } = props;
//     const [activeSwitch, changeSwitch] = useState(initialValue);
//     const SwitchProvider = { activeSwitch, changeSwitch, onSelectionChange }

//     return (
//         <ContentSwitcherContext.Provider value={SwitchProvider}>
//             <div className={`${prefix}-content-switcher`} role="tablist" {...restProps}>
//                 {children}
//             </div>
//         </ContentSwitcherContext.Provider>
//     )
// }

// const Switch = (props) => {
//     const { name, text, className, isDisabled, iconClass, ...restProps } = props;

//     const switchContext = useContext(ContentSwitcherContext);

//     const handleClick = (e) => {
//         switchContext.changeSwitch(name);
//         switchContext.onSelectionChange(Object.assign({}, e, { selectedValue: name }));
//     };

//     return (
//         <Button role="button"
//             tabIndex={0}
//             aria-label={name}
//             key={`${name}-`}
//             onClick={handleClick}
//             disabled={isDisabled}
//             className={`${prefix}-content-switcher-btn ${className} ${switchContext.activeSwitch === name ? 'active' : ''}`}
//             {...restProps}
//         >
//             {iconClass ? <span className={`${prefix}-thumbnail ${iconClass}`}>

//             </span> : null}
//             <span>
//                 {text}
//             </span>
//         </Button>
//     )
// }

// ContentSwitcher.propTypes = {
//     initialValue: PropTypes.string.isRequired,
//     onSelectionChange: PropTypes.func
// }

// ContentSwitcher.defaultProps = {
//     onSelectionChange: () => { }
// }

// Switch.propTypes = {
//     name: PropTypes.string.isRequired,
//     text: PropTypes.string.isRequired,
//     className: PropTypes.string,
//     isDisabled: PropTypes.bool,
//     iconClass: PropTypes.string,
// }
// Switch.defaultProps = {
//     isDisabled: false,
//     iconClass: '',
//     className: ''
// }

// export { ContentSwitcher, Switch };

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
    activeIndex: PropTypes.number,
    onChange: PropTypes.func
};

ContentSwitcher.defaultProps = {
    activeIndex: 0,
    onChange: () => { }
};

export default ContentSwitcher;