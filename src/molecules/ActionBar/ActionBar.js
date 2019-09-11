import React from 'react';
import PropTypes from 'prop-types';
import prefix from "../../settings";

export default function ActionBar({ children, ...restProps }) {

    console.log('children', children.querySelector());
    React.Children.map(children, (child)=>{ console.log(child)})
    return (
        <section className="hcl-actionbar" aria-label="Table Action Bar">
            {/* action items */}
            {children.querySelector('[actionitem]')}
            <div className="hcl-actionbar-summary">
                <span className="mr-2 hcl-type-zeta">
                    5
                </span>
                <span className="hcl-actionbar-text hcl-type-zeta">
                    items selected
                </span>
                <button className="hcl-actionbar-cancel">Cancel</button>
            </div>
        </section>
    );
}

ActionBar.propTypes = {

};

ActionBar.defaultProps = {

};