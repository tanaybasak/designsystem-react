import React, { useState } from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';

const AccordionItem = ({ title, expanded, onChange, className, children, ...restProps }) => {
    const [checked, setChecked] = useState(expanded || false);

    const classnames = `${prefix}-accordion-item ${className}`.trim();

    return (
        <li className={classnames} {...restProps}>
            <input
                className="hcl-accordion-expended"
                type="checkbox"
                checked={checked}
                onClick={
                    event => {
                        const ch = !checked
                        setChecked(ch);
                        onChange(event, ch);
                    }
                }
            />
            <span className="hcl-accordion-icon" />
            <span className="hcl-accordion-title">{title}</span>
            <p className="hcl-accordion-content">
                {children}
            </p>
        </li>
    );
};

AccordionItem.propTypes = {
    title: PropTypes.string.isRequired,
    expanded: PropTypes.bool,
    onChange: PropTypes.func,
    className: PropTypes.string,
    children: PropTypes.any
};

AccordionItem.defaultProps = {
    title: null,
    expanded: false,
    onChange: () => { },
    className: '',
    children: ''
};

export default AccordionItem;