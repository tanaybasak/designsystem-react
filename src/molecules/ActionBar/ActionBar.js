import React from 'react';
import PropTypes from 'prop-types';
import prefix from "../../settings";

export default function ActionBar({ children, itemsSelected, ...restProps }) {
    return (
        <section className={`${prefix}-actionbar`} aria-label="Table Action Bar" {...restProps}>
            <div className={`${prefix}-actionbar-list`}>
                {
                    React.Children.map(children, child => {
                        if (child.props.actionItem) {
                            return child.props.children;
                        }
                    })
                }
            </div>
            <div className={`${prefix}-actionbar-summary`}>
                <span className={`mr-2 ${prefix}-type-zeta`}>
                    {itemsSelected}
                </span>
                <span className={`${prefix}-actionbar-text ${prefix}-type-zeta`}>
                    items selected
                </span>
                <button className={`${prefix}-actionbar-cancel`}>Cancel</button>
            </div>
        </section>
    );
}

ActionBar.propTypes = {
    children: PropTypes.node.isRequired,
    itemsSelected: PropTypes.number.isRequired
};

ActionBar.defaultProps = {

};