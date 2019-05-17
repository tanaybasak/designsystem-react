import React from "react";
import PropTypes from "prop-types";
import { prefix } from '../../../settings';

export default function Label({ className, children, ...restProps }) {
    const classnames = `${prefix}-label ${className}`.trim();

    return (
        <label
            className={classnames}
            {...restProps}
        >
           {children}
        </label>
    );
};

Label.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    htmlFor: PropTypes.string,
    onClick: PropTypes.func
};

Label.defaultProps = {
    children: null,
    className: '',
    htmlFor: '',
    onClick: () => { }
};